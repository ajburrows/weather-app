import csv
import json

# Input and output file paths
input_csv = './uszips.csv'
output_js = './zip_codes.js'

# Initialize an empty dictionary to hold the processed data
zip_data = {}

# Read the CSV and process the rows
with open(input_csv, 'r', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        print(row)
        # Extract relevant fields
        zip_code = row['zip']  # Handle multiple ZIP codes in the "zips" field
        city = row['city']
        state = row['state_id']
        lat = float(row['lat'])
        lng = float(row['lng'])

        # Add an entry for each ZIP code
        zip_data[zip_code] = {
                "zip": zip_code,
                "city": city,
                "state": state,
                "lat": lat,
                "lng": lng
        }

# Write the data to a JavaScript file
with open(output_js, 'w', encoding='utf-8') as jsfile:
    # Convert the dictionary to a JSON string
    js_content = f"const citiesByZip = {json.dumps(zip_data, indent=2)};\n\nexport default citiesByZip;"
    jsfile.write(js_content)

print(f"JavaScript file created: {output_js}")

