// Sample Data - Replace with Google Sheets API integration
const sampleData = {
    metrics: {
        drafts: 3,
        editing: 2,
        scheduled: 4,
        socialPosts: 6
    },
    calendar: generateCalendar(),
    pipeline: [
        { title: "Interview: New Jazz Phenom", stage: "draft" },
        { title: "Festival Recap", stage: "editing" },
        { title: "Album Review: Midnight Waves", stage: "scheduled" }
    ],
    socialQueue: [
        { platform: "instagram", content: "Album Art Preview", scheduled: "2023-08-15" },
        { platform: "tiktok", content: "Artist Studio Tour", scheduled: "2023-08-16" }
    ]
};

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
    loadMetrics();
    loadCalendar();
    loadPipeline();
    loadSocialQueue();
});

function loadMetrics() {
    const metricsGrid = document.getElementById('metrics-grid');
    metricsGrid.innerHTML = Object.entries(sampleData.metrics)
        .map(([key, value]) => `
            <div class="metric-card">
                <div class="metric-value">${value}</div>
                <div class="metric-label">${key.replace(/([A-Z])/g, ' $1').toLowerCase()}</div>
            </div>
        `).join('');
}

// Add more JS functions for calendar, pipeline, etc.

// Google Sheets Integration Example
async function syncWithSheets() {
    try {
        const response = await fetch('YOUR_GOOGLE_SHEETS_API_ENDPOINT');
        const data = await response.json();
        updateDashboard(data);
    } catch (error) {
        console.error('Sync failed:', error);
    }
}

document.getElementById('sync-button').addEventListener('click', syncWithSheets);
