## TLS INTRO
-------------------------------------------------------------

- What are TLS Certificates?
- How does Kubernetes use Certificates?
- How to Generate them?
- How to configure them?
- How to view them?
- How to troubleshoot issues related to Certificates?


## TLS BASICS
-------------------------------------------------------------
- Used to guarantee trust between 2 parties during a transaction.
    * Example: User tries to access a Server.

### Encryption
- Symmetric Encryption
    * Secure way of encryption.
    * Uses same key to encrypt and decrypt.
    * Key has to be exchanged between sender and receiver.
    * risk of hacker gaining access to key and decrypting data.
    * Fix issue
        - Server uses Asymmetric Encryption and generates public and private keys.
            ```bash
            # Generate a private and public key pair.
            openssl genrsa -out my-bank.key 1024

            openssl rsa -in my-bank.key -pubout > mybank.pem
            ```
        - When User first accesses web-server using `https` it gets key from server.
        - the users browser then encrypts the symmetric key using pub key provided by server, its now secure.
            * the user sends that key is sent to server.
            * the server then uses the private key to decrypt message and retrieve the symmetric key from it.
            * hacker cannot decrypt the message since he only has a public key.
            * Server and user now both have symmetric key to encrypt data and send to eachother.
- Asymmetric Encryption
    * Uses a pair of keys to encrypt and decrypt data
        1. Private Key
        2. Public Key (Lock)
            ```bash
            # Generate a public, private key pair.
            # id_rsa id_rsa.pub
            ssh-keygen

            # Adding an entry with your public key to file.
            cat ~/..sh/authorized_keys

            # When trying to ssh specify key in command.
            ssh -i id_rsa user@server1
            ```
    * What if you have other servers in environment, how do you secure more than 1 server with key pair?
        - can create copies of your public lock and place them on as many servers as you want.
        - can use same private key to ssh into all your servers securely.
    * If other users need access to servers?
        - they can generate their own private and public key pairs.
        - You can create an additional door for them and lock it with thir public locks.
    
### Certificate Authority (CA)
- Famous ones
    * Symantec
    * Comodo
    * GlobalSign
    * digicert
- Process to get Certified
    1. Certificate Signing Request (CSR)
        ```bash
        # Generate a certificate signing request
        openssl req -new -key my-bank.key -out my-bank.csr -subj "/C=US/ST=CA/O=MyOrg, Inc./CN=my-bank.com"
        ```
    2. Validate Information
        * CAs (Certificate Authority) themselves have a set of public and private key pairs.
            - use their private keys to sign the certificates
            - the public keys of all CAs are built in to the browsers.
                * you can see them under `Certificates` under `Trusted Root Certification Authorities` tab.
                * dont help with privately hosted sites though.
    3. Sign and Send Certificate
        * You can host your own private CAs (Certificate Authority) and can install it on all your organizations


### Public Key Infrastructure
- To Encrypt messages we use Assymetric Encryption with a pair of public and private keys.
- Admin uses a pair of keys to secure ssh connectivity to the servers.
- The server uses a pair of keys to secure https traffic
    * but first the server sends a certificate authenication signing request to a CA (Certificate Authority).
    * the CA uses its private key to sign the CSR (remember all users have a copy of the CSR)
- The signed certificate is then sent back to the signed server.
- The server configures the web application with the signed certificate.
- Whenever a user accesses the web application the server first sends the certificate with its public key
    * The users browser reads the certificate & uses the CAs public key to validate and retrieve the servers public key.
    * it then generates a symmetric key that it wishes to use going forward for all communications.
    * the symmetric key is encrypted using the servers public key & sent back to the server.
    * the server uses its private key to decrypt the message & retrieve symmetric key.
    * the symmetric key is used for communication going forward.
- The administrator generates the key pair for securing SSH.
- The web server generates a key pair for securing the website with https.
- The Certificate Authority generates its own set of key pair to sign certificates.
- The end user only generates a single symmetric key.
    * once he establishes trust with the website he uses his username and password to authenticate to the web server.
- With the servers key pairs the client was able to validate that the server is who they say they are.
    * but the server does not for sure know if the client is who they say they are.
    * Server requests a certificate from the client
        - client generates a key pair & a signed certificate from a valid CA to be verified.

- Both public and private keys can both encrypt but opposite one HAS to do the decrypt.
    * Public Keys
        - *.crt
        - *.pem
    * Private Keys
        - *.key
        - *.key.pem
