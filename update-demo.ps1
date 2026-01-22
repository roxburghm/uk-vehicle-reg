
# Build the project
npm run build
npx vite build

# Copy the UMD/IIFE build to the demo folder for standalone usage
copy dist\uk-vehicle-reg.iife.js demo\uk-vehicle-reg.js
