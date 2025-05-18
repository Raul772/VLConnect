

VLConnect
=========

Um aplicativo mobile feito com React Native para controlar o VLC Media Player remotamente via rede local.

## Funcionalidades

*   Play/Pause, Next e Previous

## Requisitos

*   VLC Media Player instalado no computador
*   API HTTP do VLC habilitada (porta padrão: 8080)
*   React Native (Expo ou CLI)
*   Dispositivo Android via depuração USB ou emulador

## Como usar

1.  Clone o repositório:
`git clone https://github.com/Raul772/VLConnect.git`  
2.  Acesse a pasta do projeto:
`cd vlconnect`  
3.  Instale as dependências:
`npm install`  
4.  Abra o VLC
5.  Vá em **Preferências > Todos > Interface > Interface Principal > Lua**
6.  Configure a porta da interface (por exemplo: `8080`)
7.  Defina uma senha
8.  Reinicie o VLC
9.  Configure o IP, porta e senha do VLC nas configurações do app `/src/services/vlcApi.js`.

### Execute o app

#### Para Android:

    npm run android

#### Para iOS (somente no macOS):

Primeiramente, instale as dependências do CocoaPods:

    cd ios
    bundle install
    bundle exec pod install

Então, execute:

    npm run ios



