
// Array para armazenar os itens do carrinho
let cartItems = [];

// Função para adicionar itens ao carrinho
function addToCart(productName, productPrice) {
    // Verifica se o item já está no carrinho
    const existingItem = cartItems.find(item => item.name === productName);

    if (existingItem) {
        // Se o item já está no carrinho, aumenta a quantidade
        existingItem.quantity++;
    } else {
        // Se o item não está no carrinho, adiciona um novo item
        cartItems.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    updateCart(); // Atualiza o carrinho após adicionar o item
}

// Função para remover itens do carrinho
function removeFromCart(productName) {
    // Encontra o índice do item no array
    const itemIndex = cartItems.findIndex(item => item.name === productName);

    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1); // Remove o item do array
    }
    
    updateCart(); // Atualiza o carrinho após remover o item
}

// Função para atualizar a exibição do carrinho
function updateCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalContainer = document.querySelector('.cart-total span');

    cartItemsContainer.innerHTML = ''; // Limpa o conteúdo anterior do carrinho

    if (cartItems.length === 0) {
        // Se o carrinho estiver vazio, exibe uma mensagem
        cartItemsContainer.innerHTML = '<p>O carrinho está vazio.</p>';
        cartTotalContainer.textContent = 'Total: $0,00';
        return;
    }

    let total = 0; // Variável para armazenar o total do carrinho

    // Itera sobre os itens do carrinho para criar a exibição de cada um
    cartItems.forEach(item => {
        total += item.price * item.quantity; // Calcula o total

        // Cria o elemento HTML para cada item do carrinho
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)} (x${item.quantity})</p>
            <button onclick="removeFromCart('${item.name}')">Remover</button>
        `;

        // Adiciona o item ao contêiner de itens do carrinho
        cartItemsContainer.appendChild(cartItem);
    });

    // Atualiza o total no carrinho
    cartTotalContainer.textContent = `Total: $${total.toFixed(2)}`;
}

// Função para adicionar eventos de clique aos botões "Adicionar ao Carrinho"
function initAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', event => {
            // Encontra o cartão de produto correspondente ao botão clicado
            const productCard = event.target.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent; // Obtém o nome do produto
            const productPrice = parseFloat(productCard.querySelector('span').textContent.replace('$', '').replace(',', '.')); // Obtém o preço do produto

            addToCart(productName, productPrice); // Adiciona o produto ao carrinho
        });
    });
}

// Inicializa as funcionalidades quando a página for carregada
document.addEventListener('DOMContentLoaded', () => {
    initAddToCartButtons(); // Configura os botões "Adicionar ao Carrinho"
});
