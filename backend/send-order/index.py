import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Отправляет заявку клиента на email в виде красивой HTML таблицы
    Args: event с httpMethod, body (JSON с данными заявки)
    Returns: HTTP response с результатом отправки
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    name = body_data.get('name', '')
    phone = body_data.get('phone', '')
    email = body_data.get('email', '')
    comment = body_data.get('comment', '')
    calculated_price = body_data.get('calculatedPrice')
    custom_services = body_data.get('customServices', '')
    selected_extras = body_data.get('selectedExtras', {})
    area = body_data.get('area', '')
    room_type = body_data.get('roomType', '')
    cleaning_type = body_data.get('cleaningType', '')
    
    smtp_user = os.environ.get('SMTP_USER', '').strip()
    smtp_password = os.environ.get('SMTP_PASSWORD', '').strip()
    
    if not smtp_user or not smtp_password:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'SMTP credentials not configured'}),
            'isBase64Encoded': False
        }
    
    extras_labels = {
        'windows': 'Мытье окон',
        'balcony': 'Уборка балкона',
        'carpet': 'Химчистка ковра',
        'furniture': 'Химчистка мягкой мебели',
        'appliances': 'Мытье бытовой техники',
        'chandelier': 'Мытье люстры',
        'afterRepair': 'Уборка после ремонта',
        'disinfection': 'Дезинфекция помещения'
    }
    
    extras_html = ''
    if selected_extras:
        extras_list = [extras_labels.get(key, key) for key, value in selected_extras.items() if value]
        if extras_list:
            extras_html = '<br>'.join(extras_list)
        else:
            extras_html = 'Не выбраны'
    else:
        extras_html = 'Не выбраны'
    
    room_type_labels = {
        '1': '1-комнатная',
        '2': '2-комнатная',
        '3': '3-комнатная',
        '4': '4-комнатная',
        '5': '5-комнатная'
    }
    
    cleaning_type_labels = {
        'regular': 'Поддерживающая',
        'general': 'Генеральная',
        'afterRepair': 'После ремонта'
    }
    
    room_type_str = room_type_labels.get(room_type, room_type) if room_type else 'Не указан'
    cleaning_type_str = cleaning_type_labels.get(cleaning_type, cleaning_type) if cleaning_type else 'Не указан'
    
    html_body = f'''
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body {{ font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; }}
            .container {{ max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
            h1 {{ color: #3B82F6; border-bottom: 3px solid #3B82F6; padding-bottom: 10px; margin-bottom: 30px; }}
            table {{ width: 100%; border-collapse: collapse; margin-top: 20px; }}
            td {{ padding: 12px; border-bottom: 1px solid #e5e5e5; }}
            .label {{ font-weight: bold; color: #374151; width: 40%; background-color: #f9fafb; }}
            .value {{ color: #1f2937; }}
            .price {{ font-size: 24px; font-weight: bold; color: #10B981; text-align: center; padding: 20px; background-color: #f0fdf4; border-radius: 8px; margin-top: 20px; }}
            .footer {{ margin-top: 30px; text-align: center; color: #6b7280; font-size: 12px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🎯 Новая заявка на уборку</h1>
            <table>
                <tr>
                    <td class="label">👤 Имя клиента:</td>
                    <td class="value">{name or 'Не указано'}</td>
                </tr>
                <tr>
                    <td class="label">📱 Телефон:</td>
                    <td class="value">{phone or 'Не указан'}</td>
                </tr>
                {f'<tr><td class="label">📧 E-mail:</td><td class="value">{email}</td></tr>' if email else ''}
                <tr>
                    <td class="label">🏠 Тип помещения:</td>
                    <td class="value">{room_type_str}</td>
                </tr>
                <tr>
                    <td class="label">📐 Площадь:</td>
                    <td class="value">{area} м²</td>
                </tr>
                <tr>
                    <td class="label">🧹 Тип уборки:</td>
                    <td class="value">{cleaning_type_str}</td>
                </tr>
                <tr>
                    <td class="label">✨ Доп. услуги:</td>
                    <td class="value">{extras_html}</td>
                </tr>
                {f'<tr><td class="label">📝 Особые пожелания:</td><td class="value">{custom_services}</td></tr>' if custom_services else ''}
                {f'<tr><td class="label">💬 Комментарий:</td><td class="value">{comment}</td></tr>' if comment else ''}
            </table>
            {f'<div class="price">💰 Расчётная стоимость: {calculated_price} ₽</div>' if calculated_price else ''}
            <div class="footer">
                <p>Заявка получена через сайт "Чистый Стандарт"</p>
                <p>Свяжитесь с клиентом в ближайшее время!</p>
            </div>
        </div>
    </body>
    </html>
    '''
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка на уборку от {name or "клиента"}'
    msg['From'] = smtp_user
    msg['To'] = 'ip-zhdanov@inbox.ru'
    
    html_part = MIMEText(html_body, 'html', 'utf-8')
    msg.attach(html_part)
    
    if 'gmail' in smtp_user.lower():
        smtp_server = 'smtp.gmail.com'
        smtp_port = 587
    elif 'yandex' in smtp_user.lower() or 'ya.ru' in smtp_user.lower():
        smtp_server = 'smtp.yandex.ru'
        smtp_port = 587
    elif 'mail.ru' in smtp_user.lower() or 'inbox.ru' in smtp_user.lower() or 'list.ru' in smtp_user.lower() or 'bk.ru' in smtp_user.lower():
        smtp_server = 'smtp.mail.ru'
        smtp_port = 587
    else:
        smtp_server = 'smtp.yandex.ru'
        smtp_port = 587
    
    try:
        server = smtplib.SMTP(smtp_server, smtp_port, timeout=10)
        server.set_debuglevel(0)
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.send_message(msg)
        server.quit()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'message': 'Email sent successfully'}),
            'isBase64Encoded': False
        }
    except smtplib.SMTPAuthenticationError as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Authentication failed',
                'message': 'Неверный логин или пароль SMTP. Проверьте настройки секретов.',
                'details': str(e)
            }),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Failed to send email',
                'message': str(e)
            }),
            'isBase64Encoded': False
        }