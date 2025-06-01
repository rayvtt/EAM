// Data management
let articlesData = [
    {"Article_ID": "ESQ-MUS-2025-001", "Title": "The Revival of Vinyl: Why Gen Z is Embracing Analog", "Type": "Feature Story", "Author": "Sarah Chen", "Status": "Draft", "Priority_Score": 85.0, "Due_Date": "2025-06-15", "Word_Count_Target": 2000, "Word_Count_Current": 1200, "Editor_Assigned": "Mark Rodriguez", "Publication_Date": "2025-06-25", "Social_Media_Planned": "Yes", "Visual_Assets": "Available", "Notes": "Strong cultural angle, good social potential"},
    {"Article_ID": "ESQ-MUS-2025-002", "Title": "Exclusive: Taylor Swift's Secret Studio Sessions", "Type": "Artist Interview", "Author": "David Park", "Status": "Review", "Priority_Score": 95.0, "Due_Date": "2025-06-10", "Word_Count_Target": 1500, "Word_Count_Current": 1500, "Editor_Assigned": "Lisa Thompson", "Publication_Date": "2025-06-20", "Social_Media_Planned": "Yes", "Visual_Assets": "Available", "Notes": "Exclusive content, high engagement expected"},
    {"Article_ID": "ESQ-MUS-2025-003", "Title": "Coachella 2025: The Good, Bad, and Overhyped", "Type": "Live Performance Review", "Author": "James Wilson", "Status": "Final", "Priority_Score": 78.0, "Due_Date": "2025-06-05", "Word_Count_Target": 1200, "Word_Count_Current": 1200, "Editor_Assigned": "Mark Rodriguez", "Publication_Date": "2025-06-12", "Social_Media_Planned": "Yes", "Visual_Assets": "Available", "Notes": "Timely festival coverage"},
    {"Article_ID": "ESQ-MUS-2025-004", "Title": "The Rise of AI in Music Production", "Type": "Industry Trends", "Author": "Maria Garcia", "Status": "Assigned", "Priority_Score": 72.0, "Due_Date": "2025-06-20", "Word_Count_Target": 1800, "Word_Count_Current": 400, "Editor_Assigned": "Lisa Thompson", "Publication_Date": "2025-06-30", "Social_Media_Planned": "No", "Visual_Assets": "Needed", "Notes": "Tech angle, need expert interviews"},
    {"Article_ID": "ESQ-MUS-2025-005", "Title": "Bad Bunny's Latest Album: A Track-by-Track Review", "Type": "Album Review", "Author": "Carlos Mendez", "Status": "Published", "Priority_Score": 88.0, "Due_Date": "2025-05-28", "Word_Count_Target": 1000, "Word_Count_Current": 1000, "Editor_Assigned": "Mark Rodriguez", "Publication_Date": "2025-06-01", "Social_Media_Planned": "Yes", "Visual_Assets": "Available", "Notes": "Published successfully, good engagement"}
];

let socialMediaData = [
    {"Date": "2025-06-02", "Day_of_Week": "Monday", "Platform": "Instagram", "Content_Type": "Instagram Post", "Related_Article_ID": "ESQ-MUS-2025-001", "Content_Title": "Vinyl Revival Teaser", "Caption_Draft": "Why Gen Z is choosing records over streams 🎵 Full story link in bio", "Hashtags": "#EsquireMusic #Vinyl #GenZ #Music", "Status": "Scheduled", "Engagement_Target": "High", "Creator_Assigned": "Social Team A", "Visual_Status": "Ready", "Performance_Notes": ""},
    {"Date": "2025-06-04", "Day_of_Week": "Wednesday", "Platform": "TikTok", "Content_Type": "TikTok Video", "Related_Article_ID": "ESQ-MUS-2025-002", "Content_Title": "Taylor Swift Studio Secrets", "Caption_Draft": "Behind the scenes of Taylor's latest recording sessions ✨", "Hashtags": "#TaylorSwift #EsquireMusic #StudioSecrets", "Status": "Created", "Engagement_Target": "High", "Creator_Assigned": "Social Team B", "Visual_Status": "Ready", "Performance_Notes": ""},
    {"Date": "2025-06-06", "Day_of_Week": "Friday", "Platform": "Instagram", "Content_Type": "Instagram Reel", "Related_Article_ID": "ESQ-MUS-2025-003", "Content_Title": "Coachella Highlights", "Caption_Draft": "Best moments from Coachella 2025 🌴 What was your favorite set?", "Hashtags": "#Coachella #EsquireMusic #Festival #Music", "Status": "Planning", "Engagement_Target": "High", "Creator_Assigned": "Social Team A", "Visual_Status": "In Progress", "Performance_Notes": ""}
];

let editorialCalendarData = [
    {"Month": "2025-06", "Month_Name": "June", "Theme": "Summer Music Festival Season", "Feature_Articles_Planned": 4, "Reviews_Target": 8, "Interviews_Target": 3, "Social_Posts_Target": 24, "Key_Releases": "New albums from major artists", "Special_Projects": "Festival coverage special", "Deadlines": "June 25th for July issue"},
    {"Month": "2025-07", "Month_Name": "July", "Theme": "Mid-Year Music Roundup", "Feature_Articles_Planned": 5, "Reviews_Target": 10, "Interviews_Target": 4, "Social_Posts_Target": 24, "Key_Releases": "Summer hits compilation", "Special_Projects": "Best Albums So Far list", "Deadlines": "July 25th for August issue"},
    {"Month": "2025-08", "Month_Name": "August", "Theme": "Fall Album Preview", "Feature_Articles_Planned": 4, "Reviews_Target": 8, "Interviews_Target": 3, "Social_Posts_Target": 24, "Key_Releases": "Fall release previews", "Special_Projects": "Emerging artists spotlight", "Deadlines": "August 25th for September issue"}
];

const articleTypes = ["Album Review", "Artist Interview", "Live Performance Review", "Music News/Breaking", "Feature Story", "Cultural Analysis", "Industry Trends", "Best Of Lists", "Emerging Artist Spotlight", "Music History/Retrospective"];
const socialContentTypes = ["Instagram Story", "Instagram Post", "Instagram Reel", "TikTok Video", "Cross-Platform Promotion"];
const rankingCriteria = ["Timeliness/Relevance", "Cultural Impact", "Esquire Brand Fit", "Social Media Potential", "Exclusivity", "Artist Prominence", "Writing Quality", "Visual Assets Available"];

// Global state
let currentTab = 'pipeline';
let currentSort = { column: null, direction: 'asc' };
let currentFilters = {};
let editingArticle = null;
let editingSocial = null;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    setupTabNavigation();
    populateDropdowns();
    renderCurrentTab();
    initializeAnalytics();
}

function setupEventListeners() {
    // Tab navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', handleTabSwitch);
    });

    // Search functionality with enhanced Enter key support
    const searchInput = document.getElementById('global-search');
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    });

    // Modal controls
    document.getElementById('add-article-btn').addEventListener('click', () => openArticleModal());
    document.getElementById('close-modal').addEventListener('click', closeArticleModal);
    document.getElementById('save-btn').addEventListener('click', saveArticle);
    document.getElementById('cancel-btn').addEventListener('click', closeArticleModal);

    // Social media modal
    document.getElementById('add-instagram-btn').addEventListener('click', () => openSocialModal('Instagram'));
    document.getElementById('add-tiktok-btn').addEventListener('click', () => openSocialModal('TikTok'));
    document.getElementById('close-social-modal').addEventListener('click', closeSocialModal);
    document.getElementById('save-social-btn').addEventListener('click', saveSocialPost);
    document.getElementById('cancel-social-btn').addEventListener('click', closeSocialModal);

    // Export functionality
    document.getElementById('export-btn').addEventListener('click', exportData);
    document.getElementById('export-analytics-btn').addEventListener('click', exportAnalytics);

    // Close modals on backdrop click
    document.querySelector('#article-modal .modal__backdrop').addEventListener('click', closeArticleModal);
    document.querySelector('#social-modal .modal__backdrop').addEventListener('click', closeSocialModal);
}

function setupTabNavigation() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    // Update active tab button
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('tab-btn--active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('tab-btn--active');

    // Update active tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('tab-content--active');
    });
    document.getElementById(`${tabName}-content`).classList.add('tab-content--active');

    currentTab = tabName;
    renderCurrentTab();
}

function renderCurrentTab() {
    switch(currentTab) {
        case 'pipeline':
            renderArticlesPipeline();
            break;
        case 'social':
            renderSocialCalendar();
            break;
        case 'editorial':
            renderEditorialCalendar();
            break;
        case 'ranking':
            renderRankingDashboard();
            break;
        case 'analytics':
            renderAnalytics();
            break;
    }
}

// Article Pipeline Functions
function renderArticlesPipeline() {
    const tbody = document.getElementById('articles-tbody');
    tbody.innerHTML = '';

    let filteredArticles = filterArticles(articlesData);
    
    filteredArticles.forEach(article => {
        const row = createArticleRow(article);
        tbody.appendChild(row);
    });

    // Setup table sorting
    setupTableSorting();
}

function createArticleRow(article) {
    const row = document.createElement('tr');
    
    const wordProgress = Math.round((article.Word_Count_Current / article.Word_Count_Target) * 100);
    const dueDate = new Date(article.Due_Date);
    const today = new Date();
    const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    
    let dueDateClass = 'due-date--on-track';
    if (daysUntilDue < 0) dueDateClass = 'due-date--overdue';
    else if (daysUntilDue <= 3) dueDateClass = 'due-date--due-soon';

    let priorityClass = 'priority-score--low';
    if (article.Priority_Score >= 90) priorityClass = 'priority-score--high';
    else if (article.Priority_Score >= 75) priorityClass = 'priority-score--medium';

    row.innerHTML = `
        <td>${article.Article_ID}</td>
        <td><strong>${article.Title}</strong></td>
        <td>${article.Type}</td>
        <td>${article.Author}</td>
        <td><span class="status-badge status-badge--${article.Status.toLowerCase()}">${article.Status}</span></td>
        <td><span class="priority-score ${priorityClass}">${article.Priority_Score}</span></td>
        <td><span class="due-date ${dueDateClass}">${formatDate(article.Due_Date)}</span></td>
        <td>
            <div class="word-progress">
                <div class="progress-bar">
                    <div class="progress-fill ${wordProgress >= 100 ? 'progress-fill--complete' : ''}" style="width: ${Math.min(wordProgress, 100)}%"></div>
                </div>
                <span class="word-progress__text">${article.Word_Count_Current}/${article.Word_Count_Target}</span>
            </div>
        </td>
        <td>${article.Editor_Assigned}</td>
        <td>${formatDate(article.Publication_Date)}</td>
        <td><span class="status ${article.Social_Media_Planned === 'Yes' ? 'status--success' : 'status--error'}">${article.Social_Media_Planned}</span></td>
        <td>
            <button class="action-btn action-btn--edit" onclick="editArticle('${article.Article_ID}')">✏️</button>
            <button class="action-btn action-btn--delete" onclick="deleteArticle('${article.Article_ID}')">🗑️</button>
        </td>
    `;
    
    return row;
}

function setupTableSorting() {
    document.querySelectorAll('[data-sort]').forEach(header => {
        header.addEventListener('click', function() {
            const column = this.dataset.sort;
            sortTable(column);
        });
    });
}

function sortTable(column) {
    if (currentSort.column === column) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.column = column;
        currentSort.direction = 'asc';
    }

    articlesData.sort((a, b) => {
        let aVal = a[column];
        let bVal = b[column];
        
        if (column === 'Word_Count_Progress') {
            aVal = a.Word_Count_Current / a.Word_Count_Target;
            bVal = b.Word_Count_Current / b.Word_Count_Target;
        }
        
        if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
        }
        
        if (currentSort.direction === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });

    renderArticlesPipeline();
}

// Social Media Calendar Functions
function renderSocialCalendar() {
    const calendarContainer = document.getElementById('social-calendar');
    calendarContainer.innerHTML = '';

    // Generate calendar for current month (June 2025)
    const startDate = new Date(2025, 5, 1); // June 1, 2025
    const endDate = new Date(2025, 5, 30);  // June 30, 2025
    
    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-day__header';
        header.textContent = day;
        calendarContainer.appendChild(header);
    });

    // Add days
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dayElement = createCalendarDay(new Date(d));
        calendarContainer.appendChild(dayElement);
    }
}

function createCalendarDay(date) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    
    if (date.getDay() === 0 || date.getDay() === 6) {
        dayElement.classList.add('calendar-day--weekend');
    }

    const dateStr = date.toISOString().split('T')[0];
    const socialPosts = socialMediaData.filter(post => post.Date === dateStr);

    dayElement.innerHTML = `
        <div class="calendar-day__header">${date.getDate()}</div>
        <div class="social-posts">
            ${socialPosts.map(post => `
                <div class="social-post social-post--${post.Platform.toLowerCase()}">
                    <div class="social-post__platform">${post.Platform}</div>
                    <div class="social-post__title">${post.Content_Title}</div>
                </div>
            `).join('')}
        </div>
    `;

    return dayElement;
}

// Editorial Calendar Functions
function renderEditorialCalendar() {
    const monthCards = document.getElementById('month-cards');
    monthCards.innerHTML = '';

    editorialCalendarData.forEach(month => {
        const card = createMonthCard(month);
        monthCards.appendChild(card);
    });
}

function createMonthCard(month) {
    const card = document.createElement('div');
    card.className = 'month-card';

    card.innerHTML = `
        <div class="month-card__header">
            <h4 class="month-card__title">${month.Month_Name} ${month.Month.split('-')[0]}</h4>
            <span class="month-card__theme">${month.Theme}</span>
        </div>
        <div class="month-targets">
            <div class="target-item">
                <span class="target-label">Features</span>
                <span class="target-value">${month.Feature_Articles_Planned}</span>
            </div>
            <div class="target-item">
                <span class="target-label">Reviews</span>
                <span class="target-value">${month.Reviews_Target}</span>
            </div>
            <div class="target-item">
                <span class="target-label">Interviews</span>
                <span class="target-value">${month.Interviews_Target}</span>
            </div>
            <div class="target-item">
                <span class="target-label">Social Posts</span>
                <span class="target-value">${month.Social_Posts_Target}</span>
            </div>
        </div>
        <div class="month-details">
            <p><strong>Key Releases:</strong> ${month.Key_Releases}</p>
            <p><strong>Special Projects:</strong> ${month.Special_Projects}</p>
            <p><strong>Deadline:</strong> ${month.Deadlines}</p>
        </div>
    `;

    return card;
}

// Ranking Dashboard Functions
function renderRankingDashboard() {
    renderRankingCriteria();
    renderPriorityQueue();
}

function renderRankingCriteria() {
    const criteriaList = document.getElementById('criteria-list');
    criteriaList.innerHTML = '';

    rankingCriteria.forEach(criteria => {
        const item = document.createElement('div');
        item.className = 'criteria-item';
        item.textContent = criteria;
        criteriaList.appendChild(item);
    });
}

function renderPriorityQueue() {
    const priorityQueue = document.getElementById('priority-queue');
    priorityQueue.innerHTML = '';

    const sortedArticles = [...articlesData].sort((a, b) => b.Priority_Score - a.Priority_Score);

    sortedArticles.forEach(article => {
        const item = createRankingItem(article);
        priorityQueue.appendChild(item);
    });
}

function createRankingItem(article) {
    const item = document.createElement('div');
    item.className = 'ranking-item';
    item.dataset.articleId = article.Article_ID;

    item.innerHTML = `
        <div class="ranking-item__header">
            <span class="ranking-item__title">${article.Title}</span>
            <span class="ranking-item__score">${article.Priority_Score}</span>
        </div>
        <div class="ranking-item__meta">
            <span>📝 ${article.Type}</span>
            <span>👤 ${article.Author}</span>
            <span>📅 ${formatDate(article.Due_Date)}</span>
            <span class="status-badge status-badge--${article.Status.toLowerCase()}">${article.Status}</span>
        </div>
    `;

    return item;
}

// Analytics Functions
function initializeAnalytics() {
    // This will be called when analytics tab is first opened
}

function renderAnalytics() {
    updateKPIs();
    renderStatusChart();
    renderMonthlyProgressChart();
    renderSocialEngagementChart();
}

function updateKPIs() {
    document.getElementById('total-articles').textContent = articlesData.length;
    document.getElementById('published-articles').textContent = 
        articlesData.filter(a => a.Status === 'Published').length;
    
    const avgPriority = articlesData.reduce((sum, a) => sum + a.Priority_Score, 0) / articlesData.length;
    document.getElementById('avg-priority').textContent = Math.round(avgPriority);
    
    const socialCoverage = (articlesData.filter(a => a.Social_Media_Planned === 'Yes').length / articlesData.length) * 100;
    document.getElementById('social-coverage').textContent = Math.round(socialCoverage) + '%';
}

function renderStatusChart() {
    const ctx = document.getElementById('status-chart').getContext('2d');
    const statusCounts = getStatusCounts();
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(statusCounts),
            datasets: [{
                data: Object.values(statusCounts),
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Articles by Status'
                }
            }
        }
    });
}

function renderMonthlyProgressChart() {
    const ctx = document.getElementById('monthly-progress-chart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['June', 'July', 'August'],
            datasets: [{
                label: 'Target',
                data: [24, 24, 24],
                backgroundColor: '#FFC185'
            }, {
                label: 'Actual',
                data: [18, 0, 0],
                backgroundColor: '#1FB8CD'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Social Media Progress'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function renderSocialEngagementChart() {
    const ctx = document.getElementById('social-engagement-chart').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Instagram',
                data: [1200, 1500, 1800, 2100],
                borderColor: '#E4405F',
                backgroundColor: 'rgba(228, 64, 95, 0.1)'
            }, {
                label: 'TikTok',
                data: [800, 1200, 1600, 2000],
                borderColor: '#000000',
                backgroundColor: 'rgba(0, 0, 0, 0.1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Social Media Engagement Trends'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Modal Functions
function openArticleModal(articleId = null) {
    editingArticle = articleId;
    const modal = document.getElementById('article-modal');
    const form = document.getElementById('article-form');
    
    if (articleId) {
        const article = articlesData.find(a => a.Article_ID === articleId);
        populateArticleForm(article);
        document.getElementById('modal-title').textContent = 'Edit Article';
    } else {
        form.reset();
        document.getElementById('article-id').value = generateNewArticleId();
        document.getElementById('modal-title').textContent = 'Add New Article';
    }
    
    modal.classList.add('modal--active');
}

function closeArticleModal() {
    document.getElementById('article-modal').classList.remove('modal--active');
    editingArticle = null;
}

function saveArticle() {
    const formData = getArticleFormData();
    
    if (editingArticle) {
        const index = articlesData.findIndex(a => a.Article_ID === editingArticle);
        articlesData[index] = formData;
    } else {
        articlesData.push(formData);
    }
    
    closeArticleModal();
    renderCurrentTab();
}

function openSocialModal(platform = 'Instagram') {
    const modal = document.getElementById('social-modal');
    document.getElementById('social-platform').value = platform;
    document.getElementById('social-date').value = new Date().toISOString().split('T')[0];
    
    modal.classList.add('modal--active');
}

function closeSocialModal() {
    document.getElementById('social-modal').classList.remove('modal--active');
    editingSocial = null;
}

function saveSocialPost() {
    const formData = getSocialFormData();
    socialMediaData.push(formData);
    
    closeSocialModal();
    if (currentTab === 'social') {
        renderSocialCalendar();
    }
}

// Utility Functions
function populateDropdowns() {
    // Populate article type dropdown
    const articleTypeSelect = document.getElementById('article-type');
    articleTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        articleTypeSelect.appendChild(option);
    });

    // Populate social content type dropdown
    const socialContentSelect = document.getElementById('social-content-type');
    socialContentTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        socialContentSelect.appendChild(option);
    });

    // Populate related article dropdown for social posts
    const socialArticleSelect = document.getElementById('social-article');
    articlesData.forEach(article => {
        const option = document.createElement('option');
        option.value = article.Article_ID;
        option.textContent = article.Title;
        socialArticleSelect.appendChild(option);
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
}

function generateNewArticleId() {
    const year = new Date().getFullYear();
    const count = articlesData.length + 1;
    return `ESQ-MUS-${year}-${String(count).padStart(3, '0')}`;
}

function getStatusCounts() {
    const counts = {};
    articlesData.forEach(article => {
        counts[article.Status] = (counts[article.Status] || 0) + 1;
    });
    return counts;
}

function populateArticleForm(article) {
    document.getElementById('article-id').value = article.Article_ID;
    document.getElementById('article-title').value = article.Title;
    document.getElementById('article-type').value = article.Type;
    document.getElementById('article-author').value = article.Author;
    document.getElementById('article-status').value = article.Status;
    document.getElementById('article-priority').value = article.Priority_Score;
    document.getElementById('article-due-date').value = article.Due_Date;
    document.getElementById('article-target-words').value = article.Word_Count_Target;
    document.getElementById('article-current-words').value = article.Word_Count_Current;
    document.getElementById('article-editor').value = article.Editor_Assigned;
    document.getElementById('article-pub-date').value = article.Publication_Date;
    document.getElementById('article-social').value = article.Social_Media_Planned;
    document.getElementById('article-notes').value = article.Notes || '';
}

function getArticleFormData() {
    return {
        Article_ID: document.getElementById('article-id').value,
        Title: document.getElementById('article-title').value,
        Type: document.getElementById('article-type').value,
        Author: document.getElementById('article-author').value,
        Status: document.getElementById('article-status').value,
        Priority_Score: parseFloat(document.getElementById('article-priority').value),
        Due_Date: document.getElementById('article-due-date').value,
        Word_Count_Target: parseInt(document.getElementById('article-target-words').value),
        Word_Count_Current: parseInt(document.getElementById('article-current-words').value),
        Editor_Assigned: document.getElementById('article-editor').value,
        Publication_Date: document.getElementById('article-pub-date').value,
        Social_Media_Planned: document.getElementById('article-social').value,
        Visual_Assets: 'Available',
        Notes: document.getElementById('article-notes').value
    };
}

function getSocialFormData() {
    const date = new Date(document.getElementById('social-date').value);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    return {
        Date: document.getElementById('social-date').value,
        Day_of_Week: dayNames[date.getDay()],
        Platform: document.getElementById('social-platform').value,
        Content_Type: document.getElementById('social-content-type').value,
        Related_Article_ID: document.getElementById('social-article').value,
        Content_Title: document.getElementById('social-title').value,
        Caption_Draft: document.getElementById('social-caption').value,
        Hashtags: document.getElementById('social-hashtags').value,
        Status: 'Planning',
        Engagement_Target: 'Medium',
        Creator_Assigned: 'Social Team',
        Visual_Status: 'Needed',
        Performance_Notes: ''
    };
}

function filterArticles(articles) {
    const searchTerm = document.getElementById('global-search').value.toLowerCase();
    
    return articles.filter(article => {
        const matchesSearch = !searchTerm || 
            article.Title.toLowerCase().includes(searchTerm) ||
            article.Author.toLowerCase().includes(searchTerm) ||
            article.Type.toLowerCase().includes(searchTerm) ||
            article.Status.toLowerCase().includes(searchTerm);
        
        return matchesSearch;
    });
}

function handleSearch() {
    if (currentTab === 'pipeline') {
        renderArticlesPipeline();
    }
}

function handleTabSwitch(event) {
    const tabName = event.target.dataset.tab;
    switchTab(tabName);
}

function editArticle(articleId) {
    openArticleModal(articleId);
}

function deleteArticle(articleId) {
    if (confirm('Are you sure you want to delete this article?')) {
        const index = articlesData.findIndex(a => a.Article_ID === articleId);
        articlesData.splice(index, 1);
        renderCurrentTab();
    }
}

function exportData() {
    const data = {
        articles: articlesData,
        socialMedia: socialMediaData,
        editorialCalendar: editorialCalendarData
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'esquire-music-editorial-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

function exportAnalytics() {
    const analytics = {
        totalArticles: articlesData.length,
        publishedArticles: articlesData.filter(a => a.Status === 'Published').length,
        statusBreakdown: getStatusCounts(),
        socialCoverage: (articlesData.filter(a => a.Social_Media_Planned === 'Yes').length / articlesData.length) * 100,
        averagePriority: articlesData.reduce((sum, a) => sum + a.Priority_Score, 0) / articlesData.length,
        generatedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(analytics, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'esquire-analytics-report.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}