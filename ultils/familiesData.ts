export interface ContactPerson {
  name: string;
  number: string;
  relation: string;
}

export interface FamilyData {
  familyName: string;
  familyNameHindi: string;
  contacts: ContactPerson[];
  address: {
    line1: string;
    line1Hindi: string;
    line2: string;
    line2Hindi: string;
    area: string;
    areaHindi: string;
    city: string;
    cityHindi: string;
  };
  eventDate: string;
  eventTime: string;
  eventTimeHindi: string;
  immersionDate: string;
  customMessage?: string;
  customMessageHindi?: string;
  untilDay?: number;
  poojaDate?: string;
}

export const familiesData: Record<string, FamilyData> = {
  solanki: {
    familyName: "SOLANKI FAMILY",
    familyNameHindi: "सोलंकी परिवार",
    contacts: [
      {
        name: "Rajesh Solanki",
        number: "9702555519",
        relation: "पिताजी • Father",
      },
      {
        name: "Sahil Solanki",
        number: "9326675513",
        relation: "पुत्र • Son",
      },
    ],
    address: {
      line1: "206, Krishnakunj Society",
      line1Hindi: "206, कृष्णकुंज सोसायटी",
      line2: "Sharda Nagar, Dawadi",
      line2Hindi: "शारदा नगर, दावाडी",
      area: "Dombivli, Maharashtra",
      areaHindi: "डोंबिवली, महाराष्ट्र",
      city: "Mumbai",
      cityHindi: "मुंबई",
    },
    eventDate: "August 27, 2025",
    eventTime: "From 10:00 AM",
    eventTimeHindi: "प्रातः 10:00 बजे से",
    immersionDate: "August 31, 2025",
  poojaDate: "August 30, 2025",
    untilDay:5,
  },
patil: {
  familyName: "PATIL FAMILY",
  familyNameHindi: "पटील कुटुंब",
  contacts: [
    {
      name: "Vinod Patil",
      number: "9270293333",
      relation: "गृहस्वामी • Host",
    },
    {
      name: "Vaidhehi Patil",
      number: "8070073333",
      relation: "गृहस्वामिनी • Host",
    }
  ],
  address: {
    line1: "Sheetlai Villa",
    line1Hindi: "शीतलै विळा",
    line2: "Sharda Nagar, Dawadi",
    line2Hindi: "शारदा नगर, दवाडी",
    area: "Dombivli",
    areaHindi: "डोम्बिवली",
    city: "Mumbai",
    cityHindi: "मुंबई"
  },
  eventDate: "August 28, 2025",
  eventTime: "From 10:00 AM",
  eventTimeHindi: "प्रातः १०:०० वाजता पासून",
  immersionDate: "Septembet 02, 2025",
  poojaDate: "September 01, 2025",
  untilDay: 5
},
  upadhyay: {
    familyName: "UPADHYAY FAMILY",
    familyNameHindi: "उपाध्याय परिवार",
    contacts: [
      {
        name: "Sanjay Upadhyay",
        number: "7738755139",
        relation: "गृहस्वामी • Host",
      },
      {
        name: "Abhishek Upadhyay",
        number: "9768354919",
        relation: "गृहस्वामी • Host",
      },
    ],
    address: {
    line1: "C- 1402, JH Zojwala Regency Park",
    line1Hindi: "C- 1402, जेएच जोजवाला रीजेंसी पार्क",
    line2: "beside Patel Rmart",
    line2Hindi: "पटेल आरमार्ट के पास",
    area: "Kalyan",
    areaHindi: "कल्याण",
    city: "Mumbai",
    cityHindi: "मुंबई"
  },
    eventDate: "August 27, 2025", // 2nd day celebration for Sharma family
    eventTime: "From 9:00 AM",
    eventTimeHindi: "प्रातः 9:00 बजे से",
    immersionDate: "August 28, 2025",
  poojaDate: "August 28, 2025",
    untilDay:1.5,
    customMessage: "Join us for a grand celebration with cultural programs",
    customMessageHindi:
      "सांस्कृतिक कार्यक्रमों के साथ भव्य उत्सव में शामिल हों",
  },
};

