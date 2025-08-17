// Global variables
let map;
let markers = [];
let filteredCourts = [...pickleballCourts];

// DOM elements
let searchInput;
let districtFilter;
let courtsFilter;
let statusFilter;
let resetFiltersBtn;
let clearSearchBtn;
let listViewBtn;
let mapViewBtn;
let listView;
let mapView;
let facilitiesList;
let noResults;
let resultsCount;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeFilters();
    initializeEventListeners();
    initializeMap();
    displayFacilities(filteredCourts);
    updateResultsCount();
});

// Initialize DOM elements
function initializeElements() {
    searchInput = document.getElementById('searchInput');
    districtFilter = document.getElementById('districtFilter');
    courtsFilter = document.getElementById('courtsFilter');
    statusFilter = document.getElementById('statusFilter');
    resetFiltersBtn = document.getElementById('resetFilters');
    clearSearchBtn = document.getElementById('clearSearch');
    listViewBtn = document.getElementById('listViewBtn');
    mapViewBtn = document.getElementById('mapViewBtn');
    listView = document.getElementById('listView');
    mapView = document.getElementById('mapView');
    facilitiesList = document.getElementById('facilitiesList');
    noResults = document.getElementById('noResults');
    resultsCount = document.getElementById('resultsCount');
}

// Initialize filters with unique values from data
function initializeFilters() {
    // Populate district filter
    const districts = [...new Set(pickleballCourts.map(court => court.District))].sort();
    districts.forEach(district => {
        const option = document.createElement('option');
        option.value = district;
        option.textContent = district;
        districtFilter.appendChild(option);
    });
}

// Initialize event listeners
function initializeEventListeners() {
    // Search input
    searchInput.addEventListener('input', handleSearch);
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Filters
    districtFilter.addEventListener('change', handleFilters);
    courtsFilter.addEventListener('change', handleFilters);
    statusFilter.addEventListener('change', handleFilters);
    resetFiltersBtn.addEventListener('click', resetFilters);
    
    // View toggle
    listViewBtn.addEventListener('click', () => switchView('list'));
    mapViewBtn.addEventListener('click', () => switchView('map'));
}

// Handle search functionality
function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    // Show/hide clear button
    clearSearchBtn.style.display = query ? 'block' : 'none';
    
    applyFilters();
}

// Clear search
function clearSearch() {
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    applyFilters();
}

// Handle all filters
function handleFilters() {
    applyFilters();
}

// Apply all filters and search
function applyFilters() {
    const searchQuery = searchInput.value.toLowerCase().trim();
    const selectedDistrict = districtFilter.value;
    const selectedCourts = courtsFilter.value;
    const selectedStatus = statusFilter.value;
    
    filteredCourts = pickleballCourts.filter(court => {
        // Search filter
        const matchesSearch = !searchQuery || 
            court['Facility Name'].toLowerCase().includes(searchQuery) ||
            court.District.toLowerCase().includes(searchQuery) ||
            court['Additional Information'].toLowerCase().includes(searchQuery) ||
            court['Full Address'].toLowerCase().includes(searchQuery);
        
        // District filter
        const matchesDistrict = !selectedDistrict || court.District === selectedDistrict;
        
        // Courts filter
        const courtCount = parseInt(court['Number of Courts']);
        const matchesCourts = !selectedCourts || 
            (selectedCourts === '1' && courtCount === 1) ||
            (selectedCourts === '2' && courtCount === 2) ||
            (selectedCourts === '4' && courtCount >= 4) ||
            (selectedCourts === '8' && courtCount >= 8);
        
        // Status filter
        const matchesStatus = !selectedStatus || checkOperatingStatus(court) === selectedStatus;
        
        return matchesSearch && matchesDistrict && matchesCourts && matchesStatus;
    });
    
    displayFacilities(filteredCourts);
    updateMapMarkers();
    updateResultsCount();
}

// Reset all filters
function resetFilters() {
    searchInput.value = '';
    districtFilter.value = '';
    courtsFilter.value = '';
    statusFilter.value = '';
    clearSearchBtn.style.display = 'none';
    
    filteredCourts = [...pickleballCourts];
    displayFacilities(filteredCourts);
    updateMapMarkers();
    updateResultsCount();
}

// Switch between list and map views
function switchView(view) {
    if (view === 'list') {
        listViewBtn.classList.add('active');
        mapViewBtn.classList.remove('active');
        listView.classList.add('active');
        mapView.classList.remove('active');
    } else {
        listViewBtn.classList.remove('active');
        mapViewBtn.classList.add('active');
        listView.classList.remove('active');
        mapView.classList.add('active');
        
        // Invalidate map size when switching to map view
        setTimeout(() => {
            if (map) {
                map.invalidateSize();
            }
        }, 100);
    }
}

// Display facilities in list view
function displayFacilities(courts) {
    facilitiesList.innerHTML = '';
    
    if (courts.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    courts.forEach(court => {
        const facilityCard = createFacilityCard(court);
        facilitiesList.appendChild(facilityCard);
    });
}

// Create facility card HTML
function createFacilityCard(court) {
    const card = document.createElement('div');
    card.className = 'facility-card';
    
    const operatingHours = parseOperatingHours(court['Operating Hours']);
    const currentStatus = checkOperatingStatus(court);
    const services = parseAdditionalInfo(court['Additional Information']);
    
    card.innerHTML = `
        <div class="facility-header">
            <h2 class="facility-name">${escapeHtml(court['Facility Name'])}</h2>
            <span class="facility-district">${escapeHtml(court.District)}</span>
        </div>
        
        <div class="facility-body">
            <div class="facility-info">
                <div class="info-item">
                    <i class="fas fa-map-marker-alt info-icon"></i>
                    <div class="info-content">
                        <span class="info-label">Morada</span>
                        <div class="info-text">${escapeHtml(court['Full Address'])}</div>
                    </div>
                </div>
                
                <div class="info-item">
                    <i class="fas fa-phone info-icon"></i>
                    <div class="info-content">
                        <span class="info-label">Telefone</span>
                        <div class="info-text">
                            <a href="tel:${court.Phone}">${escapeHtml(court.Phone)}</a>
                        </div>
                    </div>
                </div>
                
                ${court.Email ? `
                <div class="info-item">
                    <i class="fas fa-envelope info-icon"></i>
                    <div class="info-content">
                        <span class="info-label">Email</span>
                        <div class="info-text">
                            <a href="mailto:${court.Email}">${escapeHtml(court.Email)}</a>
                        </div>
                    </div>
                </div>
                ` : ''}
                
                ${court.Website ? `
                <div class="info-item">
                    <i class="fas fa-globe info-icon"></i>
                    <div class="info-content">
                        <span class="info-label">Website</span>
                        <div class="info-text">
                            <a href="${court.Website}" target="_blank" rel="noopener noreferrer">Visitar website</a>
                        </div>
                    </div>
                </div>
                ` : ''}
                
                <div class="info-item">
                    <i class="fas fa-layer-group info-icon"></i>
                    <div class="info-content">
                        <span class="info-label">Número de Campos</span>
                        <div class="info-text">
                            ${court['Number of Courts']} ${parseInt(court['Number of Courts']) === 1 ? 'campo' : 'campos'}
                        </div>
                    </div>
                </div>
            </div>
            
            ${operatingHours ? `
            <div class="operating-hours">
                <h4 class="hours-title">
                    <i class="fas fa-clock"></i>
                    Horário de Funcionamento
                    <span class="status-indicator ${currentStatus === 'open' ? 'status-open' : 'status-closed'}">
                        ${currentStatus === 'open' ? 'Aberto' : 'Fechado'}
                    </span>
                </h4>
                <div class="hours-list">
                    ${formatOperatingHours(operatingHours, currentStatus)}
                </div>
            </div>
            ` : ''}
            
            ${services.length > 0 ? `
            <div class="additional-info">
                <span class="info-label">Serviços Adicionais</span>
                <div class="services-list">
                    ${services.map(service => `<span class="service-tag">${escapeHtml(service)}</span>`).join('')}
                </div>
            </div>
            ` : ''}
        </div>
    `;
    
    return card;
}

// Parse operating hours from JSON string
function parseOperatingHours(hoursString) {
    if (!hoursString) return null;
    
    try {
        return JSON.parse(hoursString);
    } catch (e) {
        console.warn('Failed to parse operating hours:', hoursString);
        return null;
    }
}

// Format operating hours for display
function formatOperatingHours(hours, currentStatus) {
    const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dayNames = {
        'Monday': 'Segunda-feira',
        'Tuesday': 'Terça-feira',
        'Wednesday': 'Quarta-feira',
        'Thursday': 'Quinta-feira',
        'Friday': 'Sexta-feira',
        'Saturday': 'Sábado',
        'Sunday': 'Domingo'
    };
    
    const today = new Date().getDay();
    const todayName = daysOrder[today === 0 ? 6 : today - 1]; // Convert Sunday=0 to Sunday=6
    
    return daysOrder.map(day => {
        const dayHours = hours[day] || 'Fechado';
        const isToday = day === todayName;
        const isClosed = dayHours === 'Closed' || dayHours === 'Fechado';
        
        return `
            <div class="hour-item">
                <span class="day-name">${dayNames[day]}${isToday ? ' (hoje)' : ''}</span>
                <span class="day-hours ${isToday && currentStatus === 'open' ? 'open-now' : ''} ${isClosed ? 'closed' : ''}">
                    ${formatHours(dayHours)}
                </span>
            </div>
        `;
    }).join('');
}

// Format individual hours
function formatHours(hours) {
    if (hours === 'Closed' || hours === 'Fechado') {
        return 'Fechado';
    }
    
    if (hours === 'Open 24 hours' || hours === '12am-12am') {
        return '24 horas';
    }
    
    // Convert AM/PM format to 24-hour format
    return convertTo24HourFormat(hours);
}

// Convert AM/PM time format to 24-hour format
function convertTo24HourFormat(timeString) {
    if (!timeString || timeString === 'Closed' || timeString === 'Fechado') {
        return timeString;
    }
    
    // Handle multiple time ranges separated by commas
    const ranges = timeString.split(',').map(range => range.trim());
    const convertedRanges = ranges.map(range => {
        // Split the range by dash
        const parts = range.split('-');
        if (parts.length !== 2) return range;
        
        const startTime = convertSingleTime(parts[0].trim());
        const endTime = convertSingleTime(parts[1].trim());
        
        return `${startTime}-${endTime}`;
    });
    
    return convertedRanges.join(', ');
}

// Convert a single time from AM/PM to 24-hour format
function convertSingleTime(timeStr) {
    if (!timeStr) return timeStr;
    
    // Match time patterns like "9am", "12:30pm", "10:45am"
    const match = timeStr.match(/(\d+)(?::(\d+))?(am|pm)/i);
    if (!match) return timeStr;
    
    let hours = parseInt(match[1]);
    const minutes = match[2] ? match[2] : '00';
    const period = match[3].toLowerCase();
    
    // Convert to 24-hour format
    if (period === 'pm' && hours !== 12) {
        hours += 12;
    } else if (period === 'am' && hours === 12) {
        hours = 0;
    }
    
    // Format with leading zero if needed
    const formattedHours = hours.toString().padStart(2, '0');
    
    return `${formattedHours}:${minutes}`;
}

// Check if facility is currently open
function checkOperatingStatus(court) {
    const hours = parseOperatingHours(court['Operating Hours']);
    if (!hours) return 'unknown';
    
    const now = new Date();
    const today = now.getDay();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const daysOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayName = daysOrder[today];
    const todayHours = hours[todayName];
    
    if (!todayHours || todayHours === 'Closed' || todayHours === 'Fechado') {
        return 'closed';
    }
    
    if (todayHours === 'Open 24 hours' || todayHours === '12am-12am') {
        return 'open';
    }
    
    // Parse time ranges (e.g., "9am-12pm, 4pm-8pm")
    const timeRanges = todayHours.split(',').map(range => range.trim());
    
    for (const range of timeRanges) {
        const [start, end] = range.split('-').map(time => time.trim());
        const startMinutes = parseTime(start);
        const endMinutes = parseTime(end);
        
        if (startMinutes !== null && endMinutes !== null) {
            if (currentTime >= startMinutes && currentTime <= endMinutes) {
                return 'open';
            }
        }
    }
    
    return 'closed';
}

// Parse time string to minutes
function parseTime(timeStr) {
    if (!timeStr) return null;
    
    const match = timeStr.match(/(\d+)(?::(\d+))?(am|pm)/i);
    if (!match) return null;
    
    let hours = parseInt(match[1]);
    const minutes = parseInt(match[2]) || 0;
    const period = match[3].toLowerCase();
    
    if (period === 'pm' && hours !== 12) {
        hours += 12;
    } else if (period === 'am' && hours === 12) {
        hours = 0;
    }
    
    return hours * 60 + minutes;
}

// Parse additional information into services array
function parseAdditionalInfo(info) {
    if (!info) return [];
    
    // Split by common separators and clean up
    return info.split(/[,;]/)
        .map(service => service.trim())
        .filter(service => service.length > 0)
        .slice(0, 8); // Limit to 8 services to avoid overcrowding
}

// Update results count
function updateResultsCount() {
    resultsCount.textContent = filteredCourts.length;
}

// Initialize Leaflet map
function initializeMap() {
    // Initialize map without specific view - we'll fit to markers
    map = L.map('map').setView([39.5, -8.0], 7);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add initial markers and fit view
    updateMapMarkers();
}

// Update map markers based on filtered courts
function updateMapMarkers() {
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    // Add markers for filtered courts
    filteredCourts.forEach(court => {
        const lat = parseFloat(court.Latitude);
        const lng = parseFloat(court.Longitude);
        
        if (lat && lng) {
            const marker = L.marker([lat, lng]).addTo(map);
            
            const popupContent = createMapPopupContent(court);
            marker.bindPopup(popupContent);
            
            markers.push(marker);
        }
    });
    
    // Adjust map view to fit all markers
    if (markers.length > 0) {
        const group = new L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.05), {
            maxZoom: 12 // Prevent zooming in too much for single markers
        });
    } else {
        // Fallback to Portugal view if no markers
        map.setView([39.5, -8.0], 7);
    }
}

// Create popup content for map markers
function createMapPopupContent(court) {
    const status = checkOperatingStatus(court);
    
    return `
        <div class="popup-content">
            <h3 class="popup-title">${escapeHtml(court['Facility Name'])}</h3>
            <span class="popup-district">${escapeHtml(court.District)}</span>
            
            <div class="popup-info">
                <div class="popup-info-item">
                    <i class="fas fa-map-marker-alt popup-icon"></i>
                    <span>${escapeHtml(court['Full Address'])}</span>
                </div>
                
                <div class="popup-info-item">
                    <i class="fas fa-phone popup-icon"></i>
                    <a href="tel:${court.Phone}">${escapeHtml(court.Phone)}</a>
                </div>
                
                <div class="popup-info-item">
                    <i class="fas fa-layer-group popup-icon"></i>
                    <span>${court['Number of Courts']} ${parseInt(court['Number of Courts']) === 1 ? 'campo' : 'campos'}</span>
                </div>
                
                <div class="popup-info-item">
                    <i class="fas fa-clock popup-icon"></i>
                    <span class="${status === 'open' ? 'status-open' : 'status-closed'}">
                        ${status === 'open' ? 'Aberto agora' : 'Fechado agora'}
                    </span>
                </div>
                
                ${court.Website ? `
                <div class="popup-info-item">
                    <i class="fas fa-globe popup-icon"></i>
                    <a href="${court.Website}" target="_blank" rel="noopener noreferrer">Website</a>
                </div>
                ` : ''}
            </div>
        </div>
    `;
}

// Utility function to escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Handle window resize for map
window.addEventListener('resize', function() {
    if (map && mapView.classList.contains('active')) {
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }
});
