import hashlib
 
string = 'catch-me-if-you-can+'
number = 631550310

while True:
    number = number + 1
    hash =  hashlib.sha256(f'{string}{number}'.encode()).hexdigest()
    if '00000000'in hash:
        print(number)
        break