function createSnowflakes() {
    const snowflakesContainer = document.getElementById('snowflakes');
    const snowflakeCount = 50;
    
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = '❄';
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.animationDuration = Math.random() * 5 + 5 + 's';
        snowflake.style.opacity = Math.random() * 0.7 + 0.3;
        snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
        snowflakesContainer.appendChild(snowflake);
    }
}

function initForecastChart() {
    const ctx = document.getElementById('forecast-chart').getContext('2d');
    const forecastChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Now', '2PM', '4PM', '6PM', '8PM', '10PM', '12AM', '2AM', '4AM', '6AM', '8AM', '10AM'],
            datasets: [{
                label: 'Temperature (°C)',
                data: [-5, -6, -7, -8, -9, -10, -11, -12, -13, -12, -10, -8],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Feels Like (°C)',
                data: [-10, -12, -14, -16, -18, -20, -21, -22, -23, -21, -18, -15],
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

function initAssistant() {
    const chatContainer = document.getElementById('chat-container');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    
    const responses = {
        'hypothermia': 'Hypothermia occurs when your body loses heat faster than it can produce it. Symptoms include shivering, confusion, slurred speech, and drowsiness. To prevent it, dress in layers, stay dry, and keep moving. If you suspect hypothermia, seek warm shelter immediately.',
        'frostbite': 'Frostbite is the freezing of skin and underlying tissues. Early signs include numbness, tingling, or pale skin. Protect exposed skin, wear insulated waterproof boots, and avoid tight clothing that restricts circulation.',
        'black ice': 'Black ice is a thin, transparent layer of ice that forms on roads and sidewalks. It is especially dangerous because it is nearly invisible. Drive slowly, increase following distance, and avoid sudden braking or steering movements.',
        'blizzard': 'During a blizzard, stay indoors if possible. If you must travel, create an emergency kit with blankets, food, water, and a flashlight. Keep your gas tank full to prevent fuel line freeze.',
        'car emergency': 'If stranded in your car during winter, stay with your vehicle. Run the engine for 10 minutes each hour for heat. Make sure the exhaust pipe is clear of snow. Use bright cloth to signal for help.',
        'winter driving': 'Prepare your vehicle for winter with snow tires, antifreeze, and an emergency kit. Slow down and increase following distance. Avoid using cruise control on slippery surfaces.',
        'snow removal': 'When shoveling snow, pace yourself to avoid overexertion. Lift with your legs, not your back. Take frequent breaks and stay hydrated.',
        'power outage': 'During a winter power outage, use alternative heat sources safely. Keep refrigerators and freezers closed to preserve food. Have battery-powered lights and a radio available.',
        'default': 'I am here to help with winter safety information. You can ask me about hypothermia, frostbite, black ice, blizzards, car emergencies, winter driving, snow removal, or power outages.'
    };
    
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.innerHTML = `<p>${message}</p>`;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    function processUserInput() {
        const input = userInput.value.trim().toLowerCase();
        if (!input) return;
        
        addMessage(input, true);
        userInput.value = '';
        
        let response = responses.default;
        for (const keyword in responses) {
            if (input.includes(keyword)) {
                response = responses[keyword];
                break;
            }
        }
        
        setTimeout(() => {
            addMessage(response);
        }, 1000);
    }
    
    sendBtn.addEventListener('click', processUserInput);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') processUserInput();
    });

    document.querySelectorAll('.quick-question').forEach(button => {
        button.addEventListener('click', () => {
            const question = button.getAttribute('data-question');
            userInput.value = question;
            processUserInput();
        });
    });
}

function initSOS() {
    const sosBtn = document.getElementById('sos-btn');
    const sosModal = document.getElementById('sos-modal');
    const closeSos = document.getElementById('close-sos');
    const contactEmergency = document.getElementById('contact-emergency');
    
    sosBtn.addEventListener('click', () => {
        sosModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    closeSos.addEventListener('click', () => {
        sosModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    contactEmergency.addEventListener('click', () => {
        alert('In a real application, this would connect to emergency services or send alerts to your contacts.');
    });
}

function initEmergencyContacts() {
    const contacts = [
        { name: 'Local Emergency', phone: '911', relationship: 'emergency' },
        { name: 'Road Assistance', phone: '1-800-555-HELP', relationship: 'service' },
        { name: 'Weather Service', phone: '1-800-WEATHER', relationship: 'service' }
    ];
    
    const contactList = document.getElementById('emergency-contact-list');
    const addContactBtn = document.getElementById('add-contact-btn');
    const addContactModal = document.getElementById('add-contact-modal');
    const closeAddContact = document.getElementById('close-add-contact');
    const saveContact = document.getElementById('save-contact');
    
    function renderContacts() {
        contactList.innerHTML = '';
        contacts.forEach(contact => {
            const contactItem = document.createElement('div');
            contactItem.className = 'contact-item';
            contactItem.innerHTML = `
                <div>
                    <div style="font-weight: 600;">${contact.name}</div>
                    <div style="font-size: 0.9rem; color: var(--text-light);">${contact.phone}</div>
                </div>
                <div class="contact-actions">
                    <button class="btn btn-outline call-contact" data-phone="${contact.phone}">
                        <i class="fas fa-phone"></i> Call
                    </button>
                    ${contact.relationship !== 'emergency' && contact.relationship !== 'service' ? 
                    `<button class="btn btn-outline delete-contact" data-name="${contact.name}">
                        <i class="fas fa-trash"></i>
                    </button>` : ''}
                </div>
            `;
            contactList.appendChild(contactItem);
        });
        
        document.querySelectorAll('.call-contact').forEach(button => {
            button.addEventListener('click', () => {
                const phone = button.getAttribute('data-phone');
                alert(`Calling ${phone}...`);
            });
        });
        
        document.querySelectorAll('.delete-contact').forEach(button => {
            button.addEventListener('click', () => {
                const name = button.getAttribute('data-name');
                if (confirm(`Are you sure you want to delete ${name}?`)) {
                    const index = contacts.findIndex(contact => contact.name === name);
                    if (index !== -1) {
                        contacts.splice(index, 1);
                        renderContacts();
                    }
                }
            });
        });
    }
    
    addContactBtn.addEventListener('click', () => {
        addContactModal.style.display = 'flex';
    });
    
    closeAddContact.addEventListener('click', () => {
        addContactModal.style.display = 'none';
    });
    
    saveContact.addEventListener('click', () => {
        const name = document.getElementById('contact-name').value;
        const phone = document.getElementById('contact-phone').value;
        const relationship = document.getElementById('contact-relationship').value;
        
        if (name && phone) {
            contacts.push({ name, phone, relationship });
            renderContacts();
            addContactModal.style.display = 'none';
            document.getElementById('contact-name').value = '';
            document.getElementById('contact-phone').value = '';
        } else {
            alert('Please fill in all fields');
        }
    });
    
    renderContacts();
}

function initButtons() {
    document.getElementById('location-btn').addEventListener('click', () => {
        const location = prompt('Enter your location:');
        if (location) {
            document.getElementById('current-location').textContent = location;
            alert(`Location set to ${location}. Weather data will update accordingly.`);
        }
    });

    document.getElementById('get-started').addEventListener('click', () => {
        document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('learn-more').addEventListener('click', () => {
        document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
    });

    const safetyTipsBtn = document.getElementById('safety-tips-btn');
    const safetyTipsModal = document.getElementById('safety-tips-modal');
    const closeSafetyTips = document.getElementById('close-safety-tips');
    
    safetyTipsBtn.addEventListener('click', () => {
        safetyTipsModal.style.display = 'flex';
    });
    
    closeSafetyTips.addEventListener('click', () => {
        safetyTipsModal.style.display = 'none';
    });

    const routePlannerBtn = document.getElementById('route-planner-btn');
    const routePlannerModal = document.getElementById('route-planner-modal');
    const closeRoutePlanner = document.getElementById('close-route-planner');
    const generateRoute = document.getElementById('generate-route');
    
    routePlannerBtn.addEventListener('click', () => {
        routePlannerModal.style.display = 'flex';
    });
    
    closeRoutePlanner.addEventListener('click', () => {
        routePlannerModal.style.display = 'none';
    });
    
    generateRoute.addEventListener('click', () => {
        const start = document.getElementById('start-location').value;
        const end = document.getElementById('end-location').value;
        const preference = document.getElementById('route-preference').value;
        
        if (start && end) {
            alert(`Generating ${preference} route from ${start} to ${end}...`);
            routePlannerModal.style.display = 'none';
        } else {
            alert('Please enter both start and end locations');
        }
    });

    const alertSettingsBtn = document.getElementById('alert-settings-btn');
    const alertSettingsModal = document.getElementById('alert-settings-modal');
    const closeAlertSettings = document.getElementById('close-alert-settings');
    const saveAlertSettings = document.getElementById('save-alert-settings');
    
    alertSettingsBtn.addEventListener('click', () => {
        alertSettingsModal.style.display = 'flex';
    });
    
    closeAlertSettings.addEventListener('click', () => {
        alertSettingsModal.style.display = 'none';
    });
    
    saveAlertSettings.addEventListener('click', () => {
        alert('Alert settings saved successfully!');
        alertSettingsModal.style.display = 'none';
    });

    const extendedForecastBtn = document.getElementById('extended-forecast-btn');
    const extendedForecastModal = document.getElementById('extended-forecast-modal');
    const closeExtendedForecast = document.getElementById('close-extended-forecast');
    
    extendedForecastBtn.addEventListener('click', () => {
        extendedForecastModal.style.display = 'flex';
    });
    
    closeExtendedForecast.addEventListener('click', () => {
        extendedForecastModal.style.display = 'none';
    });

    document.getElementById('black-ice-info').addEventListener('click', () => {
        alert('Black ice forms when the temperature is near freezing and moisture on the road surface freezes. It is most common during early morning and evening hours.');
    });

    document.getElementById('avalanche-info').addEventListener('click', () => {
        alert('Avalanche risk assessment would show current risk levels for nearby mountainous areas with safety recommendations.');
    });

    document.getElementById('road-conditions-btn').addEventListener('click', () => {
        alert('Interactive map would display showing current road conditions, closures, and plowing activity.');
    });

    document.getElementById('first-aid-btn').addEventListener('click', () => {
        alert('Winter first aid guide would open with step-by-step instructions for treating cold-related injuries.');
    });

    document.getElementById('offline-manual-btn').addEventListener('click', () => {
        alert('Offline survival manual would download to your device for access without internet connection.');
    });

    document.getElementById('community-reports-btn').addEventListener('click', () => {
        alert('Community reports would show user-submitted condition updates from your area.');
    });

    document.getElementById('print-checklist').addEventListener('click', () => {
        window.print();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createSnowflakes();
    initForecastChart();
    initAssistant();
    initSOS();
    initEmergencyContacts();
    initButtons();
});
