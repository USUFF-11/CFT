import pywhatkit
import pandas as pd
import time
import random

# The message to send
msg = """
Thank you for contacting Compu Fast Technology! Please let us know how we can help you.

شكرا لتواصلك بكمبيو فاست تكنولوجي نقدر نساعد حضرتك ازاي 😄
"""

try:
    # Read the Excel file
    df = pd.read_excel("Book1.xlsx")
    
    # Send message to each number
    for index, row in df.iterrows():
        phone = str(row['Phone Number']).strip()
        if not phone.startswith('+'):
            phone = f"+{phone}"
        
        print(f"Sending to: {phone}")
        try:
            pywhatkit.sendwhatmsg_instantly(phone, msg, 15, True)
            print("Sent!")
            
            # Random delay between 30-60 seconds
            delay = random.randint(30, 60)
            print(f"Waiting {delay} seconds before next message...")
            time.sleep(delay)
            
        except Exception as e:
            print(f"Error: {str(e)}")
            print("Waiting 60 seconds before next attempt...")
            time.sleep(60)  # Longer wait on error
            
except Exception as e:
    print(f"Error: {str(e)}")
    print("Make sure 'Book1.xlsx' is in the same folder and has a 'Phone Number' column")