export interface WeddingConfig {
  couple: {
    bride: string;
    groom: string;
    displayName: string;
    hashTag: string;
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
    logoWhite: string;
    logoBlack: string;
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
      accountName?: string;
      accountNumber?: string;
      email?: string;
      type: string;
      swiftCode?: string;
      additionalInfo?: string;
    }>;
  };
  foodMenu?: {
    sections: Array<{
      title: string;
      items: string[];
    }>;
  };
  weddingProgramme?: {
    cover: {
      title: string;
      subtitle: string;
      brideName: string;
      groomName: string;
      venue: string;
      date: string;
    };
    officiatingMinisters: Array<{ title: string; name: string; role?: string }>;
    orderOfService: Array<{ number: number; title: string }>;
    sections: Array<{
      id: string;
      type: 'hymn' | 'reading' | 'ceremony-text' | 'simple-list' | 'heading-only';
      title: string;
      subtitle?: string;
      refrain?: string;
      verses?: string[];
      paragraphs?: string[];
      items?: string[];
      twoColumn?: boolean;
    }>;
    closing: { message: string };
    watermarkImage: string;
  };
}

export const weddingConfig: WeddingConfig = {
  couple: {
    bride: "Ozioma",
    groom: "Kenechukwu",
    displayName: "Ozioma & Kenechukwu",
    hashTag: "KOMagic '26"
  },
  events: {
    day1: {
      date: "September 12, 2026",
      church: {
        time: "11:00 AM",
        name: "Chapel of Grace and Knowledge, Anglican Church",
        address: "Chapel of Grace and Knowledge, Elelenwo, Port Harcourt",
        embedUrl: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.5525396923304!2d7.071420099999999!3d4.84661285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069cd42b0db56d7%3A0x33ee6073add19dc6!2sArcheacon%20Crowther%20Memorial%20Girls%20School%2C%20Mission%20Rd%2C%20Umurolu%2C%20Elelenwa%20500102%2C%20Rivers!5e0!3m2!1sen!2sng!4v1778548727975!5m2!1sen!2sng" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
        mapLink: "https://maps.app.goo.gl/3SzbFHFBMTfMraLd6"
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
        name: "Wedding Thanksgiving - RCCG Kings' Palace",
        address: "RCCG Kings' Palace, Port-Harcourt, Rivers State",
        embedUrl: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.752628544709!2d6.9966637!3d4.8124839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069ce862235916b%3A0x2e4780f48a35a231!2sRCCG%20Kings&#39;%20Palace%2C%20Rivers%20Province%20II.!5e0!3m2!1sen!2sng!4v1780507061077!5m2!1sen!2sng" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
        mapLink: "https://maps.app.goo.gl/SWmvenZCU3Zy4iVs7"
      }
    }
  },
  assets: {
    logo: "/Wedding Logo (white).png",
    logoWhite: "/Wedding Logo (white).png",
    logoBlack: "/Wedding Logo (black) .png",
    heroImages: [
      "/images/ozi-kene-proposal-images/095a8dfc-2fdd-4496-b475-0830b93933cc.JPG",
      "/images/ozi-kene-proposal-images/31339d89-e333-4d51-a9ca-de605a6e472d.JPG",
      "/images/ozi-kene-proposal-images/4c50efae-16bc-47fd-abfd-86638d9b88ea.JPG",
      "/images/ozi-kene-proposal-images/9cb35f4d-9d5d-4081-9223-97dcc4314244.JPG",
      "/images/ozi-kene-proposal-images/f29e2a1d-d17b-468b-b95b-2e99cad85aef.JPG"
    ],
    storyBrideImage: "/images/ozi-kene-proposal-images/a2e83759-1802-4f6c-87ff-2b6ee815f4af.JPG",
    storyGroomImage: "/images/ozi-kene-proposal-images/b317c680-4fa5-4785-8066-48c4e90733f6.JPG",
    weddingDetailsBackground: "/images/ozi-kene-proposal-images/69d37690-82eb-4d5e-8867-8a41bff841b3.JPG",
    closingSectionBackground: "/images/ozi-kene-proposal-images/836a8d83-f919-4b2e-a331-445bc224fb24.JPG"
  },
  colors: [
    { name: "Olive Green", hex: "#636B2F", role: "primary" },
    { name: "Onion Purple", hex: "#BE5EA5", role: "secondary" },
    { name: "Peach", hex: "#FFD3AC", role: "accent" },
    { name: "Navy Blue", hex: "#000080", role: "accent" },
    { name: "Nude", hex: "#E8BEAC", role: "accent" }
  ],
  content: {
    welcomeMessage: "Welcome to our Wedding website; with hearts full of joy, we welcome you to celebrate in our joy and share in the most meaningful days of our life. You will find all the details of our wedding day and the celebration we're so excited to share",
    brideStory: `I was invited to the wedding of one of my Sister's classmates, of which I reluctantly decided to attend, unlike me, who is usually the first to suggest attending social events. I hadn't planned for it, but she pleaded with me to join her so she wouldn't be alone. When we arrived at the Venue, I sat across from a guy who seemed very lively and she had told me earlier about him and how he can be a troublemaker and funny.. so I didn't mind having him as a friend who could make me laugh. Throughout the event, we didn't talk, we just exchanged pleasantries after my sister did an introduction. After the wedding ceremony, on our way out, he approached me and we exchanged contacts. That encounter was the beginning of something so beautiful and precious and the beginning of Forever and Always for us.`,
    groomStory: `So it happened July 2022, at a secondary school classmates wedding, I and chimdi(Her sister) for some weird reason had connected again and I say weird because we were in different social circles in school and didn't speak at all, I don't even think we had a proper conversation through out secondary school and suddenly we got connected, don't even remember how, we went for dinner and talked, this was at a stage in my life when I wanted something very serious that would lead to marriage so I was open minded, back to the story, I and Chimdi spoke at length and caught up and then just stayed in touch, so on the day of the wedding I reached out to her if she would be attending and she said yeah and she asked me if I was coming alone, I said I was coming with another classmate(a guy) but hopefully I would not leave alone, she told me she was coming with her sister, and that was it, at the wedding i saw Ozi and she just had this innocent energy around her and then she smiled for the first time and I finally understood why people in movies claimed to fall in love after some random smile from a beautiful lady, the event went on and then we went outside to take pictures, she wasn't shy or anything she was quite outspoken and confident, I had told my friend I came with that I was interested in her and would take her number, so at this point he asked if I was going to or should he (Lol), I told him I just wanted to see her smile one more time and then she smiled and that was it for me.`,
    closingMessage: "We can't wait to celebrate with you",
    rsvpDeadline: "August 31, 2026"
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
        email: "ibekwekene@gmail.com",
        type: "Canada Only"
      }
    ]
  },
  weddingProgramme: {
    cover: {
      title: "WEDDING",
      subtitle: "ORDER OF SERVICE FOR THE SOLEMNIZATION OF HOLY MATRIMONY BETWEEN",
      brideName: "Ozioma Ifunanya Chike-Onyechi",
      groomName: "Kenechukwu Victor Ibekwe",
      venue: "CHAPEL OF GRACE & KNOWLEDGE (ANGLICAN COMMUNION), FIRST FRUITS PARISH, ELELENWO, PHC.",
      date: "SATURDAY 12TH SEPTEMBER, 2026"
    },
    officiatingMinisters: [
      { title: "Rev. Canon", name: "Ozioma Iheanetu", role: "(Vicar)" },
      { title: "Rev.", name: "Emmanuel Onyenakazi" },
      { title: "Rev.", name: "Boniface Onu" }
    ],
    orderOfService: [
      { number: 1, title: "Processional Hymn CONH 834" },
      { number: 2, title: "Bridal March: Hymn AMR 678" },
      { number: 3, title: "Exhortation" },
      { number: 4, title: "Declaration" },
      { number: 5, title: "The Marriage" },
      { number: 6, title: "Charge/Acclamation" },
      { number: 7, title: "Nuptial Psalm 128" },
      { number: 8, title: "Only Lesson Eph. 5: 21-25" },
      { number: 9, title: "Hymn for Sermon AMR 650" },
      { number: 10, title: "Sermon" },
      { number: 11, title: "Anthem by the Choir" },
      { number: 12, title: "Thanksgiving" },
      { number: 13, title: "Hymn for Prayer A&MR 463 (O Perfect Love All Kneeling)" },
      { number: 14, title: "Signing of Marriage Register" },
      { number: 15, title: "Presentation of the Couple" },
      { number: 16, title: "Closing Prayer/Benediction" },
      { number: 17, title: "Withdrawal Hymn: The Band" },
      { number: 18, title: "Order of Photograph" },
      { number: 19, title: "Reception" }
    ],
    sections: [
      {
        id: "processional-hymn",
        type: "hymn",
        title: "Processional Hymn CONH 834",
        refrain: "So, I'll cherish the old rugged cross,\n'til my trophies at last I lay down\nI will cling to the old rugged cross\nAnd exchange it some day for a crown",
        verses: [
          "1) On a hill far away stood an old rugged cross\nThe emblem of suffering and shame\nAnd I love that old cross where the dearest and best\nFor a world of lost sinners was slain",
          "2) Oh, that old rugged cross, so despised by the world\nHas a wondrous attraction for me\nFor the dear Lamb of God left his glory above\nTo bear it to dark Calvary",
          "3) In that old rugged cross, stained with blood so divine,\na wondrous beauty I see,\nfor 'twas on that old cross Jesus suffered and died,\nto pardon and sanctify me.",
          "4) To that old rugged cross, I will ever be true,\nits shame and reproach gladly bear;\nthen he'll call me some day to my home far away,\nwhere his glory forever, I'll share."
        ]
      },
      {
        id: "bridal-march",
        type: "hymn",
        title: "Bridal March Hymn AMR 678",
        twoColumn: true,
        verses: [
          "1) In Christ alone my hope is found;\nHe is my light, my strength, my song;\nthis Cornerstone, this solid ground,\nfirm through the fiercest drought and storm.\nWhat heights of love, what depths of peace\nwhen fears are stilled, when strivings cease;\nmy Comforter, my All in All;\nhere in the love of Christ I stand.",
          "2) In Christ alone who took on flesh;\nfullness of God in helpless babe.\nThis gift of love and righteousness\nscorned by the ones He came to save;\n'til on that cross as Jesus died\nthe wrath of God was satisfied;\nfor ev'ry sin on Him was laid;\nhere in the death of Christ, I live.",
          "3) There in the ground His body lay;\nLight of the world by darkness slain.\nThen bursting forth in glorious day,\nup from the grave He rose again!\nAnd as He stands in victory,\nsin's curse has lost its grip on me;\nfor I am His and He is mine,\nbought with the precious blood of Christ!",
          "4) No guilt in life, no fear in death;\nthis is the pow'r of Christ in me.\nFrom life's first cry to final breath,\nJesus commands my destiny.\nNo pow'r of hell, no scheme of man\ncan ever pluck me from His hand;\n'til He returns or calls me home,\nhere in the pow'r of Christ I'll stand!"
        ]
      },
      {
        id: "exhortation",
        type: "ceremony-text",
        title: "Exhortation",
        paragraphs: [
          "*The congregation remains standing as the bride and groom stand before the Priest*",
          "**Priest:** Dear people of God, we have come together in the presence of God to witness and to celebrate the marriage between **KENECHUKWU** and **OZIOMA** to ask His blessings upon them and to share in their Joy. Our Lord Jesus Christ was Himself a guest at the wedding in Canaan of Galilee and blessed this way of life and through His Spirit He is with us now.",
          "The Scripture teaches us that marriage is a gift of God in creation and a means of His grace, a holy mystery in which a man and woman become one flesh. It is God's purpose that as husband and wife give themselves to each other in love through their lives, they shall be united in their love as Christ is united with His Church.",
          "Marriage is given primarily so that husband and wife may have comfort and help each other, living faithfully together in need and in plenty, in sorrow and in joy. It is also given that with delight and tenderness, they may know each other in love, and through the joy of their bodily union, may strengthen the union of their hearts and lives.",
          "Lastly, it is given that they may have children and be blessed in caring for them and bringing them up in accordance with God's will to His praises and glory.",
          "In marriage, husband and wife belong to each other and they are linked to each other's family and they begin a new life together in the community. This is a way of life that all should honour and it must not be taken carelessly, lightly or selfishly but reverently, responsibly and after serious thoughts. Into this life **KENECHUKWU** and **OZIOMA** come now to be joined. If any of you can show just cause why they may not be lawfully joined together you may declare it now."
        ]
      },
      {
        id: "declaration",
        type: "ceremony-text",
        title: "4. Declaration",
        paragraphs: [
          "**The Priest Says:** **KENECHUKWU and OZIOMA**, the vows you are about to take now are to be made in the name of God and I charge you both as you will answer before God who is the Judge of all and who knows all the secrets of our hearts, that if either of you know any reasons why you may not be lawfully married, you must declare it now.",
          "*(If there is no impediment declared, the priest continues.)*",
          "*(The Priest says to the Groom)*\n**KENECHUKWU**, of your own free choice will you take **OZIOMA** to be your wife?",
          "**The Groom Answers:** I will",
          "*(The Priest Continues)*\nWill you love her, comfort her, honour and protect her, in sickness and in health, in poverty and prosperity and forsaking all others, be faithful to her as long as you both shall live?",
          "**The Groom Answers:** I will",
          "*(The Priest continues)*\n**OZIOMA**, of your own free choice will you take **KENECHUKWU** to be your Husband?",
          "**The Bride Answers:** I will",
          "Will you love him, comfort him, honour and protect him, in sickness and in health, in poverty and prosperity and forsaking all others, be faithful to him as long as you both shall live?",
          "**The Bride Answers:** I will"
        ]
      },
      {
        id: "the-marriage",
        type: "ceremony-text",
        title: "The Marriage",
        paragraphs: [
          "*(The Priest asks)*\nWho gives this woman to be married to this man?\n*(The father of the bride or the representative of the family comes out and shall answer: \"I do\"; he then hands over the Bride to the Priest.)*",
          "*(The Priest receiving the bride from the hand of her father shall cause the man to take the woman by his right hand and facing each other the groom says)*",
          "I KENECHUKWU take you OZIOMA to be my wedded wife, to have and to hold from this day forward: for better, for worse, for richer, for poorer, in sickness and in health, to love and to cherish, until we are parted by death according to God's Holy law. This is my solemn vow. Amen",
          "*They lose hands. Then the bride takes the groom's right hand in hers, and says:*",
          "I, OZIOMA take you KENECHUKWU, to be my wedded husband, to have and to hold from this day forward: for better, for worse, for richer, for poorer, in sickness and in health, to love and to cherish, until we are parted by death according to God's Holy law. This is my solemn vow. Amen",
          "*(They lose hands)*",
          "**The Priest:** And what token do you share to represent your love and commitment to each other?",
          "*(The Priest receives the ring. Holding up the ring, says)*\nThe ring is the symbol of wholeness and perfection. It is made of gold which is a precious and durable metal, what better representation of your feelings for each other."
        ]
      },
      {
        id: "the-marriage-contd",
        type: "ceremony-text",
        title: "The Marriage (Contd.)",
        paragraphs: [
          "Then he prays:\nHeavenly Father, by your blessing, let these ring be to **KENECHUKWU** and **OZIOMA**, a symbol of unending love and faithfulness, to remind them of the vow and covenant which they have made this day, through Jesus Christ our Lord Amen.",
          "The Priest delivers the ring to the man and to put upon the forth finger of the woman's left hand, and the man holding the ring there shall say:\n**OZIOMA**, I give you this ring as a sign of our marriage and a token of my love and fidelity to you. With my body I honour you, all that I am I give to you, and all that I have I share with you, within the love of God, the Father, Son and Holy Spirit. Amen.",
          "The Priest delivers the ring to the woman to put upon the forth finger of the man's left hand and says: **KENECHUKWU**, I give you this ring as a sign of our marriage and a token of my love and fidelity to you. With my body I honour you, all that I am I give to you and all that I have I share with you, within the love of God, the Father, Son and Holy Spirit. Amen.",
          "*(The bride and groom kneel; while the congregation keeps standing. The Priest prays;)*",
          "Eternal God, Creator and Preserver of all, Giver of spiritual grace, and Author of everlasting life, send Your blessing upon **KENECHUKWU** and **OZIOMA** whom we bless in your name that living faithfully together they may fulfill the vow and covenant they made of which the ring given and received is a token and pledge and may ever remain in perfect love and peace together and live according to your laws; through Christ our Lord. Amen."
        ]
      },
      {
        id: "the-marriage-contd-2",
        type: "ceremony-text",
        title: "The Marriage (Contd.)",
        paragraphs: [
          "Now that **KENECHUKWU and OZIOMA** have given their consent and made their vows to each other before God and this congregation, with the joining of hands and the giving and receiving of ring, in the name of God, I declare that they are Husband and wife!",
          "*(The Priest joins their right hands together and says :)*\nThose whom God has joined together, let no man put asunder. Amen",
          "**The Priest blesses them:**\nGod the Father, God the Son, God the Holy Spirit, bless, preserve, and keep you; The Lord pour upon you the riches of His grace that you may faithfully live together and receive the blessings of eternal life. Amen",
          "**The Priest then invites and says to the parents:**\nAs **KENECHUKWU and OZIOMA** enter a new life together, will you their parents give them your blessing in the presence of this congregation?",
          "**The parents pray for the couple saying:**\nMay God bless you both. Amen",
          "**The congregation stands, the priest then asks:**\nYou as friends and families have come to witness this exchange of vows. Will you do all in your power to support this marriage now and in the years ahead?",
          "*The People reply: We will*",
          "The congregation remains standing: The husband and wife kneel, and the priest blesses them: you; the Lord mercifully grant you riches of His grace, that you may please Him both in body and soul, and living together in faith and love, may receive the blessings of eternal life. Amen"
        ]
      },
      {
        id: "acclamation",
        type: "ceremony-text",
        title: "6) The Acclamation",
        paragraphs: [
          "*(The Parents of the Bridegroom or their representatives will move forward.)*",
          "**The Priest:** In the name of God and in the presence of this congregation, we hand over former **MISS OZIOMA**, now **MRS. OZIOMA KENECHUKWU IBEKWE** to you as a full member of your family. Will you promise on behalf of your family to continue to up-hold them in your prayer and give them your moral support?",
          "**The Parents of the Groom:** We promise in the name of God.",
          "*(The priest then prays for the family):* Eternal God, Creator and Sustainer of us all, give your grace to the family of **MR. & MRS. KENECHUKWU IBEKWE**, grant them that in the years ahead they may live together in the love, joy and peace of our Saviour Jesus Christ. Amen"
        ]
      },
      {
        id: "nuptial-psalm",
        type: "reading",
        title: "7) Nuptial Psalm 128",
        verses: [
          "1. Blessed is every one that feareth the Lord; that walketh in his ways.",
          "2. For thou shalt eat the labour of thine hands; happy shalt thou be, and it shall well with thee.",
          "3. Thy wife shall be as a fruitful vine by the sides of thine house: thy children like olive plants round about thy table.",
          "4. Behold, that thus shall the man be blessed that feareth the Lord.",
          "5. The Lord shall bless thee out of Zion: and thou shalt see the good the good of Jerusalem all the days of thy life.",
          "6. Yea, thou shalt see the children's children, and peace upon Israel."
        ]
      },
      {
        id: "only-lesson",
        type: "reading",
        title: "8) Only Lesson: Ephesians 5: 21-25",
        verses: [
          "21. Submitting to one another in the fear of God.",
          "22. Wives, submit to your own husbands, as to the Lord.",
          "23. For the husband is the head of the wife, as also Christ is the head of the church; and He is the savior of the body.",
          "24. Therefore, just as the Church is subject to Christ, so let the wives be to their own husbands in everything.",
          "25. Husbands, love your wives, just as Christ also loved the church and gave Himself for her."
        ]
      },
      {
        id: "hymn-for-sermon",
        type: "hymn",
        title: "Hymn for Sermon: AMR 650",
        refrain: "Great is thy faithfulness! Great is thy faithfulness!\nMorning by morning new mercies I see;\nall I have needed thy hand hath provided,\ngreat is thy faithfulness, Lord, unto me.",
        verses: [
          "1) Great is thy faithfulness, O God my Father,\nthere is no shadow of turning with thee; thou changest not,\nthy compassions they fail not, as thou hast\nbeen thou for ever wilt be.",
          "2) Summer and winter, and spring-time and harvest,\nsun, moon and stars in their courses above,\njoin with all nature in manifold witness\nto thy great faithfulness, mercy and love.",
          "3) Pardon for sin and a peace that endureth,\nthine own dear presence to cheer and to guide;\nstrength for today and bright hope for tomorrow,\nblessings all mine, with ten thousand beside!"
        ]
      },
      {
        id: "sermon-anthems",
        type: "simple-list",
        title: "Order of Service",
        items: [
          "10. Sermon",
          "11. Anthems",
          "12. Notices",
          "13. Thanksgiving – Band"
        ]
      },
      {
        id: "hymn-for-prayer",
        type: "hymn",
        title: "14. Hymn for Prayer – A&M 463",
        verses: [
          "1. Oh perfect love, all human thought transcending,\nLowly we kneel in prayer before thy throne,\nThat theirs may be the love which knows no ending,\nWhom thou for evermore dost join in one.",
          "2. O perfect life, be thou their full assurance,\nOf tender charity and steadfast faith,\nOf patient hope, and quiet brave endurance,\nWith childlike trust that fears nor pain death.",
          "3. Grant them the joy which brightens Earthly sorrow,\nGrant them the peace which calms all earthly strife;\nAnd to life's day the glorious unknown morrow\nThat damns upon eternal love and life."
        ]
      },
      {
        id: "prayer-for-couple",
        type: "ceremony-text",
        title: "15) Prayer for the Couple",
        paragraphs: [
          "Almighty and most merciful Father, the strength of all who put their trust in you, we pray that, as you have brought **KENECHUKWU** and **OZIOMA** together by your providence, so you will enrich them by your grace, so that those vows which they have made to one another in your sight, they may truly and faithfully perform through Jesus Christ our Lord, Amen.",
          "Almighty Father, you have created all mankind to glorify you in body and in spirit. Give this your children joy in one another, as living temples of the Holy spirit, and bring them by this joy to know and share in your creative and redeeming love through Jesus Christ our Lord, Amen.",
          "Eternal God, true and loving Father, in holy marriage you make your servants one, may their life together bear witness to your love in this troubled world, may unity overcome division, forgiveness, heal injury, and joy triumph over sorrow, through Jesus Christ our Lord, Amen.",
          "We praise you, Father that you have made all things and hold all things in being, in the beginning you created the universe, and made mankind in your own likeness because it was not good for them to be alone, you created them male and female and in marriage you join man and woman as one flesh, teaching us that what you have united may never be divided. We praise you that you have made this holy misery a symbol of marriage of Christ with his church, and an image of your eternal covenant with your people. And we praise you that you have made this man and woman, who come before you as partners and heirs together of your promises."
        ]
      },
      {
        id: "prayer-for-couple-contd",
        type: "ceremony-text",
        title: "Prayer for the Couple (Contd.)",
        paragraphs: [
          "Grant that this man may love his wife as Christ loves His Bride the Church, giving himself for it, and cherishing it as his own flesh; and grant this woman the heart to love her husband and follow the example of those holy women whose praises are sung in the scriptures. Strengthen them with your grace that they may be witness of Christ to others, let them live to see their children's children and bring them at last to the fullness of life with your saints in the kingdom of heaven, through Jesus Christ. Amen.",
          "O God of love, look merciful upon **KENECHUKWU** and **OZIOMA** in the new life which they begin together this day. Unite them evermore in your love. Keep them faithful to the vows they have made to one another. Strengthen them with every good gift and let your peace be with them for the sake of Jesus Christ our Lord. Amen.",
          "Almighty God, our heavenly Father, who gave marriage as a source of blessing to mankind, we thank you for the joy of family life. May we know your presence and peace in our homes, fill them with your love, and use them for your glory, through Jesus Christ. Amen."
        ]
      },
      {
        id: "closing-items",
        type: "simple-list",
        title: "Order of Service",
        items: [
          "14. Signing of Marriage Register",
          "15. Presentation of the Couple",
          "16. Closing Prayer/Benediction",
          "17. Withdrawal Hymn"
        ]
      },
      {
        id: "order-of-photograph",
        type: "heading-only",
        title: "Order of Photograph"
      },
      {
        id: "bridal-crew",
        type: "heading-only",
        title: "Bridal Crew"
      },
      {
        id: "appreciation",
        type: "heading-only",
        title: "Appreciation"
      },
      {
        id: "reception-program",
        type: "heading-only",
        title: "Reception Program"
      }
    ],
    closing: { message: "Thank You For Joining Us" },
    watermarkImage: "/images/ozi-kene-proposal-images/836a8d83-f919-4b2e-a331-445bc224fb24.JPG"
  },
  foodMenu: {
    sections: [
      {
        title: "The Menu Proper",
        items: [
          "Special fried rice",
          "Party jollof rice",
          "Coconut rice",
          "Singapore noodles served with shredded beef sauce in hot plate"
        ]
      },
      {
        title: "Sides for Rice Meals",
        items: [
          "Vegetarian salad",
          "Moimoi",
          "Sweet corn cobs"
        ]
      },
      {
        title: "Protein",
        items: [
          "Peppered chicken",
          "Peppered croaker fish"
        ]
      },
      {
        title: "Nigerian Dishes",
        items: [
          "Plantain porridge / Yam porridge",
          "Afang soup",
          "Egusi soup",
          "Eba, semo, fufu"
        ]
      },
      {
        title: "Protein",
        items: [
          "Goat meat",
          "Cow head"
        ]
      }
    ]
  }
};
