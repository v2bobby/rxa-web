// ============================================
// RxLoop — Medication Reference Data
// ============================================
// IMPORTANT: This data contains GENERAL safety and adherence information only.
// It deliberately excludes specific numeric dosing (which varies by age, weight,
// and condition) — always defer to the prescription label or a pharmacist for that.
// Translations are a first-pass draft and should be reviewed by native-speaking
// healthcare communicators before wide production release. See README.

const RXLOOP_MEDICATIONS = [
  {
    id: "paracetamol",
    name: "Paracetamol (Acetaminophen)",
    category: "Pain relief / fever reducer",
    en: {
      purpose: "Used to relieve mild to moderate pain and reduce fever.",
      precautions: [
        "Do not exceed the maximum daily amount stated on your pack or prescription.",
        "Avoid taking with other products that also contain paracetamol.",
        "Ask a pharmacist before combining with alcohol or other medications."
      ],
      adherence: "Always follow the dose and timing printed on your specific pack or prescription — this varies by age and weight.",
      seekHelp: "Seek medical help if you notice yellowing of the skin/eyes, unusual bruising, or if fever persists beyond 3 days."
    },
    yo: {
      purpose: "A máa ń lò fún ìdín ìrora kékeré sí àárín gbùngbùn àti ìdín ibà kù.",
      precautions: [
        "Má ṣe lo ju iye tí a kọ sílẹ̀ lójoojúmọ́ lọ.",
        "Yẹra fún lílo pẹ̀lú àwọn oògùn mìíràn tí ó tún ní paracetamol nínú.",
        "Béèrè lọ́wọ́ oníṣègùn kí o tó dàpọ̀ mọ́ ọtí tàbí oògùn mìíràn."
      ],
      adherence: "Máa tẹ̀lé iye àti àkókò tí a kọ sí àpò rẹ tàbí ìwé oníṣègùn rẹ nígbà gbogbo.",
      seekHelp: "Wá ìtọ́jú ìṣègùn tí o bá rí àyípadà àwọ̀ ara sí àwọ̀ ofeefee, ẹ̀jẹ̀ dídì láìdí, tàbí bí ibà bá ń bá a lọ ju ọjọ́ mẹ́ta lọ."
    },
    ha: {
      purpose: "Ana amfani da shi don rage ciwo mai sauƙi zuwa matsakaici da rage zazzabi.",
      precautions: [
        "Kada a wuce yawan da aka rubuta a fakiti ko takardar likita a kowace rana.",
        "A guji shan wasu magungunan da ke ɗauke da paracetamol.",
        "A tambayi likitan magani kafin haɗawa da barasa ko wasu magunguna."
      ],
      adherence: "Ko da yaushe a bi adadi da lokacin da aka rubuta a fakitin ku ko takardar likita.",
      seekHelp: "A nemi taimakon likita idan an lura da rawaya a fata/idanu, jini da ba a saba gani ba, ko zazzabi ya wuce kwana 3."
    },
    ig: {
      purpose: "A na-eji ya belata mgbu dị nro ruo n'etiti na belata ahụ ọkụ.",
      precautions: [
        "Erila karịa ọnụ ọgụgụ e dere n'akwụkwọ ọgwụ gị kwa ụbọchị.",
        "Zere iri ya ya na ọgwụ ndị ọzọ nwere paracetamol n'ime ya.",
        "Jụọ ọkachamara ọgwụ tupu ijikọta ya na mmanya ma ọ bụ ọgwụ ọzọ."
      ],
      adherence: "Na-agbaso ọnụ ọgụgụ na oge e dere n'akwụkwọ ọgwụ gị mgbe niile.",
      seekHelp: "Chọọ enyemaka ahụike ma ị hụ akpụkpọ ahụ/anya na-acha odo odo, ọbara na-apụtaghị apụta, ma ọ bụ ọkụ ahụ na-adịgide ihe karịrị ụbọchị 3."
    },
    pcm: {
      purpose: "Dem dey use am to reduce small to medium pain and bring down fever.",
      precautions: [
        "No pass di amount wey dem write for di pack or prescription every day.",
        "No mix am wit oda medicine wey get paracetamol inside.",
        "Ask pharmacist before you mix am wit alcohol or oda drugs."
      ],
      adherence: "Always follow di dose and time wey dem write for your pack or prescription — e fit different based on age and weight.",
      seekHelp: "Go hospital sharp sharp if skin/eye dey yellow, if you dey bruise anyhow, or if fever no gree comot afta 3 days."
    }
  },
  {
    id: "amoxicillin",
    name: "Amoxicillin",
    category: "Antibiotic",
    en: {
      purpose: "Used to treat bacterial infections, as prescribed by a healthcare provider.",
      precautions: [
        "Complete the full course even if you feel better before finishing it.",
        "Tell your pharmacist if you have a known penicillin allergy.",
        "Do not share this medication with others, even with similar symptoms."
      ],
      adherence: "Stopping early can allow the infection to return and contributes to antibiotic resistance.",
      seekHelp: "Seek help immediately for signs of a severe allergic reaction: swelling of the face/throat, difficulty breathing, or a widespread rash."
    },
    yo: {
      purpose: "A máa ń lò fún ìtọ́jú àkóràn kòkòrò, gẹ́gẹ́ bí oníṣègùn ti kọ sílẹ̀.",
      precautions: [
        "Parí gbogbo ìtọ́jú náà pátápátá kódà bí ara rẹ bá yá kí o tó parí i.",
        "Sọ fún oníṣègùn bí o bá ní àìlera sí penicillin.",
        "Má ṣe pín oògùn yìí pẹ̀lú ẹlòmíràn, kódà bí wọ́n bá ní àmì àìsàn kan náà."
      ],
      adherence: "Dídáwọ́ dúró ní kùtùkùtù lè jẹ́ kí àkóràn padà wá, ó sì ń fa àtakò sí egbòogi.",
      seekHelp: "Wá ìrànlọ́wọ́ lẹ́sẹ̀kẹsẹ̀ bí o bá rí àmì àìsàn tí ó le: wíwú ojú/ọ̀fun, ìṣòro mímí, tàbí ìyọsẹ̀ jákèjádò ara."
    },
    ha: {
      purpose: "Ana amfani da shi wajen maganin cututtukan ƙwayoyin cuta, kamar yadda likita ya rubuta.",
      precautions: [
        "A gama cikakken maganin ko da an ji sauƙi kafin a gama.",
        "A gaya wa likitan magani idan kana da rashin lafiyar penicillin.",
        "Kada a raba wannan maganin da wasu, ko da suna da irin wannan alamun."
      ],
      adherence: "Dainawa da wuri na iya sa cutar ta dawo kuma yana taimakawa ga juriya ga maganin ƙwayoyin cuta.",
      seekHelp: "A nemi taimako nan take idan an ga alamun rashin lafiyar jiki mai tsanani: kumburin fuska/makogwaro, wahalar numfashi, ko kurji a jiki gaba ɗaya."
    },
    ig: {
      purpose: "A na-eji ya na-agwọ ọrịa nje bacteria, dịka dọkịta si depụta ya.",
      precautions: [
        "Richaa ọgwụgwọ ahụ zuru oke ọbụlagodi ma ahụ́ dị gị mma tupu ị gwụchaa ya.",
        "Gwa ọkachamara ọgwụ ma ọ bụrụ na ị nwere allergy penicillin.",
        "Ekekọrịtala ọgwụ a na ndị ọzọ, ọbụlagodi ha nwere otu mgbaàmà ahụike."
      ],
      adherence: "Ịkwụsị n'oge na-adịghị amaghi ọma nwere ike ime ka ọrịa lọghachi ma kwalite nguzogide ọgwụ nje.",
      seekHelp: "Chọọ enyemaka ozugbo maka mgbaàmà nke ahụike siri ike: ntutu ihu/akpịrị, ihe isi ike iku ume, ma ọ bụ nrighị nri n'ahụ dum."
    },
    pcm: {
      purpose: "Dem dey use am to treat bacteria infection, as di doctor prescribe am.",
      precautions: [
        "Finish di full course even if you feel better before you finish am.",
        "Tell pharmacist if you sabi say you get penicillin allergy.",
        "No share dis medicine wit anybody, even if dem get similar sign."
      ],
      adherence: "If you stop am early, di infection fit come back and e go add to antibiotic resistance.",
      seekHelp: "Go hospital sharp sharp if you see serious allergy sign: face/throat dey swell, hard to breathe, or rashes all over body."
    }
  },
  {
    id: "artemether-lumefantrine",
    name: "Artemether-Lumefantrine (Coartem)",
    category: "Malaria treatment",
    en: {
      purpose: "Used to treat confirmed cases of uncomplicated malaria.",
      precautions: [
        "Take with food or a milky drink to help absorption, as directed by your provider.",
        "Complete the full course exactly as prescribed, even if symptoms improve quickly.",
        "Confirm malaria with a test where possible before starting treatment."
      ],
      adherence: "Missing doses can lead to treatment failure and drug resistance.",
      seekHelp: "Seek urgent care if symptoms worsen, or if there is persistent vomiting, confusion, or difficulty staying awake."
    },
    yo: {
      purpose: "A máa ń lò fún ìtọ́jú ibà tí a ti fi ìdí rẹ̀ múlẹ̀ tí kò le koko.",
      precautions: [
        "Jẹun tàbí mu ohun mímu wàrà kí o tó mu, gẹ́gẹ́ bí a ti kọ ọ.",
        "Parí gbogbo ìtọ́jú náà gẹ́gẹ́ bí a ti kọ, kódà bí àmì àìsàn bá yá kánkán.",
        "Ṣe àyẹ̀wò ibà pẹ̀lú ìdánwò níbi tí ó bá ti ṣeéṣe kí o tó bẹ̀rẹ̀ ìtọ́jú."
      ],
      adherence: "Fífo oògùn sílẹ̀ lè fa kí ìtọ́jú náà má ṣiṣẹ́ àti àtakò sí oògùn.",
      seekHelp: "Wá ìtọ́jú kánkán bí àmì àìsàn bá burú sí i, tàbí bí èébì bá ń bá a lọ, ìdàrúdàpọ̀, tàbí ìṣòro láti jí."
    },
    ha: {
      purpose: "Ana amfani da shi wajen maganin zazzabin cizon sauro da aka tabbatar.",
      precautions: [
        "A sha tare da abinci ko abin sha na madara don taimakawa sha, kamar yadda aka umarta.",
        "A gama cikakken maganin daidai yadda aka rubuta, ko da alamun sun inganta da sauri.",
        "A tabbatar da zazzabin cizon sauro da gwaji inda zai yiwu kafin a fara magani."
      ],
      adherence: "Rasa allurai na iya haifar da gazawar magani da juriya ga magani.",
      seekHelp: "A nemi kulawa cikin gaggawa idan alamun sun tsananta, ko akwai amai mai ɗorewa, rikicewa, ko wahalar tsayawa a farke."
    },
    ig: {
      purpose: "A na-eji ya na-agwọ ọrịa iba a kwadoro nke na-adịghị egbu oke egbu.",
      precautions: [
        "Rie ya na nri ma ọ bụ ihe ọṅụṅụ mmiri ara ehi iji nyere aka ịṅụta ya, dịka e nyere ntuziaka.",
        "Richaa ọgwụgwọ ahụ zuru oke dịka e si depụta ya, ọbụlagodi mgbaàmà ahụ dị mma ngwa ngwa.",
        "Kwado iba site na ule ebe ọ ga-ekwe omume tupu ị malite ọgwụgwọ."
      ],
      adherence: "Ịhapụ ọgwụ nwere ike ibute ọdịda ọgwụgwọ na nguzogide ọgwụ.",
      seekHelp: "Chọọ nlekọta ngwa ngwa ma mgbaàmà ahụ ka njọ, ma ọ bụ agwọ na-anọgide na-adịgide, mgbagwoju anya, ma ọ bụ ihe isi ike iguzo maara."
    },
    pcm: {
      purpose: "Dem dey use am to treat malaria wey dem don confirm say e no serious.",
      precautions: [
        "Chop food or drink milk before you take am, e go help di body absorb am well, follow wetin dem tell you.",
        "Finish di full course exactly as dem prescribe am, even if di symptoms don improve quick quick.",
        "If possible, confirm say na malaria through test before you start treatment."
      ],
      adherence: "If you miss dose, e fit make di treatment no work and cause resistance.",
      seekHelp: "Go hospital urgent if symptoms dey worse, or if vomiting no gree stop, confusion, or e hard for you to stay awake."
    }
  },
  {
    id: "ors",
    name: "Oral Rehydration Salts (ORS)",
    category: "Dehydration treatment",
    en: {
      purpose: "Used to replace fluids and salts lost during diarrhoea or vomiting.",
      precautions: [
        "Mix only with clean, safe drinking water, in the exact amount stated on the sachet.",
        "Use a freshly mixed solution within 24 hours; discard after that.",
        "Continue breastfeeding infants alongside ORS, if applicable."
      ],
      adherence: "Give small, frequent sips rather than large amounts at once, especially for children.",
      seekHelp: "Seek urgent care for signs of severe dehydration: sunken eyes, very little urine, extreme tiredness, or inability to drink."
    },
    yo: {
      purpose: "A máa ń lò fún ìdápadà omi àti iyọ̀ tí ara pàdánù nígbà ìgbẹ́ gbuuru tàbí èébì.",
      precautions: [
        "Da pọ̀ mọ́ omi mímu tí ó mọ́ nìkan, ní iye tí a kọ sí àpò náà gan-an.",
        "Lo omi tí a ṣẹ̀ṣẹ̀ dà pọ̀ láàrín wákàtí 24; sọ ọ́ nù lẹ́yìn ìgbà náà.",
        "Máa bá a lọ pẹ̀lú fífún ọmọ ní ọmú bí ó bá yẹ, pẹ̀lú ORS."
      ],
      adherence: "Máa fún ní ẹ̀rín kékeré léraléra dípò iye tí ó pọ̀ lẹ́ẹ̀kan, ní pàtàkì fún àwọn ọmọdé.",
      seekHelp: "Wá ìtọ́jú kánkán bí àmì gbígbẹ ara tí ó le bá farahàn: ojú tí ó ti sẹ̀yìn, ìtọ̀ kékeré, àárẹ̀ tí ó pọ̀, tàbí àìlè mu omi."
    },
    ha: {
      purpose: "Ana amfani da shi don maido da ruwa da gishiri da aka rasa lokacin gudawa ko amai.",
      precautions: [
        "A haɗa kawai da tsaftataccen ruwan sha, a daidai adadin da aka rubuta a fakitin.",
        "A yi amfani da maganin da aka haɗa a cikin sa'o'i 24; a zubar bayan haka.",
        "A ci gaba da shayar da jarirai nono tare da ORS, idan ya dace."
      ],
      adherence: "A ba da ɗan kaɗan akai-akai maimakon babban adadi a lokaci ɗaya, musamman ga yara.",
      seekHelp: "A nemi kulawa cikin gaggawa don alamun rashin ruwa mai tsanani: idanu da suka nutse, fitsari kaɗan sosai, gajiya mai tsanani, ko rashin iya sha."
    },
    ig: {
      purpose: "A na-eji ya eweghachi mmiri na nnu ahụ tụfuru n'oge afọ ọsịsị ma ọ bụ agwọ.",
      precautions: [
        "Jiri naanị mmiri ọṅụṅụ dị ọcha gwakọta ya, na ọnụ ọgụgụ e dere na akpa ahụ kpọmkwem.",
        "Jiri ihe ngwọta e ji ọhụrụ gwakọtaa n'ime awa 24; wụfuo ya mgbe ahụ gachara.",
        "Gaa n'ihu na-enye ụmụ ọhụrụ ara ọnụ ya na ORS, ma ọ bụrụ na ọ dabara."
      ],
      adherence: "Nye obere mmiri ọṅụṅụ mgbe mgbe kama nye nnukwu ọnụ ọgụgụ otu ugbo, karịsịa maka ụmụaka.",
      seekHelp: "Chọọ nlekọta ngwa ngwa maka mgbaàmà nke mmiri ahụ kpọrọ nkụ nke ukwuu: anya mikpuru emikpu, mmamiri dị ntakịrị, ike ọgwụgwụ nke ukwuu, ma ọ bụ enweghị ike ịṅụ mmiri."
    },
    pcm: {
      purpose: "Dem dey use am to bring back water and salt wey body lose during running stomach or vomiting.",
      precautions: [
        "Mix am wit clean drinking water only, use di exact amount wey dem write for di sachet.",
        "Use di solution wey you just mix within 24 hours; comot am afta dat time.",
        "Continue to breastfeed baby alongside ORS, if e dey applicable."
      ],
      adherence: "Give small small sip often instead of plenty amount one time, especially for children.",
      seekHelp: "Go hospital urgent if you see serious dehydration sign: eyes wey don sink, small urine, plenty tiredness, or if person no fit drink again."
    }
  },
  {
    id: "ibuprofen",
    name: "Ibuprofen",
    category: "Pain relief / anti-inflammatory",
    en: {
      purpose: "Used to relieve pain, reduce inflammation, and lower fever.",
      precautions: [
        "Take with food to reduce the chance of stomach upset.",
        "Avoid if you have a history of stomach ulcers, unless advised by a provider.",
        "Do not combine with other anti-inflammatory painkillers without medical advice."
      ],
      adherence: "Use the lowest effective amount for the shortest time needed, as directed on the label.",
      seekHelp: "Seek help for signs of stomach bleeding: black stools, vomiting blood, or severe stomach pain."
    },
    yo: {
      purpose: "A máa ń lò fún ìdín ìrora, ìdín wíwú, àti ìdín ibà.",
      precautions: [
        "Jẹun kí o tó mu láti dín àyè sílẹ̀ fún ikùn rírun.",
        "Yẹra fún un bí o bá ní ìtàn ọgbẹ́ inú, àyàfi bí oníṣègùn bá gbà ọ́ nímọ̀ràn.",
        "Má ṣe dàpọ̀ mọ́ àwọn oògùn ìdín wíwú mìíràn láìjẹ́ pé oníṣègùn gbà ọ́ nímọ̀ràn."
      ],
      adherence: "Lo iye tí ó kéré jùlọ tí ó ń ṣiṣẹ́ fún àkókò tí ó kúrú jùlọ, gẹ́gẹ́ bí a ti kọ sí àpò náà.",
      seekHelp: "Wá ìrànlọ́wọ́ bí o bá rí àmì ẹ̀jẹ̀ inú: ìgbẹ́ dúdú, èébì ẹ̀jẹ̀, tàbí ìrora inú tí ó le."
    },
    ha: {
      purpose: "Ana amfani da shi wajen rage ciwo, rage kumburi, da rage zazzabi.",
      precautions: [
        "A sha tare da abinci don rage yiwuwar ciwon ciki.",
        "A guji idan kana da tarihin ulcer na ciki, sai dai idan likita ya ba da shawara.",
        "Kada a haɗa da wasu magungunan rage kumburi ba tare da shawarar likita ba."
      ],
      adherence: "A yi amfani da mafi ƙarancin adadi mai tasiri na ɗan gajeren lokaci, kamar yadda aka rubuta a lakabin.",
      seekHelp: "A nemi taimako don alamun zub da jini na ciki: bahaya baƙi, amai jini, ko ciwon ciki mai tsanani."
    },
    ig: {
      purpose: "A na-eji ya belata mgbu, belata azụmahịa, na belata ọkụ ahụ.",
      precautions: [
        "Rie ya na nri iji belata ohere nke afọ mgbu.",
        "Zere ya ma ọ bụrụ na ị nwere akụkọ ọnyá afọ, ma ọ bụrụ na ọkachamara akwadoghị ya.",
        "Ejikọtala ya na ọgwụ mgbu azụmahịa ndị ọzọ na-enweghị ndụmọdụ dọkịta."
      ],
      adherence: "Jiri ọnụ ọgụgụ kacha nta na-arụ ọrụ maka oge kacha dị mkpirikpi achọrọ, dịka e depụtara na akwụkwọ ọgwụ.",
      seekHelp: "Chọọ enyemaka maka mgbaàmà ọbara na-agba n'afọ: nsịojii, agwọ ọbara, ma ọ bụ mgbu afọ dị egwu."
    },
    pcm: {
      purpose: "Dem dey use am to reduce pain, swelling, and fever.",
      precautions: [
        "Chop food before you take am so dat your stomach no go upset.",
        "No take am if you get history of stomach ulcer, unless doctor talk say make you take am.",
        "No mix am wit oda anti-inflammatory pain medicine without doctor advice."
      ],
      adherence: "Use di smallest amount wey go work for di shortest time wey you need, follow wetin dey di label.",
      seekHelp: "Go hospital if you see stomach bleeding sign: black stool, vomiting blood, or serious stomach pain."
    }
  },
  {
    id: "metronidazole",
    name: "Metronidazole",
    category: "Antibiotic / antiparasitic",
    en: {
      purpose: "Used to treat certain bacterial and parasitic infections, as prescribed.",
      precautions: [
        "Avoid alcohol during treatment and for 48 hours after finishing.",
        "Complete the full course even if symptoms improve early.",
        "Report any unusual numbness or tingling in hands/feet to your provider."
      ],
      adherence: "Take at evenly spaced times as directed to maintain a steady effect.",
      seekHelp: "Seek help for severe nausea, seizures, or persistent numbness."
    },
    yo: {
      purpose: "A máa ń lò fún ìtọ́jú àwọn àkóràn kòkòrò àti alámọ̀tán kan, gẹ́gẹ́ bí a ti kọ sílẹ̀.",
      precautions: [
        "Yẹra fún ọtí nígbà ìtọ́jú àti fún wákàtí 48 lẹ́yìn tí o bá parí i.",
        "Parí gbogbo ìtọ́jú náà kódà bí àmì àìsàn bá yá kùtùkùtù.",
        "Sọ èyíkéyìí ìdààmú aláìlàrí tàbí wíwúsẹ̀ ní ọwọ́/ẹsẹ̀ fún oníṣègùn rẹ."
      ],
      adherence: "Mu ní àkókò tí ó dọ́gba gẹ́gẹ́ bí a ti kọ láti mú kí ipa rẹ̀ dúró ṣinṣin.",
      seekHelp: "Wá ìrànlọ́wọ́ fún ríru inú tí ó le, ìjagbọ́n, tàbí wíwúsẹ̀ tí ń bá a lọ."
    },
    ha: {
      purpose: "Ana amfani da shi wajen maganin wasu cututtukan ƙwayoyin cuta da tsutsotsi, kamar yadda aka rubuta.",
      precautions: [
        "A guji barasa lokacin magani da kuma na sa'o'i 48 bayan an gama.",
        "A gama cikakken maganin ko da alamun sun inganta da wuri.",
        "A ba da rahoton duk wani sanyin jiki ko taƙama a hannaye/ƙafafu ga likita."
      ],
      adherence: "A sha a daidai lokutan da aka tsara don kiyaye tasiri madaidaici.",
      seekHelp: "A nemi taimako don tashin zuciya mai tsanani, kamewa, ko taƙama mai ɗorewa."
    },
    ig: {
      purpose: "A na-eji ya na-agwọ ọrịa nje bacteria na parasite ụfọdụ, dịka e depụtara ya.",
      precautions: [
        "Zere mmanya n'oge ọgwụgwọ na maka awa 48 mgbe ị gwụchara.",
        "Richaa ọgwụgwọ ahụ zuru oke ọbụlagodi mgbaàmà ahụ dị mma n'isi mmalite.",
        "Kọọrọ ọkachamara gị ma ọ bụrụ na ị na-enwe mmetụtahụ ma ọ bụ ịsụ ntị n'aka/ụkwụ."
      ],
      adherence: "Ṅụọ ya n'oge nhata dịka e nyere ntuziaka iji nọgide na-arụ ọrụ nke ọma.",
      seekHelp: "Chọọ enyemaka maka ọgbụgbọ siri ike, mgbagharị ahụ, ma ọ bụ ịsụ ntị na-adịgide."
    },
    pcm: {
      purpose: "Dem dey use am to treat some bacteria and parasite infection, as dem prescribe am.",
      precautions: [
        "No drink alcohol during treatment and for 48 hours afta you finish am.",
        "Finish di full course even if symptoms don improve early.",
        "Tell your doctor if you feel unusual numbness or tingling for hand/leg."
      ],
      adherence: "Take am for even spaced time as dem direct you so di effect go steady.",
      seekHelp: "Go hospital if you get serious nausea, seizure, or numbness wey no gree stop."
    }
  }
];

// General, non-drug-specific safety messages shown throughout the app
const RXLOOP_GENERAL_NOTICES = {
  en: "This app provides general medication information only. It is not a diagnosis or a substitute for professional medical advice. Always follow your prescription label or ask a pharmacist.",
  yo: "Ìohùn yìí ń pèsè ìwífún gbogbogbò nípa oògùn nìkan. Kì í ṣe àyẹ̀wò àrùn tàbí ìpààrọ̀ fún ìmọ̀ràn oníṣègùn. Máa tẹ̀lé àkọsílẹ̀ ìwé oníṣègùn rẹ tàbí béèrè lọ́wọ́ oníṣègùn.",
  ha: "Wannan app yana ba da bayanan magani na gaba ɗaya kawai. Ba ganewar asali ba ne ko madadin shawarar likita. Ko da yaushe a bi rubutun takardar likitan ku ko a tambayi likitan magani.",
  ig: "Ngwa a na-enye naanị ozi ọgwụ n'ozuzu. Ọ bụghị nchọpụta ma ọ bụ ihe na-anọchi anya ndụmọdụ dọkịta. Na-agbaso mkpado akwụkwọ ọgwụ gị mgbe niile ma ọ bụ jụọ ọkachamara ọgwụ.",
  pcm: "Dis app dey give general medicine information only. E no be diagnosis or replacement for doctor advice. Always follow wetin dey your prescription label or ask pharmacist."
};
