# Portfólio Esther Novais

Portfólio digital do projeto **Hoshen**, uma proposta de direção de arte e styling inspirada no peitoral descrito em Êxodo: doze pedras preciosas, associadas às doze tribos de Israel. O projeto apresenta o conceito por meio de referências visuais, direção de beleza, styling, joalheria e ensaios editoriais.

## Conteúdo

- Apresentação e conceito criativo do projeto.
- Identidade visual, paleta cromática e referências de cenário.
- Direção de beleza e styling feminino e masculino.
- Linguagem fotográfica e proposta de fashion film.
- Galeria das doze pedras e seleção de joias.
- Ensaios editoriais e seção de contato.

## Tecnologias

- HTML
- CSS
- JavaScript

O site é estático e não requer instalação de dependências nem etapa de build. As fotografias são armazenadas localmente em `img/`, e as fontes tipográficas são carregadas do Google Fonts.

## Como visualizar

Abra `index.html` diretamente no navegador ou sirva a pasta com um servidor HTTP local. Por exemplo, com a extensão **Live Server** do Visual Studio Code, clique com o botão direito em `index.html` e selecione **Open with Live Server**.

## Estrutura do projeto

```text
.
├── index.html   # Conteúdo e seções do portfólio
├── style.css    # Layout, estilos e responsividade
├── images.css   # Mapeamento das classes para as imagens locais
├── script.js    # Navegação, animações, progresso e lightbox
└── img/         # Fotografias e imagens do projeto
```

## Interações

- Navegação entre capítulos e rolagem com encaixe por seção.
- Menu compacto em telas menores.
- Indicador de progresso e contador de seção.
- Animações de entrada e efeito parallax em telas desktop.
- Clique nas imagens para ampliá-las; pressione **Esc** ou clique fora da imagem para fechar.
- Navegação entre seções pelas setas, **Espaço** e **Page Up/Page Down**.

## Personalização

As seções e seus conteúdos ficam em `index.html`; os estilos e breakpoints, em `style.css`. Os nomes de classe de imagem usados no HTML são associados aos arquivos de `img/` em `images.css`.

Antes de publicar, substitua na seção de contato os dados de exemplo (`seu@email.com`, `@seuinstagram` e o telefone fictício) pelas informações corretas. As fontes do Google Fonts dependem de conexão com a internet; sem ela, o navegador usa as fontes alternativas definidas no CSS.
