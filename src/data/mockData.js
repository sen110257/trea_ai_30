export const provinces = [
  {
    id: 1,
    name: '北京',
    nameEn: 'Beijing',
    cities: [1, 2]
  },
  {
    id: 2,
    name: '上海',
    nameEn: 'Shanghai',
    cities: [3, 4]
  },
  {
    id: 3,
    name: '广东',
    nameEn: 'Guangdong',
    cities: [5, 6, 7]
  },
  {
    id: 4,
    name: '浙江',
    nameEn: 'Zhejiang',
    cities: [8, 9]
  },
  {
    id: 5,
    name: '江苏',
    nameEn: 'Jiangsu',
    cities: [10, 11]
  },
  {
    id: 6,
    name: '四川',
    nameEn: 'Sichuan',
    cities: [12, 13]
  },
  {
    id: 7,
    name: '云南',
    nameEn: 'Yunnan',
    cities: [14, 15]
  },
  {
    id: 8,
    name: '湖南',
    nameEn: 'Hunan',
    cities: [16, 17]
  }
]

export const cities = [
  {
    id: 1,
    provinceId: 1,
    name: '北京',
    nameEn: 'Beijing',
    description: '中华人民共和国首都，历史文化名城，有着三千多年的建城史。',
    history: '北京是中国四大古都之一，拥有丰富的历史文化遗产。从元代开始，北京成为中国的政治中心，明清两代在此建都，留下了众多宏伟的皇家建筑。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20tiananmen%20square%20landmark%20photo%20realistic&image_size=landscape_16_9',
    bannerImages: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20palace%20museum%20forbidden%20city%20beautiful%20scenery&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20great%20wall%20mutianyu%20section%20sunset&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20summer%20palace%20kunming%20lake&image_size=landscape_16_9'
    ],
    popularity: 999999,
    hot: true,
    landmarks: [1, 2, 3, 4],
    foods: [1, 2, 3, 4],
    scenery: [1, 2, 3],
    attractions: [1, 2, 3]
  },
  {
    id: 2,
    provinceId: 1,
    name: '天津',
    nameEn: 'Tianjin',
    description: '中国四大直辖市之一，北方重要港口城市，中西合璧的独特风貌。',
    history: '天津因漕运而兴起，明永乐二年正式筑城，是中国古代唯一有确切建城时间记录的城市。近代以来，天津成为北方重要的通商口岸，留下了众多洋楼建筑。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tianjin%20haihe%20river%20night%20view%20skyline&image_size=landscape_16_9',
    bannerImages: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tianjin%20five%20great%20avenues%20colonial%20architecture&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tianjin%20eye%20ferris%20wheel%20night&image_size=landscape_16_9'
    ],
    popularity: 456789,
    hot: true,
    landmarks: [5, 6],
    foods: [5, 6, 7],
    scenery: [4, 5],
    attractions: [4, 5]
  },
  {
    id: 3,
    provinceId: 2,
    name: '上海',
    nameEn: 'Shanghai',
    description: '中国最大城市，国际大都市，中西文化交融的繁华都市。',
    history: '上海古称沪渎，近代开埠后迅速发展成为远东第一大都市。外滩的万国建筑群和陆家嘴的摩天大楼，见证了上海百年风云。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shanghai%20bund%20skyline%20night%20view%20pu%20dong&image_size=landscape_16_9',
    bannerImages: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shanghai%20the%20bund%20colonial%20buildings&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shanghai%20oriental%20pearl%20tower%20lujiazui&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shanghai%20yu%20garden%20traditional%20chinese%20garden&image_size=landscape_16_9'
    ],
    popularity: 888888,
    hot: true,
    landmarks: [7, 8, 9],
    foods: [8, 9, 10],
    scenery: [6, 7, 8],
    attractions: [6, 7]
  },
  {
    id: 4,
    provinceId: 2,
    name: '苏州',
    nameEn: 'Suzhou',
    description: '东方威尼斯，园林之城，江南水乡文化的代表。',
    history: '苏州有近2500年历史，是吴文化的发祥地。苏州园林是中国私家园林的典范，被誉为咫尺之内再造乾坤。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=suzhou%20classical%20gardens%20humble%20administrators%20garden&image_size=landscape_16_9',
    bannerImages: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=suzhou%20lingering%20garden%20spring%20scenery&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=suzhou%20water%20town%20zhouzhuang%20canals&image_size=landscape_16_9'
    ],
    popularity: 567890,
    hot: true,
    landmarks: [10, 11, 12],
    foods: [11, 12],
    scenery: [9, 10],
    attractions: [8, 9]
  },
  {
    id: 5,
    provinceId: 3,
    name: '广州',
    nameEn: 'Guangzhou',
    description: '千年商都，岭南文化中心，美食天堂。',
    history: '广州是海上丝绸之路的起点之一，两千多年来一直是中国南方重要的商贸中心。岭南文化在这里传承发展，形成了独特的广府文化。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=guangzhou%20canton%20tower%20night%20view%20pearl%20river&image_size=landscape_16_9',
    bannerImages: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=guangzhou%20chen%20clan%20academy%20traditional%20architecture&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=guangzhou%20shamian%20island%20colonial%20buildings&image_size=landscape_16_9'
    ],
    popularity: 678901,
    hot: true,
    landmarks: [13, 14, 15],
    foods: [13, 14, 15, 16],
    scenery: [11, 12],
    attractions: [10, 11]
  },
  {
    id: 6,
    provinceId: 3,
    name: '深圳',
    nameEn: 'Shenzhen',
    description: '中国改革开放窗口，创新之都，年轻活力的现代化城市。',
    history: '深圳从一个小渔村发展成为现代化大都市，是中国改革开放的缩影。短短四十多年，深圳成为全球科技产业的重要中心。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shenzhen%20skyscrapers%20futian%20cbd%20night&image_size=landscape_16_9',
    bannerImages: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shenzhen%20ping%20an%20finance%20center&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shenzhen%20windows%20of%20the%20world%20theme%20park&image_size=landscape_16_9'
    ],
    popularity: 543210,
    hot: true,
    landmarks: [16, 17],
    foods: [17, 18],
    scenery: [13, 14],
    attractions: [12, 13]
  },
  {
    id: 7,
    provinceId: 3,
    name: '珠海',
    nameEn: 'Zhuhai',
    description: '浪漫之城，海滨度假胜地，粤港澳大湾区重要城市。',
    history: '珠海是中国最早设立的经济特区之一，以优美的海滨风光著称。珠海与澳门隔海相望，港珠澳大桥的建成使三地联系更加紧密。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=zhuhai%20coastal%20city%20beach%20sunset&image_size=landscape_16_9',
    bannerImages: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=zhuhai%20hong%20kong%20macau%20bridge&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=zhuhai%20chimelong%20ocean%20kingdom&image_size=landscape_16_9'
    ],
    popularity: 321098,
    hot: false,
    landmarks: [18, 19],
    foods: [19, 20],
    scenery: [15, 16],
    attractions: [14, 15]
  },
  {
    id: 8,
    provinceId: 4,
    name: '杭州',
    nameEn: 'Hangzhou',
    description: '人间天堂，西湖所在地，江南文化重镇。',
    history: '杭州有着2200多年的历史，曾是吴越国和南宋的都城。西湖是杭州的灵魂，千百年来无数文人墨客在此留下名篇佳作。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hangzhou%20west%20lake%20sunset%20leifeng%20pagoda&image_size=landscape_16_9',
    bannerImages: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hangzhou%20west%20lake%20broken%20bridge%20snow&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hangzhou%20lingyin%20temple%20buddhist%20monastery&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hangzhou%20xixi%20wetland%20park%20autumn&image_size=landscape_16_9'
    ],
    popularity: 765432,
    hot: true,
    landmarks: [20, 21, 22, 23],
    foods: [21, 22, 23],
    scenery: [17, 18, 19],
    attractions: [16, 17]
  },
  {
    id: 9,
    provinceId: 4,
    name: '宁波',
    nameEn: 'Ningbo',
    description: '东海明珠，历史文化名城，海上丝绸之路重要港口。',
    history: '宁波是中国大运河南端出海口、海上丝绸之路东方始发港。河姆渡文化在此发祥，天一阁是亚洲现存最古老的私人藏书楼。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ningbo%20tianyi%20ge%20library%20ancient%20architecture&image_size=landscape_16_9',
    bannerImages: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ningbo%20putuo%20mountain%20buddhist%20sanctuary&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ningbo%20old%20bund%20historic%20buildings&image_size=landscape_16_9'
    ],
    popularity: 432109,
    hot: false,
    landmarks: [24, 25],
    foods: [24, 25],
    scenery: [20, 21],
    attractions: [18, 19]
  },
  {
    id: 10,
    provinceId: 5,
    name: '南京',
    nameEn: 'Nanjing',
    description: '六朝古都，十朝都会，江南佳丽地，金陵帝王州。',
    history: '南京有着近2500年的建城史，先后有东吴、东晋、南朝宋齐梁陈在此建都，故有六朝古都之称。明代初年和民国时期也曾在此定都。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=nanjing%20zhongshan%20ling%20sun%20yat-sen%20mausoleum&image_size=landscape_16_9',
    bannerImages: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=nanjing%20qinhuai%20river%20confucius%20temple%20night&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=nanjing%20ming%20xiaoling%20tomb%20stone%20elephants&image_size=landscape_16_9'
    ],
    popularity: 654321,
    hot: true,
    landmarks: [26, 27, 28],
    foods: [26, 27, 28],
    scenery: [22, 23],
    attractions: [20, 21]
  },
  {
    id: 11,
    provinceId: 5,
    name: '无锡',
    nameEn: 'Wuxi',
    description: '太湖明珠，江南水乡，鱼米之乡。',
    history: '无锡是国家历史文化名城，自古就是鱼米之乡，素有布码头、钱码头、窑码头、丝都、米市之称。无锡是中国民族工业和乡镇工业的摇篮。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wuxi%20taihu%20lake%20lingering%20garden&image_size=landscape_16_9',
    bannerImages: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wuxi%20yuantouzhu%20taihu%20scenic%20area&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wuxi%20nianhua%20wan%20buddhist%20town&image_size=landscape_16_9'
    ],
    popularity: 345678,
    hot: false,
    landmarks: [29, 30],
    foods: [29, 30],
    scenery: [24, 25],
    attractions: [22, 23]
  },
  {
    id: 12,
    provinceId: 6,
    name: '成都',
    nameEn: 'Chengdu',
    description: '天府之国，休闲之都，美食天堂，大熊猫故乡。',
    history: '成都是国家历史文化名城，古蜀文明发祥地。周太王以一年成邑，二年成都，故名成都。先后有7个割据政权在此建都。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chengdu%20giant%20panda%20bamboo%20forest&image_size=landscape_16_9',
    bannerImages: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chengdu%20jinli%20ancient%20street%20night&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chengdu%20dujiangyan%20irrigation%20system&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chengdu%20wuhou%20temple%20three%20kingdoms&image_size=landscape_16_9'
    ],
    popularity: 876543,
    hot: true,
    landmarks: [31, 32, 33, 34],
    foods: [31, 32, 33, 34, 35],
    scenery: [26, 27, 28],
    attractions: [24, 25, 26]
  },
  {
    id: 13,
    provinceId: 6,
    name: '重庆',
    nameEn: 'Chongqing',
    description: '山城、雾都、火锅之乡，3D魔幻城市。',
    history: '重庆是国家历史文化名城，1189年宋光宗赵惇先封恭王再即帝位，自诩双重喜庆，重庆由此得名。重庆是巴渝文化的发祥地。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chongqing%20hongyadong%20night%20view%20hanging%20houses&image_size=landscape_16_9',
    bannerImages: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chongqing%20ciqikou%20ancient%20town&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chongqing%20wulong%20karst%20tiankeng&image_size=landscape_16_9'
    ],
    popularity: 789012,
    hot: true,
    landmarks: [35, 36, 37],
    foods: [36, 37, 38],
    scenery: [29, 30, 31],
    attractions: [27, 28]
  },
  {
    id: 14,
    provinceId: 7,
    name: '昆明',
    nameEn: 'Kunming',
    description: '春城，四季如春，云南政治经济文化中心。',
    history: '昆明是国家历史文化名城，早在三万年前就有人类在滇池周围生息繁衍。昆明属北亚热带低纬高原山地季风气候，为山原地貌，三面环山，南濒滇池。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=kunming%20dianchi%20lake%20west%20hill%20sunset&image_size=landscape_16_9',
    bannerImages: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=kunming%20stone%20forest%20karst%20landscape&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=kunming%20green%20lake%20park%20spring&image_size=landscape_16_9'
    ],
    popularity: 567890,
    hot: true,
    landmarks: [38, 39, 40],
    foods: [39, 40, 41],
    scenery: [32, 33, 34],
    attractions: [29, 30]
  },
  {
    id: 15,
    provinceId: 7,
    name: '丽江',
    nameEn: 'Lijiang',
    description: '艳遇之都，纳西文化发源地，世界文化遗产。',
    history: '丽江是一个多民族聚居的地方，除汉族外，共有12个世居少数民族。丽江古城是中国以整座古城申报世界文化遗产获得成功的两座古城之一。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=lijiang%20ancient%20town%20old%20town%20yunnan&image_size=landscape_16_9',
    bannerImages: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=lijiang%20jade%20dragon%20snow%20mountain&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=lijiang%20shuhe%20ancient%20town&image_size=landscape_16_9'
    ],
    popularity: 678901,
    hot: true,
    landmarks: [41, 42, 43],
    foods: [42, 43],
    scenery: [35, 36, 37],
    attractions: [31, 32]
  },
  {
    id: 16,
    provinceId: 8,
    name: '长沙',
    nameEn: 'Changsha',
    description: '楚汉名城，媒体艺术之都，娱乐之都。',
    history: '长沙是首批国家历史文化名城，历经三千年城名、城址不变，有屈贾之乡、楚汉名城、潇湘洙泗之称。长沙是中国国际形象最佳城市、东亚文化之都。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=changsha%20orange%20island%20mao%20zedong%20statue&image_size=landscape_16_9',
    bannerImages: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=changsha%20yuelu%20academy%20ancient%20university&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=changsha%20taiping%20old%20street%20food&image_size=landscape_16_9'
    ],
    popularity: 543210,
    hot: true,
    landmarks: [44, 45, 46],
    foods: [44, 45, 46, 47],
    scenery: [38, 39],
    attractions: [33, 34]
  },
  {
    id: 17,
    provinceId: 8,
    name: '张家界',
    nameEn: 'Zhangjiajie',
    description: '武陵源风景区，阿凡达取景地，山水画卷。',
    history: '张家界因旅游建市，是中国最重要的旅游城市之一。武陵源风景名胜区拥有世界罕见的石英砂岩峰林峡谷地貌，被列入世界自然遗产名录。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=zhangjiajie%20avatar%20mountains%20tianmen%20mountain&image_size=landscape_16_9',
    bannerImages: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=zhangjiajie%20glass%20bridge%20valley&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=zhangjiajie%20jinbian%20stream%20forest&image_size=landscape_16_9'
    ],
    popularity: 654321,
    hot: true,
    landmarks: [47, 48, 49],
    foods: [48, 49],
    scenery: [40, 41, 42],
    attractions: [35, 36]
  }
]

export const landmarks = [
  {
    id: 1,
    cityId: 1,
    name: '故宫博物院',
    nameEn: 'Palace Museum',
    description: '明清两代的皇家宫殿，世界现存规模最大、保存最完整的木质结构古建筑之一。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20forbidden%20city%20palace%20museum%20meridian%20gate&image_size=landscape_4_3',
    checkInCount: 125678,
    likes: 98765
  },
  {
    id: 2,
    cityId: 1,
    name: '八达岭长城',
    nameEn: 'Badaling Great Wall',
    description: '明长城中保存最好的一段，也是最具代表性的一段，不到长城非好汉说的就是这里。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20badaling%20great%20wall%20spring%20scenery&image_size=landscape_4_3',
    checkInCount: 98765,
    likes: 87654
  },
  {
    id: 3,
    cityId: 1,
    name: '颐和园',
    nameEn: 'Summer Palace',
    description: '中国清朝时期皇家园林，前身为清漪园，以昆明湖、万寿山为基址，被誉为皇家园林博物馆。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20summer%20palace%20kunming%20lake%20longevity%20hill&image_size=landscape_4_3',
    checkInCount: 76543,
    likes: 65432
  },
  {
    id: 4,
    cityId: 1,
    name: '天坛',
    nameEn: 'Temple of Heaven',
    description: '明清两代皇帝祭祀皇天、祈五谷丰登的场所，是中国现存最大的古代祭祀性建筑群。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20temple%20of%20heaven%20prayer%20hall&image_size=landscape_4_3',
    checkInCount: 65432,
    likes: 54321
  },
  {
    id: 5,
    cityId: 2,
    name: '五大道',
    nameEn: 'Five Great Avenues',
    description: '天津著名的历史街区，汇聚了英、法、意、德、西等国各式建筑2000多所，被称为万国建筑博览会。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tianjin%20five%20great%20avenues%20european%20buildings&image_size=landscape_4_3',
    checkInCount: 43210,
    likes: 32109
  },
  {
    id: 6,
    cityId: 2,
    name: '天津之眼',
    nameEn: 'Tianjin Eye',
    description: '天津地标之一，是世界上唯一一个建在桥上的摩天轮，跨越海河之上，可俯瞰天津城市风光。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tianjin%20eye%20ferris%20wheel%20haihe%20river&image_size=landscape_4_3',
    checkInCount: 54321,
    likes: 43210
  },
  {
    id: 7,
    cityId: 3,
    name: '外滩',
    nameEn: 'The Bund',
    description: '上海的象征，万国建筑博览群，与对岸陆家嘴摩天大楼群隔江相望，是上海最具代表性的城市景观。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shanghai%20the%20bund%20colonial%20architecture%20skyline&image_size=landscape_4_3',
    checkInCount: 156789,
    likes: 145678
  },
  {
    id: 8,
    cityId: 3,
    name: '东方明珠',
    nameEn: 'Oriental Pearl Tower',
    description: '上海地标性建筑，位于浦东新区陆家嘴，塔高约468米，是观赏上海城市风光的最佳地点之一。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shanghai%20oriental%20pearl%20tower%20lujiazui%20night&image_size=landscape_4_3',
    checkInCount: 123456,
    likes: 112345
  },
  {
    id: 9,
    cityId: 3,
    name: '豫园',
    nameEn: 'Yu Garden',
    description: '江南古典园林，始建于明代嘉靖、万历年间，园内楼阁参差，山石峥嵘，素有城市山林之誉。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shanghai%20yu%20garden%20classical%20chinese%20garden&image_size=landscape_4_3',
    checkInCount: 87654,
    likes: 76543
  },
  {
    id: 10,
    cityId: 4,
    name: '拙政园',
    nameEn: 'Humble Administrator\'s Garden',
    description: '苏州最大的古典园林，中国四大名园之一，全园以水为中心，山水萦绕，厅榭精美，花木繁茂。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=suzhou%20humble%20administrators%20garden%20lotus%20pond&image_size=landscape_4_3',
    checkInCount: 76543,
    likes: 65432
  },
  {
    id: 11,
    cityId: 4,
    name: '虎丘',
    nameEn: 'Huqiu',
    description: '苏州著名风景名胜区，有吴中第一名胜的美誉，苏东坡曾说：到苏州不游虎丘，乃憾事也！',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=suzhou%20huqiu%20tiger%20hill%20leaning%20pagoda&image_size=landscape_4_3',
    checkInCount: 65432,
    likes: 54321
  },
  {
    id: 12,
    cityId: 4,
    name: '周庄古镇',
    nameEn: 'Zhouzhuang Ancient Town',
    description: '中国第一水乡，江南六大古镇之首，保留了完整的明清建筑群，陈逸飞的《故乡的回忆》让周庄闻名世界。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=suzhou%20zhouzhuang%20water%20town%20canals%20boats&image_size=landscape_4_3',
    checkInCount: 54321,
    likes: 43210
  },
  {
    id: 13,
    cityId: 5,
    name: '广州塔',
    nameEn: 'Canton Tower',
    description: '广州新地标，昵称小蛮腰，总高度600米，是中国第一高塔，世界第二高塔。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=guangzhou%20canton%20tower%20night%20lights%20pearl%20river&image_size=landscape_4_3',
    checkInCount: 98765,
    likes: 87654
  },
  {
    id: 14,
    cityId: 5,
    name: '陈家祠',
    nameEn: 'Chen Clan Academy',
    description: '广东现存规模最大、装饰华丽、保存完好的传统岭南祠堂式建筑，以三雕、三塑、一铸铁著称。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=guangzhou%20chen%20clan%20academy%20traditional%20carvings&image_size=landscape_4_3',
    checkInCount: 43210,
    likes: 32109
  },
  {
    id: 15,
    cityId: 5,
    name: '沙面岛',
    nameEn: 'Shamian Island',
    description: '广州著名的外事游览区和历史文物保护区，岛上有150多座欧洲风格建筑，绿树成荫，环境优美。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=guangzhou%20shamian%20island%20colonial%20buildings%20trees&image_size=landscape_4_3',
    checkInCount: 54321,
    likes: 43210
  },
  {
    id: 16,
    cityId: 6,
    name: '世界之窗',
    nameEn: 'Window of the World',
    description: '以世界各地名胜古迹微缩景观为主的主题公园，按不同比例仿建了世界著名景观130多处。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shenzhen%20window%20of%20the%20world%20eiffel%20tower&image_size=landscape_4_3',
    checkInCount: 65432,
    likes: 54321
  },
  {
    id: 17,
    cityId: 6,
    name: '平安金融中心',
    nameEn: 'Ping An Finance Center',
    description: '深圳最高建筑，总高度599米，是中国第二高楼，登顶可俯瞰整个深圳城市风光。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shenzhen%20ping%20an%20finance%20center%20skyscraper&image_size=landscape_4_3',
    checkInCount: 43210,
    likes: 32109
  },
  {
    id: 18,
    cityId: 7,
    name: '长隆海洋王国',
    nameEn: 'Chimelong Ocean Kingdom',
    description: '全球最大的海洋主题公园，拥有世界最大的水族馆和最长的过山车，是家庭游的绝佳选择。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=zhuhai%20chimelong%20ocean%20kingdom%20aquarium&image_size=landscape_4_3',
    checkInCount: 76543,
    likes: 65432
  },
  {
    id: 19,
    cityId: 7,
    name: '情侣路',
    nameEn: 'Lovers Road',
    description: '珠海标志性道路，沿珠江口海岸线绵延28公里，是市民休闲散步、欣赏海景的好去处。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=zhuhai%20lovers%20road%20coastal%20bicycle%20path&image_size=landscape_4_3',
    checkInCount: 43210,
    likes: 32109
  },
  {
    id: 20,
    cityId: 8,
    name: '西湖',
    nameEn: 'West Lake',
    description: '世界文化遗产，中国著名的风景名胜区，以秀丽的湖光山色和众多的名胜古迹闻名中外。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hangzhou%20west%20lake%20broken%20bridge%20willow%20trees&image_size=landscape_4_3',
    checkInCount: 187654,
    likes: 176543
  },
  {
    id: 21,
    cityId: 8,
    name: '灵隐寺',
    nameEn: 'Lingyin Temple',
    description: '杭州最早的名刹，也是中国佛教禅宗十大古刹之一，寺前有飞来峰造像，是江南石刻艺术的瑰宝。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hangzhou%20lingyin%20temple%20buddhist%20monastery&image_size=landscape_4_3',
    checkInCount: 76543,
    likes: 65432
  },
  {
    id: 22,
    cityId: 8,
    name: '雷峰塔',
    nameEn: 'Leifeng Pagoda',
    description: '西湖著名景点，与保俶塔隔湖相对，白蛇传中白娘子被法海镇压于此的故事让雷峰塔家喻户晓。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hangzhou%20leifeng%20pagoda%20west%20lake%20sunset&image_size=landscape_4_3',
    checkInCount: 65432,
    likes: 54321
  },
  {
    id: 23,
    cityId: 8,
    name: '宋城',
    nameEn: 'Song City',
    description: '以宋代文化为主题的大型主题公园，园内还原了宋代都市风貌，《宋城千古情》演出是其灵魂。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hangzhou%20song%20city%20ancient%20street%20traditional&image_size=landscape_4_3',
    checkInCount: 54321,
    likes: 43210
  },
  {
    id: 24,
    cityId: 9,
    name: '天一阁',
    nameEn: 'Tianyi Pavilion',
    description: '亚洲现存最古老的私人藏书楼，也是世界上现存最古老的三大家族图书馆之一，中国藏书文化的代表。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ningbo%20tianyi%20ge%20library%20ancient%20books&image_size=landscape_4_3',
    checkInCount: 43210,
    likes: 32109
  },
  {
    id: 25,
    cityId: 9,
    name: '普陀山',
    nameEn: 'Putuo Mountain',
    description: '中国四大佛教名山之一，观世音菩萨的道场，岛上有众多寺庙和奇特的海岛风光，被誉为海天佛国。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ningbo%20putuo%20mountain%20buddhist%20temple%20sea&image_size=landscape_4_3',
    checkInCount: 76543,
    likes: 65432
  },
  {
    id: 26,
    cityId: 10,
    name: '中山陵',
    nameEn: 'Zhongshan Ling',
    description: '中国近代民主革命先行者孙中山先生的陵寝，依山而建，气势恢宏，被誉为中国近代建筑史上第一陵。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=nanjing%20zhongshan%20ling%20sun%20yat-sen%20mausoleum&image_size=landscape_4_3',
    checkInCount: 87654,
    likes: 76543
  },
  {
    id: 27,
    cityId: 10,
    name: '夫子庙秦淮河',
    nameEn: 'Confucius Temple Qinhuai River',
    description: '南京的母亲河，六朝古都的繁华之地，十里秦淮，六朝金粉，夜游秦淮河是体验南京夜景的最佳方式。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=nanjing%20qinhuai%20river%20confucius%20temple%20night%20boats&image_size=landscape_4_3',
    checkInCount: 98765,
    likes: 87654
  },
  {
    id: 28,
    cityId: 10,
    name: '明孝陵',
    nameEn: 'Ming Xiaoling',
    description: '明朝开国皇帝朱元璋和马皇后的陵寝，是中国规模最大的帝王陵寝之一，神道两旁的石兽是其标志性景观。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=nanjing%20ming%20xiaoling%20stone%20elephants%20autumn&image_size=landscape_4_3',
    checkInCount: 54321,
    likes: 43210
  },
  {
    id: 29,
    cityId: 11,
    name: '鼋头渚',
    nameEn: 'Yuantouzhu',
    description: '太湖风景的精华所在，有太湖第一名胜之称，每年春天的樱花季吸引无数游客前来观赏。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wuxi%20yuantouzhu%20taihu%20lake%20cherry%20blossoms&image_size=landscape_4_3',
    checkInCount: 54321,
    likes: 43210
  },
  {
    id: 30,
    cityId: 11,
    name: '灵山大佛',
    nameEn: 'Lingshan Giant Buddha',
    description: '世界上最高的青铜释迦牟尼立像，高88米，位于无锡马山，是中国著名的佛教圣地。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wuxi%20lingshan%20giant%20buddha%20statue&image_size=landscape_4_3',
    checkInCount: 65432,
    likes: 54321
  },
  {
    id: 31,
    cityId: 12,
    name: '大熊猫繁育研究基地',
    nameEn: 'Chengdu Research Base of Giant Panda Breeding',
    description: '世界著名的大熊猫迁地保护基地，在这里可以近距离观察国宝大熊猫的日常生活，是成都必去景点。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chengdu%20giant%20panda%20bamboo%20cute&image_size=landscape_4_3',
    checkInCount: 145678,
    likes: 134567
  },
  {
    id: 32,
    cityId: 12,
    name: '锦里古街',
    nameEn: 'Jinli Ancient Street',
    description: '成都著名的商业步行街，以三国文化和成都民风民俗为特色，是体验成都慢生活、品尝成都小吃的好去处。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chengdu%20jinli%20ancient%20street%20red%20lanterns&image_size=landscape_4_3',
    checkInCount: 98765,
    likes: 87654
  },
  {
    id: 33,
    cityId: 12,
    name: '都江堰',
    nameEn: 'Dujiangyan',
    description: '世界文化遗产，中国古代著名的水利工程，始建于秦昭王末年，至今仍在发挥灌溉作用，被誉为世界水利文化的鼻祖。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chengdu%20dujiangyan%20irrigation%20system%20minjiang%20river&image_size=landscape_4_3',
    checkInCount: 65432,
    likes: 54321
  },
  {
    id: 34,
    cityId: 12,
    name: '宽窄巷子',
    nameEn: 'Kuanzhai Alley',
    description: '成都市三大历史文化保护区之一，由宽巷子、窄巷子和井巷子组成，是老成都百年原真民居建筑的最后遗存。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chengdu%20kuanzhai%20alley%20old%20street%20traditional&image_size=landscape_4_3',
    checkInCount: 87654,
    likes: 76543
  },
  {
    id: 35,
    cityId: 13,
    name: '洪崖洞',
    nameEn: 'Hongyadong',
    description: '重庆最具特色的吊脚楼建筑群，依山而建，层叠而上，夜晚灯光亮起时，宛如宫崎骏《千与千寻》中的场景。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chongqing%20hongyadong%20night%20lights%20hanging%20houses&image_size=landscape_4_3',
    checkInCount: 167890,
    likes: 156789
  },
  {
    id: 36,
    cityId: 13,
    name: '磁器口古镇',
    nameEn: 'Ciqikou Ancient Town',
    description: '重庆著名的古镇，始建于宋代，有小重庆之称，保留了较为完整的明清风格建筑群，是体验老重庆风情的好去处。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chongqing%20ciqikou%20ancient%20town%20traditional%20architecture&image_size=landscape_4_3',
    checkInCount: 87654,
    likes: 76543
  },
  {
    id: 37,
    cityId: 13,
    name: '武隆天生三桥',
    nameEn: 'Wulong Karst Three Natural Bridges',
    description: '世界自然遗产，重庆最著名的自然景观之一，天龙桥、青龙桥、黑龙桥三座气势磅礴的石拱桥形成了三桥夹两坑的奇特景观。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chongqing%20wulong%20karst%20tiankeng%20natural%20bridge&image_size=landscape_4_3',
    checkInCount: 76543,
    likes: 65432
  },
  {
    id: 38,
    cityId: 14,
    name: '石林',
    nameEn: 'Stone Forest',
    description: '世界自然遗产，中国四大自然奇观之一，喀斯特地貌的精华，石峰林立，造型奇特，被誉为天下第一奇观、上帝的盆景。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=kunming%20stone%20forest%20karst%20formations&image_size=landscape_4_3',
    checkInCount: 65432,
    likes: 54321
  },
  {
    id: 39,
    cityId: 14,
    name: '滇池',
    nameEn: 'Dianchi Lake',
    description: '云南省最大的淡水湖，被誉为高原明珠，是昆明的母亲湖，滇池风光秀丽，四周有西山森林公园、大观公园等名胜。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=kunming%20dianchi%20lake%20west%20hill%20sunset&image_size=landscape_4_3',
    checkInCount: 54321,
    likes: 43210
  },
  {
    id: 40,
    cityId: 14,
    name: '翠湖公园',
    nameEn: 'Green Lake Park',
    description: '昆明市区最美的城市公园，以翠湖嬉鸥著称，每年冬天，成群的红嘴鸥从西伯利亚飞来过冬，成为昆明一道独特的风景。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=kunming%20green%20lake%20park%20red%20billed%20gulls&image_size=landscape_4_3',
    checkInCount: 43210,
    likes: 32109
  },
  {
    id: 41,
    cityId: 15,
    name: '丽江古城',
    nameEn: 'Lijiang Ancient Town',
    description: '世界文化遗产，中国历史文化名城，以纳西族为主的少数民族聚居地，古城依山傍水，青石板路蜿蜒，小桥流水人家。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=lijiang%20ancient%20town%20old%20streets%20waterways&image_size=landscape_4_3',
    checkInCount: 156789,
    likes: 145678
  },
  {
    id: 42,
    cityId: 15,
    name: '玉龙雪山',
    nameEn: 'Jade Dragon Snow Mountain',
    description: '北半球最南的大雪山，纳西族的神山，主峰扇子陡海拔5596米，山上终年积雪，巍峨壮观，是丽江最具代表性的自然景观。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=lijiang%20jade%20dragon%20snow%20mountain%20blue%20sky&image_size=landscape_4_3',
    checkInCount: 98765,
    likes: 87654
  },
  {
    id: 43,
    cityId: 15,
    name: '泸沽湖',
    nameEn: 'Lugu Lake',
    description: '云南省海拔最高的湖泊，也是中国第三大深水湖泊，被誉为高原明珠，湖畔居住着摩梭人，仍保留着母系氏族婚姻制度。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=lijiang%20lugu%20lake%20peaceful%20waters%20mountains&image_size=landscape_4_3',
    checkInCount: 76543,
    likes: 65432
  },
  {
    id: 44,
    cityId: 16,
    name: '橘子洲',
    nameEn: 'Orange Island',
    description: '长沙的城市地标，湘江中最大的名洲，以毛泽东青年艺术雕塑闻名，独立寒秋，湘江北去，橘子洲头说的就是这里。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=changsha%20orange%20island%20mao%20zedong%20statue&image_size=landscape_4_3',
    checkInCount: 87654,
    likes: 76543
  },
  {
    id: 45,
    cityId: 16,
    name: '岳麓书院',
    nameEn: 'Yuelu Academy',
    description: '中国历史上四大书院之一，也是世界上最古老的学府之一，始建于北宋，历经千年，弦歌不绝，现为湖南大学的一部分。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=changsha%20yuelu%20academy%20ancient%20university&image_size=landscape_4_3',
    checkInCount: 54321,
    likes: 43210
  },
  {
    id: 46,
    cityId: 16,
    name: '太平老街',
    nameEn: 'Taiping Old Street',
    description: '长沙保留完好的历史街区，是老长沙的缩影，这里汇聚了众多长沙老字号和特色小吃，臭豆腐、糖油粑粑是必尝美食。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=changsha%20taiping%20old%20street%20food%20stalls&image_size=landscape_4_3',
    checkInCount: 76543,
    likes: 65432
  },
  {
    id: 47,
    cityId: 17,
    name: '天门山',
    nameEn: 'Tianmen Mountain',
    description: '张家界最著名的景点之一，因自然奇观天门洞而得名，天门洞是世界上海拔最高的天然穿山溶洞，山上的玻璃栈道更是惊险刺激。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=zhangjiajie%20tianmen%20mountain%20cave%20glass%20bridge&image_size=landscape_4_3',
    checkInCount: 87654,
    likes: 76543
  },
  {
    id: 48,
    cityId: 17,
    name: '张家界国家森林公园',
    nameEn: 'Zhangjiajie National Forest Park',
    description: '中国第一个国家森林公园，以石英砂岩峰林地貌著称，是电影《阿凡达》中悬浮山的取景地，被誉为中国山水画的原本。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=zhangjiajie%20avatar%20mountains%20quartz%20sandstone&image_size=landscape_4_3',
    checkInCount: 123456,
    likes: 112345
  },
  {
    id: 49,
    cityId: 17,
    name: '金鞭溪',
    nameEn: 'Jinbian Stream',
    description: '张家界最美的溪流，因流经金鞭岩而得名，全长7.5公里，溪水清澈，两岸奇峰林立，被誉为世界上最美丽的峡谷之一。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=zhangjiajie%20jinbian%20stream%20forest%20waterfall&image_size=landscape_4_3',
    checkInCount: 54321,
    likes: 43210
  }
]

export const foods = [
  {
    id: 1,
    cityId: 1,
    name: '北京烤鸭',
    nameEn: 'Peking Duck',
    description: '北京最具代表性的名菜，选用优质北京鸭，果木炭火烤制，色泽红润，肉质肥而不腻，外脆里嫩。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20peking%20duck%20roasted%20crispy%20skin&image_size=landscape_4_3',
    likes: 98765
  },
  {
    id: 2,
    cityId: 1,
    name: '炸酱面',
    nameEn: 'Zhajiangmian',
    description: '北京传统面食，由菜码、炸酱拌面条而成，炸酱由黄酱和肉末炒制而成，酱香浓郁，是北京人最爱的家常美食。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20zhajiangmian%20noodles%20black%20bean%20sauce&image_size=landscape_4_3',
    likes: 54321
  },
  {
    id: 3,
    cityId: 1,
    name: '豆汁焦圈',
    nameEn: 'Douzhi with Jiaocircle',
    description: '北京传统小吃，豆汁是绿豆发酵制成的饮品，焦圈是油炸的面圈，搭配咸菜丝食用，是老北京早餐的经典组合。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20douzhi%20fermented%20mung%20bean%20drink&image_size=landscape_4_3',
    likes: 32109
  },
  {
    id: 4,
    cityId: 1,
    name: '卤煮火烧',
    nameEn: 'Luzhu Huoshao',
    description: '北京传统小吃，将火烧、猪肠、肺头、炸豆腐等放在老汤中炖煮而成，汤汁浓郁，味道醇厚，是北京人喜爱的平民美食。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20luzhu%20pork%20intestines%20stew&image_size=landscape_4_3',
    likes: 43210
  },
  {
    id: 5,
    cityId: 2,
    name: '狗不理包子',
    nameEn: 'Goubuli Buns',
    description: '天津最著名的小吃，以皮薄馅大、十八个褶著称，创始人高贵友乳名狗不理，因此得名，是天津三绝之首。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tianjin%20goubuli%20steamed%20buns%20folds&image_size=landscape_4_3',
    likes: 65432
  },
  {
    id: 6,
    cityId: 2,
    name: '麻花',
    nameEn: 'Mahua',
    description: '天津特色小吃，以桂发祥十八街麻花最为有名，麻花金黄醒目，甘甜爽脆，甜而不腻，口感清新，齿颊留香。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tianjin%20mahua%20fried%20dough%20twist%20sesame&image_size=landscape_4_3',
    likes: 43210
  },
  {
    id: 7,
    cityId: 2,
    name: '煎饼果子',
    nameEn: 'Jianbing Guozi',
    description: '天津街头最常见的早餐，绿豆面糊摊成薄饼，打上鸡蛋，抹上面酱、辣酱，撒上葱花，卷上薄脆或油条，香脆可口。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tianjin%20jianbing%20guozhi%20chinese%20crepe%20egg&image_size=landscape_4_3',
    likes: 76543
  },
  {
    id: 8,
    cityId: 3,
    name: '小笼包',
    nameEn: 'Xiaolongbao',
    description: '上海传统点心，以皮薄馅嫩、汁多味美著称，轻轻咬开一个小口，先吸食鲜美汤汁，再品尝馅料。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shanghai%20xiaolongbao%20soup%20dumplings%20steamed&image_size=landscape_4_3',
    likes: 87654
  },
  {
    id: 9,
    cityId: 3,
    name: '生煎包',
    nameEn: 'Shengjianbao',
    description: '上海特色小吃，底酥、皮薄、肉香，底部煎得金黄酥脆，上面撒满芝麻和葱花，香气扑鼻。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shanghai%20shengjianbao%20pan%20fried%20buns&image_size=landscape_4_3',
    likes: 65432
  },
  {
    id: 10,
    cityId: 3,
    name: '糖醋排骨',
    nameEn: 'Sweet and Sour Ribs',
    description: '上海本帮菜经典，选用新鲜猪小排，经炸制后裹上糖醋汁，色泽红亮，酸甜适中，外酥里嫩。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shanghai%20sweet%20sour%20pork%20ribs%20red&image_size=landscape_4_3',
    likes: 54321
  }
]

export const scenery = [
  {
    id: 1,
    cityId: 1,
    name: '故宫红墙',
    nameEn: 'Forbidden City Red Walls',
    description: '故宫的红墙黄瓦是北京最具代表性的符号，红墙前的银杏、腊梅，是摄影爱好者的最爱。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20forbidden%20city%20red%20wall%20golden%20roof&image_size=landscape_4_3',
    likes: 87654
  },
  {
    id: 2,
    cityId: 1,
    name: '什刹海日落',
    nameEn: 'Shichahai Sunset',
    description: '什刹海是北京城内最具老北京风情的地方，傍晚时分，夕阳西下，湖面波光粼粼，美不胜收。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20shichahai%20lake%20sunset%20reflection&image_size=landscape_4_3',
    likes: 65432
  },
  {
    id: 3,
    cityId: 1,
    name: '颐和园秋色',
    nameEn: 'Summer Palace Autumn',
    description: '秋天的颐和园是最美的，佛香阁、昆明湖、十七孔桥，在金黄的树叶映衬下，宛如一幅美丽的画卷。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20summer%20palace%20autumn%20colors%20kunming%20lake&image_size=landscape_4_3',
    likes: 76543
  },
  {
    id: 4,
    cityId: 2,
    name: '五大道洋楼',
    nameEn: 'Five Great Avenues Mansions',
    description: '五大道汇聚了英、法、意、德、西等国各式建筑2000多所，漫步其中，仿佛穿越到欧洲小镇。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tianjin%20five%20great%20avenues%20european%20architecture&image_size=landscape_4_3',
    likes: 54321
  },
  {
    id: 5,
    cityId: 2,
    name: '海河夜景',
    nameEn: 'Haihe River Night View',
    description: '夜游海河是天津必体验项目，两岸灯光璀璨，高楼、桥梁、游船构成一幅美丽的夜景画卷。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tianjin%20haihe%20river%20night%20lights%20reflection&image_size=landscape_4_3',
    likes: 65432
  }
]

export const attractions = [
  {
    id: 1,
    cityId: 1,
    name: '南锣鼓巷',
    nameEn: 'Nanluoguxiang',
    description: '北京最古老的街区之一，保存着元大都时期的胡同格局，现在是北京最文艺的胡同，有众多特色小店。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20nanluoguxiang%20hutong%20street%20traditional&image_size=landscape_4_3',
    likes: 76543
  },
  {
    id: 2,
    cityId: 1,
    name: '798艺术区',
    nameEn: '798 Art District',
    description: '由废弃工厂改造的艺术区，是中国当代艺术的聚集地，有众多艺术画廊、咖啡馆、创意商店。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20798%20art%20district%20industrial%20creative&image_size=landscape_4_3',
    likes: 65432
  },
  {
    id: 3,
    cityId: 1,
    name: '三里屯',
    nameEn: 'Sanlitun',
    description: '北京最繁华的商圈之一，是北京时尚潮流的风向标，有众多国际品牌店、酒吧、餐厅。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20sanlitun%20shopping%20district%20vibrant&image_size=landscape_4_3',
    likes: 87654
  }
]

export const comments = [
  {
    id: 1,
    targetId: 1,
    targetType: 'landmark',
    userId: 1,
    userName: '旅行达人小王',
    userAvatar: '',
    content: '故宫真的太壮观了！走在红墙黄瓦之间，仿佛穿越回古代。建议早上开门就去，人少景美。',
    likes: 1234,
    createdAt: '2024-03-15 10:30:00'
  },
  {
    id: 2,
    targetId: 1,
    targetType: 'landmark',
    userId: 2,
    userName: '摄影爱好者',
    userAvatar: '',
    content: '拍照的话，建议下午去，光线柔和。珍宝馆和钟表馆一定要进去看，非常值得。',
    likes: 987,
    createdAt: '2024-03-14 15:20:00'
  },
  {
    id: 3,
    targetId: 2,
    targetType: 'landmark',
    userId: 3,
    userName: '户外探险家',
    userAvatar: '',
    content: '不到长城非好汉！八达岭人比较多，可以选择慕田峪或者箭扣，风景更美。',
    likes: 2345,
    createdAt: '2024-03-13 09:15:00'
  },
  {
    id: 4,
    targetId: 20,
    targetType: 'landmark',
    userId: 4,
    userName: '江南烟雨',
    userAvatar: '',
    content: '西湖太美了！春天的苏堤、夏天的荷花、秋天的桂花、冬天的断桥残雪，四季皆景。',
    likes: 3456,
    createdAt: '2024-03-12 18:45:00'
  },
  {
    id: 5,
    targetId: 31,
    targetType: 'landmark',
    userId: 5,
    userName: '熊猫控',
    userAvatar: '',
    content: '大熊猫太可爱了！一定要早上八点开门就去，那个时候熊猫最活跃，会出来吃竹子。',
    likes: 4567,
    createdAt: '2024-03-11 11:30:00'
  }
]

export function getCityById(id) {
  if (!id) return null
  return cities.find(city => city.id === parseInt(id)) || null
}

export function getLandmarksByCityId(cityId) {
  if (!cityId) return []
  return landmarks.filter(l => l.cityId === parseInt(cityId)) || []
}

export function getFoodsByCityId(cityId) {
  if (!cityId) return []
  return foods.filter(f => f.cityId === parseInt(cityId)) || []
}

export function getSceneryByCityId(cityId) {
  if (!cityId) return []
  return scenery.filter(s => s.cityId === parseInt(cityId)) || []
}

export function getAttractionsByCityId(cityId) {
  if (!cityId) return []
  return attractions.filter(a => a.cityId === parseInt(cityId)) || []
}

export function getCommentsByTarget(targetId, targetType) {
  if (!targetId || !targetType) return []
  return comments.filter(c => c.targetId === parseInt(targetId) && c.targetType === targetType) || []
}

export function searchAll(keyword) {
  if (!keyword || keyword.trim() === '') return { cities: [], landmarks: [] }
  const lowerKeyword = keyword.toLowerCase().trim()
  
  const matchingCities = cities.filter(city => 
    (city.name && city.name.toLowerCase().includes(lowerKeyword)) ||
    (city.nameEn && city.nameEn.toLowerCase().includes(lowerKeyword))
  )
  
  const matchingLandmarks = landmarks.filter(landmark =>
    (landmark.name && landmark.name.toLowerCase().includes(lowerKeyword)) ||
    (landmark.nameEn && landmark.nameEn.toLowerCase().includes(lowerKeyword)) ||
    (landmark.description && landmark.description.toLowerCase().includes(lowerKeyword))
  )
  
  return { cities: matchingCities, landmarks: matchingLandmarks }
}

export function getHotCities() {
  return cities.filter(city => city.hot === true).sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
}

export function getAllCities() {
  return cities
}

export function getCitiesByProvinceId(provinceId) {
  if (!provinceId) return []
  return cities.filter(city => city.provinceId === parseInt(provinceId)) || []
}

export function formatNumber(num) {
  if (!num || isNaN(num)) return '0'
  const n = parseInt(num)
  if (n >= 10000) {
    return (n / 10000).toFixed(1) + '万'
  }
  return n.toString()
}
