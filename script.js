// Classe pizza. Permite você pegar o preço de acordo com o tamanho da pizza.

class Pizza {
    constructor(nome, descricao, preco, categoria) {
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.categoria = categoria;
    }
    meioSabor() {
        return this.preco / 2;
    }

    pegarPreco(tamanho) {
        switch (tamanho.toLowerCase()) {
            case 'pequena':
                return this.preco * 0.8;
            case 'média':
                return this.preco;
            case 'grande':
                return this.preco * 1.2;
        }
    }
}

// Classe bebida. Permite você pegar o preço.

class Bebida {
    constructor(nome, preco) {
        this.nome = nome;
        this.preco = preco;
    }
    pegarPreco() {
        return this.preco;
    }
}

// Classe pedido. Permite você adicionar bebida ou pizza ao pedido e retorna o valor com o valorTotal()

class Pedido {
    constructor(id) {
        this.id = id;
        this.produtos = [];
    }

    adicionarPizza(pizza, tamanho) {
        const valor = pizza.pegarPreco(tamanho);
        this.produtos.push({ item: pizza, tipo: tamanho, preco: valor });
    }

    adicionarBebida(bebida) {
        const valor = bebida.pegarPreco();
        this.produtos.push({ item: bebida, tipo: 'unico', preco: valor });
    }

    valorTotal() {
        const total = this.produtos.reduce(
            (total, produto) => total + produto.preco,
            0
        );
        return total;
    }
}

//  ADICIONANDO 3 SABORES DE PIZZA: CALABRESA, PEPPERONI, PORTUGUESA

const pizzaCalabresa = new Pizza(
    'Calabresa',
    'Molho de tomate da casa, mozzarela, azeitona preta, calabresa, cebola roxa e orégano.',
    45,
    'Salgada'
);

const pizzaPepperoni = new Pizza(
    'Pepperoni',
    'Molho de tomate da casa, queijo, pepperoni. e orégano.',
    50,
    'Salgada'
);

const pizzaPortuguesa = new Pizza(
    'Portuguesa',
    'Molho de tomate da casa, mozzarela, azeitona preta, calabresa, cebola roxa e orégano.',
    47,
    'Salgada'
);

//  ADICIONANDO 3 TIPOS DE BEBIDA: COCA, AGUA E MATTE

const bebidaCocaNormal = new Bebida('Coca-cola', 9);
const bebidaAgua = new Bebida('Água', 6);
const bebidaMatteNatural = new Bebida('Matte Natural', 8);

// Função que inicializa o carrinho a partir do localStorage
function inicializarCarrinho() {
    // Pega o carrinho do localStorage (caso já tenha algum item armazenado)
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Atualiza o resumo do pedido
    atualizarResumoPedido(carrinho);
}

const carrinhoAberto = document.querySelector('.carrinho');
const carrinhoFechado = document.querySelector('.btn-fechar');
const carrinhoTab = document.querySelector('.carrinhoTab');

// Função que adiciona um item ao carrinho e atualiza o localStorage
function adicionarAoCarrinho(item) {
    // Pega o carrinho atual do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Adiciona o novo item ao carrinho
    carrinho.push(item);

    // Atualiza o localStorage com o novo carrinho
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualiza o resumo do carrinho
    atualizarResumoPedido(carrinho);
}

// Função que atualiza o resumo do pedido na página
function atualizarResumoPedido(carrinho) {
    let resumoHTML = '';
    let total = 0;
    let nDeItens = 0;

    // Verifica se o carrinho está vazio
    if (carrinho.length === 0) {
        resumoHTML = '<p>Seu pedido está vazio!</p>';
        carrinhoAberto.classList.remove('carrinho-ativo');
    } else {
        // Exibe os itens do carrinho
        carrinhoAberto.classList.add('carrinho-ativo');
        carrinho.forEach((item, index) => {
            resumoHTML += `
            <div class='itemDoPedido'>
                <button class='btn-remover'>X</button>
                <p>${index + 1}. ${item.tipo} ${item.nome} - R$ ${
                item.preco
            }</p>
            </div>`;
            total += item.preco;
            nDeItens = index + 1;
        });

        resumoHTML += `<p><strong>Total: R$ ${total}</strong></p>`;
    }

    // Exibe o resumo do carrinho
    document.getElementById('pedidoResumo').innerHTML = resumoHTML;
    document.querySelector('.total').innerHTML = total;
    document.querySelector('.itens').innerHTML = nDeItens;
}

function limparCarrinho() {
    // Remove o carrinho do localStorage
    localStorage.removeItem('carrinho');

    // Atualiza o resumo do pedido para exibir "Carrinho vazio"
    atualizarResumoPedido([]);
}

//  Abrir e fechar a aba do carrinho:

function abrirCarrinho() {
    carrinhoTab.style.transform = 'translateX(0)';
}

function fecharCarrinho() {
    carrinhoTab.style.transform = 'translateX(110%)';
}

// Função para exibir o menu de pizzas e bebidas
function exibirMenu() {
    const menu = document.getElementById('menu');

    const pizzas = [
        {
            nome: 'Calabresa',
            descricao:
                'Molho de tomate da casa, mozzarela, azeitona preta, calabresa, cebola roxa e orégano.',
            preco: 45,
        },
        {
            nome: 'Pepperoni',
            descricao: 'Molho de tomate da casa, queijo, pepperoni. e orégano.',
            preco: 50,
        },
        {
            nome: 'Portuguesa',
            descricao:
                'Molho de tomate da casa, mozzarela, azeitona preta, calabresa, cebola roxa e orégano.',
            preco: 47,
        },
    ];
    const bebidas = [
        { nome: 'Coca-Cola Normal', descricao: '350ml', preco: 9 },
        { nome: 'Água', descricao: '500ml', preco: 6 },
        {
            nome: 'Chá Matte Natural',
            descricao: 'Chá Matte Leão Original. 350ml',
            preco: 8,
        },
    ];

    let htmlPizza = `
        <div class="menu-container">
            <h2>Pizzas</h2>
    `;
    pizzas.forEach((pizza) => {
        htmlPizza += `
            <div class="produto item">
                <h3>${pizza.nome}</h3>
                <p class='produto_descrição'>${pizza.descricao}</p>
                <p class='produto_preço'> R$ ${pizza.preco}</p>
                <button class='btn' onclick="adicionarAoCarrinho({
                    nome: '${pizza.nome}',
                    tipo: 'Pizza',
                    preco: ${pizza.preco}
                })">Adicionar</button>
            </div>
        `;
    });
    htmlPizza += '</div>';

    let htmlBebidas = `
    <div class="menu-container">
        <h2>Bebidas</h2>
    `;
    bebidas.forEach((bebida) => {
        htmlBebidas += `
            <div class="produto item">
                <h3>${bebida.nome}</h3>
                <p class='produto_descrição'>${bebida.descricao}</p>
                <p class='produto_preço'>R$ ${bebida.preco}</p>
                <button class='btn' onclick="adicionarAoCarrinho({
                    nome: '${bebida.nome}',
                    tipo: 'Bebida',
                    preco: ${bebida.preco}
                })">Adicionar</button>
            </div>
        `;
    });

    htmlBebidas += '</div>';

    menu.innerHTML = htmlPizza + htmlBebidas;
}

// Inicialização da página
document.addEventListener('DOMContentLoaded', () => {
    // Carrega o carrinho
    inicializarCarrinho();
    // Exibe o menu de produtos
    exibirMenu();

    document
        .getElementById('limparCarrinho')
        .addEventListener('click', limparCarrinho);

    carrinhoAberto.addEventListener('click', (e) => {
        e.preventDefault();
        abrirCarrinho();
    });

    carrinhoFechado.addEventListener('click', fecharCarrinho);
});
