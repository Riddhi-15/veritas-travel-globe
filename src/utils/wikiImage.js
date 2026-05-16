// Maps display names → Wikipedia article titles whose lead image is a scenic photo.
const SCENIC = {
  // ── Countries ────────────────────────────────────────────────────────────
  'Japan':                 'Hanami',                      // Himeji Castle + cherry blossoms
  'Australia':             'Sydney Opera House',
  'India':                 'Nohkalikai Falls',
  'France':                'Paris',
  'Italy':                 'Colosseum',
  'Greece':                'Meteora',
  'China':                 'Great Wall of China',
  'United States':         'Grand Canyon',
  'Brazil':                'Christ the Redeemer',
  'Thailand':              'Wat Phra Kaew',
  'Indonesia':             'Borobudur',
  'United Kingdom':        'Stonehenge',
  'Germany':               'Bavarian Alps',
  'Spain':                 'Alhambra',
  'Portugal':              'Sintra National Palace',
  'Switzerland':           'Matterhorn',
  'Norway':                'Lofoten',
  'New Zealand':           'Milford Sound',
  'Canada':                'Banff National Park',
  'Mexico':                'Chichen Itza',
  'Peru':                  'Machu Picchu',
  'Egypt':                 'Great Pyramid of Giza',
  'Morocco':               'Chefchaouen',
  'South Africa':          'Table Mountain',
  'Kenya':                 'Maasai Mara National Reserve',
  'Turkey':                'Cappadocia',
  'Jordan':                'Petra',
  'United Arab Emirates':  'Burj Khalifa',
  'Iceland':               'Reynisfjara',
  'Netherlands':           'Keukenhof',
  'Austria':               'Hallstatt',
  'Czech Republic':        'Prague Old Town Square',
  'Hungary':               'Hungarian Parliament Building',
  'Poland':                'Wawel Castle',
  'Croatia':               'Plitvice Lakes National Park',
  'Ireland':               'Cliffs of Moher',
  'Belgium':               'Grand Place, Brussels',
  'Singapore':             'Gardens by the Bay',
  'Malaysia':              'Kinabalu Park',
  'Vietnam':               'Ha Long Bay',
  'Cambodia':              'Angkor Wat',
  'Nepal':                 'Annapurna massif',
  'Sri Lanka':             'Sigiriya',
  'Maldives':              'Maldives',
  'Taiwan':                'Sun Moon Lake',
  'South Korea':           'Gyeongbokgung Palace',
  'Philippines':           'Chocolate Hills',
  'Myanmar':               'Bagan',
  'Uzbekistan':            'Registan',
  'Argentina':             'Perito Moreno Glacier',
  'Chile':                 'Torres del Paine National Park',
  'Colombia':              'Cartagena de Indias',
  'Tanzania':              'Mount Kilimanjaro',
  'Ethiopia':              'Lalibela',
  'Zambia':                'Victoria Falls',
  // Additional countries (flag-risk prevention)
  'Russia':                'Olkhon Island',
  'Pakistan':              'Nanga Parbat',
  'Iran':                  'Naqsh-e Jahan Square',
  'Israel':                'Dome of the Rock',
  'Sweden':                'Sarek National Park',     // remote arctic wilderness, prime aurora zone
  'Finland':               'Oulanka National Park',   // Finnish boreal nature, aurora belt
  'Denmark':               'Nyhavn',
  'Cuba':                  'Trinidad, Cuba',
  'Bolivia':               'Salar de Uyuni',
  'Lithuania':             'Trakai Island Castle',
  'Latvia':                'Riga Old Town',
  'Estonia':               'Tallinn Old Town',
  'Ukraine':               'Saint Sophia Cathedral, Kyiv',
  'Bulgaria':              'Rila Monastery',
  'Romania':               'Bran Castle',
  'Serbia':                'Đavolja Varoš',
  'Slovakia':              'Spiš Castle',
  'Slovenia':              'Lake Bled',
  'Albania':               'Butrint',
  'North Macedonia':       'Ohrid',
  'Montenegro':            'Bay of Kotor',
  'Bosnia and Herzegovina':'Stari Most',
  'Ecuador':               'Galápagos Islands',
  'Paraguay':              'Jesuit Missions of the Guaranis',
  'Uruguay':               'Colonia del Sacramento',
  'Venezuela':             'Angel Falls',
  'Panama':                'Bocas del Toro Province',
  'Costa Rica':            'Arenal Volcano',
  'Guatemala':             'Tikal',
  'Cuba':                  'Trinidad, Cuba',
  'Jamaica':               'Blue Mountains, Jamaica',
  'Ghana':                 'Cape Coast Castle',
  'Senegal':               'Île de Gorée',
  'Rwanda':                'Volcanoes National Park',
  'Uganda':                'Bwindi Impenetrable Forest',
  'Zimbabwe':              'Victoria Falls',
  'Madagascar':            'Avenue of the Baobabs',
  'Mozambique':            'Quirimbas Archipelago',
  'Botswana':              'Okavango Delta',
  'Namibia':               'Deadvlei',
  'Tunisia':               'El Djem',
  'Algeria':               'Hoggar Mountains',
  'Libya':                 'Leptis Magna',
  'Sudan':                 'Meroe',
  'Saudi Arabia':          'Al-Ula',
  'Oman':                  'Wahiba Sands',
  'Qatar':                 'Katara Cultural Village',
  'Kuwait':                'Kuwait Towers',
  'Bahrain':               'Bahrain Fort',
  'Lebanon':               'Baalbek',
  'Syria':                 'Palmyra',
  'Iraq':                  'Ziggurat of Ur',
  'Afghanistan':           'Band-e Amir National Park',
  'Kazakhstan':            'Charyn Canyon',
  'Kyrgyzstan':            'Song Kol',
  'Tajikistan':            'Iskanderkul',
  'Turkmenistan':          'Darvaza gas crater',
  'Mongolia':              'Khövsgöl Lake',
  'Bhutan':                'Paro Taktsang',
  'Bangladesh':            'Sundarbans',
  'Laos':                  'Luang Prabang',
  'Brunei':                'Omar Ali Saifuddien Mosque',
  'Papua New Guinea':      'Kokoda Track',
  'Fiji':                  'Fiji',
  'Vanuatu':               'Vanuatu',
  'Solomon Islands':       'Solomon Islands',
  'Samoa':                 'To Sua Ocean Trench',
  'Tonga':                 'ʻEua',
  'Nigeria':               'Zuma Rock',
  'Cameroon':              'Waza National Park',
  'Angola':                'Kalandula Falls',
  'Congo':                 'Odzala-Kokoua National Park',
  'Ivory Coast':           'Yamoussoukro Basilica',
  'Mali':                  'Great Mosque of Djenné',
  'Burkina Faso':          'Sindou Peaks',
  'Togo':                  'Koutammakou',
  'Benin':                 'Pendjari National Park',
  'Eritrea':               'Asmara',
  'Somalia':               'Laas Geel',
  'Djibouti':              'Lake Assal',
  'Comoros':               'Comoro Islands',
  'Seychelles':            'Anse Source d\'Argent',
  'Mauritius':             'Black River Gorges National Park',
  'Cuba':                  'Trinidad, Cuba',
  // ── Indian states ─────────────────────────────────────────────────────────
  'Rajasthan':                   'Amber Fort',
  'Kerala':                      'Vembanad',
  'Goa':                         'Anjuna beach',
  'Himachal Pradesh':            'Rohtang Pass',
  'Uttarakhand':                 'Kedarnath',
  'Tamil Nadu':                  'Brihadeeswarar Temple',
  'Maharashtra':                 'Ajanta Caves',
  'Karnataka':                   'Hampi',
  'West Bengal':                 'Victoria Memorial, Kolkata',
  'Uttar Pradesh':               'Agra Fort',
  'Jammu and Kashmir':           'Dal Lake',
  'Ladakh':                      'Pangong Lake',
  'Gujarat':                     'Rann of Kutch',
  'Madhya Pradesh':              'Khajuraho',
  'Odisha':                      'Konark Sun Temple',
  'Andhra Pradesh':              'Araku Valley',
  'Telangana':                   'Charminar',
  'Punjab':                      'Harmandir Sahib',
  'Bihar':                       'Mahabodhi Temple',
  'Assam':                       'Kaziranga National Park',
  'Meghalaya':                   'Nohkalikai Falls',
  'Sikkim':                      'Kangchenjunga',
  'Manipur':                     'Loktak Lake',
  'Nagaland':                    'Dzukou Valley',
  'Arunachal Pradesh':           'Tawang Monastery',
  'Delhi':                       'Qutb Minar',
  'Andaman and Nicobar Islands': 'Radhanagar Beach',
  'Chandigarh':                  'Rock Garden of Chandigarh',
  'Jharkhand':                   'Hundru Falls',
  'Chhattisgarh':                'Chitrakote Falls',
  'Tripura':                     'Ujjayanta Palace',
  'Mizoram':                     'Phawngpui',
  'Haryana':                     'Sultanpur National Park',
  // ── Common compound tourism place names ────────────────────────────────────
  // ── Greece places ──────────────────────────────────────────────────────────
  'Acropolis':                    'Acropolis of Athens',
  'Athens Acropolis':             'Acropolis of Athens',
  'Parthenon':                    'Acropolis of Athens',
  'Meteora Monasteries':          'Meteora',
  'Delphi Oracle':                'Delphi',
  'Mykonos Windmills':            'Windmill of Mykonos',
  'Santorini Caldera':            'Oia, Santorini',
  'Santorini Island':             'Oia, Santorini',
  'Thessaloniki Waterfront':      'Thessaloniki',
  'Corfu Old Town':               'Corfu',
  'Olympia':                      'Olympia, Greece',
  'Epidaurus':                    'Epidaurus',
  // ── Iceland places ─────────────────────────────────────────────────────────
  'Blue Lagoon':                  'Blue Lagoon (geothermal spa)',
  'Geysir':                       'Geysir',
  'Strokkur Geyser':              'Strokkur',
  'Seljalandsfoss':               'Seljalandsfoss',
  'Reynisfjara Beach':            'Reynisfjara',
  'Black Sand Beach':             'Reynisfjara',
  'Diamond Beach':                'Reynisfjara',
  'Thingvellir':                  'Þingvellir',
  'Vatnajokull':                  'Vatnajökull',
  'Kirkjufell':                   'Kirkjufell',
  // ── France places ──────────────────────────────────────────────────────────
  'Eiffel Tower, Paris':          'Eiffel Tower',
  'Louvre Museum':                'Louvre',
  'Versailles Palace':            'Palace of Versailles',
  'French Riviera':               'French Riviera',
  'Pont du Gard Aqueduct':        'Pont du Gard',
  'Loire Valley Châteaux':        'Loire Valley',
  'Mont Saint-Michel':            'Mont Saint-Michel',
  'Bordeaux Vineyards':           'Bordeaux wine region',
  'D-Day Beaches':                'Normandy landings',
  'Chamonix':                     'Chamonix',
  'Carcassonne':                  'Carcassonne',
  'Alsace Wine Route':            'Alsace wine route',
  // ── Morocco places ─────────────────────────────────────────────────────────
  'Blue City':                    'Chefchaouen',
  'Chefchaouen':                  'Chefchaouen',
  'Fes Medina':                   'Fez, Morocco',
  'Fez Old City':                 'Fez, Morocco',
  'Hassan II Mosque':             'Hassan II Mosque',
  'Sahara Desert Dunes':          'Erg Chebbi',
  'Merzouga Dunes':               'Erg Chebbi',
  'Ait Benhaddou':                'Ksar of Aït-Ben-Haddou',
  'Marrakech Souks':              'Majorelle Garden',
  'Jardin Majorelle':             'Majorelle Garden',
  'Majorelle Garden':             'Majorelle Garden',
  'Essaouira Medina':             'Essaouira',
  // ── Algeria places ─────────────────────────────────────────────────────────
  'Hoggar':                       'Hoggar Mountains',
  'Tassili n\'Ajjer':             'Hoggar Mountains',
  'Tassili':                      'Hoggar Mountains',
  'Timgad Roman Ruins':           'Timgad',
  'Ghardaïa':                     'Ghardaia',
  'Djemila':                      'Timgad',
  // ── Canada places ──────────────────────────────────────────────────────────
  'Niagara Falls, Ontario':       'Niagara Falls',
  'Old Quebec City':              'Quebec City',
  'Old Town Quebec':              'Old Quebec',
  'CN Tower, Toronto':            'CN Tower',
  'CN Tower':                     'CN Tower',
  'Whistler Resort':              'Whistler, British Columbia',
  'Canadian Rockies':             'Canadian Rockies',
  'Capilano Suspension Bridge':   'Capilano Suspension Bridge',
  'Jasper National Park':         'Jasper National Park',
  'Vancouver Skyline':            'Vancouver',
  'Victoria Harbour':             'Victoria, British Columbia',
  // ── Malaysia places ────────────────────────────────────────────────────────
  'Batu Caves':                   'Batu Caves',
  'George Town':                  'George Town, Penang',
  'Penang Street Art':            'George Town, Penang',
  'Langkawi Island':              'Langkawi',
  'Cameron Highlands':            'Cameron Highlands',
  'Penang Hill':                  'Penang Hill',
  'Petronas Twin Towers':         'Petronas Towers',
  'KLCC':                         'Petronas Towers',
  // ── Iceland place names (from TSV) ────────────────────────────────────────
  'Golden Circle':                'Strokkur',
  'Northern Lights':              'Aurora borealis',
  'Westfjords':                   'Dynjandi',
  'Jökulsárlón Glacier Lagoon':   'Reynisfjara',
  'Jökulsárlón':                  'Reynisfjara',
  // ── Sweden place names ─────────────────────────────────────────────────────
  'Swedish Lapland':              'Abisko National Park',
  'Gotland Island':               'Gotland',
  'Gothenburg':                   'Gothenburg',
  // ── Russia place names ─────────────────────────────────────────────────────
  'Lake Baikal':                  'Olkhon Island',
  'Moscow Red Square':            'Saint Basil\'s Cathedral',
  'Kamchatka':                    'Kamchatka Peninsula',
  'Trans-Siberian Railway':       'Trans-Siberian Railway',
  'Saint Petersburg':             'Peterhof Palace',
  // ── China place names ──────────────────────────────────────────────────────
  'Li River Guilin':              'Li River (Guangxi)',
  'Shanghai':                     'The Bund',
  'Beijing':                      'Forbidden City',
  'Terracotta Army':              'Terracotta Army',
  'Yellow Mountain':              'Huangshan',
  'Zhangjiajie':                  'Zhangjiajie National Forest Park',
  'West Lake':                    'West Lake',
  // ── Japan place names ──────────────────────────────────────────────────────
  'Kyoto Temples':                'Fushimi Inari-taisha',
  'Hiroshima Peace Memorial':     'Hiroshima Peace Memorial',
  'Mount Fuji':                   'Mount Fuji',
  'Arashiyama':                   'Arashiyama',
  'Nara Park':                    'Nara Park',
  'Nikko':                        'Nikko, Tochigi',
  // ── Kazakhstan place names ─────────────────────────────────────────────────
  'Nur-Sultan Astana':            'Nur-Sultan',
  'Almaty':                       'Almaty',
  'Altyn-Emel':                   'Altyn-Emel National Park',
  'Charyn Canyon':                'Charyn Canyon',
  'Kolsai Lakes':                 'Kolsai Lakes',
  // ── Tajikistan place names ─────────────────────────────────────────────────
  'Iskanderkul':                  'Iskanderkul',
  'Iskanderkul Lake':             'Iskanderkul',
  'Fann Mountains':               'Fann Mountains',
  'Pamir Highway':                'Pamir Highway',
  'Wakhan Corridor':              'Wakhan Corridor',
  'Dushanbe':                     'Dushanbe',
  // ── North Korea place names ────────────────────────────────────────────────
  'Kaesong':                      'Kaesong',
  'Korean DMZ':                   'Korean Demilitarized Zone',
  'Mount Paektu':                 'Paektu Mountain',
  'Pyongyang':                    'Pyongyang',
  'Kumsusan Palace':              'Kumsusan Palace of the Sun',
  // ── South Korea place names ────────────────────────────────────────────────
  'Busan':                        'Busan',
  'Jeju Island':                  'Jeju Island',
  'Seoraksan':                    'Seoraksan National Park',
  // ── Papua New Guinea place names ───────────────────────────────────────────
  'Huli Wigmen':                  'Huli people',
  'Kokoda Track':                 'Kokoda Track',
  'Rabaul':                       'Rabaul',
  'Sepik River':                  'Sepik River',
  'Tufi':                         'Tufi, Oro Province',
  // ── India - Rajasthan/Varanasi ────────────────────────────────────────────
  'Rajasthan Forts':              'Amber Fort',
  'Varanasi Ghats':               'Dashashwamedh Ghat',
  // ── Indian city places ─────────────────────────────────────────────────────
  'Brahma Temple':                'Brahma temple, Pushkar',
  'Pushkar Camel Fair':           'Pushkar Camel Fair',
  'Pushkar Lake':                 'Pushkar Lake',
  'Savitri Temple':               'Savitri Temple, Pushkar',
  'Lake Pichola':                 'Lake Pichola',
  'Jag Mandir':                   'Jag Mandir',
  'Sajjangarh':                   'Sajjangarh',
  'Bagore Ki Haveli':             'Bagore Ki Haveli',
  'City Palace':                  'City Palace, Udaipur',
  'City Palace, Udaipur':         'City Palace, Udaipur',
  'Fatehpur Sikri':               'Fatehpur Sikri',
  'Mehrangarh':                   'Mehrangarh',
  'Umaid Bhawan':                 'Umaid Bhawan Palace',
  'Jaswant Thada':                'Jaswant Thada',
  'Thar Desert':                  'Thar Desert',
  'Hawa Mahal':                   'Hawa Mahal',
  'Nahargarh Fort':               'Nahargarh Fort',
  'Jantar Mantar':                'Jantar Mantar, Jaipur',
  'Chand Baori':                  'Chand Baori',
  // Pakistan / South Asia place names
  'Lahore Fort and Badshahi Mosque': 'Lahore Fort',
  'Lahore Fort & Badshahi Mosque':   'Lahore Fort',
  'Hunza Valley':                    'Hunza Valley',
  'Fairy Meadows':                   'Fairy Meadows',
  'Nanga Parbat':                    'Nanga Parbat',
  'Karakoram Highway':               'Karakoram Highway',
  'Shandur Pass':                    'Shandur Pass',
  'Swat Valley':                     'Swat, Pakistan',
  'Mohenjo-Daro':                    'Mohenjo-daro',
  'Mohenjo Daro':                    'Mohenjo-daro',
  'Khyber Pass':                     'Khyber Pass',
  'Taj Mahal, Agra':              'Taj Mahal',
  'Rajasthan Forts & Palaces':    'Amber Fort',
  'Goa Beaches':                  'Palolem Beach',
  'Varanasi Ghat':                'Dashashwamedh Ghat',
  'Kerala Backwaters':            'Kerala backwaters',
  'Mumbai Beaches':               'Juhu Beach',
  'Himalayan Treks':              'Rohtang Pass',
  'Delhi Monuments':              'Qutb Minar',
  'Spiti Valley':                 'Spiti Valley',
  'Andaman Beaches':              'Radhanagar Beach',
  'Coorg Hills':                  'Coorg district',
  'Mysore Palace':                'Mysore Palace',
  'Ellora Caves':                 'Ellora Caves',
  'Sundarbans':                   'Sundarbans',
  'Rann of Kutch':                'Rann of Kutch',
  'Zanskar Valley':               'Zanskar',
  'Valley of Flowers':            'Valley of Flowers National Park',
  'Jim Corbett National Park':    'Jim Corbett National Park',
  'Nagarhole National Park':      'Nagarhole National Park',
  'Periyar Wildlife Sanctuary':   'Periyar Tiger Reserve',
  'Beaches':                      'Palolem Beach',
  'Backwaters':                   'Kerala backwaters',
  'Hill Stations':                'Ooty',
  'Wildlife':                     'Kaziranga National Park',
  'Temples':                      'Brihadeeswarar Temple',
  'Lakes':                        'Dal Lake',
  'Waterfalls':                   'Nohkalikai Falls',

  // ── India state drill-down place names (INDIA_STATES fallback) ──────────────
  // Names here are AFTER cleanPlaceName() transformation (suffix stripped, split on ' & ' and ',')
  // Rajasthan
  'Jaipur – Amber Fort':           'Amber Fort',
  'Jodhpur – Mehrangarh Fort':     'Mehrangarh Fort',
  'Udaipur – City of Lakes':       'Lake Pichola',
  'Jaisalmer Desert':                   'Jaisalmer',
  // Kerala
  'Alleppey Backwaters Houseboat':      'Kerala backwaters',
  'Munnar Tea Gardens':                 'Munnar',
  'Kovalam Beach':                      'Kovalam',
  'Periyar':                            'Periyar Tiger Reserve',
  'Fort Kochi':                         'Fort Kochi',
  // Goa
  'Old Goa Churches':                   'Basilica of Bom Jesus',
  'Palolem Beach':                      'Palolem Beach',
  // Himachal Pradesh
  'Manali':                             'Rohtang Pass',
  'Shimla':                             'Shimla',
  'Dharamshala':                        'McLeod Ganj',
  'Kullu Valley':                       'Kullu Valley',
  // Uttarakhand
  'Rishikesh – Yoga':              'Rishikesh',
  'Haridwar Ganga Aarti':               'Har ki Pauri',
  'Nainital':                           'Nainital',
  'Kedarnath Temple':                   'Kedarnath',
  // Tamil Nadu
  'Madurai Meenakshi Temple':           'Meenakshi Amman Temple',
  'Ooty Nilgiri Hills':                 'Ooty',
  'Mahabalipuram Shore Temple':         'Shore Temple',
  'Kanyakumari':                        'Kanyakumari',
  'Rameswaram':                         'Ramanathaswamy Temple',
  // Maharashtra
  'Ajanta':                             'Ajanta Caves',
  'Lonavala':                           'Lonavala',
  'Shirdi':                             'Shirdi',
  'Mahabaleshwar':                      'Mahabaleshwar',
  // Karnataka
  'Hampi Ruins':                        'Hampi',
  'Coorg Coffee Estates':               'Coorg district',
  'Gokarna Beach':                      'Gokarna, Karnataka',
  'Gokarna':                            'Gokarna, Karnataka',
  'Chikmagalur':                        'Chikmagalur',
  // West Bengal
  'Kolkata':                            'Victoria Memorial, Kolkata',
  'Darjeeling Tea Gardens':             'Happy Valley Tea Estate',
  'Sundarbans Tiger Reserve':           'Sundarbans',
  'Bishnupur Terracotta Temples':       'Bishnupur',
  'Kalimpong':                          'Kalimpong',
  // Uttar Pradesh
  'Vrindavan':                          'Vrindavan',
  'Lucknow Nawabi Heritage':            'Bara Imambara',
  // Jammu & Kashmir
  'Dal Lake':                           'Dal Lake',
  'Gulmarg':                            'Gulmarg',
  'Gulmarg Skiing':                     'Gulmarg',
  'Betaab Valley':                      'Betaab Valley',
  'Vaishno Devi Temple':                'Vaishno Devi',
  'Dal Lake & Shikara Ride, Srinagar': 'Dal Lake',
  'Gulmarg Skiing & Gondola':      'Gulmarg',
  'Pahalgam Valley':                    'Pahalgam',
  // Ladakh
  'Pangong Lake':                       'Pangong Lake',
  'Magnetic Hill':                      'Magnetic Hill, Leh',
  'Nubra Valley and Sand Dunes':        'Nubra Valley',
  'Magnetic Hill & Leh Palace':    'Magnetic Hill, Leh',
  'Pangong Tso Lake':                   'Pangong Lake',
  // Andhra Pradesh
  'Tirupati Balaji Temple':             'Tirumala Venkateswara Temple',
  'Visakhapatnam Beach':                'Visakhapatnam',
  'Amaravati':                          'Amaravati Stupa',
  'Borra Caves':                        'Borra Caves',
  'Araku Valley':                       'Araku Valley',
  // Telangana
  'Charminar Hyderabad':                'Charminar',
  'Ramoji Film City':                   'Ramoji Film City',
  'Warangal Fort':                      'Warangal Fort',
  'Nagarjuna Sagar':                    'Nagarjuna Sagar',
  // Gujarat
  'Ahmedabad':                          'Sabarmati Ashram',
  'Gir Forest National Park':           'Gir Forest National Park',
  'Dwarka':                             'Dwarkadhish Temple',
  'Somnath Temple':                     'Somnath temple',
  // Madhya Pradesh
  'Khajuraho Temples':                  'Khajuraho',
  'Kanha National Park':                'Kanha Tiger Reserve',
  'Bandhavgarh Tiger Reserve':          'Bandhavgarh National Park',
  'Sanchi':                             'Sanchi',
  'Orchha':                             'Orchha',
  // Punjab
  'Golden Temple Amritsar':             'Harmandir Sahib',
  'Wagah Border Ceremony':              'Wagah border ceremony',
  'Chandigarh Rock Garden':             'Rock Garden of Chandigarh',
  'Anandpur Sahib':                     'Anandpur Sahib',
  'Patiala Heritage Walk':              'Patiala',
  // Bihar
  'Bodh Gaya Mahabodhi Temple':         'Mahabodhi Temple',
  'Nalanda University Ruins':           'Nalanda',
  'Rajgir':                             'Rajgir',
  'Patna':                              'Golghar',
  'Vaishali':                           'Vaishali, Bihar',
  // Odisha
  'Puri Jagannath Temple':              'Jagannath Temple, Puri',
  'Chilika Lake':                       'Chilika Lake',
  'Simlipal National Park':             'Simlipal National Park',
  'Udayagiri and Khandagiri Caves':     'Udayagiri and Khandagiri Caves',
  // Assam
  'Majuli River Island':                'Majuli',
  'Kamakhya Temple Guwahati':           'Kamakhya Temple',
  'Manas National Park':                'Manas National Park',
  'Jorhat Tea Estates':                 'Jorhat',
  // Jharkhand
  'Deoghar Baidyanath Temple':          'Baidyanath Jyotirlinga',
  'Betla National Park':                'Betla National Park',
  'Ranchi':                             'Hundru Falls',
  'Parasnath Hill':                     'Parasnath',
  // Chhattisgarh
  'Bastar Tribal Region':               'Bastar district',
  'Raipur':                             'Raipur',
  'Tirathgarh Falls':                   'Tirathgarh Falls',
  'Kanger Valley National Park':        'Kanger Valley National Park',
  // Haryana
  'Kurukshetra':                        'Kurukshetra',
  'Sultanpur Bird Sanctuary':           'Sultanpur National Park',
  'Panipat Museum':                     'Panipat',
  'Morni Hills':                        'Morni Hills',
  'Faridabad Surajkund':                'Surajkund',
  // Meghalaya
  'Cherrapunji Living Root Bridges':    'Living root bridge',
  'Shillong':                           'Ward\'s Lake',
  'Mawsynram':                          'Mawsynram',
  'Elephant Falls':                     'Elephant Falls, Shillong',
  // Sikkim
  'Gangtok':                            'Rumtek Monastery',
  'Gurudongmar Lake':                   'Gurudongmar Lake',
  'Pelling and Kanchenjunga Views':     'Pelling',
  // Manipur
  'Loktak Lake':                        'Loktak Lake',
  'Keibul Lamjao National Park':        'Keibul Lamjao National Park',
  'Imphal War Cemetery':                'Imphal War Cemetery',
  'Kangla Fort':                        'Kangla Fort',
  'Dzukou Valley Trek':                 'Dzukou Valley',
  // Mizoram
  'Aizawl':                             'Aizawl',
  'Phawngpui Blue Mountain':            'Phawngpui',
  'Champhai':                           'Champhai',
  'Vantawng Falls':                     'Vantawng Falls',
  'Reiek Peak':                         'Reiek',
  // Nagaland
  'Hornbill Festival Kohima':           'Kisama Heritage Village',
  'Hornbill Festival':                  'Kisama Heritage Village',
  'Kohima War Cemetery':                'Kohima War Cemetery',
  'Japfu Peak':                         'Dzukou Valley',
  'Mount Japfü':                        'Dzukou Valley',
  'Khonoma Green Village':              'Khonoma',
  // Tripura
  'Ujjayanta Palace Agartala':          'Ujjayanta Palace',
  'Neermahal Water Palace':             'Neermahal',
  'Tripura Sundari Temple':             'Tripura Sundari',
  'Sepahijala':                         'Sepahijala Wildlife Sanctuary',
  'Unakoti Rock Carvings':              'Unakoti',
  // Arunachal Pradesh
  'Ziro Valley':                        'Ziro Valley',
  'Namdapha National Park':             'Namdapha National Park',
  'Sela Pass':                          'Sela Pass',
  'Dirang':                             'Dirang',
  // Delhi
  'India Gate':                         'India Gate',
  'Humayuns Tomb':                      'Humayun\'s Tomb',
  // Puducherry
  'Promenade Beach':                    'Pondicherry',
  'Auroville':                          'Auroville',
  'Paradise Beach':                     'Pondicherry',
  'Puducherry French Quarter':          'Pondicherry',
  // Andaman & Nicobar
  'Radhanagar Beach Havelock':          'Radhanagar Beach',
  'Cellular Jail Port Blair':           'Cellular Jail',
  'Neil Island':                        'Neil Island',
  'Barren Island Volcano':              'Barren Island (Andaman Islands)',
  'Snorkelling and Diving':             'Radhanagar Beach',
  // Chandigarh
  'Rock Garden':                        'Rock Garden of Chandigarh',
  'Sukhna Lake':                        'Sukhna Lake',
  'Rose Garden':                        'Zakir Hussain Rose Garden',
  'Capitol Complex':                    'Capitol Complex, Chandigarh',
  'Sector 17 Plaza':                    'Chandigarh',
  // Lakshadweep
  'Agatti Island':                      'Agatti Island',
  'Bangaram Atoll Snorkelling':         'Bangaram Atoll',
  'Kavaratti Marine Museum':            'Kavaratti',
  'Kalpeni Island':                     'Kalpeni',
  'Minicoy Lighthouse':                 'Minicoy',
  // Daman and Diu
  'Diu Fort':                           'Diu Fort',
  'Nagoa Beach':                        'Nagoa Beach',
  'St. Paul\'s Church Diu':             'St. Paul\'s Church, Diu',
  'Ghogla Beach':                       'Ghogla',
  'INS Khukri Memorial':                'INS Khukri (F149)',

  // ── City-level place names (cities.js) ────────────────────────────────────
  // Tokyo
  'Senso-ji Temple Asakusa':          'Sensō-ji',
  'Senso-ji Temple':                  'Sensō-ji',
  'Shibuya Crossing':                 'Shibuya Crossing',
  'Shinjuku Gyoen Garden':            'Shinjuku Gyoen',
  'Shinjuku Gyoen':                   'Shinjuku Gyoen',
  'Tsukiji':                          'Tsukiji market',
  'teamLab Planets':                  'teamLab',
  // Kyoto
  'Fushimi Inari Taisha':             'Fushimi Inari-taisha',
  'Arashiyama Bamboo Grove':          'Arashiyama',
  'Kinkaku-ji Golden Pavilion':       'Kinkakuji',
  'Kinkaku-ji':                       'Kinkakuji',
  'Gion':                             'Gion, Kyoto',
  "Philosopher's Path":               "Philosopher's Walk",
  // Osaka
  'Dotonbori Street Food Strip':      'Dotonbori',
  'Dotonbori':                        'Dotonbori',
  'Osaka Castle':                     'Osaka Castle',
  'Kuromon Ichiba Market':            'Kuromon Ichiba Market',
  'Universal Studios Japan':          'Universal Studios Japan',
  'Shinsekai':                        'Shinsekai, Osaka',
  // Seoul
  'Bukchon Hanok Village':            'Bukchon Hanok Village',
  'Myeongdong':                       'Myeongdong',
  'N Seoul Tower':                    'N Seoul Tower',
  'Insadong':                         'Insadong',
  // Beijing
  'Great Wall at Mutianyu':           'Mutianyu',
  'Forbidden City':                   'Forbidden City',
  'Temple of Heaven':                 'Temple of Heaven',
  'Summer Palace':                    'Summer Palace, Beijing',
  'Hutong':                           'Hutong',
  // Shanghai
  'The Bund':                         'The Bund',
  'Yu Garden':                        'Yu Garden',
  'Shanghai Tower':                   'Shanghai Tower',
  'Tianzifang':                       'Tianzifang',
  'Zhujiajiao':                       'Zhujiajiao',
  // Bangkok
  'Grand Palace':                     'Grand Palace, Bangkok',
  'Wat Pho':                          'Wat Pho',
  'Chatuchak Weekend Market':         'Chatuchak Weekend Market',
  'Khao San Road':                    'Khao San Road',
  'Chao Phraya':                      'Chao Phraya',
  // Chiang Mai
  'Doi Inthanon National Park':       'Doi Inthanon National Park',
  'Wat Doi Suthep':                   'Doi Suthep-Pui National Park',
  'Sunday Night Walking Street':      'Wualai Walking Street',
  'Elephant Sanctuary':               'Elephant Nature Park',
  'Nimman':                           'Nimman Road',
  // Hanoi
  'Hoan Kiem Lake':                   'Hoan Kiem Lake',
  'Ho Chi Minh Mausoleum':            'Ho Chi Minh Mausoleum',
  'Old Quarter':                      'Hanoi Old Quarter',
  'Temple of Literature':             'Temple of Literature, Hanoi',
  'Train Street':                     'Hanoi Old Quarter',
  // Ho Chi Minh City
  'War Remnants Museum':              'War Remnants Museum',
  'Ben Thanh Market':                 'Bến Thành Market',
  'Reunification Palace':             'Reunification Palace',
  'Cu Chi Tunnels':                   'Củ Chi tunnels',
  'Bui Vien':                         'Bến Thành Market',
  // Singapore city places
  'Hawker Centre':                    'Hawker centre',
  'Pulau Ubin Island':                'Pulau Ubin',
  // Kuala Lumpur city places
  'Jalan Alor':                       'Jalan Alor',
  'Perdana Botanical Garden':         'Perdana Botanical Garden, Kuala Lumpur',
  'Central Market':                   'Central Market, Kuala Lumpur',
  // Bali city places
  'Ubud Rice Terraces':               'Tegallalang',
  'Seminyak':                         'Seminyak',
  'Mount Batur':                      'Mount Batur',
  'Sidemen Valley':                   'Sidemen, Bali',
  // Kathmandu
  'Pashupatinath Temple':             'Pashupatinath Temple',
  'Boudhanath':                       'Boudhanath',
  'Swayambhunath':                    'Swayambhunath',
  'Thamel':                           'Thamel',
  'Bhaktapur Durbar Square':          'Bhaktapur',
  // Dubai city places
  'Burj Khalifa':                     'Burj Khalifa',
  'Dubai Mall':                       'Dubai Fountain',
  'Al Fahidi':                        'Al Fahidi Fort',
  'Dubai Frame':                      'Dubai Frame',
  // Riyadh city places
  'Kingdom Centre Tower':             'Kingdom Centre',
  'National Museum of Saudi Arabia':  'National Museum of Saudi Arabia',
  'Edge of the World Escarpment':     'Jebel Fihrayn',
  'Souq Al Zal':                      'Diriyah',
  // Istanbul city places
  'Hagia Sophia':                     'Hagia Sophia',
  'Topkapi Palace':                   'Topkapi Palace',
  'Grand Bazaar':                     'Grand Bazaar, Istanbul',
  'Bosphorus Cruise':                 'Bosphorus',
  'Balat Colourful Houses':           'Balat, Istanbul',
  // Jerusalem
  'Old City':                         'Jerusalem Old City',
  'Church of the Holy Sepulchre':     'Church of the Holy Sepulchre',
  'Yad Vashem Memorial':              'Yad Vashem',
  'Mahane Yehuda Market':             'Mahane Yehuda Market',
  // Petra
  'The Treasury Al-Khazneh':          'Al-Khazneh',
  'The Siq Gorge Walk':               'The Siq',
  'Monastery Ad Deir':                'Ad Deir',
  'Petra by Night':                   'Petra',
  // Paris city places
  'Eiffel Tower':                     'Eiffel Tower',
  'The Louvre Museum':                'Louvre',
  'Notre-Dame Cathedral':             'Notre-Dame de Paris',
  'Sacré-Cœur':                       'Sacré-Cœur, Paris',
  'Le Marais':                        'Le Marais',
  // Rome city places
  'Colosseum':                        'Colosseum',
  'Vatican':                          'Sistine Chapel',
  'Trevi Fountain':                   'Trevi Fountain',
  'Borghese Gallery':                 'Galleria Borghese',
  'Trastevere Neighbourhood':         'Trastevere',
  // Florence city places
  'Uffizi Gallery':                   'Uffizi',
  'Duomo':                            'Cathedral of Santa Maria del Fiore',
  'Ponte Vecchio':                    'Ponte Vecchio',
  'Piazzale Michelangelo Viewpoint':  'Piazzale Michelangelo',
  'Oltrarno':                         'Oltrarno',
  // Venice city places
  "St Mark's Basilica":               "St Mark's Basilica",
  "Doge's Palace":                    "Doge's Palace",
  'Grand Canal Gondola Ride':         'Grand Canal (Venice)',
  'Burano Island':                    'Burano',
  'Dorsoduro':                        'Dorsoduro',
  // Barcelona city places
  'Park Güell':                       'Park Güell',
  'Las Ramblas':                      'La Rambla',
  'Gothic Quarter':                   'Gothic Quarter, Barcelona',
  'Montjuïc Castle':                  'Montjuïc Castle',
  // Berlin city places
  'Brandenburg Gate':                 'Brandenburg Gate',
  'Berlin Wall Memorial':             'Berlin Wall Memorial',
  'Museum Island':                    'Museum Island, Berlin',
  'East Side Gallery':                'East Side Gallery',
  'Kreuzberg':                        'Kreuzberg',
  // Vienna city places
  'St Stephen\'s Cathedral':          'St. Stephen\'s Cathedral, Vienna',
  'Kunsthistorisches Museum':         'Kunsthistorisches Museum',
  'Naschmarkt':                       'Naschmarkt',
  'Vienna Woods':                     'Vienna Woods',
  // Prague city places
  'Prague Castle':                    'Prague Castle',
  'Charles Bridge':                   'Charles Bridge',
  'Old Town Square':                  'Prague astronomical clock',
  'Vyšehrad Fortress':                'Vyšehrad',
  // Budapest city places
  'Széchenyi Thermal Baths':          'Széchenyi thermal bath',
  'Széchenyi':                        'Széchenyi thermal bath',
  'Ruin Bars':                        'Ruin bar',
  'Memento Park':                     'Memento Park',
  // Athens city places
  'Acropolis':                        'Acropolis of Athens',
  'Acropolis Museum':                 'Acropolis Museum',
  'Monastiraki Flea Market':          'Monastiraki',
  'Plaka Neighbourhood':              'Plaka',
  'Cape Sounion':                     'Temple of Poseidon, Sounion',
  // Lisbon city places
  'Belém Tower':                      'Belém Tower',
  'Alfama District':                  'Alfama',
  'Tram 28 Scenic Route':             'Tram 28E (Lisbon)',
  'LX Factory':                       'LX Factory',
  'Sintra Palaces Day Trip':          'Sintra National Palace',
  // Amsterdam city places
  'Anne Frank House':                 'Anne Frank House',
  'Rijksmuseum':                      'Rijksmuseum',
  'Canal Ring Boat Tour':             'Amsterdam canals',
  'Jordaan Neighbourhood':            'Jordaan',
  'NDSM Wharf':                       'NDSM-werf',
  // London city places
  'British Museum':                   'British Museum',
  'Tower of London':                  'Tower of London',
  'Buckingham Palace':                'Buckingham Palace',
  'Borough Market':                   'Borough Market',
  'Columbia Road Flower Market':      'Columbia Road Flower Market',
  // Oslo city places
  'Vigeland Sculpture Park':          'Vigeland Park',
  'Aker Brygge':                      'Aker Brygge',
  'Holmenkollen Ski Jump':            'Holmenkollen ski jump',
  // Stockholm city places
  'Vasa Museum':                      'Vasa (ship)',
  'Gamla Stan Old Town':              'Gamla Stan',
  'ABBA Museum':                      'ABBA The Museum',
  'Djurgården Island':                'Djurgården',
  // Krakow city places
  'Wawel Royal Castle':               'Wawel Castle',
  'Kazimierz Jewish Quarter':         'Kazimierz',
  'Nowa Huta Soviet District':        'Nowa Huta',
  // Dubrovnik city places
  'Old City Walls Walk':              'Dubrovnik',
  'Lokrum Island':                    'Lokrum',
  // Tbilisi city places
  'Narikala Fortress':                'Narikala',
  'Sulphur Baths Abanotubani':        'Abanotubani',
  'Rustaveli Avenue':                 'Rustaveli Avenue',
  'Jvari Monastery':                  'Jvari Monastery',
  'Mtatsminda Park':                  'Mtatsminda',
  // New York city places
  'Metropolitan Museum of Art':       'Metropolitan Museum of Art',
  'Brooklyn Bridge Walk':             'Brooklyn Bridge',
  'High Line Park':                   'High Line (New York City)',
  'Dumbo Brooklyn':                   'DUMBO, Brooklyn',
  // Los Angeles
  'Griffith Observatory':             'Griffith Observatory',
  'Getty Center':                     'Getty Center',
  'Santa Monica Pier':                'Santa Monica Pier',
  'Getty Villa':                      'Getty Villa',
  'Grand Central Market DTLA':        'Grand Central Market (Los Angeles)',
  // San Francisco
  'Golden Gate Bridge':               'Golden Gate Bridge',
  'Alcatraz Island':                  'Alcatraz Island',
  "Fisherman's Wharf":                "Fisherman's Wharf, San Francisco",
  'Mission District Murals':          'Clarion Alley',
  'Lands End Trail':                  'Lands End (San Francisco)',
  // Toronto city places
  'Royal Ontario Museum':             'Royal Ontario Museum',
  'Kensington Market':                'Kensington Market',
  'Distillery Historic District':     'Distillery District',
  'Toronto Islands':                  'Toronto Islands',
  // Vancouver city places
  'Stanley Park Seawall':             'Stanley Park',
  'Granville Island Market':          'Granville Island',
  'Gastown Steam Clock District':     'Gastown',
  'Grouse Mountain':                  'Grouse Mountain',
  // Mexico City
  'Teotihuacán Pyramids':             'Teotihuacan',
  'National Museum of Anthropology':  'National Museum of Anthropology (Mexico)',
  'Zócalo':                           'Mexico City Metropolitan Cathedral',
  'Xochimilco Floating Gardens':      'Xochimilco',
  // Rio de Janeiro
  'Christ the Redeemer':              'Christ the Redeemer',
  'Sugarloaf Mountain Cable Car':     'Sugarloaf Mountain',
  'Copacabana':                       'Copacabana, Rio de Janeiro',
  'Santa Teresa Arts District':       'Santa Teresa, Rio de Janeiro',
  'Lapa Arches':                      'Escadaria Selarón',
  // Buenos Aires
  'Recoleta Cemetery':                'La Recoleta Cemetery',
  'La Boca Caminito Tango District':  'La Boca',
  'San Telmo':                        'San Telmo',
  'Teatro Colón Opera House':         'Teatro Colón',
  'Palermo Soho Neighbourhood':       'Palermo, Buenos Aires',
  // Cartagena
  'Walled City Centro Histórico':     'Cartagena de Indias',
  'Castillo San Felipe de Barajas':   'Castillo de San Felipe de Barajas',
  'Getsemaní':                        'Getsemaní',
  // Cusco
  'Machu Picchu':                     'Machu Picchu',
  'Sacsayhuamán Fortress':            'Sacsayhuamán',
  'Sacred Valley':                    'Sacred Valley',
  'Pisac Ruins':                      'Pisac',
  'Rainbow Mountain Vinicunca':       'Vinicunca',
  // Cairo city places
  'Pyramids of Giza':                 'Great Pyramid of Giza',
  'Egyptian Museum':                  'Egyptian Museum',
  'Khan el-Khalili Bazaar':           'Khan el-Khalili',
  'Coptic Cairo Quarter':             'Coptic Cairo',
  'Al-Muizz Street':                  'Al-Muizz Street',
  // Marrakech city places
  'Jemaa el-Fna Square':              'Jemaa el-Fna',
  'Bahia Palace':                     'Bahia Palace',
  'Medina Souk Maze':                 'Majorelle Garden',
  'El Badi Palace Ruins':             'El Badi Palace',
  // Cape Town city places
  'Table Mountain Cable Car':         'Table Mountain',
  'Cape Point':                       'Cape of Good Hope',
  'Boulders Beach Penguin Colony':    'Boulders Beach',
  'V&A Waterfront':                   'V&A Waterfront',
  'Constantia Wine Valley':           'Constantia, Cape Town',
  // Nairobi city places
  'Nairobi National Park':            'Nairobi National Park',
  'David Sheldrick Elephant Orphanage':'David Sheldrick Wildlife Trust',
  'Karen Blixen Museum':              'Karen Blixen Museum',
  'Giraffe Centre':                   'African Fund for Endangered Wildlife',
  // Sydney city places
  'Sydney Harbour Bridge Climb':      'Sydney Harbour Bridge',
  'Royal Botanic Garden':             'Royal Botanic Garden, Sydney',
  'Newtown Bohemian Neighbourhood':   'Newtown, New South Wales',
  // Melbourne city places
  'Great Ocean Road':                 'Great Ocean Road',
  'Federation Square':                'Federation Square',
  'Queen Victoria Market':            'Queen Victoria Market',
  'Fitzroy Street Art Laneways':      'Fitzroy, Victoria',
  'Dandenong Ranges Day Trip':        'Dandenong Ranges',
  // Queenstown
  'Bungee Jump AJ Hackett Kawarau':   'Queenstown, New Zealand',
  'Milford Sound Day Trip':           'Milford Sound',
  'The Remarkables Ski Field':        'The Remarkables',
  'Glenorchy Lord of the Rings':      'Glenorchy, New Zealand',
  // Mumbai city places
  'Gateway of India':                 'Gateway of India',
  'Dharavi Slum Tour':                'Dharavi',
  'Elephanta Caves':                  'Elephanta Caves',
  'Marine Drive':                     'Marine Drive, Mumbai',
  "Marine Drive Queen's Necklace":    'Marine Drive, Mumbai',
  'Dhobi Ghat':                       'Dhobi Ghat',
  'Dhobi Ghat Open Air Laundry':      'Dhobi Ghat',
  // Delhi city places
  'Red Fort':                         'Red Fort',
  'Qutub Minar':                      'Qutb Minar',
  "Humayun's Tomb":                   "Humayun's Tomb",
  'Chandni Chowk':                    'Chandni Chowk',
  'Chandni Chowk Street Food Walk':   'Chandni Chowk',
  'Lodhi':                            'Lodhi Colony',
  // Jaipur city places
  'Hawa Mahal Palace of Winds':       'Hawa Mahal',
  'City Palace':                      'City Palace, Jaipur',
  'Jantar Mantar Observatory':        'Jantar Mantar, Jaipur',
  'Anokhi Block Print Museum':        'Anokhi Museum of Hand Printing',
  // Varanasi city places
  'Dashashwamedh Ghat Aarti Ceremony':'Dashashwamedh Ghat',
  'Sunrise Boat Ride on Ganges':      'Dashashwamedh Ghat',
  'Sarnath Buddhist Site':            'Sarnath',
  'Kashi Vishwanath Temple':          'Kashi Vishwanath Temple',
  // Bangalore city places
  'Lalbagh Botanical Garden':         'Lalbagh',
  'Lalbagh':                          'Lalbagh',
  'Bangalore Palace':                 'Bangalore Palace',
  'Cubbon Park':                      'Cubbon Park',
  // Hyderabad city places
  'Golconda Fort':                    'Golconda Fort',
  'Hussain Sagar Lake':               'Hussain Sagar',
  'Chowmahalla Palace':               'Chowmahalla Palace',
  // Kolkata city places
  'Victoria Memorial':                'Victoria Memorial, Kolkata',
  'Howrah Bridge':                    'Howrah Bridge',
  'Dakshineswar Kali Temple':         'Dakshineswar Kali Temple',
  // Kochi city places
  'Fort Kochi Chinese Fishing Nets':  'Cheena vala',
  'Jewish Synagogue Mattancherry':    'Paradesi Synagogue',
  'Kerala Kathakali Performance':     'Kathakali',
  'Kerala Backwaters Houseboat':      'Kerala backwaters',
  // Agra city places
  'Taj Mahal Sunrise View':           'Taj Mahal',
  'Agra Fort':                        'Agra Fort',
  'Mehtab Bagh Moonrise Garden':      'Mehtab Bagh',
  // Udaipur city places (keys = post-cleanPlaceName output)
  'Lake Pichola':                     'Lake Pichola',
  'Jag Mandir':                       'Jag Mandir',
  // 'Sajjangarh' key already defined above (mapped to 'Sajjangarh') — no duplicate needed
  'Bagore Ki Haveli Folk Show':       'Bagore Ki Haveli',
  // Jodhpur city places
  'Blue City Rooftop Views':          'Jodhpur',
  'Mandore Gardens':                  'Mandore',
  // Amritsar city places (key for Golden Temple = after stripping parenthetical)
  'Golden Temple':                    'Harmandir Sahib',
  'Wagah Border Beating Retreat':     'Wagah border ceremony',
  'Jallianwala Bagh Memorial':        'Jallianwala Bagh',
  'Partition Museum':                 'Partition Museum',
  // Rishikesh city places
  'Laxman Jhula':                     'Laxman Jhula',
  'Triveni Ghat Evening Aarti':       'Triveni Ghat',
  'Beatles Ashram (Chaurasi Kutia)':  'Chaurasi Kutia',
  'Beatles Ashram':                   'Chaurasi Kutia',
  'White-Water Rafting Ganges':       'Rishikesh',
  // Shimla city places
  'Toy Train Kalka-Shimla Railway':   'Kalka-Shimla Railway',
  'Jakhu Temple':                     'Jakhu Temple',
  // Manali city places
  'Solang Valley Snow Activities':    'Solang Valley',
  'Hadimba Devi Temple Forest':       'Hadimba Devi Temple',
  // Darjeeling city places
  'Tiger Hill Kanchenjunga Sunrise':  'Tiger Hill, Darjeeling',
  'Darjeeling Himalayan Toy Train':   'Darjeeling Himalayan Railway',
  'Happy Valley Tea Estate Tour':     'Happy Valley Tea Estate',
  'Batasia Loop':                     'Batasia Loop',
  'Sandakphu Trek Gateway':           'Sandakphu',
  // Pune city places
  'Shaniwar Wada Palace Ruins':       'Shaniwar Wada',
  'Aga Khan Palace':                  'Aga Khan Palace, Pune',
  'Sinhagad Fort Trek':               'Sinhagad',
  'Osho Meditation Resort':           'Osho International Meditation Resort',
  'Koregaon Park Café District':      'Koregaon Park',
  // Ahmedabad city places
  'Sabarmati Ashram':                 'Sabarmati Ashram',
  'Old City Pols':                    'Pol (architecture)',
  'Adalaj Stepwell':                  'Adalaj',
  'Kankaria Lake':                    'Kankaria',
  'Calico Museum of Textiles':        'Calico Museum of Textiles',
  // Mysuru city places
  'Mysore Palace (Amba Vilas)':       'Mysore Palace',
  'Chamundi Hill Temple':             'Chamundeshwari Temple',
  'Brindavan Gardens':                'Brindavan Gardens',
  'Devaraja Market':                  'Devaraja Market, Mysore',
  'Namdroling Monastery Bylakuppe':   'Namdroling Monastery',
  // Munich city places
  'Marienplatz':                      'Marienplatz',
  'Marienplatz & Glockenspiel':       'Marienplatz',
  'English Garden Beer Gardens':      'English Garden, Munich',
  'Deutsches Museum':                 'Deutsches Museum',
  'Nymphenburg Palace':               'Nymphenburg Palace',
  // Copenhagen city places
  'Nyhavn Colourful Harbour':         'Nyhavn',
  'The Little Mermaid Statue':        'The Little Mermaid (statue)',
  'Freetown Christiania':             'Freetown Christiania',
  'Louisiana Museum of Modern Art':   'Louisiana Museum of Modern Art',
  // Edinburgh city places
  'Edinburgh Castle':                 'Edinburgh Castle',
  'Royal Mile':                       'Palace of Holyroodhouse',
  "Arthur's Seat Hike":               "Arthur's Seat",
  'Rosslyn Chapel':                   'Rosslyn Chapel',
  // Porto city places
  'Ribeira Waterfront District':      'Ribeira, Porto',
  'Dom Luís I Bridge Views':          'Dom Luís I Bridge',
  'Port Wine Cellars Vila Nova de Gaia':'Port wine',
  'Livraria Lello Bookshop':          'Livraria Lello',
  // Bruges city places
  'Market Square':                    'Belfry of Bruges',
  'Begijnhof Beguinage':              'Begijnhof, Bruges',
  // Salzburg city places
  'Mirabell Gardens':                 'Mirabell Palace',
  "Mozart's Birthplace Museum":       "Mozart's Birthplace",
  'Hellbrunn Trick Fountains':        'Hellbrunn Palace',
  'Salzkammergut Lakes Day Trip':     'Hallstatt',
  // Seville city places
  'Real Alcázar Palace':              'Alcázar of Seville',
  'Seville Cathedral':                'Seville Cathedral',
  'Barrio Santa Cruz':                'Barrio Santa Cruz, Seville',
  'Triana Flamenco District':         'Triana, Seville',
  'Plaza de España':                  'Plaza de España, Seville',
  // Phuket city places
  'Phi Phi Islands Day Trip':         'Phi Phi Islands',
  'Phang Nga Bay Sea Kayaking':       'Phang Nga Bay',
  'Big Buddha Viewpoint':             'Great Buddha of Thailand',
  'Old Phuket Town Sino-Portuguese':  'Phuket Old Town',
  'Similan Islands Snorkelling':      'Similan Islands',
  // Colombo city places
  'Gangaramaya Temple':               'Gangaramaya Temple',
  'Galle Face Green':                 'Galle Face Green',
  'National Museum of Colombo':       'National Museum of Colombo',
  'Pettah Bazaar District':           'Pettah',
  'Beira Lake':                       'Seema Malaka',
  // Taipei city places
  'Taipei 101 Sky Deck':              'Taipei 101',
  'Chiang Kai-shek Memorial Hall':    'Chiang Kai-shek Memorial Hall',
  'Shilin Night Market':              'Shilin Night Market',
  'Yangmingshan National Park':       'Yangmingshan National Park',
  // Manila city places
  'Intramuros Walled City':           'Intramuros',
  'Rizal Park':                       'Rizal Park',
  'Binondo Chinatown Food Walk':      'Binondo',
  'BGC Street Art District':          'Bonifacio Global City',
  // Yangon city places
  'Bogyoke Aung San Market':          'Bogyoke Aung San Market',
  'Kandawgyi Lake':                   'Kandawgyi Lake',
  'Circular Train City Loop':         'Yangon Circular Railway',
  // Phnom Penh city places
  'Royal Palace':                     'Royal Palace, Phnom Penh',
  'Tuol Sleng Genocide Museum':       'Tuol Sleng Genocide Museum',
  'Wat Phnom Hill Temple':            'Wat Phnom',
  'Central Market Art Deco Dome':     'Central Market, Phnom Penh',
  // Muscat city places
  'Sultan Qaboos Grand Mosque':       'Sultan Qaboos Grand Mosque',
  'Muttrah Souk':                     'Muttrah',
  'Royal Opera House Muscat':         'Royal Opera House Muscat',
  // Chicago city places
  'Millennium Park':                  'Cloud Gate',
  'Art Institute of Chicago':         'Art Institute of Chicago',
  'Chicago Riverwalk Architecture':   'Chicago Riverwalk',
  'Lincoln Park Zoo':                 'Lincoln Park Zoo',
  // Miami city places
  'South Beach Art Deco District':    'South Beach',
  'Wynwood Walls Street Art':         'Wynwood Walls',
  'Everglades Airboat Tour':          'Everglades National Park',
  'Little Havana Calle Ocho':         'Little Havana',
  // Lima city places
  'Larco Museum Pre-Columbian Art':   'Larco Museum',
  'Historic Centre':                  'Historic Centre of Lima',
  'Barranco Bohemian District':       'Barranco District',
  // Bogotá city places
  'Gold Museum (Museo del Oro)':      'Museo del Oro',
  'La Candelaria':                    'La Candelaria',
  'Monserrate Hill Gondola':          'Monserrate (Bogotá)',
  // Medellín city places
  'Plaza Botero Sculptures':          'Plaza Botero',
  'Guatapé Piedra del Peñol Day Trip':'El Peñol',
  // Havana city places
  'Old Havana UNESCO Historic Centre':'Old Havana',
  'Malecón Seafront':                 'Malecón, Havana',
  'Viñales Valley Day Trip':          'Viñales Valley',
  // Cancún city places
  'Chichén Itzá Day Trip':            'Chichen Itza',
  'Isla Mujeres Day Trip':            'Isla Mujeres',
  'Cenote Ik Kil Swimming':           'Ik Kil',
  'Tulum Ruins':                      'Tulum (Maya site)',
  // Luxor city places
  'Karnak Temple Complex':            'Karnak',
  'Luxor Temple by Night':            'Luxor Temple',
  'Medinet Habu Mortuary Temple':     'Medinet Habu',
  // Mombasa city places
  'Fort Jesus UNESCO World Heritage': 'Fort Jesus',
  'Diani Beach':                      'Diani Beach',
  'Old Town Swahili Quarter':         'Mombasa Old Town',
  // Casablanca city places
  "Hassan II Mosque (world's largest)":'Hassan II Mosque',
  "Rick's Café Casablanca":           'Hassan II Mosque',
  'Old Medina':                       'Chefchaouen',
  // Goa city places
  'Baga':                             'Baga Beach',
  'Old Goa Basilica of Bom Jesus':    'Basilica of Bom Jesus',
  'Dudhsagar Waterfalls':             'Dudhsagar Falls',
  'Anjuna Flea Market':               'Anjuna beach',
  // Leh city places
  'Pangong Tso Lake':                 'Pangong Lake',
  'Nubra Valley':                     'Nubra Valley',
  'Khardung La Pass':                 'Khardung La',
  'Hemis Monastery':                  'Hemis Monastery',
  'Thiksey Monastery':                'Thiksey Monastery',
  // Srinagar city places
  'Dal Lake Shikara Ride':            'Dal Lake',
  'Mughal Gardens':                   'Shalimar Bagh, Srinagar',
  'Gulmarg Gondola':                  'Gulmarg',
  'Pahalgam Valley':                  'Pahalgam',
  // Alleppey city places
  'Backwater Houseboat Cruise':       'Kerala backwaters',
  'Kumarakom Bird Sanctuary':         'Kumarakom Bird Sanctuary',
  // Munnar city places
  'Eravikulam National Park':         'Eravikulam National Park',
  'Mattupetty Dam':                   'Mattupetty',
  // Hampi city places
  'Virupaksha Temple':                'Virupaksha Temple, Hampi',
  'Vittala Temple':                   'Vittala Temple',
  'Tungabhadra River Coracle Ride':   'Tungabhadra River',
  // Pondicherry city places
  'Auroville Matrimandir':            'Auroville',
  'Sri Aurobindo Ashram':             'Sri Aurobindo Ashram, Pondicherry',
  // Gangtok city places
  'Tsomgo Lake':                      'Tsomgo Lake',
  'Rumtek Monastery':                 'Rumtek Monastery',
  'Nathu La Pass Border':             'Nathu La',
  // Shillong city places
  'Living Root Bridges Cherrapunji':  'Living root bridge',
  'Dawki Crystal River':              'Dawki River',
  "Mawlynnong Asia's Cleanest Village":'Mawlynnong',
  // Madurai city places
  'Meenakshi Amman Temple':           'Meenakshi Amman Temple',
  'Thirumalai Nayakkar Palace':       'Tirumalai Nayak Palace',
  // Ooty city places
  'Nilgiri Mountain Railway Toy Train':'Nilgiri Mountain Railway',
  'Doddabetta Peak':                  'Doddabetta',
  // Pushkar city places
  'Pushkar Camel Fair Grounds':       'Pushkar fair',
  'Sand Dunes Desert Safari':         'Thar Desert',
  // Aurangabad city places
  'Ajanta Caves UNESCO':              'Ajanta Caves',
  'Ellora Caves UNESCO':              'Ellora Caves',
  'Bibi Ka Maqbara (Mini Taj)':       'Bibi Ka Maqbara',
  'Daulatabad Fort':                  'Daulatabad Fort',
  // Tirupati city places
  'Tirumala Venkateswara Temple':     'Tirumala Venkateswara Temple',
  // Puri city places
  'Jagannath Temple':                 'Jagannath Temple, Puri',
  'Konark Sun Temple UNESCO':         'Konark Sun Temple',
  'Chilika Lake Dolphin Tour':        'Chilika Lake',
  // Siem Reap city places
  'Angkor Wat Sunrise':               'Angkor Wat',
  'Bayon Temple Faces':               'Bayon',
  'Ta Prohm (Tomb Raider Temple)':    'Ta Prohm',
  'Tonle Sap Lake Floating Villages': 'Tonle Sap',
  // Hoi An city places
  'Ancient Town Lantern Night':       'Hội An',
  'My Son Sanctuary':                 'Mỹ Sơn',
  // Bagan city places
  'Hot Air Balloon over 2000 Temples':'Bagan',
  'Ananda Temple':                    'Ananda Temple, Bagan',
  'Shwezigon Pagoda':                 'Shwezigon Pagoda',
  'Shwesandaw Pagoda Sunset':         'Shwesandaw Pagoda',
  // Luang Prabang city places
  'Monk Alms Giving Ceremony':        'Luang Prabang',
  'Mount Phousi Sunset':              'Phou Si, Luang Prabang',
  'Royal Palace Museum':              'Royal Palace, Luang Prabang',
  // Samarkand city places
  'Registan Square':                  'Registan',
  'Shah-i-Zinda Necropolis':          'Shah-i-Zinda',
  'Bibi-Khanym Mosque':               'Bibi-Khanym Mosque',
  'Gur-e-Amir Mausoleum of Tamerlane':'Gur-e-Amir',
  // Abu Dhabi city places
  'Sheikh Zayed Grand Mosque':        'Sheikh Zayed Grand Mosque',
  'Louvre Abu Dhabi':                 'Louvre Abu Dhabi',
  'Ferrari World Roller Coasters':    'Ferrari World Abu Dhabi',
  'Qasr Al Watan Palace':             'Qasr Al Watan',
  'Yas Island':                       'Yas Island',
  // Doha city places
  'Museum of Islamic Art':            'Museum of Islamic Art (Doha)',
  'Souq Waqif':                       'Souq Waqif',
  'The Pearl Island':                 'The Pearl, Qatar',
  'National Museum of Qatar':         'National Museum of Qatar',
  // Yerevan city places
  'Cascade Stairway':                 'Cascade (Yerevan)',
  'Khor Virap Monastery':             'Khor Virap',
  'Garni Temple':                     'Temple of Garni',
  'Republic Square Fountain Show':    'Republic Square, Yerevan',
  // Baku city places
  'Icherisheher Old City UNESCO':     'Icherisheher',
  'Flame Towers':                     'Flame Towers',
  'Heydar Aliyev Centre':             'Heydar Aliyev Center',
  'Gobustan Rock Art':                'Gobustan National Park',
  'Baku Boulevard':                   'Baku Boulevard',
  // Reykjavik city places
  'Northern Lights Tour':             'Aurora borealis',
  'Blue Lagoon Geothermal Spa':       'Blue Lagoon (geothermal spa)',
  'Golden Circle (Geysir, Gullfoss, Þingvellir)': 'Geysir',
  'Hallgrímskirkja Church View':      'Hallgrímskirkja',
  // Santorini city places
  'Oia Village Sunset':               'Oia, Santorini',
  'Caldera Rim Walk':                 'Oia, Santorini',
  'Black Sand Perissa Beach':         'Perissa',
  'Ancient Akrotiri Minoan City':     'Akrotiri (Santorini)',
  // Madrid city places
  'Prado Museum':                     'Museo del Prado',
  'Retiro Park':                      'Retiro Park',
  'Gran Via':                         'Gran Vía, Madrid',
  'El Rastro Sunday Flea Market':     'El Rastro',
  // Milan city places
  'The Last Supper (Leonardo da Vinci)':'The Last Supper',
  'Milan Cathedral Duomo Rooftop':    'Milan Cathedral',
  'Galleria Vittorio Emanuele II':    'Galleria Vittorio Emanuele II',
  'Brera Art Gallery':                'Pinacoteca di Brera',
  'Navigli Canals Evening':           'Navigli (Milan)',
  // Naples city places
  'Pompeii Archaeological Site':      'Pompeii',
  'Original Neapolitan Pizza Tour':   'Naples',
  'Mount Vesuvius Hike':              'Mount Vesuvius',
  "Castel dell'Ovo":                  "Castel dell'Ovo",
  // Brussels city places
  'Belgian Chocolate':                'Grand Place, Brussels',
  'Atomium':                          'Atomium',
  // Helsinki city places
  'Senate Square':                    'Helsinki Cathedral',
  'Suomenlinna Sea Fortress UNESCO':  'Suomenlinna',
  'Temppeliaukio Church':             'Temppeliaukio Church',
  // Tallinn city places
  'Old Town Medieval Walls':          'Tallinn Old Town',
  'Toompea Castle':                   'Alexander Nevsky Cathedral, Tallinn',
  'Town Hall Square':                 'Tallinn Town Hall',
  'Telliskivi Creative City':         'Telliskivi Creative City',
  // Warsaw city places
  'Old Town Market Square UNESCO':    'Warsaw Old Town Market Place',
  'Warsaw Rising Museum':             'Warsaw Rising Museum',
  'Royal Castle':                     'Royal Castle, Warsaw',
  'Łazienki Park':                    'Łazienki Park',
  // Zurich city places
  'Old Town Altstadt':                'Zurich Old Town',
  'Lake Zurich':                      'Lake Zurich',
  'Uetliberg Mountain Panorama':      'Uetliberg',
  // Las Vegas city places
  'The Strip at Night':               'Las Vegas Strip',
  'Grand Canyon South Rim Day Trip':  'Grand Canyon',
  'Fremont Street Experience':        'Fremont Street Experience',
  'Red Rock Canyon Hike':             'Red Rock Canyon National Conservation Area',
  'Hoover Dam':                       'Hoover Dam',
  // Washington DC city places
  'National Mall':                    'Lincoln Memorial',
  'Smithsonian Museums (all free)':   'Smithsonian Institution',
  'Cherry Blossoms Tidal Basin':      'National Cherry Blossom Festival',
  'Capitol Hill':                     'United States Capitol',
  // New Orleans city places
  'French Quarter':                   'French Quarter',
  'Jazz on Frenchmen Street':         'Frenchmen Street',
  'Garden District':                  'Garden District, New Orleans',
  "Café Du Monde Beignets":           'Café Du Monde',
  // Montréal city places
  'Old Montreal Cobblestone Quarter': 'Old Montreal',
  'Mount Royal Park':                 'Mount Royal',
  'Notre-Dame Basilica':              'Notre-Dame Basilica of Montreal',
  // São Paulo city places
  'Ibirapuera Park':                  'Ibirapuera Park',
  'MASP Museum of Art':               'São Paulo Museum of Art',
  'Vila Madalena Street Art (Batman Alley)':'Batman Alley',
  // Santiago city places
  'San Cristóbal Hill Viewpoint':     'San Cristóbal Hill (Santiago)',
  'Plaza de Armas':                   'Plaza de Armas, Santiago',
  'Valparaíso Colourful City Day Trip':'Valparaíso',
  // Machu Picchu city places
  'Machu Picchu Citadel Sunrise':     'Machu Picchu',
  'Huayna Picchu Mountain Hike':      'Huayna Picchu',
  'Inca Bridge Cliff Trail':          'Machu Picchu',
  // Zanzibar city places
  'Stone Town UNESCO Old City':       'Stone Town',
  'Nungwi Beach':                     'Nungwi',
  'Jozani Chimpanzee Forest':         'Jozani–Chwaka Bay National Park',
  // Victoria Falls city places
  'Victoria Falls UNESCO Wonder':     'Victoria Falls',
  'Bungee Jump Victoria Falls Bridge':'Victoria Falls Bridge',
  'White Water Rafting Zambezi':      'Zambezi River',
  // Amman city places
  'Amman Citadel':                    'Citadel of Amman',
  'Roman Theatre':                    'Roman Theatre, Amman',
  'Jerash Roman City Day Trip':       'Jerash',
  // Addis Ababa city places
  'National Museum (Lucy fossil)':    'National Museum of Ethiopia',
  'Holy Trinity Cathedral':           'Holy Trinity Cathedral, Addis Ababa',
  "Mercato Africa's Largest Market":  'Mercato (Addis Ababa)',
  'Entoto Mountain Forest':           'Entoto',

  // ── Cities ─────────────────────────────────────────────────────────────────
  'Tokyo':        'Senso-ji',
  'Kyoto':        'Fushimi Inari-taisha',
  'Osaka':        'Dotonbori',
  'Paris':        'Paris',
  'Rome':         'Colosseum',
  'London':       'Tower Bridge',
  'New York':     'Central Park',
  'Sydney':       'Sydney Opera House',
  'Dubai':        'Burj Khalifa',
  'Bangkok':      'Wat Arun',
  'Barcelona':    'Sagrada Familia',
  'Istanbul':     'Hagia Sophia',
  'Mumbai':       'Gateway of India',
  'Delhi':        'Red Fort',
  'Jaipur':       'Amber Fort',
  'Varanasi':     'Dashashwamedh Ghat',
  'Agra':         'Taj Mahal',
  'Moscow':       "Saint Basil's Cathedral",
  'Saint Petersburg': 'Peterhof Palace',
  'Prague':       'Prague Old Town Square',
  'Vienna':       'Schönbrunn Palace',
  'Budapest':     'Fisherman\'s Bastion',
  'Amsterdam':    'Keukenhof',
  'Copenhagen':   'Nyhavn',
  'Stockholm':    'Gamla Stan',
  'Athens':       'Parthenon',
  'Lisbon':       'Belém Tower',
  'Madrid':       'Royal Palace of Madrid',
  'Brussels':     'Grand Place, Brussels',
  'Zurich':       'Old Town of Zurich',
  'Dublin':       'Trinity College, Dublin',
  'Warsaw':       'Warsaw Old Town Market Place',
  'Bucharest':    'Palace of the Parliament',
  'Cairo':        'Great Pyramid of Giza',
  'Marrakech':    'Jardin Majorelle',
  'Cape Town':    'Table Mountain',
  'Nairobi':      'Nairobi National Park',
  'Petra':        'Petra',
  'Riyadh':       'Kingdom Centre',
  'Kathmandu':    'Boudhanath',
  'Colombo':      'Gangaramaya Temple',
  'Hanoi':        'Ha Long Bay',
  'Ho Chi Minh City': 'Bến Thành Market',
  'Phnom Penh':   'Royal Palace, Phnom Penh',
  'Kuala Lumpur': 'Petronas Towers',
  'Manila':       'Chocolate Hills',
  'Seoul':        'Gyeongbokgung Palace',
  'Taipei':       'Taipei 101',
  'Reykjavik':    'Reynisfjara',
  'Athens':       'Acropolis of Athens',
  'Vilnius':      'Trakai Island Castle',
  'Riga':         'Riga Old Town',
  'Tallinn':      'Tallinn Old Town',
  'Casablanca':   'Hassan II Mosque',
  'Fez':          'Fez, Morocco',
  'Marrakech':    'Majorelle Garden',
  'Algiers':      'Casbah of Algiers',
  'Montreal':     'Old Montreal',
  'Toronto':      'CN Tower',
  'Calgary':      'Banff National Park',
  'Quebec City':  'Old Quebec',
  'Versailles':   'Palace of Versailles',
  // ── Indonesia places ────────────────────────────────────────────────────────
  'Bali':                          'Tanah Lot',
  'Borobudur Temple':              'Borobudur',
  'Komodo Island':                 'Komodo National Park',
  'Yogyakarta':                    'Prambanan',
  'Raja Ampat':                    'Raja Ampat Islands',
  'Lombok':                        'Mount Rinjani',
  'Mount Bromo':                   'Mount Bromo',
  'Bromo':                         'Mount Bromo',
  'Ubud':                          'Tegallalang',
  'Tanah Lot':                     'Tanah Lot',
  'Tana Toraja':                   'Tana Toraja',
  'Flores':                        'Komodo National Park',
  // ── Sri Lanka places ─────────────────────────────────────────────────────────
  'Sigiriya Rock Fortress':        'Sigiriya',
  'Sigiriya Rock':                 'Sigiriya',
  'Temple of the Tooth':           'Temple of the Tooth',
  'Kandy':                         'Temple of the Tooth',
  'Galle Fort':                    'Galle Fort',
  "Adam's Peak":                   "Adam's Peak",
  'Nine Arch Bridge':              'Nine Arch Bridge, Demodara',
  'Ella':                          'Nine Arch Bridge, Demodara',
  'Mirissa':                       'Mirissa',
  'Pinnawala':                     'Pinnawala Elephant Orphanage',
  'Horton Plains':                 'Horton Plains National Park',
  // ── Myanmar places ────────────────────────────────────────────────────────────
  'Bagan Ancient Temples':         'Bagan',
  'Shwedagon Pagoda':              'Shwedagon Pagoda',
  'Inle Lake':                     'Inle Lake',
  'Mandalay':                      'Mandalay Hill',
  'Ngapali Beach':                 'Ngapali',
  'Kyaiktiyo':                     'Kyaiktiyo Pagoda',
  'Golden Rock':                   'Kyaiktiyo Pagoda',
  'Hpa-An':                        'Hpa-an',
  'Kalaw':                         'Kalaw',
  // ── Thailand places ───────────────────────────────────────────────────────────
  'Chiang Mai':                    'Doi Suthep',
  'Phuket':                        'Phi Phi Islands',
  'Koh Samui':                     'Koh Samui',
  'Ayutthaya Historical Park':     'Ayutthaya',
  'Ayutthaya':                     'Ayutthaya',
  'Pai':                           'Pai, Mae Hong Son',
  'Koh Phi Phi':                   'Phi Phi Islands',
  'Railay Beach':                  'Railay Beach',
  'Sukhothai Historical Park':     'Sukhothai Historical Park',
  'Sukhothai':                     'Sukhothai Historical Park',
  'Khao Yai':                      'Khao Yai National Park',
  'Krabi':                         'Railay Beach',
  'Hua Hin':                       'Hua Hin',
  // ── Australia places ──────────────────────────────────────────────────────────
  'Great Barrier Reef':            'Great Barrier Reef',
  'Uluru':                         'Uluru',
  'Daintree Rainforest':           'Daintree National Park',
  'Twelve Apostles':               'Twelve Apostles (Victoria)',
  'Kakadu':                        'Kakadu National Park',
  'Kakadu National Park':          'Kakadu National Park',
  'Whitsunday Islands':            'Whitsunday Islands',
  'Fraser Island':                 'Fraser Island',
  'Blue Mountains':                'Blue Mountains (New South Wales)',
  'Bondi Beach':                   'Bondi Beach',
  'Grampians':                     'Grampians National Park',
  'Ningaloo Reef':                 'Ningaloo Reef',
  'Kangaroo Island':               'Kangaroo Island',
  'Great Ocean Road':              'Great Ocean Road',
  'Cradle Mountain':               'Cradle Mountain-Lake St Clair National Park',
  // ── Laos places ───────────────────────────────────────────────────────────────
  'Kuang Si Falls':                'Tat Kuang Si waterfalls',
  'Plain of Jars':                 'Plain of Jars',
  'Vang Vieng':                    'Vang Vieng',
  'Si Phan Don':                   'Si Phan Don',
  'Wat Phu':                       'Wat Phu',
  'Pakse':                         'Pakse',
  'Nam Ou River':                  'Luang Prabang',
  // ── Vietnam places ─────────────────────────────────────────────────────────────
  'Hoi An Ancient Town':           'Hội An',
  'Hoi An':                        'Hội An',
  'Hanoi Old Quarter':             'Hanoi Old Quarter',
  'Sapa Rice Terraces':            'Sa Pa',
  'Sapa':                          'Sa Pa',
  'Phong Nha Caves':               'Phong Nha-Kẻ Bàng National Park',
  'Phong Nha':                     'Phong Nha-Kẻ Bàng National Park',
  'Hue Imperial City':             'Imperial City, Huế',
  'Hue':                           'Imperial City, Huế',
  'Mekong Delta':                  'Mekong Delta',
  'Da Nang':                       'Da Nang',
  'Nha Trang':                     'Nha Trang',
  'Mui Ne':                        'Mũi Né',
  'Ninh Binh':                     'Tràng An',
  'Trang An':                      'Tràng An',
  'Con Dao':                       'Côn Đảo',
  // ── Philippines places ─────────────────────────────────────────────────────────
  'Palawan El Nido':               'El Nido, Palawan',
  'El Nido':                       'El Nido, Palawan',
  'Boracay':                       'Boracay',
  'Tubbataha Reef':                'Tubbataha Reef',
  'Banaue Rice Terraces':          'Banaue rice terraces',
  'Banaue':                        'Banaue rice terraces',
  'Intramuros':                    'Intramuros',
  'Batanes':                       'Batanes',
  'Mayon Volcano':                 'Mayon',
  'Puerto Princesa':               'Puerto Princesa Subterranean River National Park',
  'Siargao':                       'Siargao',
  'Coron':                         'Coron, Palawan',
  'Vigan':                         'Vigan',
  // ── Taiwan places ──────────────────────────────────────────────────────────────
  'Jiufen Old Street':             'Jiufen',
  'Jiufen':                        'Jiufen',
  'Alishan Forest':                'Alishan National Scenic Area',
  'Alishan':                       'Alishan National Scenic Area',
  'Taroko Gorge':                  'Taroko National Park',
  'Taipei 101':                    'Taipei 101',
  'Kenting National Park':         'Kenting National Park',
  'Tainan':                        'Anping, Tainan',
  'Hualien':                       'Taroko National Park',
  'Penghu':                        'Penghu County',
  // ── New Zealand places ─────────────────────────────────────────────────────────
  'Milford Sound Fiordland':       'Milford Sound',
  'Hobbiton':                      'Hobbiton Movie Set',
  'Hobbiton Movie Set':            'Hobbiton Movie Set',
  'Rotorua':                       'Rotorua',
  'Queenstown':                    'Queenstown, New Zealand',
  'Abel Tasman National Park':     'Abel Tasman National Park',
  'Abel Tasman':                   'Abel Tasman National Park',
  'Tongariro':                     'Tongariro National Park',
  'Franz Josef Glacier':           'Franz Josef Glacier',
  'Bay of Islands':                'Bay of Islands',
  'Wanaka':                        'Lake Wānaka',
  'Fiordland':                     'Milford Sound',
  'Waitomo':                       'Waitomo Caves',
  'Coromandel':                    'Coromandel Peninsula',
  // ── Singapore places ───────────────────────────────────────────────────────────
  'Marina Bay Sands':              'Marina Bay Sands',
  'Sentosa Island':                'Sentosa',
  'Sentosa':                       'Sentosa',
  'Clarke Quay':                   'Clarke Quay',
  'Orchard Road':                  'Orchard Road',
  'Chinatown Singapore':           'Chinatown, Singapore',
  'Little India Singapore':        'Little India, Singapore',
  'Hawker Culture':                'Hawker centre',
  // ── Cambodia places ────────────────────────────────────────────────────────────
  'Siem Reap':                     'Angkor Wat',
  'Angkor Thom':                   'Angkor Thom',
  'Sihanoukville':                 'Sihanoukville',
  'Kulen Mountain':                'Phnom Kulen',
  'Phnom Kulen':                   'Phnom Kulen',
  'Tonle Sap':                     'Tonle Sap',
  'Kampot':                        'Kampot',
  'Koh Rong':                      'Koh Rong',
  // ── France additional places ───────────────────────────────────────────────────
  'Provence':                      'Luberon',
  'Lavender Fields':               'Luberon',
  'Chamonix Mont Blanc':           'Chamonix',
  'Normandy':                      'Normandy landings',
  'Nice':                          'Nice',
  'Cannes':                        'Cannes',
  'Lyon':                          'Lyon',
  'Strasbourg':                    'Strasbourg',
  // ── Additional Middle East / Africa places ──────────────────────────────────────
  'Wadi Rum':                      'Wadi Rum',
  'Dead Sea':                      'Dead Sea',
  'Masada':                        'Masada',
  'Luxor Temple':                  'Luxor Temple',
  'Abu Simbel':                    'Abu Simbel temples',
  'Valley of the Kings':           'Valley of the Kings',
  'Nile River':                    'Nile',
  'Zanzibar':                      'Stone Town',
  'Serengeti':                     'Serengeti National Park',
  'Ngorongoro':                    'Ngorongoro Crater',
  'Sossusvlei':                    'Deadvlei',
  'Fish River Canyon':             'Fish River Canyon',
  'Okavango':                      'Okavango Delta',
  'Victoria Falls':                'Victoria Falls',
  // ── South America additional ────────────────────────────────────────────────────
  'Rio de Janeiro':                'Christ the Redeemer',
  'Iguazu Falls':                  'Iguazu Falls',
  'Buenos Aires':                  'Buenos Aires',
  'Patagonia':                     'Torres del Paine National Park',
  'Atacama Desert':                'Atacama Desert',
  'Galapagos':                     'Galápagos Islands',
  'Cartagena':                     'Cartagena de Indias',
  'Medellín':                      'Medellín',
  'Medellin':                      'Medellín',
  'Cusco':                         'Cusco',
  'Lake Titicaca':                 'Lake Titicaca',
  'Amazon Rainforest':             'Amazon rainforest',
  // ── Ireland places ─────────────────────────────────────────────────────────
  'Ring of Kerry':                 'Ring of Kerry',
  "Giant's Causeway":              "Giant's Causeway",
  'Kilkenny Castle':               'Kilkenny Castle',
  // ── Nordic additional ──────────────────────────────────────────────────────
  'Abisko National Park':          'Abisko National Park',
  'Finnish Lapland':               'Aurora borealis',
  'Northern Lights Tromso':        'Aurora borealis',
  'Fjords of Western Norway':      'Sognefjord',
  'Lofoten Islands':               'Lofoten',
  'Bergen':                        'Bryggen',
  'Oslo':                          'Oslo City Hall',
  'Turku Archipelago':             'Archipelago Sea',
  'Tampere':                       'Tampere',
  'Helsinki':                      'Helsinki Cathedral',
  'Rovaniemi':                     'Rovaniemi',
  // ── Germany additional ─────────────────────────────────────────────────────
  'Rhine Valley':                  'Loreley',
  'Neuschwanstein Castle':         'Neuschwanstein Castle',
  'Black Forest':                  'Black Forest',
  'Berlin':                        'Brandenburg Gate',
  'Munich':                        'Marienplatz',
  // ── Spain additional ───────────────────────────────────────────────────────
  'Ibiza':                         'Es Vedrà',
  'Alhambra':                      'Alhambra',
  'Sagrada Família':               'Sagrada Família',
  // ── Portugal additional ────────────────────────────────────────────────────
  'Sintra':                        'Sintra National Palace',
  'Algarve Coast':                 'Algar de Benagil',
  'Douro Valley':                  'Douro Valley',
  // ── Greece additional ──────────────────────────────────────────────────────
  'Santorini':                     'Oia, Santorini',
  'Mykonos':                       'Chora, Mykonos',
  'Crete':                         'Knossos',
  'Athens & Acropolis':            'Acropolis of Athens',
  // ── North Macedonia places ─────────────────────────────────────────────────
  'Ohrid Old Town and Lake':       'Ohrid',
  'Skopje':                        'Skopje',
  'Matka Canyon':                  'Matka Canyon',
  'Mavrovo National Park':         'Mavrovo National Park',
  'Sveti Naum Monastery':          'Saint Naum',
  // ── Albania places ─────────────────────────────────────────────────────────
  'Albanian Riviera':              'Ksamil',
  'Berat Old Town UNESCO':         'Berat',
  'Berat Old Town':                'Berat',
  'Gjirokastër Stone City':        'Gjirokastër',
  'Gjirokastër':                   'Gjirokastër',
  'Butrint Ancient Ruins':         'Butrint',
  'Lake Ohrid':                    'Lake Ohrid',
  // ── Ukraine places ─────────────────────────────────────────────────────────
  'Kyiv Pechersk Lavra Monastery': 'Kyiv Pechersk Lavra',
  'Kyiv Pechersk Lavra':           'Kyiv Pechersk Lavra',
  'Lviv Historic Centre':          'Lviv',
  'Chornobyl Exclusion Zone':      'Chernobyl Exclusion Zone',
  'Kamianets-Podilskyi Castle':    'Kamianets-Podilskyi',
  'Carpathian Mountains':          'Carpathian Mountains',
  // ── Italy additional ───────────────────────────────────────────────────────
  'Venice':                        'Grand Canal (Venice)',
  'Florence':                      'Cathedral of Santa Maria del Fiore',
  'Amalfi Coast':                  'Amalfi Coast',
  'Tuscany':                       "Val d'Orcia",
  // ── Saudi Arabia places ────────────────────────────────────────────────────
  'AlUla and Hegra':               'Hegra',
  'Jeddah Historic District':      'Al-Balad, Jeddah',
  'Diriyah':                       'Diriyah',
  'Edge of the World':             'Jebel Fihrayn',
  // ── Latvia places ──────────────────────────────────────────────────────────
  'Riga Art Nouveau Architecture': 'Art Nouveau in Riga',
  'Riga Old Town':                 'Riga',
  'Jūrmala Beach Resort':          'Jūrmala',
  'Gauja National Park Castles':   'Gauja National Park',
  'Cape Kolka Wilderness':         'Cape Kolka',
  // ── Poland additional ──────────────────────────────────────────────────────
  'Krakow Old Town':               'Kraków Old Town',
  'Auschwitz-Birkenau Memorial':   'Auschwitz concentration camp',
  'Wieliczka Salt Mine':           'Wieliczka Salt Mine',
  'Tatra Mountains':               'Tatra Mountains',
  // ── Lithuania additional ───────────────────────────────────────────────────
  'Vilnius Baroque Old Town':      'Vilnius Old Town',
  'Hill of Crosses Šiauliai':      'Hill of Crosses',
  'Curonian Spit Sand Dunes':      'Curonian Spit',
  'Kaunas Interwar Architecture':  'Kaunas',
  // ── Estonia places ─────────────────────────────────────────────────────────
  'Tallinn Medieval Old Town':     'Tallinn Old Town',
  'Lahemaa National Park':         'Lahemaa National Park',
  'Tartu University Town':         'Tartu',
  'Saaremaa Island':               'Saaremaa',
  'Kadriorg Palace Tallinn':       'Kadriorg Palace',
  // ── Saudi Arabia / UAE city fixes (after cleanPlaceName strips suffixes) ───
  'Jeddah':                        'Al-Balad, Jeddah',
  'Desert':                        "Rub' al Khali",
  'Abu Dhabi':                     'Sheikh Zayed Grand Mosque',
  'Palm Jumeirah':                  'Palm Jumeirah',
  'Desert Safari':                  "Rub' al Khali",
  // ── Croatia places ─────────────────────────────────────────────────────────
  'Plitvice Lakes':                 'Plitvice Lakes National Park',
  'Split Diocletians Palace':       "Diocletian's Palace",
  'Hvar Island':                    'Hvar',
  'Istria':                         'Poreč',
  // ── Slovenia places ────────────────────────────────────────────────────────
  'Ljubljana Old Town':             'Ljubljana',
  'Triglav National Park':          'Triglav National Park',
  'Postojna Cave':                  'Postojna Cave',
  'Piran Coastal Town':             'Piran',
  // ── Bosnia places ──────────────────────────────────────────────────────────
  'Mostar Old Bridge Stari Most':   'Stari Most',
  'Sarajevo Old Bazaar':            'Baščaršija',
  'Kravice Waterfalls':             'Kravice Waterfalls',
  'Blagaj Tekke':                   'Blagaj',
  'Una National Park':              'Una National Park',
  // ── Serbia places ──────────────────────────────────────────────────────────
  'Belgrade Fortress Kalemegdan':   'Kalemegdan',
  'Novi Sad':                       'Novi Sad Fortress',
  'Djerdap Gorge Iron Gates':       'Iron Gates (Danube)',
  'Studenica Monastery':            'Studenica Monastery',
  'Tara National Park':             'Tara National Park (Serbia)',
  // ── Slovakia places ────────────────────────────────────────────────────────
  'High Tatras National Park':      'High Tatras',
  'Bojnice Castle':                 'Bojnice Castle',
  'Banská Štiavnica Mining Town':   'Banská Štiavnica',
  'Slovak Paradise Gorges':         'Slovak Paradise',
  // ── Romania places ────────────────────────────────────────────────────────
  'Bran Castle Dracula':            'Bran Castle',
  'Transfăgărășan Road':            'Transfăgărășan',
  'Painted Monasteries Bucovina':   'Painted churches of Moldavia',
  'Sibiu':                          'Sibiu',
  // ── Bulgaria places ───────────────────────────────────────────────────────
  'Sofia Alexander Nevsky Cathedral': 'Alexander Nevsky Cathedral, Sofia',
  'Plovdiv Old Town':               'Plovdiv',
  'Black Sea Coast Sunny Beach':    'Sunny Beach, Bulgaria',
  'Bansko Ski Resort':              'Bansko',
  // ── Czech Republic places ─────────────────────────────────────────────────
  'Cesky Krumlov':                  'Český Krumlov',
  'Kutna Hora':                     'Kutná Hora',
  'Brno':                           'Špilberk Castle',
  // ── Hungary places ────────────────────────────────────────────────────────
  'Lake Balaton':                   'Lake Balaton',
  'Eger':                           'Eger Castle',
  'Pecs':                           'Pécs',
  'Aggtelek Caves':                 'Aggtelek karst',
  // ── Austria additional ────────────────────────────────────────────────────
  'Salzburg':                       'Hohensalzburg Fortress',
  'Innsbruck':                      'Innsbruck',
  'Grossglockner Mountain Road':    'Grossglockner High Alpine Road',
  // ── Belgium places ────────────────────────────────────────────────────────
  'Bruges':                         'Bruges',
  'Ghent':                          'Gravensteen',
  'Antwerp':                        'Cathedral of Our Lady, Antwerp',
  'Ardennes':                       'Ardennes',
  // ── Netherlands places ────────────────────────────────────────────────────
  'Tulip Fields Keukenhof':         'Keukenhof',
  'Kinderdijk Windmills':           'Kinderdijk',
  'Giethoorn Village':              'Giethoorn',
  'The Hague':                      'Peace Palace',
  // ── Denmark places ────────────────────────────────────────────────────────
  'Tivoli Gardens':                 'Tivoli Gardens',
  'Kronborg Castle Hamlet':         'Kronborg',
  'Viking Ship Museum':             'Viking Ship Museum (Roskilde)',
  'Faroe Islands':                  'Faroe Islands',
  // ── Switzerland additional ────────────────────────────────────────────────
  'Interlaken':                     'Interlaken',
  'Jungfraujoch':                   'Jungfraujoch',
  'Lake Geneva':                    'Lake Geneva',
  // ── Turkey additional ─────────────────────────────────────────────────────
  'Pamukkale':                      'Pamukkale',
  'Ephesus':                        'Ephesus',
  'Bodrum':                         'Bodrum Castle',
  // ── Other European cities / places ────────────────────────────────────────
  'Dubrovnik':                     'Dubrovnik',
  'Split':                         'Diocletian\'s Palace',
  'Kotor':                         'Bay of Kotor',
  'Mostar':                        'Stari Most',
  'Sarajevo':                      'Sarajevo',
  'Valletta':                      'Valletta',
  'Nicosia':                       'Nicosia',
  'Reykjavik':                     'Hallgrímskirkja',
  'Tirana':                        'Tirana',
  'Podgorica':                     'Ostrog monastery',
  'Skopje':                        'Skopje',

  // ── Sri Lanka fallback places ─────────────────────────────────────────────
  'Kandy Temple of the Tooth':     'Temple of the Tooth',
  'Ella Hill Country':             'Nine Arch Bridge, Demodara',
  'Mirissa Beach':                 'Mirissa',
  'Galle Dutch Fort':              'Galle Fort',

  // ── Australia fallback ────────────────────────────────────────────────────
  'The Whitsundays':               'Whitsunday Islands',

  // ── Malaysia fallback ─────────────────────────────────────────────────────
  'Penang George Town':            'George Town, Penang',
  'Borneo Rainforest':             'Borneo',

  // ── Singapore fallback ───────────────────────────────────────────────────
  'Chinatown':                     'Chinatown, Singapore',

  // ── Egypt fallback ────────────────────────────────────────────────────────
  'Luxor Temples':                 'Luxor Temple',

  // ── China fallback ────────────────────────────────────────────────────────
  "Terracotta Army Xi'an":         'Terracotta Army',

  // ── Mexico fallback ───────────────────────────────────────────────────────
  'Cancun and Riviera Maya':       'Cancún',

  // ── Morocco fallback ─────────────────────────────────────────────────────
  'Marrakech Medina':              'Medina of Marrakech',
  'Sahara Desert Merzouga':        'Erg Chebbi',
  'Chefchaouen Blue City':         'Chefchaouen',

  // ── Jordan fallback ───────────────────────────────────────────────────────
  'Wadi Rum Desert':               'Wadi Rum',
  'Jerash Roman Ruins':            'Jerash',

  // ── Canada fallback ───────────────────────────────────────────────────────
  'Quebec City Old Town':          'Old Quebec',

  // ── Argentina fallback ────────────────────────────────────────────────────
  'Patagonia and Torres del Paine':'Torres del Paine National Park',

  // ── Philippines fallback ─────────────────────────────────────────────────
  'Chocolate Hills Bohol':         'Chocolate Hills',
  'Intramuros Manila':             'Intramuros',
  'Vigan Heritage Town':           'Vigan',

  // ── Colombia fallback ─────────────────────────────────────────────────────
  'Cartagena Old Walled City':     'Cartagena de Indias',
  'Coffee Cultural Landscape':     'Coffee Cultural Landscape of Colombia',

  // ── Cuba fallback ─────────────────────────────────────────────────────────
  'Havana Old Town':               'Old Havana',
  'Trinidad Colonial Town':        'Trinidad, Cuba',

  // ── Ecuador fallback ─────────────────────────────────────────────────────
  'Quito Historic Centre':         'Historic Centre of Quito',
  'Amazon Napo River Basin':       'Amazon rainforest',
  'Otavalo Indigenous Market':     'Otavalo',

  // ── Bolivia fallback ─────────────────────────────────────────────────────
  'Salar de Uyuni Salt Flats':     'Salar de Uyuni',
  'Tiwanaku Ruins':                'Tiwanaku',
  'Sucre White City':              'Sucre, Bolivia',

  // ── Chile fallback ────────────────────────────────────────────────────────
  'Valparaíso Street Art':         'Valparaíso',

  // ── Costa Rica fallback ───────────────────────────────────────────────────
  'Tortuguero Sea Turtle Nesting': 'Tortuguero National Park',

  // ── Panama fallback ───────────────────────────────────────────────────────
  'Panama Canal Miraflores Locks': 'Miraflores Locks',
  'Bocas del Toro Archipelago':    'Bocas del Toro Province',
  'Panama City Casco Viejo':       'Casco Viejo, Panama',

  // ── Jamaica fallback ─────────────────────────────────────────────────────
  'Seven Mile Beach Negril':       'Negril',
  'Blue Mountains Coffee':         'Blue Mountains, Jamaica',
  'Kingston Bob Marley Museum':    'Bob Marley Museum',

  // ── Ethiopia fallback ─────────────────────────────────────────────────────
  'Lalibela Rock-Hewn Churches':   'Lalibela',
  'Axum Obelisks':                 'Obelisks of Axum',

  // ── Rwanda fallback ───────────────────────────────────────────────────────
  'Volcanoes NP Gorilla':          'Volcanoes National Park',
  'Nyungwe Forest Canopy Walk':    'Nyungwe Forest National Park',

  // ── Namibia fallback ─────────────────────────────────────────────────────
  'Sossusvlei Red Sand Dunes':     'Deadvlei',

  // ── Tanzania fallback ────────────────────────────────────────────────────
  'Zanzibar Island':               'Unguja',
  'Stone Town Zanzibar':           'Stone Town',

  // ── Georgia (country) fallback ────────────────────────────────────────────
  'Kazbegi and Gergeti Trinity Church': 'Gergeti Trinity Church',

  // ── Israel fallback ───────────────────────────────────────────────────────
  'Tel Aviv Beach':                'Tel Aviv',

  // ── Iran fallback ─────────────────────────────────────────────────────────
  'Yazd Old City':                 'Yazd',

  // ── Myanmar fallback ─────────────────────────────────────────────────────
  'Shwedagon Pagoda Yangon':       'Shwedagon Pagoda',
  'Hpa-An Caves':                  'Hpa-an',

  // ── Laos fallback ─────────────────────────────────────────────────────────
  'Vang Vieng Karst Landscape':    'Vang Vieng',
  'Vientiane Patuxai':             'Patuxai',
  'Si Phan Don 4000 Islands':      'Si Phan Don',

  // ── Kyrgyzstan fallback ───────────────────────────────────────────────────
  'Song-Köl Lake':                 'Song Kol',
  'Tash Rabat Silk Road Caravanserai': 'Tash Rabat',

  // ── Mongolia fallback ────────────────────────────────────────────────────
  'Terelj National Park Ger Camps':'Gorkhi-Terelj National Park',

  // ── Fiji fallback ─────────────────────────────────────────────────────────
  'Coral Coast':                   'Fiji',
  'Nadi and Sabeto Mud Pools':     'Nadi, Fiji',

  // ── Vanuatu fallback ─────────────────────────────────────────────────────
  'Mount Yasur Active Volcano Tanna': 'Mount Yasur',
  'Espiritu Santo Blue Holes':     'Espiritu Santo, Vanuatu',
  'Kastom Villages':               'Kastom',

  // ── Papua New Guinea fallback ─────────────────────────────────────────────
  'Tufi Fjords':                   'Tufi, Oro Province',
  'Huli Wigmen Highlands':         'Huli people',

  // ── Malta fallback ───────────────────────────────────────────────────────
  'Valletta UNESCO Capital':       'Valletta',
  'Mdina Silent City':             'Mdina',
  'Blue Lagoon Comino':            'Blue Lagoon (Comino)',

  // ── Cyprus fallback ───────────────────────────────────────────────────────
  'Troodos Mountains Monasteries': 'Troodos Mountains',
  'Kyrenia Harbour':               'Kyrenia',
  "Aphrodite's Rock Beach":        'Rock of Aphrodite',
  'Nicosia Divided Capital':       'Nicosia',

  // ── Tunisia fallback ─────────────────────────────────────────────────────
  'Sahara Tozeur':                 'Tozeur',
  'Sidi Bou Said Blue Village':    'Sidi Bou Said',

  // ── Nigeria fallback ─────────────────────────────────────────────────────
  'Lagos Beaches and Nightlife':   'Lagos',
  'Olumo Rock Abeokuta':           'Olumo Rock',
  'Benin City Bronze Kingdom':     'Benin City',

  // ── Mauritius fallback ───────────────────────────────────────────────────
  'Le Morne UNESCO Beach':         'Le Morne Brabant',
  'Chamarel Seven Coloured Earth': 'Seven Coloured Earths',
  'Grand Bassin Sacred Lake':      'Grand Bassin, Mauritius',

  // ── Seychelles fallback ───────────────────────────────────────────────────
  "Anse Source d'Argent La Digue": "Anse Source d'Argent",
  "Vallée de Mai Coco de Mer":     'Vallée de Mai',
  'Beau Vallon Beach Mahé':        'Beau Vallon',
  'Victoria Market':               'Victoria, Seychelles',

  // ── Zambia fallback ───────────────────────────────────────────────────────
  'Victoria Falls Zambia Side':    'Victoria Falls',
  'Lake Kariba Houseboat':         'Lake Kariba',

  // ── Uganda fallback ───────────────────────────────────────────────────────
  'Bwindi Gorilla':                'Bwindi Impenetrable Forest',
  'Kibale Chimpanzee Tracking':    'Kibale National Park',
  'Source of the Nile Jinja':      'Jinja, Uganda',

  // ── Madagascar fallback ───────────────────────────────────────────────────
  'Tsingy de Bemaraha Stone Forests': 'Tsingy de Bemaraha',
  'Ranomafana Rainforest':         'Ranomafana National Park',

  // ── Mozambique fallback ───────────────────────────────────────────────────
  'Tofo Beach Manta Rays':         'Tofo Beach',

  // ── Cape Verde fallback ───────────────────────────────────────────────────
  'Sal Island Santa Maria Beach':  'Sal, Cape Verde',
  'Santo Antão Hiking Valleys':    'Santo Antão, Cape Verde',
  'Mindelo São Vicente Culture':   'Mindelo',
  'Fogo Volcano':                  'Fogo (island)',
  'Boa Vista Sand Dunes':          'Boa Vista, Cape Verde',

  // ── Dominican Republic fallback ───────────────────────────────────────────
  'Punta Cana Beaches':            'Punta Cana',
  'Santo Domingo Colonial Zone':   'Colonial City of Santo Domingo',
  '27 Waterfalls Damajagua':       'Los Charcos del Damajagua',
  'Jarabacoa Mountain Adventure':  'Jarabacoa',

  // ── Guatemala fallback ────────────────────────────────────────────────────
  'Tikal Mayan Ruins':             'Tikal',
  'Antigua Colonial City':         'Antigua Guatemala',
  'Semuc Champey Pools':           'Semuc Champey',
  'Chichicastenango Market':       'Chichicastenango',

  // ── Uruguay fallback ─────────────────────────────────────────────────────
  'Montevideo Old Town Rambla':    'Montevideo',
  'Punta del Este Beaches':        'Punta del Este',
  'Carmelo Wine Region':           'Carmelo, Uruguay',

  // ── Trinidad and Tobago fallback ──────────────────────────────────────────
  'Port of Spain Carnival':        'Trinidad Carnival',
  'Tobago Coral Reefs':            'Tobago',
  'Maracas Bay Beach':             'Maracas Bay',
  'Pitch Lake La Brea':            'Pitch Lake',

  // ── Belize fallback ───────────────────────────────────────────────────────
  'Ambergris Caye Beach':          'Ambergris Caye',
  'Actun Tunichil Muknal Cave':    'Actun Tunichil Muknal',
  'Caracol Mayan Ruins':           'Caracol',

  // ── Honduras fallback ────────────────────────────────────────────────────
  'Roatán Bay Islands':            'Roatán',
  'Copán Mayan Ruins':             'Copán',
  'Utila Island Whale Sharks':     'Utila',

  // ── Venezuela fallback ────────────────────────────────────────────────────
  'Angel Falls Canaima':           'Angel Falls',
  'Roraima Tepui':                 'Mount Roraima',
  'Mérida Cable Car Andes':        'Mérida, Venezuela',

  // ── Bangladesh fallback ───────────────────────────────────────────────────
  'Sundarbans Mangrove Forest':    'Sundarbans',
  "Cox's Bazar World's Longest Beach": "Cox's Bazar",
  'Dhaka Old City Rickshaw Tour':  'Dhaka',
  'Srimangal Tea Gardens':         'Srimangal',

  // ── Armenia fallback ─────────────────────────────────────────────────────
  'Noravank Red Rock Canyon':      'Noravank',
  'Yerevan Cascade':               'Cascade (Yerevan)',
  'Tatev Monastery Wings of Tatev':'Tatev Monastery',

  // ── Azerbaijan fallback ───────────────────────────────────────────────────
  'Baku Old City Icheri Sheher':   'Icherisheher',
  'Gobustan Rock Art':             'Gobustan National Park',
  'Lahij Copper Craft Village':    'Lahij',
  'Sheki Palace and Caravanserai': 'Palace of the Sheki Khans',

  // ── Hong Kong fallback ───────────────────────────────────────────────────
  'Temple Street':                 'Temple Street Night Market',
  'Mong Kok Street Markets':       'Mong Kok',

  // ── Kosovo fallback ───────────────────────────────────────────────────────
  'Pristina – Newborn Monument':   'Newborn (monument)',

  // ── Lebanon fallback ─────────────────────────────────────────────────────
  'Baalbek Roman Temples':         'Baalbek',
  'Byblos Ancient Port City':      'Byblos',

  // ── Bahrain fallback ─────────────────────────────────────────────────────
  "Bahrain Fort Qal'at al-Bahrain":'Bahrain Fort',
  'Manama Gold Souq':              'Manama',

  // ── Kuwait fallback ───────────────────────────────────────────────────────
  'Grand Mosque':                  'Grand Mosque of Kuwait',

  // ── Qatar fallback ────────────────────────────────────────────────────────
  'The Pearl Qatar':               'The Pearl, Qatar',
  'Katara Cultural Village':       'Katara Cultural Village',

  // ── Oman fallback ─────────────────────────────────────────────────────────
  'Jebel Akhdar Green Mountain':   'Jebel Akhdar (Oman)',
  'Al Jalali':                     'Al Jalali Fort',
  'Qurum Natural Park':            'Qurum',

  // ── Senegal fallback ─────────────────────────────────────────────────────
  'Gorée Island':                  'Île de Gorée',
  'Dakar Pink Lake Retba':         'Lake Retba',
  'Saint-Louis Historic Town':     'Saint-Louis, Senegal',

  // ── Ghana fallback ────────────────────────────────────────────────────────
  'Kakum Canopy Walk':             'Kakum National Park',

  // ── Zimbabwe fallback ────────────────────────────────────────────────────
  'Great Zimbabwe Ruins':          'Great Zimbabwe',

  // ── Maldives city places ──────────────────────────────────────────────────
  'Overwater Villa Experience':    'Maldives',
  'Whale Shark Snorkelling':       'Maldives',
  'Maafushi Local Island Stay':    'Maafushi',
  'Hukuru Miskiy Friday Mosque':   'Hukuru Miskiy',
  'Malé Fish Market':              'Malé',

  // ── Armenia city places ───────────────────────────────────────────────────
  'Cascade Stairway':              'Cascade (Yerevan)',
  'Khor Virap Monastery':          'Khor Virap',
  'Vernissage Weekend Market':     'Vernissage Market',

  // ── Azerbaijan city places ────────────────────────────────────────────────
  'Baku Boulevard Caspian':        'Baku Boulevard',

  // ── Iceland city places ───────────────────────────────────────────────────
  'Whale Watching Faxaflói Bay':   'Faxaflói',
  'Santorini Wine Tasting':        'Santorini',

  // ── Colombia city places ──────────────────────────────────────────────────
  'Gold Museum':                   'Museo del Oro',
  'La Candelaria Historic Centre': 'La Candelaria',
  'Usaquén Antiques Market':       'Usaquén',
  'Ciclovía Sunday Cycling Route': 'Ciclovía',
  'Metro Cable Car Barrio View':   'Medellín Metro Cable',
  'Antioquia Museum':              'Museum of Antioquia',
  'El Poblado Nightlife':          'El Poblado',
  'Rosario Islands Day Trip':      'Rosario Islands',
  'Getsemaní Street Art':          'Getsemaní',

  // ── Cuba city places ──────────────────────────────────────────────────────
  'Malecón Seafront':              'Malecón, Havana',
  'Classic Car Tour':              'Old Havana',
  'Fusterlandia Mosaic Village':   'Fusterlandia',

  // ── Egypt city places ─────────────────────────────────────────────────────
  'Al-Muizz Street Islamic Cairo': 'Al-Muizz Street',
  'Hot Air Balloon at Sunrise':    'Luxor',

  // ── Various cities missing entries ────────────────────────────────────────
  'Walter Peak Farm Experience':   'Walter Peak',
  'Cozumel Scuba':                 'Cozumel',
  'Deep Dish Pizza Tour':          'Chicago-style pizza',
  'Fotografiska Photography Museum':'Fotografiska',
  'Oslomarka Forest Trails':       'Oslomarka',
  'NDSM Wharf Arts District':      'NDSM-werf',
  'Roma':                          'Roma, Mexico City',
  'Distillery':                    'Distillery District',
  'The Getty Villa Malibu':        'Getty Villa',
  'Kreuzberg Street Food':         'Kreuzberg',
  'San Telmo Antiques Market':     'San Telmo',
  'Game of Thrones filming locations': 'Dubrovnik',
  'Konavle Valley Wine Region':    'Konavle',
  'LX Factory Creative Market':    'LX Factory',
  'Le Marais District':            'Le Marais',
  'Vienna Woods Hiking':           'Vienna Woods',
  'Vinohrady Local Neighbourhood': 'Vinohrady',
  'Ruin Bars of the Jewish Quarter':'Ruin bar',
  'Memento Park Soviet Statues':   'Memento Park',
  'Dorsoduro Sestiere':            'Dorsoduro',
  'Foz do Douro Beach District':   'Foz do Douro',
  'Canal Boat Rides':              'Bruges',
  'Groeningemuseum Flemish Art':   'Groeningemuseum',
  'Bruges Chocolate Trail':        'Bruges',
  'National Museum Complex':       'National Museum of the Philippines',
  'Phnom Penh Riverfront':         'Phnom Penh',
  'Pub Street':                    'Pub Street',
  'Vietnamese Cooking Class':      'Hội An',
  'Night Market':                  'Luang Prabang',
  'Siab Bazaar':                   'Siab Bazaar, Samarkand',
  'Corniche Atlantic':             'Corniche, Casablanca',
  'Old City Jama Masjid':          'Jamia Masjid, Srinagar',
  'Kuttanad Paddy Fields':         'Kuttanad',
  'Top Station':                   'Top Station, Munnar',
  'Mattupetty Dam':                'Mattupetty',
  'Tea Museum':                    'Munnar',
  'Anamudi Peak':                  'Anamudi',
  'Matanga Hill Sunrise':          'Matanga Hill',
  'Hampi Bazaar Ruins':            'Hampi',
  'Grishneshwar Jyotirlinga Temple':'Grishneshwar',
  'Sri Padmavathi Ammavari Temple':'Padmavathi Temple',
  'Chandragiri Fort':              'Chandragiri Fort',
  'Kapila Theertham':              'Kapila Theertham',
  'TTD Gardens':                   'Tirumala Tirupati Devasthanams',
  'Raghurajpur Artist Village':    'Raghurajpur',
  'Innovative Film City':          'Innovative Film City',
  'Commercial Street':             'Commercial Street, Bangalore',
  'Old City Laad Bazaar':          'Laad Bazaar',
  'Park Street':                   'Park Street, Kolkata',
  'College Street Book District':  'College Street, Kolkata',
  'Paradesi Synagogue Quarter':    'Paradesi Synagogue',
  'Kinari Bazaar':                 'Kinari Bazaar, Agra',
  'Shilpgram Crafts Village':      'Shilpgram',
  'Jaswant Thada Memorial':        'Jaswant Thada',
  'Umaid Bhawan Palace Museum':    'Umaid Bhawan Palace',
  'Amritsari Kulcha':              'Amritsar',
  'The Mall':                      'The Mall, Shimla',
  'Chadwick Falls':                'Chadwick Falls, Shimla',
  'Viceregal Lodge':               'Rashtrapati Nivas',
  'Spiti Valley Day Trip':         'Spiti Valley',
  'Old Manali Village Cafés':      'Manali, Himachal Pradesh',
  'Tashi':                         'Tashi Viewpoint',
  'MG Marg Walkway':               'M.G. Marg',
  "Ward's Lake":                   "Ward's Lake",
  'Gandhi Museum':                 'Gandhi Memorial Museum',
  'Alagar Kovil Temple':           'Alagar Kovil',
  'Vaigai Riverfront':             'Vaigai River',
  'Ooty Lake':                     'Ooty Lake',
  'Pykara Falls':                  'Pykara',
  'Botanical Gardens':             'Government Botanical Garden, Ooty',

  // ── Seville city places ────────────────────────────────────────────────────
  'Real Alcázar Palace':           'Alcázar of Seville',
  'Seville Cathedral':             'Seville Cathedral',
  'Barrio Santa Cruz':             'Santa Cruz, Seville',
  'Triana Flamenco District':      'Triana, Seville',
  'Plaza de España':               'Plaza de España, Seville',

  // ── Phuket city places ────────────────────────────────────────────────────
  'Phi Phi Islands Day Trip':      'Phi Phi Islands',
  'Phang Nga Bay Sea Kayaking':    'Phang Nga Bay',
  'Big Buddha':                    'Big Buddha, Phuket',
  'Old Phuket Town Sino-Portuguese':'Phuket Old Town',
  'Similan Islands Snorkelling':   'Similan Islands',

  // ── Colombo city places ────────────────────────────────────────────────────
  'Gangaramaya Temple':            'Gangaramaya Temple',
  'Galle Face Green':              'Galle Face Green',
  'National Museum of Colombo':    'National Museum of Colombo',
  'Pettah Bazaar District':        'Pettah',
  'Beira Lake':                    'Beira Lake',

  // ── Taipei city places ────────────────────────────────────────────────────
  'Taipei 101 Sky Deck':           'Taipei 101',
  'Jiufen Old Street':             'Jiufen',
  'Chiang Kai-shek Memorial Hall': 'Chiang Kai-shek Memorial Hall',
  'Shilin':                        'Shilin Night Market',
  'Yangmingshan National Park':    'Yangmingshan National Park',

  // ── Manila city places ────────────────────────────────────────────────────
  'Intramuros Walled City':        'Intramuros',
  'Rizal Park':                    'Rizal Park',
  'Binondo Chinatown Food Walk':   'Binondo',
  'BGC':                           'Bonifacio Global City',

  // ── Yangon city places ────────────────────────────────────────────────────
  'Bogyoke Aung San Market':       'Bogyoke Aung San Market',
  'Kandawgyi Lake':                'Kandawgyi Lake',
  'Circular Train City Loop':      'Yangon Circular Railway',

  // ── Phnom Penh city places ────────────────────────────────────────────────
  'Royal Palace':                  'Royal Palace, Phnom Penh',
  'Tuol Sleng Genocide Museum':    'Tuol Sleng Genocide Museum',
  'Wat Phnom Hill Temple':         'Wat Phnom',
  'Central Market Art Deco Dome':  'Phsar Thmei',

  // ── Muscat city places ────────────────────────────────────────────────────
  'Sultan Qaboos Grand Mosque':    'Sultan Qaboos Grand Mosque',
  'Royal Opera House Muscat':      'Royal Opera House Muscat',

  // ── Chicago city places ───────────────────────────────────────────────────
  'Millennium Park':               'Millennium Park',
  'Art Institute of Chicago':      'Art Institute of Chicago',
  'Chicago Riverwalk Architecture':'Chicago Riverwalk',
  'Lincoln Park Zoo':              'Lincoln Park Zoo',

  // ── Miami city places ─────────────────────────────────────────────────────
  'South Beach Art Deco District': 'South Beach, Miami Beach',
  'Wynwood Walls Street Art':      'Wynwood Walls',
  'Everglades Airboat Tour':       'Everglades National Park',
  'Little Havana Calle Ocho':      'Calle Ocho',
  'Vizcaya Museum Gardens':        'Vizcaya Museum and Gardens',

  // ── Lima city places ──────────────────────────────────────────────────────
  'Miraflores Cliff Paragliding':  'Miraflores District, Lima',
  'Larco Museum Pre-Columbian Art':'Larco Museum',
  'Historic Centre':               'Historic Centre of Lima',
  'Barranco':                      'Barranco District',
  'Lima':                          'Lima',

  // ── Bogotá city places ────────────────────────────────────────────────────
  'Monserrate Hill Gondola':       'Monserrate (Bogotá)',

  // ── Medellín city places ──────────────────────────────────────────────────
  'Plaza Botero Sculptures':       'Plaza Botero',
  'Guatapé Piedra del Peñol Day Trip': 'La Piedra del Peñol',

  // ── Havana city places ────────────────────────────────────────────────────
  'Old Havana UNESCO Historic Centre': 'Old Havana',
  'Viñales Valley Day Trip':       'Viñales Valley',

  // ── Salzburg city places ──────────────────────────────────────────────────
  'Hellbrunn Trick Fountains':     'Hellbrunn Palace',
  'Salzkammergut Lakes Day Trip':  'Salzkammergut',
  'Hohensalzburg Fortress':        'Hohensalzburg Castle',
  'Mirabell Gardens':              'Mirabell Palace',

  // ── Comprehensive audit fixes (v11) ──────────────────────────────────────

  // Nagaland — confirmed broken in console logs
  // 'Gokarna' and 'Hornbill Festival' already fixed above; 'Japfu Peak'/'Mount Japfü' above

  // Karnataka city fixes
  'Palolem':                        'Palolem Beach',   // 'Palolem Beach & Canacona' → strips & → 'Palolem Beach' → strips Beach? No—but cleanPlaceName splits on ',' too, so 'Palolem Beach & Canacona' → split ' & ' → 'Palolem Beach' (Beach not in suffix list, left as-is). Direct query 'Palolem Beach' works fine on WP (has image).

  // Ho Chi Minh City places
  'Bui Vien Walking Street':        'Bến Thành Market',  // Walking Street not stripped; explicit key

  // Colombo city — Galle Face Green Promenade
  'Galle Face Green':               'Galle Face Green',  // already present; also add:
  'Galle Face Green Promenade':     'Galle Face Green',

  // Pondicherry city
  'French Quarter Promenade Beach': 'Pondicherry',
  'Serenity Beach':                 'Pondicherry',

  // Hoi An city
  'An Bang Beach':                  'An Bàng Beach',
  'Tailoring Street Custom Clothes':'Hội An',

  // Mombasa city
  'Haller Park':                    'Haller Park',
  'Nyali':                          'Mombasa',
  'Nyali & Bamburi Beach':          'Mombasa',

  // Casablanca city
  'Mahkama du Pacha Palace':        'Hassan II Mosque',

  // Munich city
  'BMW Welt':                       'BMW Welt',

  // Edinburgh city
  'Scottish Whisky Experience':     'Scotch whisky',
  'Royal Mile':                     'Palace of Holyroodhouse',

  // Nairobi city
  'Carnivore Restaurant':           'Nairobi National Park',

  // Yangon city
  'Colonial Strand Hotel':          'Yangon',

  // Varanasi city — 'Old City Silk Weaving Workshops' strips suffix → 'Old City' which clashes with Jerusalem
  'Old City Silk Weaving':          'Varanasi',  // cleanPlaceName strips 'Silk Weaving Workshops' → 'Old City Silk Weaving' — actually let's use explicit key

  // Israel city — Old City should map Jerusalem
  // 'Old City' already maps to 'Jerusalem Old City' — correct for Jerusalem panel

  // Leh city — 'Nubra Valley & Diskit Monastery' → splits → 'Nubra Valley' — already in SCENIC ✓
  'Nubra Valley & Diskit Monastery':'Nubra Valley',

  // Ladakh state — 'Nubra Valley & Bactrian Camels' → 'Nubra Valley' — already in SCENIC ✓

  // Puri city
  'Puri Beach':                     'Puri, Odisha',

  // Alleppey city
  'Backwater Houseboat':            'Kerala backwaters',
  'Alleppey Beach':                 'Kerala backwaters',
  'Marari Beach':                   'Marari Beach',

  // Munnar city — 'Top Station Viewpoint' → strips 'View Point' variant? Actually regex has 'View\s*Point' → 'Top Station' — add explicit
  'Top Station Viewpoint':          'Munnar',
  'Mattupetty Dam':                 'Mattupetty',
  'Tea Museum':                     'Munnar',
  'Anamudi Peak':                   'Anamudi',

  // Shillong city — "Ward's Lake & Shillong Peak" → splits → "Ward's Lake"
  "Ward's Lake":                    "Ward's Lake",

  // Gangtok city
  'Tashi Viewpoint':                'Tashi Viewpoint',
  'MG Marg Walkway':                'M.G. Marg',

  // Madurai city
  'Vaigai Riverfront':              'Vaigai River',
  'Alagar Kovil Temple':            'Alagar Kovil',

  // Ooty city
  'Pykara Falls':                   'Pykara',
  'Botanical Gardens':              'Government Botanical Garden, Ooty',
  'Ooty Lake':                      'Ooty Lake',

  // Pushkar city — 'Sand Dunes Desert Safari' → strips 'Safari' → 'Sand Dunes Desert' — add key
  'Sand Dunes Desert':              'Thar Desert',

  // Hampi city
  'Matanga Hill Sunrise':           'Matanga Hill',
  'Hampi Bazaar Ruins':             'Hampi',
  'Vittala Temple':                 'Vittala Temple',

  // Tirupati city
  'Sri Padmavathi Ammavari Temple': 'Padmavathi Temple',
  'Chandragiri Fort':               'Chandragiri Fort',
  'Kapila Theertham':               'Kapila Theertham',

  // Aurangabad city
  'Grishneshwar Jyotirlinga Temple':'Grishneshwar',

  // Shimla city — 'The Mall & Ridge Promenade' → splits → 'The Mall' → SCENIC: 'The Mall': 'The Mall, Shimla' ✓
  // 'Viceregal Lodge (IIAS)' → strips '(IIAS)' → 'Viceregal Lodge' → SCENIC: 'Viceregal Lodge': 'Rashtrapati Nivas' ✓
  // 'Jakhu Temple & Forest Trek' → splits → 'Jakhu Temple' → SCENIC: 'Jakhu Temple': 'Jakhu Temple' ✓
  // 'Chadwick Falls' → not in SCENIC directly, but 'Chadwick Falls': 'Chadwick Falls, Shimla' already added in SCENIC ✓

  // Ahmedabad state-level: 'Ahmedabad Heritage City' → strips 'Heritage City' → 'Ahmedabad' → not in SCENIC → queries 'Ahmedabad' (good)
  'Ahmedabad':                      'Sabarmati Ashram',  // Ahmedabad article is fine too, but this gives scenic photo

  // Sanchi Stupa → 'Sanchi Stupa' → 'Sanchi' SCENIC already ✓ (strips Stupa? No, Stupa IS in suffix list) → 'Sanchi' → SCENIC: 'Sanchi': 'Sanchi' ✓

  // Countries — new fallback entries that may have issues
  // 'Volcanoes NP Gorilla Trekking' → strips 'Trekking' → 'Volcanoes NP Gorilla' → SCENIC ✓
  // 'Nyungwe Forest Canopy Walk' → no suffix → SCENIC: 'Nyungwe Forest Canopy Walk': 'Nyungwe Forest National Park' ✓
  // 'Kigali Genocide Memorial' → no suffix → not in SCENIC → queries 'Kigali Genocide Memorial' (good article)
  'Kigali Genocide Memorial':       'Kigali Genocide Memorial',
  // 'Akagera National Park' → not in SCENIC → queries directly (fine)
  'Akagera National Park':          'Akagera National Park',

  // 'Sossusvlei Red Sand Dunes' → SCENIC: 'Sossusvlei Red Sand Dunes': 'Deadvlei' ✓ already added
  // 'Etosha National Park' → not in SCENIC → queries directly (fine, has image)
  'Etosha National Park':           'Etosha National Park',

  // Rwanda — country places
  'Lake Kivu':                      'Lake Kivu',

  // Botswana
  'Moremi Game Reserve':            'Moremi Game Reserve',
  'Makgadikgadi Salt Pans':         'Makgadikgadi Pans',
  'Central Kalahari Game Reserve':  'Central Kalahari Game Reserve',

  // Zambia
  'South Luangwa National Park':    'South Luangwa National Park',
  'Lower Zambezi National Park':    'Lower Zambezi National Park',
  'Kafue National Park':            'Kafue National Park',
  'Lake Kariba':                    'Lake Kariba',

  // Uganda
  'Murchison Falls':                'Murchison Falls',
  'Queen Elizabeth National Park':  'Queen Elizabeth National Park',

  // Madagascar
  'Isalo National Park':            'Isalo National Park',
  'Nosy Be Island':                 'Nosy Be',

  // Mozambique
  'Bazaruto Archipelago':           'Bazaruto Archipelago',
  'Ilha de Moçambique':             'Island of Mozambique',
  'Gorongosa National Park':        'Gorongosa National Park',

  // Slovakia
  'Bratislava Castle':              'Bratislava Castle',
  'Banská Štiavnica':               'Banská Štiavnica',

  // Cyprus
  'Paphos Archaeological Park':     'Paphos Archaeological Park',

  // Malta
  'Ħal Saflieni Hypogeum':          'Ħal Saflieni Hypogeum',
  'Gozo Island':                    'Gozo',

  // Luxembourg
  'Luxembourg City Old Town':       'Luxembourg City',
  'Vianden Castle':                 'Vianden Castle',
  'Mullerthal Trail':               'Müllerthal Trail',
  'Moselle Valley Vineyards':       'Moselle wine region',
  'Echternach':                     'Echternach',

  // Monaco
  'Monte-Carlo Casino':             'Casino de Monte-Carlo',
  'Oceanographic Museum':           'Oceanographic Museum of Monaco',
  'Jardin Exotique':                'Jardin Exotique de Monaco',

  // Andorra
  'Vallnord':                       'Vallnord',
  'Madriu-Perafita-Claror Valley':  'Madriu-Perafita-Claror',
  'Sant Joan de Caselles Church':   'Sant Joan de Caselles',
  'Caldea Thermal':                 'Caldea',

  // Kosovo
  'Prizren Old Town':               'Prizren',
  'Rugova Canyon':                  'Rugova',
  'Visoki Dečani Monastery':        'Visoki Dečani',
  'Mirusha Waterfalls':             'Mirusha',

  // Malawi
  'Lake Malawi – Cape Maclear':     'Lake Malawi',
  'Liwonde National Park':          'Liwonde National Park',
  'Mulanje Massif':                 'Mount Mulanje',
  'Nyika National Park':            'Nyika National Park',
  'Zomba Plateau':                  'Zomba Plateau',

  // El Salvador
  'El Tunco Beach':                 'El Tunco',
  'Santa Ana Volcano':              'Santa Ana volcano',
  'Suchitoto Colonial Town':        'Suchitoto',
  'Ruta de las Flores':             'Ruta de las Flores',
  'Joya de Cerén UNESCO Site':      'Joya de Cerén',

  // Nicaragua
  'Ometepe Island':                 'Ometepe',
  'Granada Colonial City':          'Granada, Nicaragua',
  'León Cathedral':                 'León Cathedral',
  'Cerro Negro Volcano':            'Cerro Negro',
  'San Juan del Sur Beach':         'San Juan del Sur',

  // Honduras
  'Roatán Bay Islands':             'Roatán',
  'Pico Bonito National Park':      'Pico Bonito National Park',
  'Lake Yojoa':                     'Lake Yojoa',

  // Venezuela
  'Los Roques Archipelago':         'Los Roques',
  'Morrocoy National Park':         'Morrocoy National Park',
  'Mérida Cable Car Andes':         'Mérida, Venezuela',

  // Palau
  'Jellyfish Lake':                 'Jellyfish Lake',
  'Rock Islands Southern Lagoon':   'Rock Islands',
  'Ngardmau Waterfall':             'Ngardmau',
  'Badrulchau Stone Monoliths':     'Badrulchau',

  // Samoa
  'Lalomanu Beach':                 'Lalomanu',
  'Papapapaitai Falls':             'Papapapaitai Falls',
  'Apia Flea Market':               'Apia',

  // Tonga
  "Ha'amonga Trilithon":            "Ha'amonga 'a Maui",
  "Nuku'alofa Royal Palace":        "Royal Palace of Tonga",

  // Brunei
  'Kampong Ayer Water Village':     'Kampong Ayer',
  'Ulu Temburong National Park':    'Ulu Temburong National Park',
  "Jame'Asr Hassanil Bolkiah Mosque":'Jame Asr Hassanil Bolkiah Mosque',
  'Royal Regalia Museum':           'Royal Regalia Museum, Brunei',

  // Algeria
  'Casbah of Algiers':              'Casbah of Algiers',
  'Ghardaïa M\'zab Valley':         'Ghardaia',

  // Hong Kong
  'Lantau Island':                  'Lantau Island',
  'Sai Kung Country Park':          'Sai Kung Country Park',
  'Victoria Peak':                  'Victoria Peak',
  'Victoria Peak Tram':             'Peak Tram',

  // Georgia (country)
  'Svaneti':                        'Svaneti',
  'Vardzia Cave Monastery':         'Vardzia',
}

// ── In-memory + localStorage cache ──────────────────────────────────────────
const cache = new Map()
const LS_KEY = 'veritas_wiki_v11'

function hydrateCache() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return
    const { ts, d } = JSON.parse(raw)
    if (Date.now() - ts > 7 * 24 * 60 * 60 * 1000) { localStorage.removeItem(LS_KEY); return }
    for (const [k, v] of Object.entries(d)) cache.set(k, v)
  } catch {}
}
function persistCache() {
  try {
    const d = Object.fromEntries(cache)
    localStorage.setItem(LS_KEY, JSON.stringify({ ts: Date.now(), d }))
  } catch {}
}
if (typeof window !== 'undefined') hydrateCache()

export function getScenicQuery(name) {
  return SCENIC[name] ?? name
}

// Strips non-geographic suffixes so place names resolve to Wikipedia articles.
export function cleanPlaceName(raw) {
  return raw
    .replace(/\s*\([^)]*\)/g, '')
    .split(',')[0]
    .split(' & ')[0]
    .replace(/\s+(Geothermal\s+Spa?|Glacier\s+Lagoon|Lagoon|Thermal\s+Spa?|Thermal\s+Baths?|Hot\s+Springs?|Spa|Aurora|Sunrise\s+Hike|Fair\s+Grounds?|Island\s+Palace|Monsoon\s+Palace|City\s+Palace|Sunrise\s+Point|View\s*Point|Grounds?|Sunrise\s+Trek|Night\s+Market|Heritage\s+City|Heritage\s+Site|Historic\s+District|Historic\s+Site|Wildlife\s+Sanctuary|Food\s+Trail|Bohemian\s+District|Colonial\s+District|Antiques?\s+District|Street\s+Art\s+District|Volcanoes?|Diving|Tribes?|Trekking|Trek|Hike|Safari|UNESCO|Waterfront|Observation\s+Deck|Art\s+District|Water\s+Town|Retro\s+District|Creative\s+District|Backpacker\s+District|Street\s+Food\s+(?:Strip|Tour)|Food\s+Tour|Shopping\s+Street|Night\s+Food\s+Street|Geisha\s+District|Sea\s+Temple|Reclining\s+Buddha|Alleyways?|Outer\s+Market|Craft\s+Hub|Stupa|Bamboo\s+Grove|Golden\s+Pavilion|Monkey\s+Temple|Skypark|Top\s+Deck|River\s+Cruise|Botanical\s+Garden|Geothermal|Promenade|Night\s+Tour|Candle\s+Tour|Night\s+Life|Arts?\s+Quarter|Artisan\s+Quarter|Silk\s+Weaving\s+Workshops?)$/i, '')
    .trim()
}

// ── Batch fetch (1 API call for up to 20 titles) ─────────────────────────────
export async function fetchWikiImagesBatch(articleNames) {
  if (!articleNames?.length) return {}
  const valid = articleNames.filter(Boolean)
  const uncached = valid.filter(n => !cache.get(n.toLowerCase().trim()))

  if (uncached.length > 0) {
    // Deduplicate
    const unique = [...new Set(uncached)]
    // Fire in groups of 20
    const groups = []
    for (let i = 0; i < unique.length; i += 20) groups.push(unique.slice(i, i + 20))

    await Promise.all(groups.map(async group => {
      try {
        const url = new URL('https://en.wikipedia.org/w/api.php')
        url.searchParams.set('action', 'query')
        url.searchParams.set('titles', group.join('|'))
        url.searchParams.set('prop', 'pageimages')
        url.searchParams.set('piprop', 'thumbnail')
        url.searchParams.set('pithumbsize', '1200')
        url.searchParams.set('format', 'json')
        url.searchParams.set('origin', '*')
        url.searchParams.set('redirects', '1')

        const res = await fetch(url.toString())
        if (!res.ok) return

        const data = await res.json()
        const pages = data?.query?.pages ?? {}
        // Map canonical title → original title (handles both normalization and redirects)
        const normMap = {}
        for (const { from, to } of (data?.query?.normalized ?? [])) normMap[to] = from
        for (const { from, to } of (data?.query?.redirects ?? [])) {
          // redirects map may chain through normalizations — resolve to the original
          normMap[to] = normMap[from] ?? from
        }

        for (const page of Object.values(pages)) {
          const imgUrl = page?.thumbnail?.source ?? null
          const title = page.title
          // Only cache successful results — null means no thumbnail found, and we
          // want failed lookups to retry on next load (after SCENIC fixes, etc.)
          if (imgUrl) {
            cache.set(title.toLowerCase().trim(), imgUrl)
            const orig = normMap[title]
            if (orig) cache.set(orig.toLowerCase().trim(), imgUrl)
          }
        }
        persistCache()
      } catch {}
    }))
  }

  return Object.fromEntries(valid.map(n => [n, cache.get(n.toLowerCase().trim()) ?? null]))
}

// Single-fetch wrapper (used by hero images, landing page, etc.)
export async function fetchWikiImage(articleName) {
  if (!articleName) return null
  const key = articleName.toLowerCase().trim()
  if (cache.has(key)) return cache.get(key)
  const result = await fetchWikiImagesBatch([articleName])
  return result[articleName] ?? null
}
