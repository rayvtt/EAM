// Dashboard Data Management
class EditorialDashboard {
    constructor() {
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.generateCalendar();
        this.animateMetrics();
        this.initDragAndDrop();
        this.startAutoRefresh();
    }

    setupEventListeners() {
        // Refresh button
        document.getElementById('refresh-btn').addEventListener('click', () => {
            this.refreshData();
        });

        // Calendar navigation
        document.getElementById('prev-month').addEventListener('click', () => {
            this.navigateMonth(-1);
        });

        document.getElementById('next-month').addEventListener('click', () => {
            this.navigateMonth(1);
        });

        // Platform toggles
        document.querySelectorAll('.platform-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                this.switchPlatform(e.target.closest('.platform-toggle').dataset.platform);
            });
        });
    }

    animateMetrics() {
        const metrics = [
            { id: 'articles-count', target: 12 },
            { id: 'published-count', target: 8 },
            { id: 'social-count', target: 24 },
            { id: 'deadlines-count', target: 3 }
        ];

        metrics.forEach(metric => {
            this.animateCounter(metric.id, metric.target);
        });
    }

    animateCounter(elementId, target) {
        const element = document.getElementById(elementId);
        let current = 0;
        const increment = target / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 50);
    }

    generateCalendar() {
        const calendar = document.getElementById('calendar-grid');
        const title = document.getElementById('calendar-title');
        
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        title.textContent = `${monthNames[this.currentMonth]} ${this.currentYear}`;
        
        calendar.innerHTML = '';
        
        // Add day headers
        dayNames.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            dayHeader.style.cssText = `
                padding: 0.5rem;
                background: #ecf0f1;
                font-weight: 600;
                text-align: center;
                font-size: 0.8rem;
                color: #7f8c8d;
            `;
            calendar.appendChild(dayHeader);
        });
        
        // Generate calendar days
        const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        
        // Empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            emptyDay.style.cssText = `
                padding: 1rem;
                background: white;
                min-height: 60px;
                border-right: 1px solid #ecf0f1;
                border-bottom: 1px solid #ecf0f1;
            `;
            calendar.appendChild(emptyDay);
        }
        
        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.innerHTML = `
                <div style="font-weight: 600; margin-bottom: 0.25rem;">${day}</div>
                ${this.getCalendarEvents(day)}
            `;
            dayElement.style.cssText = `
                padding: 0.5rem;
                background: white;
                min-height: 60px;
                border-right: 1px solid #ecf0f1;
                border-bottom: 1px solid #ecf0f1;
                cursor: pointer;
                transition: background 0.3s ease;
            `;
            
            // Add hover effect
            dayElement.addEventListener('mouseenter', () => {
                dayElement.style.background = '#f8f9fa';
            });
            
            dayElement.addEventListener('mouseleave', () => {
                dayElement.style.background = 'white';
            });
            
            calendar.appendChild(dayElement);
        }
    }

    getCalendarEvents(day) {
        // Sample events - replace with real data
        const events = {
            5: '<div style="font-size: 0.7rem; color: #e74c3c; background: #fee; padding: 1px 4px; border-radius: 2px; margin-top: 2px;">Deadline</div>',
            10: '<div style="font-size: 0.7rem; color: #3498db; background: #e3f2fd; padding: 1px 4px; border-radius: 2px; margin-top: 2px;">Review</div>',
            15: '<div style="font-size: 0.7rem; color: #27ae60; background: #e8f5e8; padding: 1px 4px; border-radius: 2px; margin-top: 2px;">Publish</div>'
        };
        
        return events[day] || '';
    }

    navigateMonth(direction) {
        this.currentMonth += direction;
        
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        } else if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        
        this.generateCalendar();
    }

    switchPlatform(platform) {
        document.querySelectorAll('.platform-toggle').forEach(toggle => {
            toggle.classList.remove('active');
        });
        
        document.querySelector(`[data-platform="${platform}"]`).classList.add('active');
        
        // Update social queue based on platform
        this.loadSocialQueue(platform);
    }

    loadSocialQueue(platform) {
        const queue = document.getElementById('social-queue');
        
        const platformData = {
            instagram: [
                {
                    title: 'Album Art Reveal',
                    description: 'Behind the scenes of our latest cover story',
                    time: 'Today, 3:00 PM'
                },
                {
                    title: 'Artist Interview Teaser',
                    description: 'Exclusive preview of tomorrow\'s feature',
                    time: 'Tomorrow, 10:00 AM'
                }
            ],
            tiktok: [
                {
                    title: 'Studio Session Clips',
                    description: '30-second behind-the-scenes montage',
                    time: 'Today, 6:00 PM'
                },
                {
                    title: 'Music Trend Analysis',
                    description: 'Quick breakdown of this week\'s viral sounds',
                    time: 'Tomorrow, 2:00 PM'
                }
            ]
        };

        const posts = platformData[platform] || [];
        
        queue.innerHTML = posts.map(post => `
            <div class="social-post">
                <div class="post-content">
                    <h4>${post.title}</h4>
                    <p>${post.description}</p>
                </div>
                <div class="post-schedule">
                    <span>${post.time}</span>
                    <button class="btn-edit"><i class="fas fa-edit"></i></button>
                </div>
            </div>
        `).join('');
    }

    initDragAndDrop() {
        const items = document.querySelectorAll('.pipeline-item');
        const columns = document.querySelectorAll('.pipeline-items');

        items.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', '');
                item.classList.add('dragging');
            });

            item.addEventListener('dragend', () => {
                item.classList.remove('dragging');
            });
        });

        columns.forEach(column => {
            column.addEventListener('dragover', (e) => {
                e.preventDefault();
                column.classList.add('drag-over');
            });

            column.addEventListener('dragleave', () => {
                column.classList.remove('drag-over');
            });

            column.addEventListener('drop', (e) => {
                e.preventDefault();
                column.classList.remove('drag-over');
                const dragging = document.querySelector('.dragging');
                if (dragging) {
                    column.appendChild(dragging);
                    this.updatePipelineCount();
                }
            });
        });
    }

    updatePipelineCount() {
        document.querySelectorAll('.pipeline-column').forEach(column => {
            const items = column.querySelectorAll('.pipeline-item');
            const countElement = column.querySelector('.count');
            countElement.textContent = `(${items.length})`;
        });
    }

    refreshData() {
        const button = document.getElementById('refresh-btn');
        const icon = button.querySelector('i');
        
        // Animate refresh
        icon.style.animation = 'spin 1s linear infinite';
        button.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            icon.style.animation = '';
            button.disabled = false;
            this.animateMetrics();
            
            // Update sync time
            const now = new Date();
            document.querySelector('.sync-status span').textContent = 
                `Last sync: ${now.toLocaleTimeString()}`;
        }, 1500);
    }

    startAutoRefresh() {
        // Auto-refresh every 5 minutes
        setInterval(() => {
            this.refreshData();
        }, 300000);
    }
}

// CSS for drag and drop animation
const style = document.createElement('style');
style.textContent = `
    .dragging {
        opacity: 0.5;
        transform: rotate(5deg);
    }
    
    .drag-over {
        background: #e3f2fd !important;
        border: 2px dashed #3498db !important;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .calendar-day-header {
        position: sticky;
        top: 0;
        z-index: 1;
    }
`;
document.head.appendChild(style);

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EditorialDashboard();
});

// Google Sheets API integration placeholder
async function connectToGoogleSheets() {
    // Replace with your actual Google Sheets API integration
    console.log('Connecting to Google Sheets...');
    
    try {
        // Example API call structure
        const response = await fetch('YOUR_GOOGLE_SHEETS_API_ENDPOINT');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to connect to Google Sheets:', error);
        return null;
    }
}
