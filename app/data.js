/* ══════════════════════════════════════════════════════════
   RxLoop — medication reference data
   Loaded by both / (homepage demo) and /app/ (the product).

   RULES FOR THIS FILE — do not relax them:
   1. General safety and adherence guidance only.
   2. NO numeric dosing. Ever. Dose belongs to a clinician who
      knows the patient's weight, age, kidneys and pregnancy status.
   3. Every entry here is a FIRST-PASS DRAFT. Before wide public
      release, a licensed pharmacist must review every English
      entry, and a native-speaking health communicator must review
      each of yo / ha / ig / pcm. The UI flags this to users.
   ══════════════════════════════════════════════════════════ */

window.RX = window.RX || {};

RX.LANGS = [
  { id:'en',  label:'English',         native:'English' },
  { id:'pcm', label:'Nigerian Pidgin', native:'Pidgin' },
  { id:'yo',  label:'Yorùbá',          native:'Yorùbá' },
  { id:'ha',  label:'Hausa',           native:'Hausa' },
  { id:'ig',  label:'Igbo',            native:'Igbo' }
];

/* UI strings, so the whole app switches language — not just the cards */
RX.UI = {
  en:  { f1:'What it is for', f2:'How to take it', f3:'When to get help',
         search:'Search a medicine', learn:'Medicines', report:'Report', remind:'Reminders',
         draft:'Draft translation — pending clinical review',
         nodose:'No dosing figures here — ask a pharmacist',
         offline:'Available offline' },
  pcm: { f1:'Wetin e dey do', f2:'How to take am', f3:'When to find help',
         search:'Find medicine', learn:'Medicine', report:'Report', remind:'Reminder',
         draft:'Draft translation — dem never check am well',
         nodose:'No dose number dey here — ask pharmacist',
         offline:'E dey work offline' },
  yo:  { f1:'Ohun tí ó ń ṣe', f2:'Bí a ṣe ń lò ó', f3:'Ìgbà tí o gbọ́dọ̀ wá ìrànlọ́wọ́',
         search:'Wá oògùn', learn:'Oògùn', report:'Ìròyìn', remind:'Ìránnilétí',
         draft:'Ìtumọ̀ àkọ́kọ́ — a kò tíì ṣàyẹ̀wò rẹ̀',
         nodose:'Kò sí iye ìwọ̀n níbí — bi oníṣègùn',
         offline:'Ó ń ṣiṣẹ́ láìsí ìntánẹ́ẹ̀tì' },
  ha:  { f1:'Abin da yake yi', f2:'Yadda ake sha', f3:'Lokacin neman taimako',
         search:'Nemi magani', learn:'Magunguna', report:'Rahoto', remind:'Tunatarwa',
         draft:'Fassarar farko — ba a tantance ba tukuna',
         nodose:'Babu adadin sha a nan — a tambayi likitan magani',
         offline:'Yana aiki ba tare da yanar gizo ba' },
  ig:  { f1:'Ihe ọ na-eme', f2:'Otu esi aṅụ ya', f3:'Mgbe ị ga-achọ enyemaka',
         search:'Chọọ ọgwụ', learn:'Ọgwụ', report:'Mkpesa', remind:'Ncheta',
         draft:'Ntụgharị mbụ — enyochabeghị ya',
         nodose:'Ọ nweghị ọnụọgụ ọṅụṅụ ebe a — jụọ onye ọgwụ',
         offline:'Ọ na-arụ ọrụ na-enweghị ịntanetị' }
};

RX.MEDS = [
  {
    id:'para', name:'Paracetamol', gen:'Acetaminophen · pain and fever',
    tags:['fever','pain','headache','panadol','acetaminophen'],
    en:{f1:'Brings down fever and eases mild to moderate pain.',
        f2:'Swallow with water. Never take two different products that both contain paracetamol — check cold and flu mixtures, which very often do.',
        f3:'Fever still there after three days, or any pain lasting more than five days. Get help immediately if too much has been taken, even if the person feels fine.'},
    pcm:{f1:'E dey bring fever down and reduce small-to-medium pain.',
        f2:'Swallow am with water. No take two different medicine wey both get paracetamol inside — check catarrh and flu mixture well, plenty of dem get am.',
        f3:'If fever still dey after three days, or pain pass five days. If person take too much, rush go hospital sharp-sharp even if e feel alright.'},
    yo:{f1:'Ó ń mú ibà kúrò, ó sì ń dín ìrora kékeré sí àárín kù.',
        f2:'Mu pẹ̀lú omi. Má ṣe lo oògùn méjì tí àwọn méjèèjì ní paracetamol nínú — ṣàyẹ̀wò oògùn òtútù dáadáa, ọ̀pọ̀ wọn ni ó ní nínú.',
        f3:'Bí ibà kò bá lọ lẹ́yìn ọjọ́ mẹ́ta, tàbí ìrora tí ó ju ọjọ́ márùn-ún lọ. Bí ẹnìkan bá lò ó jù, sáré lọ sí ilé ìwòsàn lẹ́sẹ̀kẹsẹ̀.'},
    ha:{f1:'Yana rage zazzaɓi da sauƙaƙa ciwo mai sauƙi zuwa matsakaici.',
        f2:'A sha da ruwa. Kada a haɗa magunguna biyu daban da dukkansu ke ɗauke da paracetamol — a duba magungunan mura sosai, yawancinsu suna da shi.',
        f3:'Idan zazzaɓi bai sauka ba bayan kwana uku, ko ciwo ya wuce kwana biyar. Idan an sha fiye da kima, a garzaya asibiti nan take.'},
    ig:{f1:'Ọ na-ebelata ahụ ọkụ ma belata mgbu dị nta ruo nke etiti.',
        f2:"Were mmiri ṅụọ ya. Ejila ọgwụ abụọ dị iche nwere paracetamol n'ime ha — lelee ọgwụ oyi nke ọma, ọtụtụ n'ime ha nwere ya.",
        f3:'Ọ bụrụ na ahụ ọkụ akwụsịghị mgbe ụbọchị atọ gasịrị, ma ọ bụ mgbu karịrị ụbọchị ise. Ọ bụrụ na e were ya karịa, gaa ụlọ ọgwụ ozugbo.'}
  },
  {
    id:'amox', name:'Amoxicillin', gen:'Antibiotic · bacterial infection',
    tags:['antibiotic','infection','ampiclox','throat','chest'],
    en:{f1:'An antibiotic for certain bacterial infections. It does nothing at all for colds, flu or most sore throats.',
        f2:'Space the doses evenly and finish the entire course even after you feel well. Stopping early is what breeds resistant bacteria.',
        f3:'Rash, swelling of the face or lips, or trouble breathing — stop and get help immediately. Also return if there is no improvement after three days.'},
    pcm:{f1:'Na antibiotic for some bacteria infection. E no fit do anything for catarrh, flu or most throat pain.',
        f2:'Space the dose well-well and finish the whole course even after you don feel better. Na to stop am early dey make bacteria strong pass medicine.',
        f3:'If rash show, face or lip swell, or breathing hard you — stop and find help sharp-sharp. Come back too if nothing change after three days.'},
    yo:{f1:'Antibiotic fún àwọn àkóràn bakitéríà kan. Kò ní ipa kankan lórí òtútù tàbí ọ̀fun dídùn.',
        f2:'Pín àkókò rẹ̀ dọ́gba, kí o sì parí gbogbo rẹ̀ bí ara rẹ tilẹ̀ ti yá. Dídúró lásìkò ni ó ń mú kí bakitéríà lágbára ju oògùn lọ.',
        f3:'Bí ara bá yun, bí ojú tàbí ètè bá wú, tàbí mímí bá le — dá dúró kí o sì wá ìrànlọ́wọ́ lẹ́sẹ̀kẹsẹ̀. Padà pẹ̀lú bí kò bá sí ìyípadà lẹ́yìn ọjọ́ mẹ́ta.'},
    ha:{f1:'Maganin ƙwayoyin cuta ne na wasu cututtuka. Ba ya aiki ko kaɗan a kan mura ko ciwon maƙogwaro.',
        f2:'A raba lokutan sha daidai, a kuma kammala duka maganin ko da an ji sauƙi. Dakatarwa da wuri shi ke ƙarfafa ƙwayoyin cuta.',
        f3:'Idan an sami kurji, kumburin fuska ko leɓe, ko wahalar numfashi — a daina a nemi taimako nan take. A dawo kuma idan babu sauƙi bayan kwana uku.'},
    ig:{f1:'Ọ bụ ọgwụ nje maka ụfọdụ ọrịa nje. Ọ naghị arụ ọrụ maka oyi ma ọ bụ akpịrị mgbu.',
        f2:"Kesaa oge ọṅụṅụ ya nhata, mechaakwa ya niile ọ bụrụgodi na ahụ dị gị mma. Ịkwụsị n'oge na-eme ka nje sie ike karịa ọgwụ.",
        f3:'Ọ bụrụ na ahụ amalite ịgba mkpụrụ, ihu ma ọ bụ egbugbere ọnụ aza, ma ọ bụ iku ume siri ike — kwụsị ma chọọ enyemaka ozugbo.'}
  },
  {
    id:'act', name:'Artemether–Lumefantrine', gen:'ACT · uncomplicated malaria',
    tags:['malaria','coartem','act','fever','lonart'],
    en:{f1:'First-line treatment for uncomplicated malaria. It is only correct after a test confirms malaria — treating a fever blind wastes the drug and hides the real cause.',
        f2:'Take it with food or something fatty like milk or groundnut, otherwise the body absorbs far too little. Complete every dose in the pack.',
        f3:'Vomiting within an hour of a dose, convulsions, confusion, very dark urine, or a fever that returns after finishing — these need a clinic the same day.'},
    pcm:{f1:'Na the first medicine for ordinary malaria. E only correct after test confirm malaria — to just treat fever anyhow dey waste medicine and dey hide the real problem.',
        f2:'Take am with food or something wey get oil like milk or groundnut, if not body no go absorb am well. Finish every dose inside the pack.',
        f3:'If you vomit within one hour after dose, or convulsion, confusion, very dark urine, or fever come back after you finish — go clinic that same day.'},
    yo:{f1:'Oògùn àkọ́kọ́ fún ibà tí kò le. Ó tọ́ nìkan lẹ́yìn tí àyẹ̀wò bá fi ibà hàn.',
        f2:'Mu ún pẹ̀lú oúnjẹ tàbí ohun tí ó ní òróró bíi wàrà tàbí èpà, bí bẹ́ẹ̀ kọ́ ara kò ní gbà á dáadáa. Parí gbogbo ìwọ̀n tí ó wà nínú àpò náà.',
        f3:'Bí o bá bì láàárín wákàtí kan, tàbí gìrì, ìdàrúdàpọ̀ ọkàn, ìtọ̀ dúdú púpọ̀, tàbí ibà padà lẹ́yìn tí o parí — lọ sí ilé ìwòsàn ní ọjọ́ náà gan-an.'},
    ha:{f1:'Maganin farko na zazzaɓin cizon sauro mara tsanani. Ya dace kawai bayan gwaji ya tabbatar da cutar.',
        f2:'A sha shi tare da abinci ko wani abu mai mai kamar madara ko gyaɗa, in ba haka ba jiki ba zai sha shi sosai ba. A kammala kowane sha a cikin fakitin.',
        f3:"Amai a cikin awa ɗaya bayan sha, farfaɗiya, rikicewar hankali, fitsari mai duhu sosai, ko zazzaɓi ya dawo bayan an gama — a je asibiti a ranar."},
    ig:{f1:'Ọgwụ mbụ maka ịba na-adịghị njọ. Ọ ziri ezi naanị mgbe nnwale gosiri na ọ bụ ịba.',
        f2:'Were nri ma ọ bụ ihe nwere mmanụ dịka mmiri ara ehi ma ọ bụ ahụekere ṅụọ ya, ma ọ bụghị ya ahụ agaghị anara ya nke ọma. Mechaa ọṅụṅụ niile dị na ngwugwu ahụ.',
        f3:"Ọ bụrụ na ị gbọọ agbọ n'ime otu awa, ịda mba, mgbagwoju anya, mmamịrị gbara oji nke ukwuu, ma ọ bụ ahụ ọkụ laghachiri — gaa ụlọ ọgwụ n'otu ụbọchị ahụ."}
  },
  {
    id:'ors', name:'ORS + Zinc', gen:'Oral rehydration · childhood diarrhoea',
    tags:['diarrhoea','ors','zinc','children','dehydration','running stomach'],
    en:{f1:'Replaces the water and salts lost in diarrhoea. This is the treatment that saves the child — the fluid, not an antibiotic.',
        f2:'Mix one sachet into the exact volume of clean water printed on it. Never mix it stronger, never sweeten it, and give small sips continuously. Zinc continues for the full ten to fourteen days.',
        f3:'Sunken eyes, no tears, no urine for many hours, a child too weak to drink, blood in the stool, or diarrhoea past two days — this is an emergency.'},
    pcm:{f1:'E dey replace the water and salt wey body loss for running belle. Na the fluid dey save the pikin, no be antibiotic.',
        f2:'Mix one sachet inside the exact water wey dem write for the pack. No make am strong pass, no add sugar, give small-small sip continuously. Zinc go continue full ten to fourteen days.',
        f3:'If eye don sink, no tears, no urine for many hours, pikin too weak to drink, blood dey inside toilet, or e pass two days — na emergency, run go hospital.'},
    yo:{f1:'Ó ń rọ́pò omi àti iyọ̀ tí ara pàdánù nínú ìgbẹ́ gbuuru. Omi yìí ni ó ń gba ọmọ là, kì í ṣe antibiotic.',
        f2:'Da àpò kan sínú iye omi mímọ́ gẹ́gẹ́ bí a ti kọ ọ́ sí ara rẹ̀. Má ṣe mú kí ó lágbára jù, má ṣe fi ṣúgà kún un, kí o sì máa fún un díẹ̀díẹ̀. Zinc yóò tẹ̀síwájú fún ọjọ́ mẹ́wàá sí mẹ́rìnlá.',
        f3:'Bí ojú bá wọlé, kò sí omijé, kò tọ̀ fún wákàtí púpọ̀, ọmọ kò lè mu omi, ẹ̀jẹ̀ wà nínú ìgbẹ́, tàbí ó ti ju ọjọ́ méjì lọ — pàjáwìrì ni.'},
    ha:{f1:'Yana maye gurbin ruwa da gishirin da jiki ya rasa a zawo. Ruwan ne ke ceton yaro, ba maganin ƙwayoyin cuta ba.',
        f2:'A haɗa buhu ɗaya cikin ruwa mai tsafta daidai gwargwadon abin da aka rubuta. Kada a ƙara ƙarfinsa, kada a sa sukari, a riƙa ba da ɗan kaɗan kullum. Zinc ya ci gaba har kwana goma zuwa goma sha huɗu.',
        f3:"Idan idanu sun nutse, babu hawaye, babu fitsari na sa'o'i da yawa, yaro ya kasa sha, akwai jini a bayan gida, ko ya wuce kwana biyu — gaggawa ce."},
    ig:{f1:"Ọ na-edochi mmiri na nnu ahụ furu efu n'afọ ọsịsa. Ọ bụ mmiri a na-azọpụta nwa ahụ, ọ bụghị ọgwụ nje.",
        f2:"Gwakọta otu akpa n'ime mmiri dị ọcha kwesịrị ekwesị nke edere na ya. Emela ka o sie ike karịa, etinyela shuga, nye ya nta nta oge niile. Zinc na-aga n'ihu ụbọchị iri ruo iri na anọ.",
        f3:'Ọ bụrụ na anya adaa, anya mmiri adịghị, ọ nweghị mmamịrị ruo ọtụtụ awa, nwa ahụ enweghị ike ịṅụ ihe, ọbara dị na nsị, ma ọ bụ ọ gafere ụbọchị abụọ — ọ bụ ihe mberede.'}
  },
  {
    id:'amlo', name:'Amlodipine', gen:'Antihypertensive · daily, long-term',
    tags:['blood pressure','hypertension','bp','heart'],
    en:{f1:'Lowers blood pressure. It works only while it is being taken — high blood pressure has no symptoms, so feeling fine is not a reason to stop.',
        f2:'Take it at the same time every day, with or without food. If a day is missed, take the next dose at its normal time rather than doubling up.',
        f3:'Swelling of the ankles, dizziness on standing, or a very slow pulse are worth reporting. Chest pain or breathlessness needs urgent care.'},
    pcm:{f1:'E dey bring blood pressure down. E only dey work while you dey take am — high BP no get symptom, so make you no stop just because you feel alright.',
        f2:'Take am same time every day, with or without food. If you miss one day, take the next dose for im normal time; no double am.',
        f3:'If ankle swell, head dey turn when you stand up, or heartbeat slow well-well, tell person. Chest pain or breathing wahala na urgent.'},
    yo:{f1:'Ó ń dín ìfúnpá kù. Ó ń ṣiṣẹ́ nìkan nígbà tí a bá ń lò ó — ìfúnpá gíga kò ní àmì, nítorí náà kí ara rẹ yá kọ́ ni ìdí láti dá dúró.',
        f2:'Lò ó ní àkókò kan náà lójoojúmọ́, pẹ̀lú oúnjẹ tàbí láìsí. Bí o bá gbàgbé ọjọ́ kan, lo èyí tí ó tẹ̀lé ní àkókò rẹ̀; má ṣe lo méjì pọ̀.',
        f3:'Bí ẹsẹ̀ bá wú, tàbí orí bá ń yí nígbà tí o bá dìde, sọ fún oníṣègùn. Ìrora àyà tàbí ìṣòro mímí jẹ́ pàjáwìrì.'},
    ha:{f1:'Yana rage hawan jini. Yana aiki ne kawai muddin ana sha — hawan jini ba shi da alama, don haka jin daɗi ba dalilin dainawa ba ne.',
        f2:'A sha a lokaci ɗaya kowace rana, da abinci ko ba tare da shi ba. Idan an manta rana ɗaya, a sha na gaba a lokacinsa; kada a ninka.',
        f3:'Kumburin idon sawu, jiri idan an tashi tsaye, ko bugun zuciya a hankali sosai — a sanar da likita. Ciwon ƙirji ko ƙarancin numfashi na gaggawa ne.'},
    ig:{f1:'Ọ na-ebelata ọbara mgbali elu. Ọ na-arụ ọrụ naanị mgbe a na-aṅụ ya — ọbara mgbali elu enweghị ihe ịrịba ama.',
        f2:"Ṅụọ ya n'otu oge kwa ụbọchị, nwere nri ma ọ bụ na-enweghị. Ọ bụrụ na i chefuru otu ụbọchị, ṅụọ nke ọzọ n'oge ya; ejila abụọ ọnụ.",
        f3:'Nkwụsị ụkwụ, isi ọwụwa mgbe i biliri ọtọ, ma ọ bụ obi na-akụ nwayọọ — gwa dọkịta. Mgbu obi ma ọ bụ nsogbu iku ume bụ ihe mberede.'}
  },
  {
    id:'metf', name:'Metformin', gen:'Type 2 diabetes · daily, long-term',
    tags:['diabetes','sugar','glucose','type 2'],
    en:{f1:'Helps the body use its own insulin better in type 2 diabetes. It works alongside food and movement, not instead of them.',
        f2:'Take it with or just after a meal — this reduces the stomach upset most people get in the first weeks. Do not skip meals while taking it.',
        f3:'Persistent vomiting, deep fast breathing, unusual muscle pain or extreme weakness need same-day care. Shaking, sweating and confusion mean low sugar — take something sweet and get help.'},
    pcm:{f1:'E dey help body use im own insulin well for type 2 diabetes. E dey work with food and exercise, no be instead of dem.',
        f2:'Take am with food or just after you chop — e go reduce the belle wahala wey plenty people dey get for the first weeks. No skip food while you dey take am.',
        f3:'If vomit no gree stop, breathing deep and fast, strange muscle pain or serious weakness — go hospital that day. If you dey shake, sweat and confuse, na low sugar: take something sweet quick and find help.'},
    yo:{f1:'Ó ń ran ara lọ́wọ́ láti lo insulin ara rẹ̀ dáadáa nínú àtọ̀gbẹ irú kejì. Ó ń ṣiṣẹ́ pẹ̀lú oúnjẹ àti eré ìdárayá.',
        f2:'Mu ún pẹ̀lú oúnjẹ tàbí lẹ́yìn oúnjẹ — èyí ń dín ìdààmú inú kù ní àwọn ọ̀sẹ̀ àkọ́kọ́. Má ṣe fo oúnjẹ nígbà tí o bá ń lò ó.',
        f3:'Bíbì tí kò dúró, mímí kíkanjú, ìrora iṣan àjèjì tàbí àìlera gidi — lọ sí ilé ìwòsàn lọ́jọ́ náà. Gbígbọ̀n, làágùn àti ìdàrúdàpọ̀ túmọ̀ sí ṣúgà kékeré: jẹ ohun dídùn kí o sì wá ìrànlọ́wọ́.'},
    ha:{f1:'Yana taimaka wa jiki ya yi amfani da insulin ɗinsa sosai a ciwon sukari na biyu. Yana aiki tare da abinci da motsa jiki.',
        f2:'A sha da abinci ko nan da nan bayan cin abinci — hakan yana rage damuwar ciki da mutane da yawa ke ji a makonnin farko. Kada a bar cin abinci yayin shansa.',
        f3:'Amai mara tsayawa, numfashi mai zurfi da sauri, ciwon tsoka mara saba ko matsanancin rauni — a je asibiti a ranar. Rawar jiki, gumi da rikicewa na nufin ƙarancin sukari: a sha wani abu mai zaki a nemi taimako.'},
    ig:{f1:'Ọ na-enyere ahụ aka iji insulin nke ya nke ọma na ọrịa shuga ụdị abụọ. Ọ na-arụ ọrụ ya na nri na mmega ahụ.',
        f2:'Were nri ma ọ bụ mgbe i risịrị nri ṅụọ ya — nke a na-ebelata nsogbu afọ ọtụtụ mmadụ na-enweta n\'izu mbụ. Adịghị agafe nri mgbe ị na-aṅụ ya.',
        f3:'Ịgbọ agbọ na-akwụsịghị, iku ume ọsọ ọsọ, mgbu akwara na-adịghị mma ma ọ bụ ike ọgwụgwụ — gaa ụlọ ọgwụ n\'ụbọchị ahụ. Ịma jijiji, ọsụsọ na mgbagwoju anya pụtara shuga dara ala: rie ihe ụtọ ma chọọ enyemaka.'}
  }
];

/* Observable red flags on a pack. Deliberately things a person can
   see, smell or price — no lab equipment required. */
RX.FLAGS = [
  'Packaging print is blurred or misaligned',
  'Seal broken or blister loose',
  'Tablets differ in colour, smell or texture',
  'No effect after a full course',
  'Price far below normal',
  'Expiry or batch code missing or unreadable'
];

RX.STATES = ['Rivers','Lagos','Kano','FCT Abuja','Oyo','Anambra','Kaduna','Enugu','Delta','Borno','Other'];
