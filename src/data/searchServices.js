const searchServices = [
  {
    name: '紀伊國屋',
    baseUrl: 'https://www.kinokuniya.co.jp/disp/CSfDispListPage_001.jsp',
    queryParam: 'q',
    note: '紀伊國屋書店で検索 / Search at Kinokuniya'
  },
  {
    name: 'honto',
    baseUrl: 'https://honto.jp/netstore/search.html',
    queryParam: 'k',
    note: 'hontoで検索 (電子/紙) / Search at honto (e-book/paper)'
  },
  {
    name: 'TSUTAYA',
    baseUrl: 'https://store-tsutaya.tsite.jp/search/result/',
    queryParam: 'keyword',
    note: 'TSUTAYAオンラインで検索 / Search at TSUTAYA Online'
  },
  {
    name: 'ヨドバシ',
    baseUrl: 'https://www.yodobashi.com/',
    queryParam: 'word',
    note: 'ヨドバシ.comで検索 / Search at Yodobashi.com'
  },
  {
    name: 'ブックオフ',
    baseUrl: 'https://shopping.bookoff.co.jp/search/keyword/',
    queryParamOrPath: '【検索語句】',
    note: 'ブックオフオンラインで検索 / Search at Bookoff Online'
  },
  {
    name: 'バリューブックス',
    baseUrl: 'https://www.valuebooks.jp/search',
    queryParam: 'keyword',
    note: 'バリューブックスで検索 / Search at Value Books'
  },
  {
    name: '図書館',
    baseUrl: 'https://calil.jp/search',
    queryParam: 'q',
    note: 'カーリルで図書館を横断検索 / Search across libraries with Calil'
  },
  {
    name: 'メルカリ',
    baseUrl: 'https://jp.mercari.com/search',
    queryParam: 'keyword',
    note: 'メルカリで中古本を検索 / Search used books on Mercari'
  },
  {
    name: '近くの書店',
    baseUrl: 'https://www.google.com/maps/search/',
    queryParamOrPath: '【検索語句】+書店',
    note: 'Googleマップで近くの書店を検索 / Search nearby bookstores on Google Maps'
  },
  {
    name: '近くのブックオフ',
    baseUrl: 'https://www.google.com/maps/search/',
    queryParamOrPath: '【検索語句】+ブックオフ',
    note: 'Googleマップで近くのブックオフを検索 / Search nearby Bookoff stores on Google Maps'
  }
];

export default searchServices; 