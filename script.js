const SEU_NUMERO = "67999217120";
let escolha = "";
let tentativasRecusa = 0;

const frasesRecusa = [
    "🥺 Mas por que não?",
    "💔 Pode ser meu ultimo dia vivo...",
    "🥰 Prometo que vai ter algo para encher o pandú...",
    "😘 Fofoca também!",
    "💕 Eu prometo que vai ser legal!",
    "🌷 Pensa bem...",
    "✨ Só um sim?",
    "😳 Você é tão pitchulinha heinn...",
    "🔪 Se não aceitar vai ter sérios problemas"
];

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

document.addEventListener('DOMContentLoaded', function() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    const dataMinima = `${ano}-${mes}-${dia}`;
    document.getElementById('dataEscolhida').setAttribute('min', dataMinima);
    setarData(1);
    console.log('💕 Site da Madame');
    setTimeout(() => chuvaDeCoracoes(6), 500);
    
    if (isMobile) {
        document.getElementById('btnTalvez').onmouseover = null;
        document.getElementById('btnNao').onmouseover = null;
        document.getElementById('btnTalvez').style.transition = 'none';
        document.getElementById('btnNao').style.transition = 'none';
    }
});

function setarData(diasAdicionar) {
    const data = new Date();
    data.setDate(data.getDate() + diasAdicionar);
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    document.getElementById('dataEscolhida').value = `${ano}-${mes}-${dia}`;
}

function fugir(botao) {
    if (isMobile) return;
    
    if (botao.style.position !== 'fixed') {
        botao.style.position = 'relative';
        botao.style.transition = 'all 0.15s ease';
    }
    
    const card = document.getElementById('card');
    const cardRect = card.getBoundingClientRect();
    const btnRect = botao.getBoundingClientRect();
    
    const maxX = cardRect.width - btnRect.width - 20;
    const maxY = cardRect.height - btnRect.height - 20;
    
    const novoX = Math.random() * maxX;
    const novoY = Math.random() * maxY;
    
    botao.style.transform = `translate(${novoX - btnRect.left + cardRect.left}px, ${novoY - btnRect.top + cardRect.top}px)`;
    botao.classList.add('fugindo');
    
    tentativasRecusa++;
    
    if (tentativasRecusa % 3 === 0) {
        const frase = frasesRecusa[Math.floor(Math.random() * frasesRecusa.length)];
        document.getElementById('pergunta').textContent = frase;
        setTimeout(() => {
            document.getElementById('pergunta').textContent = '🥺 Quer sair comigo?';
        }, 2000);
        chuvaDeCoracoes(10);
    }
    
    if (tentativasRecusa > 10) {
        const btnSim = document.getElementById('btnSim');
        btnSim.style.transform = 'scale(1.3)';
        btnSim.style.boxShadow = '0 0 40px rgba(233, 30, 99, 0.8)';
        setTimeout(() => {
            btnSim.style.transform = 'scale(1)';
            btnSim.style.boxShadow = 'none';
        }, 1000);
    }
}

function recusar() {
    if (isMobile) {
        const btnSim = document.getElementById('btnSim');
        btnSim.style.transform = 'scale(1.2)';
        btnSim.style.boxShadow = '0 0 40px rgba(233, 30, 99, 0.6)';
        setTimeout(() => {
            btnSim.style.transform = 'scale(1)';
            btnSim.style.boxShadow = 'none';
        }, 500);
        
        const frases = [
            '🥺 Não tem como fugir!',
            '😘 Só tem o SIM!',
            '💕 Aceita logo!',
            '🌷 Você sabe que quer!'
        ];
        document.getElementById('pergunta').textContent = frases[Math.floor(Math.random() * frases.length)];
        setTimeout(() => {
            document.getElementById('pergunta').textContent = '🥺 Quer sair comigo?';
        }, 2000);
        
        chuvaDeCoracoes(15);
        return;
    }
    
    const botoes = document.getElementById('botoes');
    const btnSim = document.getElementById('btnSim');
    botoes.style.animation = 'shaking 0.5s ease';
    
    setTimeout(() => {
        botoes.style.animation = 'none';
    }, 500);
    
    const frases = [
        '🥺 Não tem como fugir!',
        '😘 Só tem o SIM!',
        '🔪 perigo!',
        '⚠️ Cuidado'
    ];
    document.getElementById('pergunta').textContent = frases[Math.floor(Math.random() * frases.length)];
    setTimeout(() => {
        document.getElementById('pergunta').textContent = '🥺 Quer sair comigo?';
    }, 2000);
    
    btnSim.style.transform = 'scale(1.2)';
    btnSim.style.boxShadow = '0 0 50px rgba(233, 30, 99, 0.6)';
    setTimeout(() => {
        btnSim.style.transform = 'scale(1)';
        btnSim.style.boxShadow = 'none';
    }, 1000);
    
    chuvaDeCoracoes(15);
}

const styleShaking = document.createElement('style');
styleShaking.textContent = `
    @keyframes shaking {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-15px) rotate(-3deg); }
        40% { transform: translateX(15px) rotate(3deg); }
        60% { transform: translateX(-8px); }
        80% { transform: translateX(8px); }
    }
`;
document.head.appendChild(styleShaking);

function resposta(opcao) {
    escolha = opcao;
    const nomes = {
        sim: "Sim 💕",
        talvez: "Talvez 🤔",
        nao: "Não 😅"
    };
    document.getElementById('botoes').style.display = 'none';
    document.getElementById('inputArea').style.display = 'block';
    const textarea = document.getElementById('mensagem');
    textarea.placeholder = `Você escolheu: ${nomes[opcao]}.`;
    textarea.focus();
    chuvaDeCoracoes(8);
}

function formatarData(dataStr) {
    if (!dataStr) return "Não definido";
    const partes = dataStr.split('-');
    const ano = partes[0];
    const mes = parseInt(partes[1]);
    const dia = parseInt(partes[2]);
    const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 
                   'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    const dataObj = new Date(ano, mes - 1, dia);
    const diasSemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 
                        'quinta-feira', 'sexta-feira', 'sábado'];
    const diaSemana = diasSemana[dataObj.getDay()];
    return `${diaSemana}, ${dia} de ${meses[mes - 1]} de ${ano}`;
}

function enviarWhatsApp() {
    const mensagem = document.getElementById('mensagem').value.trim();
    const data = document.getElementById('dataEscolhida').value;
    
    if (!mensagem) {
        alert('🤬 Escreve algo, cabeçuda');
        return;
    }
    
    const dataFormatada = formatarData(data);
    const emojiData = data ? '📅' : '❓';
    
    const texto = 
`*🎀 MINHA RESPOSTA 🎀*

*Escolha:* ${escolha.toUpperCase()}
${emojiData} *Dia:* ${dataFormatada}

*Mensagem:*
${mensagem}`;
    
    const url = `https://wa.me/${67999217120}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
    
    const msgSucesso = document.getElementById('msgSucesso');
    msgSucesso.style.display = 'block';
    msgSucesso.innerHTML = '✅ Enviado com prazer! Vou ver sua resposta no Whats madame.';
    
    document.querySelector('.btn-enviar').style.display = 'none';
    document.getElementById('mensagem').disabled = true;
    document.getElementById('dataEscolhida').disabled = true;
    
    chuvaDeCoracoes(20);
}

function chuvaDeCoracoes(quantidade = 10) {
    const emojis = ['❤️', '💖', '💗', '🌸', '✨', '💕', '🌷', '💝', '🌟', '💘'];
    for (let i = 0; i < quantidade; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'hearts-fall';
            heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = (16 + Math.random() * 28) + 'px';
            heart.style.animationDuration = (3 + Math.random() * 4) + 's';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 7000);
        }, i * 80);
    }
}

function criarSparkle(x, y) {
    const emojis = ['✨', '⭐', '🌟', '💫'];
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    sparkle.style.left = (x - 10) + 'px';
    sparkle.style.top = (y - 10) + 'px';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1200);
}

document.querySelector('.heart').addEventListener('click', function(e) {
    chuvaDeCoracoes(30);
    for (let i = 0; i < 12; i++) {
        const offsetX = (Math.random() - 0.5) * 300;
        const offsetY = (Math.random() - 0.5) * 300;
        criarSparkle(e.clientX + offsetX, e.clientY + offsetY);
    }
});

document.getElementById('mensagem').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault();
        enviarWhatsApp();
    }
});