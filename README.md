# Pickleball Portugal Directory

A comprehensive web-based directory for pickleball courts in Portugal, featuring interactive maps, advanced search capabilities, and detailed facility information.

## 🏓 Overview

This application helps pickleball enthusiasts discover and access information about available courts and facilities across Portugal. Built with vanilla JavaScript, HTML, and CSS, it provides an intuitive interface for browsing pickleball venues with both list and map views.

## ✨ Features

### 🔍 Search & Filter
- **Smart Search**: Search across facility names, districts, addresses, and services
- **District Filter**: Filter by Portuguese districts (Lisboa, Porto, Faro, etc.)
- **Court Count Filter**: Filter by number of available courts (1, 2, 4+, 8+)
- **Operating Status**: Filter by facilities currently open or closed

### 🗺️ Interactive Map
- **Leaflet Integration**: Interactive map with facility markers
- **Auto-Zoom**: Automatically fits view to show all facilities
- **Popup Information**: Click markers for detailed facility info
- **Direct Navigation**: "Ver no mapa" buttons for quick facility location

### 📍 Facility Information
- **Complete Details**: Contact info, addresses, operating hours
- **Real-Time Status**: Shows if facilities are currently open/closed
- **24-Hour Format**: Operating hours displayed in 24-hour format
- **Additional Services**: Tags for amenities like tennis, swimming pools, restaurants

### 📱 Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Portuguese Language**: Complete Portuguese localization
- **Accessibility**: Focus-visible states and semantic markup

## 🚀 Getting Started

### Prerequisites
- Web server (Python, Node.js, or any HTTP server)
- Modern web browser

### Installation

1. **Clone or download** the project files
2. **Start a local server**:
   ```bash
   # Using Python
   python3 -m http.server 5000
   
   # Using Node.js
   npx http-server -p 5000
   ```
3. **Open your browser** and navigate to `http://localhost:5000`

## 📁 Project Structure

```
pickleball-portugal/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality
├── data.js            # Facility data (16 Portuguese courts)
├── README.md          # Project documentation
└── attached_assets/   # Original JSON data file
```

## 🛠️ Technical Details

### Frontend Architecture
- **Vanilla JavaScript**: No frameworks, pure JavaScript ES6+
- **CSS Custom Properties**: Centralized theming system
- **Semantic HTML5**: Accessible and SEO-friendly markup

### Data Management
- **Static Data**: Court information stored in JavaScript arrays
- **Client-Side Processing**: All filtering and searching in browser
- **JSON Parsing**: Operating hours and structured data handling

### External Dependencies
- **Leaflet.js v1.9.4**: Interactive mapping
- **Font Awesome v6.4.0**: Icon library
- **Google Fonts**: Inter font family
- **OpenStreetMap**: Map tiles

### Color Palette
Inspired by Portuguese flag colors:
- **Primary Green**: `#006633`
- **Primary Red**: `#CC0000`
- **Accent Yellow**: `#FFCC00`
- **Neutral Grays**: Various shades for text and backgrounds

## 📊 Data Format

Each facility includes:
```json
{
  "Facility Name": "Lisboa Racket Centre",
  "Full Address": "R. Alferes Malheiro, 1700-025 Lisboa",
  "Latitude": "38.759719",
  "Longitude": "-9.153442",
  "Phone": "+351 21 846 0232",
  "Website": "http://lrc.pt/",
  "Email": "recepcao@lrc.pt",
  "Number of Courts": "2",
  "Operating Hours": "{\"Monday\": \"8am-12am\", ...}",
  "Additional Information": "Tennis, Padel, Squash, Swimming pool, Gym, Pro shop, Café with terrace",
  "District": "Lisboa"
}
```

## 🔧 Customization

### Adding New Facilities
1. **Update `data.js`**: Add new facility objects to the `pickleballCourts` array
2. **Required Fields**: Ensure all mandatory fields are included
3. **Coordinates**: Add accurate latitude/longitude for map display

### Styling Changes
- **CSS Variables**: Modify colors in `:root` selector in `styles.css`
- **Responsive Breakpoints**: Adjust media queries as needed
- **Component Styling**: Update specific component classes

### Language Localization
- **Text Labels**: Update Portuguese labels in HTML and JavaScript
- **Day Names**: Modify day translations in `formatOperatingHours()`
- **Service Names**: Translate service tags in facility data

## 🌐 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **JavaScript ES6+**: Arrow functions, template literals, destructuring
- **CSS Grid & Flexbox**: Modern layout systems
- **Web APIs**: Geolocation, Local Storage, DOM API

## 📱 Mobile Features

- **Touch-Friendly**: Large tap targets and smooth interactions
- **Responsive Grid**: Adaptive layout for all screen sizes
- **Mobile Navigation**: Optimized filter and search interfaces

## 📞 Contact

For adding new facilities or updates:
- **Email**: [jose.fernando.costa.1998@gmail.com](mailto:jose.fernando.costa.1998@gmail.com)

## 📄 License

This project is for educational and community use. Map data © OpenStreetMap contributors.

## 🔄 Version History

- **v1.0.0** - Initial release with 16 Portuguese facilities
- Complete search and filter functionality
- Interactive map with facility markers
- Responsive design and Portuguese localization
- Real-time operating status calculation

---

*Built with ❤️ for the Portuguese pickleball community*