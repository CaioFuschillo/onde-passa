# OndePassa

- Ariel Pereira da Silva - RA 2040482523024
- Caio Eduardo Fuschillo Fernandes - RA 2040482422014
- Heloisa Bertolli de Almeida - RA 2040482513006

## Como executar

Antes de começar, é preciso ter o Node.js instalado no computador e o aplicativo Expo Go instalado no celular. O computador e o celular precisam estar conectados à mesma rede Wi-Fi.

### Backend

1. Abra um terminal na pasta do projeto, entre na pasta `backend` e instale as dependências:

   ```bash
   cd backend
   npm install
   ```

2. Crie o arquivo `.env` a partir do `.env.example`:

   ```bash
   copy .env.example .env
   ```

   No macOS ou no Linux, use `cp .env.example .env`.

3. Abra o arquivo `.env` e coloque o token do TMDB depois do sinal de igual, sem aspas e sem espaços. Para obter o token, crie uma conta gratuita em https://www.themoviedb.org, acesse **Configurações > API**, solicite uma chave para uso pessoal e copie o **API Read Access Token**, que começa com `eyJ`.

4. Coloque o servidor em execução:

   ```bash
   npm run dev
   ```

   O terminal deve exibir a mensagem `Backend do OndePassa no ar. Porta: 3000.`. Deixe esse terminal aberto.

### Aplicativo

1. Abra um novo terminal na pasta do projeto, entre na pasta `mobile` e instale as dependências:

   ```bash
   cd mobile
   npm install
   ```

2. Descubra o IP do computador na rede. No Windows, execute `ipconfig` e procure o **Endereço IPv4** da conexão Wi-Fi. Ele também aparece no terminal ao executar o passo 3, na linha `exp://<IP>:8081`.

3. Abra o arquivo `mobile/src/utils/backendClient.js` e troque o IP da `baseURL` pelo IP do computador, mantendo o `http://` e a porta `3000`:

   ```js
   baseURL: 'http://<IP do computador>:3000'
   ```

4. Coloque o aplicativo em execução:

   ```bash
   npx expo start
   ```

5. Abra o aplicativo com o Expo Go: no Android, toque em **Scan QR code** no Expo Go e leia o QR Code exibido no terminal; no iPhone, aponte a câmera para o QR Code.

Se o celular não conseguir abrir o aplicativo ou acessar o backend, verifique se o Node.js está liberado no firewall do Windows e se a rede Wi-Fi está configurada como privada.