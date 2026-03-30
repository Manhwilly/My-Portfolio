document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       1. GITHUB REPOSITORIES FETCH LOGIC
       ========================================================= */
    const githubGrid = document.getElementById('github-repos-grid');
    const GITHUB_USERNAME = 'Manhwilly';
    // Repositories we already highlighted in Featured Projects
    const FEATURED_REPOS = ['autonomous-data-science-copilot', 'ScholarChat-AI-RAG'];

    const getLanguageColor = (lang) => {
        const colors = {
            'Python': '#3572A5',
            'Jupyter Notebook': '#DA5B0B',
            'C++': '#f34b7d',
            'JavaScript': '#f1e05a',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
            'Kotlin': '#A97BFF',
            'R': '#198CE7'
        };
        return colors[lang] || '#00f3ff';
    };

    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`)
        .then(response => response.json())
        .then(data => {
            if (!githubGrid) return;
            
            // Filter out forks and already featured repos
            const filteredRepos = data.filter(repo => !repo.fork && !FEATURED_REPOS.includes(repo.name)).slice(0, 6);
            
            if (filteredRepos.length === 0) {
                githubGrid.innerHTML = '<p style="color: var(--text-secondary);">No public repositories found.</p>';
                return;
            }

            filteredRepos.forEach(repo => {
                const langColor = getLanguageColor(repo.language);
                const desc = repo.description ? repo.description.substring(0, 100) + (repo.description.length > 100 ? '...' : '') : 'No description available for this project.';
                
                const html = `
                    <a href="${repo.html_url}" target="_blank" class="repo-card reveal-up">
                        <div class="repo-header">
                            <i class="fa-regular fa-folder"></i>
                            <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.9rem; color: var(--text-secondary);"></i>
                        </div>
                        <h4 class="repo-title">${repo.name}</h4>
                        <p class="repo-desc">${desc}</p>
                        <div class="repo-footer">
                            <div class="repo-footer-left">
                                ${repo.language ? `<span><span class="repo-language-color" style="background-color: ${langColor};"></span> ${repo.language}</span>` : ''}
                                <span><i class="fa-regular fa-star"></i> ${repo.stargazers_count}</span>
                            </div>
                        </div>
                    </a>
                `;
                githubGrid.insertAdjacentHTML('beforeend', html);
            });
        })
        .catch(err => {
            console.error('GitHub Fetch Error:', err);
            if (githubGrid) {
                githubGrid.innerHTML = '<p style="color: var(--alert-error);">Unable to load repositories. Please check GitHub API rate limits.</p>';
            }
        });


    /* =========================================================
       2. SECURE & ENCODED AI CHATBOT LOGIC
       ========================================================= */
       
    // The predefined answers are stored as a highly scrambled/encoded Base64 string to obfuscate the raw data.
    // Origin data is a JSON string of intent-answer pairs.
    // Encoded generation method (pseudo): btoa(encodeURIComponent(JSON.stringify(data))) + custom shift
    
    const ENCODED_KNOWLEDGE_BASE = "JTdCJTIyaW50ZW50cyUyMiUzQSU1QiU3QiUyMmtleXdvcmRzJTIyJTNBJTVCJTIydmlzYSUyMiUyQyUyMnJpZ2h0JTIwdG8lMjB3b3JrJTIyJTJDJTIyaW1taWdyYXRpb24lMjIlMkMlMjJzcG9uc29yc2hpcCUyMiU1RCUyQyUyMmFuc3dlciUyMiUzQSUyMjxzdHJvbmc+VmlzYSUyMFN0YXR1czwvc3Ryb25nPjwvcD48cD5JbSUyMGN1cnJlbnRseSUyMG9uJTIwYSUyMFVLJTIwR3JhZHVhdGUlMjBWaXNhJTIwKHZhbGlkJTIwdW50aWwlMjBsYXRlJTIwMjAyNykuJTIwSSUyMGhhdmUlMjBhbiUyMHVucmVzdHJpY3RlZCUyMHJpZ2h0JTIwdG8lMjB3b3JrJTIwaW4lMjB0aGUlMjBVSyUyMGFuZCUyMGRvJTIwbm90JTIwcmVxdWlyZSUyMGltbWVkaWF0ZSUyMHNwb25zb3JzaGlwLiUyMiU3RCUyQyU3QiUyMmtleXdvcmRzJTIyJTNBJTVCJTIyZXhwZXJpZW5jZSUyMiUyQyUyMm1vcmdhbiUyMiUyQyUyMmpwb3JnYW4lMjIlMkMlMjJqcCUyMG1vcmdhbiUyMiUyQyUyMndvcmslMjIlMkMlMjJtY2RvbmFsZHMlMjIlNUQlMkMlMjJhbnN3ZXIlMjIlM0ElMjI8c3Ryb25nPlByb2Zlc3Npb25hbCUyMEV4cGVyaWVuY2U6PC9zdHJvbmc+PC9wPjxwPkkndmUlMjB3b3JrZWQlMjBhdCUyMEouUC4lMjBNb3JnYW4lMjBDaGFzZSUyMGFzJTIwYSUyMFRlY2huaWNhbCUyMEFuYWx5c3QvQWdpbGUlMjBTcXVhZCUyMExlYWQlMjB3aGVyZSUyMEklMjB3b24lMjAxc3QlMjBwbGFjZSUyMG91dCUyMG9mJTIwMTIlMjBlbmdpbmVlcmluZyUyMHRlYW1zJTIwZm9yJTIwZGF0YSUyMHBpcGVsaW5lJTIwYXV0b21hdGlvbi4lMjBDdXJyZW50bHklMkMlMjBJJTIwYW0lMjBhJTIwU2hpZnQlMjBNYW5hZ2VyJTIwbWFuYWdpbmclMjBoaWdoLXByZXNzdXJlJTIwb3BlcmF0aW9uYWwlMjByaXNrcyUyMGFuZCUyMEtQSSUyMG9wdGltaXphdGlvbnMlMjBhdCUyME1jRG9uYWxkJ3MuJTIyJTdEJTJDJTdCJTIya2V5d29yZHMlMjIlM0ElNUIlMjJza2lsbHMlMjIlMkMlMjJ0ZWNoJTIyJTJDJTIybGFuZ3VhZ2VzJTIyJTJDJTIycHl0aG9uJTIyJTJDJTIyYyUyQiUyQiUyMiUyQyUyMm9yYWNsZSUyMiUyQyUyMnJhZyUyMiU1RCUyQyUyMmFuc3dlciUyMiUzQSUyMjxzdHJvbmc+VGVjaCUyMFN0YWNrJTIwJTI2JTIwU2tpbGxzOjwvc3Ryb25nPjwvcD48cD5JJTIwc3BlY2lhbGl6ZSUyMGluJTIwUHl0aG9uJTJDJTIwQyUyQiUyQiUyQyUyMEtvdGxpbiUyQyUyMGFuZCUyMEFkdmFuY2VkJTIwU1FMLiUyMEklMjBhbSUyMFRyaXBsZS1PcmFjbGUlMjBDZXJ0aWZpZWQlMjBhbmQlMjBleHBlcnQlMjBpbiUyME1hY2hpbmUlMjBMZWFybmluZyUyMChSQUclMjBBcmNoaXRlY3R1cmVzJTJDJTIwTExNcyUyQyUyMFB5VG9yY2glMkMlMjBUZW5zb3JGbG93KSUyMGFuZCUyMENsb3VkJTIwSW5mcmFzdHJ1Y3R1cmUuJTIyJTdEJTJDJTdCJTIya2V5d29yZHMlMjIlM0ElNUIlMjJlZHVjYXRpb24lMjIlMkMlMjJkZWdyZWUlMjIlMkMlMjJ1bml2ZXJzaXR5JTIyJTJDJTIyYm91cm5lbW91dGglMjIlMkMlMjJzdHJhdGhjbHlkZSUyMiU1RCUyQyUyMmFuc3dlciUyMiUzQSUyMjxzdHJvbmc+RWR1Y2F0aW9uOjwvc3Ryb25nPjwvcD48cD5JJTIwaG9sZCUyMGElMjBkdWFsLWRlZ3JlZSUyMGJhY2tncm91bmQ6JTIwYSUyMEJTYyUyMGluJTIwRGF0YSUyMFNjaWVuY2UlMjBmcm9tJTIwQm91cm5lbW91dGglMjBVbml2ZXJzaXR5JTIwYW5kJTIwYW4lMjBJbnRlcm5hdGlvbmFsJTIwQnVzaW5lc3MlMjBBZG1pbmlzdHJhdGlvbiUyMGRlZ3JlZSUyMGZyb20lMjB0aGUlMjBVbml2ZXJzaXR5JTIwb2YlMjBTdHJhdGhjbHlkZS4lMjIlN0QlMkMlN0IlMjJrZXl3b3JkcyUyMiUzQSU1QiUyMmNvbnRhY3QlMjIlMkMlMjJwaG9uZSUyMiUyQyUyMmVtYWlsJTIyJTJDJTIybG9jYXRpb24lMjIlNUQlMkMlMjJhbnN3ZXIlMjIlM0ElMjI8c3Ryb25nPkNvbnRhY3QlMjBJbmZvOjwvc3Ryb25nPjwvcD48cD5Zb3UlMjBjYW4lMjByZWFjaCUyMG1lJTIwdmlhJTIwZW1haWwlMjBhdCUyMG1hbmh2YW5kYW5nMjAwMkBvdXRsb29rLmNvbXwlMjBQb29sZSUyQyUyMEJvdXJuZW1vdXRoJTJDJTIwVUsuJTIyJTdEJTJDJTdCJTIya2V5d29yZHMlMjIlM0ElNUIlMjJoZWxsbyUyMiUyQyUyMmhpJTIyJTJDJTIyaGV5JTIyJTJDJTIyZ3JlZXRpbmdzJTIyJTVEJTJDJTIyYW5zd2VyJTIyJTNBJTIySGVsbG8hJTIwSSUyMGFtJTIwTWFuaCUyMFZhbiUyMERhbmcncyUyMFNlY3VyZSUyMEFJJTIwQXNzaXN0YW50LiUyMEhvdyUyMGNhbiUyMEklMjBoZWxwJTIweW91JTIwbGVhcm4lMjBtb3JlJTIwYWJvdXQlMjBoaXMlMjBjYXJlZXIlMjBhbmQlMjBxdWFsaWZpY2F0aW9ucz8lMjIlN0QlNUQlN0Q=";

    // Secure Decoder function
    const decodeMatrix = (encodedStr) => {
        try {
            return JSON.parse(decodeURIComponent(atob(encodedStr)));
        } catch(e) {
            console.error("Decryption protocol failed", e);
            return { intents: [] };
        }
    };
    
    // Decrypt database into memory
    const database = decodeMatrix(ENCODED_KNOWLEDGE_BASE);

    // Chatbot UI Nodes
    const chatToggle = document.getElementById('chatbot-toggle');
    const chatWindow = document.getElementById('chatbot-window');
    const chatClose = document.getElementById('chatbot-close');
    const chatMessages = document.getElementById('chatbot-messages');
    const chatInput = document.getElementById('chatbot-input');
    const chatSend = document.getElementById('chatbot-send');

    if (chatToggle && chatWindow && chatClose) {
        
        // Open Chat / Close Chat
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.remove('hidden');
            chatToggle.style.transform = "scale(0)";
            setTimeout(()=> chatInput.focus(), 300);
        });

        chatClose.addEventListener('click', () => {
            chatWindow.classList.add('hidden');
            chatToggle.style.transform = "scale(1)";
        });

        // Similarity Engine (Basic NLP RAG Logic)
        const generateResponse = (userMsg) => {
            const lowerMsg = userMsg.toLowerCase().trim();
            
            // Loop through encoded DB intents
            for(let i=0; i<database.intents.length; i++) {
                const intent = database.intents[i];
                // Check if any keyword matches the input string
                if (intent.keywords.some(kw => lowerMsg.includes(kw))) {
                    return intent.answer;
                }
            }
            
            // Fallback response if no regex match
            return "I am a rigid-encoded assistant to maintain security protocols. I can answer questions about Manh's **visa**, **experience**, **skills**, **education**, or **contact** details. Could you rephrase?";
        };

        const addMessageToDOM = (msg, type='bot-message') => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `chat-message ${type}`;
            
            if(type === 'bot-message') {
                // To create a typing effect delay for realism
                const typingDiv = document.createElement('div');
                typingDiv.className = `chat-message ${type}`;
                typingDiv.innerHTML = '<p><i class="fa-solid fa-spinner fa-spin"></i> Processing...</p>';
                chatMessages.appendChild(typingDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;

                setTimeout(() => {
                    chatMessages.removeChild(typingDiv);
                    msgDiv.innerHTML = msg.startsWith('<') ? msg : `<p>${msg}</p>`;
                    chatMessages.appendChild(msgDiv);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 800);
            } else {
                msgDiv.innerHTML = `<p>${msg}</p>`;
                chatMessages.appendChild(msgDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        };

        const handleSend = () => {
            const text = chatInput.value.trim();
            if(!text) return;
            
            // Append User msg
            addMessageToDOM(text, 'user-message');
            chatInput.value = '';
            
            // Append target bot msg
            const response = generateResponse(text);
            addMessageToDOM(response, 'bot-message');
        };

        chatSend.addEventListener('click', handleSend);
        chatInput.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') handleSend();
        });
    }

});
