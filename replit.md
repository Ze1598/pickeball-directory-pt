# Pickleball Portugal Directory

## Overview

This is a web-based directory application for pickleball courts in Portugal. The application provides a comprehensive listing of pickleball facilities across Portuguese districts, featuring both map-based and list-based views. Users can search and filter facilities by name, district, number of courts, and services offered. Each facility listing includes detailed information such as contact details, operating hours, location coordinates, and additional amenities.

The application is designed to help pickleball enthusiasts in Portugal easily discover and access information about available courts and facilities in their area.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application follows a vanilla JavaScript architecture with a single-page application (SPA) approach:

- **HTML Structure**: Semantic HTML5 markup with Portuguese language support (`lang="pt"`)
- **CSS Framework**: Custom CSS using CSS custom properties (variables) for consistent theming
- **JavaScript**: Vanilla JavaScript with modular functions for different features
- **Responsive Design**: Mobile-first approach with flexible layouts

### Data Management
- **Static Data Storage**: Court data is stored in a JavaScript file (`data.js`) as a static array
- **Data Structure**: Each facility contains standardized fields including name, address, coordinates, contact information, operating hours (JSON format), and amenities
- **Client-Side Processing**: All filtering, searching, and data manipulation happens in the browser

### Mapping Integration
- **Leaflet.js**: Primary mapping library for interactive map functionality
- **Marker Management**: Dynamic marker creation and management for facility locations
- **Coordinate System**: Uses standard latitude/longitude coordinates for facility positioning

### User Interface Components
- **Dual View System**: Toggle between list view and map view
- **Advanced Search**: Text-based search across facility names, districts, and services
- **Multi-Filter System**: Filtering by district, number of courts, and operational status
- **Responsive Cards**: Facility information displayed in structured card layouts

### Styling and Theming
- **Portuguese Color Palette**: Green, red, and yellow theme inspired by Portuguese flag colors
- **CSS Custom Properties**: Centralized color, typography, and spacing variables
- **Inter Font Family**: Modern, readable typography from Google Fonts
- **Component-Based Styling**: Modular CSS architecture for maintainable styles

## External Dependencies

### Core Libraries
- **Leaflet.js (v1.9.4)**: Interactive mapping functionality and tile layer management
- **Font Awesome (v6.4.0)**: Icon library for user interface elements
- **Google Fonts**: Inter font family for typography

### CDN Resources
All external dependencies are loaded via CDN links:
- Leaflet CSS and JavaScript from unpkg.com
- Font Awesome CSS from cdnjs.cloudflare.com
- Google Fonts API for web font loading

### Browser APIs
- **Geolocation API**: Potentially used for user location services
- **Local Storage**: For persisting user preferences and search state
- **DOM API**: Extensive use for dynamic content manipulation and event handling

The application is designed to work entirely in the browser without requiring a backend server, making it suitable for static hosting platforms.