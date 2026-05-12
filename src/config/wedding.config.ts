export interface WeddingConfig {
  couple: {
    bride: string;
    groom: string;
    displayName: string;
  };
  events: {
    day1: {
      date: string;
      church: {
        time: string;
        name: string;
        address: string;
        embedUrl: string;
        mapLink: string;
      };
      reception: {
        time: string;
        name: string;
        address: string;
        embedUrl: string;
        mapLink: string;
      };
      afterParty: {
        time: string;
        venue: string;
        address: string;
        note: string;
      };
    };
    day2: {
      date: string;
      thanksgiving: {
        time: string;
        name: string;
        address: string;
        embedUrl: string;
        mapLink: string;
      };
    };
  };
  assets: {
    logo: string;
    heroImages: string[];
    storyBrideImage: string;
    storyGroomImage: string;
    weddingDetailsBackground: string;
    closingSectionBackground: string;
  };
  colors: Array<{
    name: string;
    hex: string;
    role: 'primary' | 'secondary' | 'accent';
  }>;
  content: {
    welcomeMessage: string;
    brideStory: string;
    groomStory: string;
    closingMessage: string;
    rsvpDeadline: string;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  contacts: Array<{
    name: string;
    phone: string;
  }>;
  gifts: {
    message: string;
    accounts: Array<{
      bankName: string;
      accountName: string;
      accountNumber: string;
      type: string;
      swiftCode?: string;
      additionalInfo?: string;
    }>;
  };
}

export const weddingConfig: WeddingConfig = {
  couple: {
    bride: "Ozioma",
    groom: "Kenechukwu",
    displayName: "Ozioma & Kenechukwu"
  },
  events: {
    day1: {
      date: "September 12, 2026",
      church: {
        time: "11:00 AM",
        name: "Chapel of Grace and Knowledge, Anglican Church",
        address: "A.C.M.G.S school road, Elelenwo, Port Harcourt",
        embedUrl: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.5525396923304!2d7.071420099999999!3d4.84661285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069cd42b0db56d7%3A0x33ee6073add19dc6!2sArcheacon%20Crowther%20Memorial%20Girls%20School%2C%20Mission%20Rd%2C%20Umurolu%2C%20Elelenwa%20500102%2C%20Rivers!5e0!3m2!1sen!2sng!4v1778548727975!5m2!1sen!2sng" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
        mapLink: "https://maps.google.com/?q=Archeacon+Crowther+Memorial+Girls+School+Elelenwa"
      },
      reception: {
        time: "2:30 PM",
        name: "White Jade Event Centre",
        address: "GU ake road, Eliozu, Eligbolo street, Port Harcourt",
        embedUrl: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.412710169473!2d7.014873499999999!3d4.8703218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069d38245d6ae67%3A0xcc50cd84c4ef25b9!2sWhiteJade%20Event%20Centre!5e0!3m2!1sen!2sng!4v1778583237372!5m2!1sen!2sng" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
        mapLink: "https://maps.app.goo.gl/WT8rZkWNzt5ivexG9"
      },
      afterParty: {
        time: "6:00 PM",
        venue: "White Jade Event Centre",
        address: "GU ake road, Eliozu, Eligbolo street, Port Harcourt",
        note: "The wedding ends officially by 6pm, the after party has been designed for just the couples closest friends"
      }
    },
    day2: {
      date: "September 13, 2026",
      thanksgiving: {
        time: "8:00 AM",
        name: "Wedding Thanksgiving - Chapel of Grace and Knowledge Anglican Church",
        address: "A.C.M.G.S school road, Elelenwo, Port Harcourt",
        embedUrl: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.5525396923304!2d7.071420099999999!3d4.84661285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069cd42b0db56d7%3A0x33ee6073add19dc6!2sArcheacon%20Crowther%20Memorial%20Girls%20School%2C%20Mission%20Rd%2C%20Umurolu%2C%20Elelenwa%20500102%2C%20Rivers!5e0!3m2!1sen!2sng!4v1778548727975!5m2!1sen!2sng" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
        mapLink: "https://maps.google.com/?q=Archeacon+Crowther+Memorial+Girls+School+Elelenwa"
      }
    }
  },
  assets: {
    logo: "/Ozi's Wedding Logo (Version 1).jpg",
    heroImages: [
      "/images/proposal-images/ACP_3101.jpg",
      "/images/proposal-images/ACP_3105.jpg",
      "/images/proposal-images/ACP_3115.jpg",
      "/images/proposal-images/ACP_3125.jpg",
      "/images/proposal-images/ACP_3135.jpg"
    ],
    storyBrideImage: "/images/proposal-images/ACP_3140.jpg",
    storyGroomImage: "/images/proposal-images/ACP_3150.jpg",
    weddingDetailsBackground: "/images/proposal-images/ACP_3120.jpg",
    closingSectionBackground: "/images/proposal-images/ACP_3180.jpg"
  },
  colors: [
    { name: "Olive Green", hex: "#6B8E23", role: "primary" },
    { name: "Onion Purple", hex: "#AE6578", role: "secondary" },
    { name: "Peach", hex: "#FFD7BE", role: "accent" },
    { name: "Navy Blue", hex: "#001F3F", role: "accent" },
    { name: "Nude", hex: "#E8BEAC", role: "accent" }
  ],
  content: {
    welcomeMessage: "Welcome to our Wedding website; with hearts full of joy, we welcome you to celebrate in our joy and share in the most meaningful days of our life. You will find all the details of our wedding day and the celebration we're so excited to share",
    brideStory: `I was invited to the wedding of one of my Sister's classmate, of which I reluctantly came for, unlike me, who is usually the first to be present at a social gathering. I hadn't planned for it, but she pleaded that I joined her so she won't be alone. Getting to the Venue, I sat across a guy who seemed very lively and she had earlier told me about him and how he can be a troublemaker and funny.. so I didn't mind having as a friend who could make me laugh. Throughout the event, we didn't talk, we just greeted after my sister did an introduction. After the wedding ceremony, on our way out, he approached and we exchanged contacts. It has led us to this moment.

P.S He still looks for my trouble and makes me laugh till this day 😂`,
    groomStory: `So it happened July 2022, at a secondary school classmates wedding, I and chimdi(Her sister) for some weird reason had connected again and I say weird because we were in different social circles in school and didn't speak at all, I don't even think we had a proper conversation through out secondary school and suddenly we got connected, don't even remember how, we went for dinner and talked, this was at a stage in my life when I wanted something very serious that would lead to marriage so I was open minded, back to the story, I and Chimdi spoke at length and caught up and then just stayed in touch, so on the day of the wedding I reached out to her if she would be attending and she said yeah and she asked me if I was coming alone, I said I was coming with another classmate(a guy) but hopefully I would not leave alone, she told me she was coming with her sister, and that was it, at the wedding i saw Ozi and she just had this innocent energy around her and then she smiled for the first time and I finally understood why people in movies claimed to fall in love after some random smile from a beautiful lady, the event went on and then we went outside to take pictures, she wasn't shy or anything she was quite outspoken and confident, I had told my friend I came with that I was interested in her and would take her number, so at this point he asked if I was going to or should he (Lol), I told him I just wanted to see her smile one more time and then she smiled and that was it for me.`,
    closingMessage: "We can't wait to celebrate with you",
    rsvpDeadline: "August 12, 2026"
  },
  faqs: [
    {
      question: "Is the event Outdoors or Indoors?",
      answer: "The event would hold indoors; at an Anglican Church and an Event Center"
    },
    {
      question: "Do I need a card to Access the Venue?",
      answer: "Yes. In order to cater properly for everyone, Access cards would be given to everyone who RSVP'd. Please do well to pick up your access card from the designated person assigned to you. The contact details of the person would be provided after RSVP'ing. Without the access cards, no entry."
    },
    {
      question: "Can I bring a plus 1?",
      answer: "We would love to celebrate with you all, but in order to properly cater for everyone, only married partners are allowed as plus 1. Unmarried plus 1, would have to seek the permission of the Couple."
    },
    {
      question: "Are Children allowed?",
      answer: "Yes. Absolutely. We would love to have your little ones present. However, you would also need to RSVP on their behalf as they'll need access cards. Also we would also ask that they are well seated to prevent loitering and accidents."
    },
    {
      question: "What about gifts?",
      answer: "Your presence is our greatest gift. We would however be grateful if you choose to give gifts or support in any way. We would also like all gifts to be converted into Cash gifts only as the couple would not be receiving other physical gifts."
    }
  ],
  contacts: [
    { name: "Kainy", phone: "07062847666" },
    { name: "Chizi", phone: "08156194922" }
  ],
  gifts: {
    message: "Your presence is our greatest gift. We would however be grateful if you choose to give gifts or support in any way. We would also like all gifts to be converted into Cash gifts only as the couple would not be receiving other physical gifts.",
    accounts: [
      {
        bankName: "UBA",
        accountName: "Kenechukwu Ibekwe",
        accountNumber: "2058595950",
        type: "Local (Nigeria)"
      },
      {
        bankName: "Paga",
        accountName: "Kenechukwu Ibekwe",
        accountNumber: "3164635884",
        type: "Local (Nigeria)"
      },
      {
        bankName: "Bank Of Nova Scotia",
        accountName: "MR KENECHUKWU VICTOR IBEKWE",
        accountNumber: "004631223623",
        type: "International Wire Transfer",
        swiftCode: "NOSCCATT",
        additionalInfo: `Beneficiary Address: 10-325 BENTINCK ST, SYDNEY, NS B1P1H1, CA
Canadian clearing code: CC0002 00463
Bank address: 44 King Street West, Toronto, ON M5H 1H1, CA

Intermediary bank info (Only required for transfers in USD):
Intermediary bank name: Bank of America NA
SWIFT code / BIC: BOFAUS3N
ABA Number: 026009593
Intermediary bank address: 222 Broadway, New York, NY 10038, US`
      },
      {
        bankName: "Interac",
        accountName: "ibekwekene@gmail.com",
        accountNumber: "ibekwekene@gmail.com",
        type: "Canada Only"
      }
    ]
  }
};
