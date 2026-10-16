export const languages = [
  { code: "es", name: "Español", short: "ES" },
  { code: "en", name: "English", short: "EN" },
  { code: "ja", name: "日本語", short: "JA" },
  { code: "id", name: "Bahasa Indonesia", short: "ID" },
  { code: "ko", name: "한국어", short: "KO" },
  { code: "zh-Hant", name: "繁體中文", short: "ZH" },
  { code: "th", name: "ภาษาไทย", short: "TH" },
] as const;

export type Locale = (typeof languages)[number]["code"];
export function isLocale(value: string | null): value is Locale {
  return languages.some(language => language.code === value);
}

export const groupArtworkAlt: Record<Locale, string> = {
  es: "Ilustración de seis avatares de estilo anime tumbados juntos sobre el césped.",
  en: "Illustration of six anime-style avatars lying together on the grass.",
  ja: "草の上に一緒に寝転ぶ、アニメ風の6人のアバターのイラスト。",
  id: "Ilustrasi enam avatar bergaya anime berbaring bersama di atas rumput.",
  ko: "잔디 위에 함께 누워 있는 애니메이션풍 아바타 여섯 명의 일러스트.",
  "zh-Hant": "六位動漫風格的虛擬人物一起躺在草地上的插畫。",
  th: "ภาพวาดอวตารสไตล์อนิเมะหกคนนอนด้วยกันบนสนามหญ้า",
};

export interface WorldCopy {
  label: string; title: string; description: string; tags: string[]; quote: string; sticker: string;
}
export interface Copy {
  meta: { title: string; description: string };
  nav: { group: string; universe: string; people: string; community: string };
  ui: { skip: string; mainNav: string; mobileNav: string; footerNav: string; openMenu: string; closeMenu: string; language: string; dark: string; light: string; brand: string; home: string; back: string };
  hero: { eyebrow: string; lines: string[]; description: string[]; cta: string; stamp: string[]; caption: string; scroll: string; pointer: string; still: string; pause: string; play: string; reduced: string };
  ticker: string[];
  about: { eyebrow: string; title: string[]; paragraphs: string[]; note: string };
  universe: { title: string[]; introduction: string; tabs: string; room: string };
  worlds: WorldCopy[];
  people: { eyebrow: string; title: string[]; intro: string; tabs: string; teachers: string; honor: string; teacherLabel: string; honorLabel: string; teacherTitle: string; honorTitle: string; teacherDescription: string; honorDescription: string; soon: string };
  community: { badge: string; title: string[]; description: string[]; values: { title: string; description: string }[]; ending: string };
  footer: string;
}

export const content: Record<Locale, Copy> = {
  es: {
    meta: { title: "Un mundo por compartir", description: "Conoce La Escuela VT, un grupo de creadores VTuber. Música, gaming y una comunidad donde la imaginación no tiene horario." },
    nav: { group: "El grupo", universe: "Nuestro universo", people: "Profesores y alumnos de honor", community: "La comunidad" },
    ui: { skip: "Saltar al contenido", mainNav: "Navegación principal", mobileNav: "Navegación móvil", footerNav: "Navegación del pie", openMenu: "Abrir menú", closeMenu: "Cerrar menú", language: "Idioma", dark: "Activar modo oscuro", light: "Activar modo claro", brand: "GRUPO DE CREADORES VIRTUALES", home: "La Escuela VT, inicio", back: "Volver al inicio" },
    hero: { eyebrow: "UN GRUPO. INFINITOS MUNDOS.", lines: ["La imaginación", "no tiene", "horario."], description: ["VTubers, música y aventuras compartidas.", "Pasa, que aquí hay sitio para ti."], cta: "Descubre La Escuela", stamp: ["CON MUCHA", "VIDA", "VIRTUAL"], caption: "TU PRÓXIMO LUGAR FAVORITO.", scroll: "SIGUE EXPLORANDO", pointer: "Mueve el cursor. Hay otro mundo aquí.", still: "Disfruta el paisaje a tu ritmo.", pause: "Pausar movimiento", play: "Activar movimiento", reduced: "Movimiento reducido según tu dispositivo" },
    ticker: ["GAMING", "MÚSICA", "HISTORIAS", "COMUNIDAD"],
    about: { eyebrow: "BIENVENIDOS A LA ESCUELA VT", title: ["Distintos avatares.", "La misma conexión."], paragraphs: ["Somos un grupo de creadores VTuber con un punto de encuentro: La Escuela. Un lugar para dar vida a nuestras ideas y compartirlas contigo.", "Cada voz tiene su personalidad. Cada historia, su propio universo. Y entre todos hacemos que una pantalla se convierta en mucho más."], note: "Lo virtual nos encuentra. Lo que compartimos nos une." },
    universe: { title: ["Siempre hay algo", "que nos conecta."], introduction: "Elige tu aula. La curiosidad hace el resto.", tabs: "Explora nuestro universo", room: "AULA" },
    worlds: [
      { label: "Gaming", title: "La mejor partida es la que se comparte.", description: "Mundos por descubrir, retos que se nos resisten y ese «una más» que nunca es la última. Aquí las aventuras se viven en compañía.", tags: ["Nuevas aventuras", "Partidas en compañía", "Retos"], quote: "¿Echamos otra?", sticker: "JUGAMOS JUNTOS" },
      { label: "Música", title: "Hay historias que solo se pueden cantar.", description: "Una voz, una canción y mil maneras de sentirla. La música también tiene su propia aula: un lugar para expresarse y compartir lo que nos mueve.", tags: ["Voces virtuales", "Covers", "Creatividad"], quote: "Súbele el volumen.", sticker: "SIENTE LA MÚSICA" },
      { label: "Charlas", title: "Las grandes conexiones empiezan con un hola.", description: "Conversaciones sin prisa, historias inesperadas y risas que aparecen cuando menos te lo esperas. A veces, lo mejor del directo es simplemente estar.", tags: ["Conversaciones", "Risas", "Buenos ratos"], quote: "Quédate un ratito.", sticker: "EN BUENA COMPAÑÍA" },
    ],
    people: { eyebrow: "LAS PERSONAS DE LA ESCUELA", title: ["Profesores y", "alumnos de honor."], intro: "Quienes dan voz a La Escuela y quienes la hacen crecer cada día.", tabs: "Conoce a las personas de La Escuela", teachers: "Profesores", honor: "Alumnos de honor", teacherLabel: "LOS CREADORES DEL GRUPO", honorLabel: "UN APOYO QUE DEJA HUELLA", teacherTitle: "Cada profesor, un mundo propio.", honorTitle: "Un lugar de honor en La Escuela.", teacherDescription: "Los profesores son los miembros de nuestro grupo VTuber: las voces y los avatares que dan vida a La Escuela.", honorDescription: "Los alumnos de honor son las personas que más apoyan La Escuela. Este espacio reconoce su cariño, su compañía y todo lo que aportan a nuestra comunidad.", soon: "Sus perfiles y presentaciones estarán disponibles próximamente." },
    community: { badge: "HECHO PARA COMPARTIR", title: ["El mejor lugar", "es", "con vosotros."], description: ["Al otro lado de cada avatar hay una persona.", "Al otro lado de cada directo, una comunidad."], values: [{ title: "Sé tú.", description: "Tu manera de ser también tiene sitio aquí." }, { title: "Cuida al resto.", description: "El respeto hace que todos podamos disfrutar." }, { title: "Comparte el momento.", description: "Las pequeñas cosas se vuelven grandes en compañía." }], ending: "Nos vemos al otro lado de la pantalla." },
    footer: "JUNTOS, INCLUSO EN OTRO MUNDO.",
  },
  en: {
    meta: { title: "A world to share", description: "Meet La Escuela VT, a group of VTuber creators. Music, gaming and a community where imagination has no timetable." },
    nav: { group: "The group", universe: "Our universe", people: "Teachers & honor students", community: "The community" },
    ui: { skip: "Skip to content", mainNav: "Main navigation", mobileNav: "Mobile navigation", footerNav: "Footer navigation", openMenu: "Open menu", closeMenu: "Close menu", language: "Language", dark: "Switch to dark mode", light: "Switch to light mode", brand: "VIRTUAL CREATOR COLLECTIVE", home: "La Escuela VT, home", back: "Back to the top" },
    hero: { eyebrow: "ONE GROUP. INFINITE WORLDS.", lines: ["Imagination", "has no", "timetable."], description: ["VTubers, music and shared adventures.", "Come on in. There's a place for you here."], cta: "Discover La Escuela", stamp: ["FULL OF", "VIRTUAL", "LIFE"], caption: "YOUR NEXT FAVORITE PLACE.", scroll: "KEEP EXPLORING", pointer: "Move your cursor. Another world awaits.", still: "Enjoy the scenery at your own pace.", pause: "Pause motion", play: "Enable motion", reduced: "Motion reduced to match your device settings" },
    ticker: ["GAMING", "MUSIC", "STORIES", "COMMUNITY"],
    about: { eyebrow: "WELCOME TO LA ESCUELA VT", title: ["Different avatars.", "The same connection."], paragraphs: ["We're a group of VTuber creators with a shared meeting place: La Escuela. Somewhere to bring our ideas to life and share them with you.", "Every voice has its own personality. Every story has its own universe. Together, we make a screen become something more."], note: "The virtual world brings us together. What we share keeps us connected." },
    universe: { title: ["There's always something", "that connects us."], introduction: "Choose your classroom. Curiosity takes care of the rest.", tabs: "Explore our universe", room: "CLASSROOM" },
    worlds: [
      { label: "Gaming", title: "The best game is the one we share.", description: "Worlds to discover, challenges to overcome and that 'one more' that is never the last. Adventures are better together.", tags: ["New adventures", "Playing together", "Challenges"], quote: "One more round?", sticker: "PLAY TOGETHER" },
      { label: "Music", title: "Some stories can only be sung.", description: "One voice, one song and a thousand ways to feel it. Music has a classroom of its own: a place to express ourselves and share what moves us.", tags: ["Virtual voices", "Covers", "Creativity"], quote: "Turn up the volume.", sticker: "FEEL THE MUSIC" },
      { label: "Chatting", title: "Great connections start with a hello.", description: "Unhurried conversations, unexpected stories and laughter when you least expect it. Sometimes, simply being there is the best part of a stream.", tags: ["Conversations", "Laughter", "Good times"], quote: "Stay a little longer.", sticker: "GOOD COMPANY" },
    ],
    people: { eyebrow: "THE PEOPLE OF LA ESCUELA", title: ["Teachers &", "honor students."], intro: "The voices that bring La Escuela to life and the people who help it grow every day.", tabs: "Meet the people of La Escuela", teachers: "Teachers", honor: "Honor students", teacherLabel: "THE GROUP'S CREATORS", honorLabel: "SUPPORT THAT MAKES A DIFFERENCE", teacherTitle: "Every teacher, a world of their own.", honorTitle: "A place of honor at La Escuela.", teacherDescription: "Our teachers are the members of our VTuber group: the voices and avatars that bring La Escuela to life.", honorDescription: "Honor students are the people who support La Escuela the most. This space recognizes their kindness, their company and everything they bring to our community.", soon: "Their profiles and introductions will be available soon." },
    community: { badge: "MADE TO BE SHARED", title: ["The best place", "is", "with you."], description: ["Behind every avatar is a person.", "On the other side of every stream, a community."], values: [{ title: "Be yourself.", description: "There's a place for your own way of being here." }, { title: "Care for others.", description: "Respect lets everyone enjoy the moment." }, { title: "Share the moment.", description: "Little things become big when we experience them together." }], ending: "See you on the other side of the screen." },
    footer: "TOGETHER, EVEN IN ANOTHER WORLD.",
  },
  ja: {
    meta: { title: "一緒に楽しむ世界", description: "VTuberクリエイターグループ、La Escuela VTへようこそ。音楽、ゲーム、そして想像力が自由に広がるコミュニティ。" },
    nav: { group: "グループ紹介", universe: "私たちの世界", people: "先生と名誉生徒", community: "コミュニティ" },
    ui: { skip: "本文へスキップ", mainNav: "メインナビゲーション", mobileNav: "モバイルナビゲーション", footerNav: "フッターナビゲーション", openMenu: "メニューを開く", closeMenu: "メニューを閉じる", language: "言語", dark: "ダークモードに切り替え", light: "ライトモードに切り替え", brand: "バーチャルクリエイターグループ", home: "La Escuela VT ホーム", back: "ページの先頭へ" },
    hero: { eyebrow: "ひとつのグループ。無限の世界。", lines: ["想像力に", "時間割は", "いらない。"], description: ["VTuber、音楽、みんなで楽しむ冒険。", "ようこそ。ここには、あなたの居場所があります。"], cta: "La Escuelaを知る", stamp: ["あふれる", "バーチャル", "ライフ"], caption: "あなたの次のお気に入りの場所。", scroll: "もっと見てみよう", pointer: "カーソルを動かして、別の世界へ。", still: "自分のペースで風景を楽しもう。", pause: "動きを停止", play: "動きを有効にする", reduced: "端末の設定に合わせて動きを抑えています" },
    ticker: ["ゲーム", "音楽", "物語", "コミュニティ"],
    about: { eyebrow: "LA ESCUELA VTへようこそ", title: ["違うアバター。", "同じつながり。"], paragraphs: ["私たちは、La Escuelaという共通の場所に集まるVTuberクリエイターグループです。アイデアに命を吹き込み、あなたと分かち合う場所です。", "それぞれの声に個性があり、それぞれの物語に世界があります。みんなで、画面の向こうにもっと大きなつながりを生み出します。"], note: "バーチャルの世界で出会い、共有する時間でつながる。" },
    universe: { title: ["私たちをつなぐものは、", "いつもここに。"], introduction: "気になる教室を選んでみて。あとは好奇心にまかせよう。", tabs: "私たちの世界を探索", room: "教室" },
    worlds: [
      { label: "ゲーム", title: "一緒に遊ぶゲームが、いちばん楽しい。", description: "まだ知らない世界、手ごわい挑戦、そして終わらない「もう一回」。ここでは、冒険をみんなで楽しみます。", tags: ["新しい冒険", "一緒にプレイ", "チャレンジ"], quote: "もう一回、遊ぼう？", sticker: "一緒に遊ぼう" },
      { label: "音楽", title: "歌でしか伝えられない物語がある。", description: "ひとつの声、ひとつの歌、さまざまな気持ち。音楽にも、自分を表現し、心を動かすものを共有する教室があります。", tags: ["バーチャルの歌声", "カバー曲", "創造力"], quote: "ボリュームを上げて。", sticker: "音楽を感じよう" },
      { label: "雑談", title: "大切なつながりは、「こんにちは」から。", description: "ゆっくり話す時間、思いがけない物語、ふと生まれる笑い。配信のいちばんいいところは、ただ一緒にいることかもしれません。", tags: ["会話", "笑い", "楽しい時間"], quote: "もう少し、一緒に。", sticker: "心地よいひととき" },
    ],
    people: { eyebrow: "LA ESCUELAの仲間たち", title: ["先生と", "名誉生徒。"], intro: "La Escuelaに声を届ける人たちと、毎日その成長を支えてくれる人たち。", tabs: "La Escuelaの仲間を知る", teachers: "先生", honor: "名誉生徒", teacherLabel: "グループのクリエイター", honorLabel: "心に残るサポート", teacherTitle: "先生ひとりひとりに、自分だけの世界。", honorTitle: "La Escuelaの大切な名誉席。", teacherDescription: "先生は、私たちのVTuberグループのメンバーです。その声とアバターで、La Escuelaに命を吹き込みます。", honorDescription: "名誉生徒は、La Escuelaを特に深く支えてくださる方々です。この場所で、温かさ、共に過ごす時間、コミュニティへの貢献に感謝を伝えます。", soon: "プロフィールと紹介は、近日公開予定です。" },
    community: { badge: "一緒に楽しむために", title: ["いちばんの居場所は、", "", "あなたと一緒。"], description: ["アバターの向こうには、ひとりの人。", "配信の向こうには、コミュニティ。"], values: [{ title: "自分らしく。", description: "あなたらしさを大切にできる場所です。" }, { title: "お互いを大切に。", description: "思いやりが、みんなの楽しい時間をつくります。" }, { title: "この瞬間を共有しよう。", description: "小さなことも、一緒なら大切な思い出になります。" }], ending: "画面の向こうで、また会いましょう。" },
    footer: "別の世界でも、いつも一緒に。",
  },
  id: {
    meta: { title: "Dunia untuk dinikmati bersama", description: "Kenali La Escuela VT, sebuah grup kreator VTuber. Musik, game, dan komunitas tempat imajinasi tak mengenal jadwal." },
    nav: { group: "Tentang grup", universe: "Dunia kami", people: "Pengajar & siswa kehormatan", community: "Komunitas" },
    ui: { skip: "Lewati ke konten", mainNav: "Navigasi utama", mobileNav: "Navigasi seluler", footerNav: "Navigasi bagian bawah", openMenu: "Buka menu", closeMenu: "Tutup menu", language: "Bahasa", dark: "Aktifkan mode gelap", light: "Aktifkan mode terang", brand: "GRUP KREATOR VIRTUAL", home: "La Escuela VT, beranda", back: "Kembali ke atas" },
    hero: { eyebrow: "SATU GRUP. DUNIA TANPA BATAS.", lines: ["Imajinasi", "tak mengenal", "jadwal."], description: ["VTuber, musik, dan petualangan bersama.", "Masuk saja. Ada tempat untukmu di sini."], cta: "Kenali La Escuela", stamp: ["PENUH", "KEHIDUPAN", "VIRTUAL"], caption: "TEMPAT FAVORITMU BERIKUTNYA.", scroll: "TERUS JELAJAHI", pointer: "Gerakkan kursor. Dunia lain menantimu.", still: "Nikmati pemandangan dengan santai.", pause: "Jeda gerakan", play: "Aktifkan gerakan", reduced: "Gerakan dikurangi sesuai pengaturan perangkatmu" },
    ticker: ["GAME", "MUSIK", "CERITA", "KOMUNITAS"],
    about: { eyebrow: "SELAMAT DATANG DI LA ESCUELA VT", title: ["Avatar berbeda.", "Ikatan yang sama."], paragraphs: ["Kami adalah grup kreator VTuber yang berkumpul di La Escuela. Tempat untuk menghidupkan ide dan membagikannya kepadamu.", "Setiap suara punya kepribadian. Setiap cerita punya dunianya sendiri. Bersama, kami membuat layar menjadi sesuatu yang lebih bermakna."], note: "Dunia virtual mempertemukan kita. Pengalaman bersama mengikat kita." },
    universe: { title: ["Selalu ada sesuatu", "yang menghubungkan kita."], introduction: "Pilih kelasmu. Biarkan rasa ingin tahu memandumu.", tabs: "Jelajahi dunia kami", room: "KELAS" },
    worlds: [
      { label: "Game", title: "Permainan terbaik adalah yang dimainkan bersama.", description: "Dunia untuk dijelajahi, tantangan yang sulit ditaklukkan, dan 'sekali lagi' yang tak pernah jadi terakhir. Di sini, petualangan dinikmati bersama.", tags: ["Petualangan baru", "Bermain bersama", "Tantangan"], quote: "Main sekali lagi?", sticker: "MAIN BERSAMA" },
      { label: "Musik", title: "Ada cerita yang hanya bisa dinyanyikan.", description: "Satu suara, satu lagu, dan begitu banyak cara untuk merasakannya. Musik juga punya kelas sendiri: tempat mengekspresikan diri dan berbagi hal yang menyentuh hati.", tags: ["Suara virtual", "Lagu cover", "Kreativitas"], quote: "Naikkan volumenya.", sticker: "RASAKAN MUSIKNYA" },
      { label: "Obrolan", title: "Ikatan yang indah dimulai dari sapaan.", description: "Obrolan santai, cerita tak terduga, dan tawa yang datang tiba-tiba. Terkadang, hal terbaik dari siaran adalah sekadar hadir bersama.", tags: ["Percakapan", "Tawa", "Momen seru"], quote: "Temani kami sebentar.", sticker: "TEMAN YANG ASYIK" },
    ],
    people: { eyebrow: "ORANG-ORANG DI LA ESCUELA", title: ["Pengajar &", "siswa kehormatan."], intro: "Mereka yang memberi suara pada La Escuela dan mereka yang membantunya tumbuh setiap hari.", tabs: "Kenali orang-orang di La Escuela", teachers: "Pengajar", honor: "Siswa kehormatan", teacherLabel: "KREATOR DALAM GRUP", honorLabel: "DUKUNGAN YANG BERARTI", teacherTitle: "Setiap pengajar punya dunianya sendiri.", honorTitle: "Tempat kehormatan di La Escuela.", teacherDescription: "Para pengajar adalah anggota grup VTuber kami: suara dan avatar yang menghidupkan La Escuela.", honorDescription: "Siswa kehormatan adalah orang-orang yang paling mendukung La Escuela. Ruang ini menghargai kehangatan, kebersamaan, dan semua yang mereka berikan kepada komunitas kami.", soon: "Profil dan perkenalan mereka akan segera tersedia." },
    community: { badge: "UNTUK DINIKMATI BERSAMA", title: ["Tempat terbaik", "adalah", "bersamamu."], description: ["Di balik setiap avatar, ada seseorang.", "Di balik setiap siaran, ada komunitas."], values: [{ title: "Jadilah dirimu.", description: "Ada tempat untuk dirimu yang apa adanya di sini." }, { title: "Peduli pada sesama.", description: "Saling menghormati membuat semua orang nyaman." }, { title: "Bagikan momennya.", description: "Hal kecil jadi istimewa ketika dinikmati bersama." }], ending: "Sampai jumpa di balik layar." },
    footer: "BERSAMA, BAHKAN DI DUNIA LAIN.",
  },
  ko: {
    meta: { title: "함께 나누는 세계", description: "버튜버 크리에이터 그룹 La Escuela VT를 만나 보세요. 음악, 게임, 그리고 상상력에 시간표가 없는 커뮤니티." },
    nav: { group: "그룹 소개", universe: "우리의 세계", people: "선생님과 명예 학생", community: "커뮤니티" },
    ui: { skip: "본문으로 건너뛰기", mainNav: "주 메뉴", mobileNav: "모바일 메뉴", footerNav: "하단 메뉴", openMenu: "메뉴 열기", closeMenu: "메뉴 닫기", language: "언어", dark: "다크 모드로 전환", light: "라이트 모드로 전환", brand: "버추얼 크리에이터 그룹", home: "La Escuela VT 홈", back: "맨 위로" },
    hero: { eyebrow: "하나의 그룹. 무한한 세계.", lines: ["상상에는", "시간표가", "없어요."], description: ["버튜버, 음악, 그리고 함께하는 모험.", "어서 오세요. 여기엔 당신의 자리가 있어요."], cta: "La Escuela 알아보기", stamp: ["생동감 넘치는", "버추얼", "라이프"], caption: "당신의 새로운 최애 공간.", scroll: "계속 둘러보기", pointer: "커서를 움직여 또 다른 세계를 만나 보세요.", still: "편안하게 풍경을 즐겨 보세요.", pause: "움직임 일시 정지", play: "움직임 켜기", reduced: "기기 설정에 따라 움직임이 줄어듭니다" },
    ticker: ["게임", "음악", "이야기", "커뮤니티"],
    about: { eyebrow: "LA ESCUELA VT에 오신 것을 환영합니다", title: ["서로 다른 아바타.", "같은 연결."], paragraphs: ["우리는 La Escuela라는 공간에 모인 버튜버 크리에이터 그룹입니다. 아이디어에 생명을 불어넣고 여러분과 함께 나누는 곳이에요.", "각자의 목소리에는 개성이, 각자의 이야기에는 세계가 있습니다. 함께라면 화면 너머에 더 큰 연결을 만들 수 있어요."], note: "버추얼 세계에서 만나, 함께하는 시간으로 연결됩니다." },
    universe: { title: ["우리를 이어 주는 것은", "언제나 있어요."], introduction: "마음에 드는 교실을 골라 보세요. 나머지는 호기심에 맡겨요.", tabs: "우리의 세계 둘러보기", room: "교실" },
    worlds: [
      { label: "게임", title: "최고의 게임은 함께하는 게임.", description: "새로운 세계, 만만치 않은 도전, 그리고 끝나지 않는 '한 판 더'. 여기서는 모험도 함께 즐겨요.", tags: ["새로운 모험", "함께 플레이", "도전"], quote: "한 판 더 할까요?", sticker: "함께 플레이" },
      { label: "음악", title: "노래로만 전할 수 있는 이야기가 있어요.", description: "하나의 목소리, 하나의 노래, 수많은 감정. 음악에도 자신을 표현하고 마음을 움직이는 것을 나누는 교실이 있어요.", tags: ["버추얼 보이스", "커버곡", "창의성"], quote: "볼륨을 높여 주세요.", sticker: "음악을 느껴요" },
      { label: "이야기", title: "소중한 연결은 인사 한마디에서 시작돼요.", description: "느긋한 대화, 뜻밖의 이야기, 예상치 못한 웃음. 때로는 그냥 함께 있는 것이 방송의 가장 좋은 순간이에요.", tags: ["대화", "웃음", "즐거운 시간"], quote: "조금 더 함께해요.", sticker: "좋은 사람들과" },
    ],
    people: { eyebrow: "LA ESCUELA의 사람들", title: ["선생님과", "명예 학생."], intro: "La Escuela에 목소리를 더하는 사람들, 그리고 매일 성장을 함께하는 사람들.", tabs: "La Escuela의 사람들 만나기", teachers: "선생님", honor: "명예 학생", teacherLabel: "그룹의 크리에이터", honorLabel: "오래 기억되는 응원", teacherTitle: "선생님마다 자신만의 세계.", honorTitle: "La Escuela의 소중한 명예석.", teacherDescription: "선생님은 우리 버튜버 그룹의 멤버입니다. 목소리와 아바타로 La Escuela에 생명을 불어넣어요.", honorDescription: "명예 학생은 La Escuela를 가장 든든하게 지원해 주는 분들입니다. 이 공간은 그분들의 따뜻한 마음, 함께하는 시간, 그리고 커뮤니티에 대한 기여를 기립니다.", soon: "프로필과 소개는 곧 공개됩니다." },
    community: { badge: "함께 나누기 위해", title: ["가장 좋은 곳은", "", "여러분과 함께."], description: ["모든 아바타 뒤에는 한 사람이 있어요.", "모든 방송 너머에는 커뮤니티가 있어요."], values: [{ title: "나답게.", description: "있는 그대로의 당신을 위한 자리도 있어요." }, { title: "서로를 배려해요.", description: "존중은 모두가 즐길 수 있는 시간을 만들어요." }, { title: "순간을 나눠요.", description: "작은 일도 함께하면 특별해져요." }], ending: "화면 너머에서 다시 만나요." },
    footer: "다른 세계에서도, 함께.",
  },
  "zh-Hant": {
    meta: { title: "一起分享的世界", description: "認識 VTuber 創作者團體 La Escuela VT。音樂、遊戲，以及讓想像力自由發揮的社群。" },
    nav: { group: "團體介紹", universe: "我們的世界", people: "老師與榮譽學生", community: "社群" },
    ui: { skip: "跳至主要內容", mainNav: "主要導覽", mobileNav: "行動版導覽", footerNav: "頁尾導覽", openMenu: "開啟選單", closeMenu: "關閉選單", language: "語言", dark: "切換深色模式", light: "切換淺色模式", brand: "虛擬創作者團體", home: "La Escuela VT 首頁", back: "回到頂端" },
    hero: { eyebrow: "一個團體，無限世界。", lines: ["想像力", "不受課表", "限制。"], description: ["VTuber、音樂，以及一起經歷的冒險。", "歡迎進來，這裡也有你的位置。"], cta: "認識 La Escuela", stamp: ["充滿活力的", "虛擬", "生活"], caption: "你下一個最喜歡的地方。", scroll: "繼續探索", pointer: "移動游標，另一個世界就在這裡。", still: "用自己的步調欣賞風景。", pause: "暫停動態效果", play: "啟用動態效果", reduced: "依照裝置設定減少動態效果" },
    ticker: ["遊戲", "音樂", "故事", "社群"],
    about: { eyebrow: "歡迎來到 LA ESCUELA VT", title: ["不同的虛擬形象。", "相同的連結。"], paragraphs: ["我們是一群在 La Escuela 相聚的 VTuber 創作者。在這裡，讓想法成真，並與你分享。", "每個聲音都有個性，每段故事都有自己的世界。我們一起，讓螢幕成為更多美好連結的起點。"], note: "在虛擬世界相遇，在共同的時光裡連結。" },
    universe: { title: ["總有一些事物", "將我們連結。"], introduction: "選擇你的教室，讓好奇心帶領接下來的旅程。", tabs: "探索我們的世界", room: "教室" },
    worlds: [
      { label: "遊戲", title: "最棒的一局，是一起玩的那一局。", description: "等待探索的世界、難以突破的挑戰，還有永遠不會是最後一次的「再來一局」。在這裡，冒險一起經歷。", tags: ["全新冒險", "一起遊玩", "挑戰"], quote: "再來一局？", sticker: "一起遊玩" },
      { label: "音樂", title: "有些故事，只能用歌聲傳達。", description: "一個聲音、一首歌，以及無數種感受。音樂也有專屬教室，讓我們表達自己、分享心中的感動。", tags: ["虛擬歌聲", "翻唱", "創意"], quote: "把音量調大吧。", sticker: "感受音樂" },
      { label: "聊天", title: "美好的連結，從一句你好開始。", description: "不急不忙的對話、意想不到的故事，以及突然出現的笑聲。有時候，直播最棒的部分，就是單純陪在一起。", tags: ["對話", "歡笑", "美好時光"], quote: "再待一會兒吧。", sticker: "好好陪伴" },
    ],
    people: { eyebrow: "LA ESCUELA 的夥伴", title: ["老師與", "榮譽學生。"], intro: "為 La Escuela 帶來聲音的人，以及每天支持它成長的人。", tabs: "認識 La Escuela 的夥伴", teachers: "老師", honor: "榮譽學生", teacherLabel: "團體的創作者", honorLabel: "留下深刻印記的支持", teacherTitle: "每位老師，都有自己的世界。", honorTitle: "La Escuela 的榮譽席位。", teacherDescription: "老師是我們 VTuber 團體的成員，以聲音與虛擬形象，為 La Escuela 注入生命。", honorDescription: "榮譽學生是最用心支持 La Escuela 的人。這個空間感謝他們的溫暖、陪伴，以及為社群帶來的一切。", soon: "個人檔案與介紹即將公開。" },
    community: { badge: "為分享而生", title: ["最棒的地方", "就是", "與你們一起。"], description: ["每個虛擬形象背後，都有一個人。", "每場直播的另一端，都有一個社群。"], values: [{ title: "做自己。", description: "你獨特的樣子，在這裡也有位置。" }, { title: "照顧彼此。", description: "尊重讓每個人都能自在享受。" }, { title: "分享此刻。", description: "一起經歷，讓小事也變得特別。" }], ending: "我們在螢幕的另一端見。" },
    footer: "即使在另一個世界，也一起。",
  },
  th: {
    meta: { title: "โลกที่เราแบ่งปันกัน", description: "รู้จัก La Escuela VT กลุ่มครีเอเตอร์ VTuber ที่มีทั้งดนตรี เกม และชุมชนที่จินตนาการไม่ต้องมีตารางเวลา" },
    nav: { group: "เกี่ยวกับกลุ่ม", universe: "โลกของเรา", people: "อาจารย์และนักเรียนกิตติมศักดิ์", community: "ชุมชน" },
    ui: { skip: "ข้ามไปยังเนื้อหา", mainNav: "เมนูหลัก", mobileNav: "เมนูบนมือถือ", footerNav: "เมนูท้ายหน้า", openMenu: "เปิดเมนู", closeMenu: "ปิดเมนู", language: "ภาษา", dark: "เปิดโหมดมืด", light: "เปิดโหมดสว่าง", brand: "กลุ่มครีเอเตอร์เสมือน", home: "La Escuela VT หน้าหลัก", back: "กลับไปด้านบน" },
    hero: { eyebrow: "หนึ่งกลุ่ม โลกที่ไม่สิ้นสุด", lines: ["จินตนาการ", "ไม่มี", "ตารางเวลา"], description: ["VTuber ดนตรี และการผจญภัยไปด้วยกัน", "เข้ามาได้เลย ที่นี่มีที่สำหรับคุณ"], cta: "รู้จัก La Escuela", stamp: ["เต็มไปด้วย", "ชีวิต", "เสมือน"], caption: "สถานที่โปรดแห่งใหม่ของคุณ", scroll: "สำรวจต่อ", pointer: "ลองขยับเคอร์เซอร์ อีกโลกหนึ่งรออยู่", still: "ชมวิวในจังหวะที่คุณสบายใจ", pause: "หยุดการเคลื่อนไหว", play: "เปิดการเคลื่อนไหว", reduced: "ลดการเคลื่อนไหวตามการตั้งค่าของอุปกรณ์" },
    ticker: ["เกม", "ดนตรี", "เรื่องราว", "ชุมชน"],
    about: { eyebrow: "ยินดีต้อนรับสู่ LA ESCUELA VT", title: ["อวตารที่แตกต่าง", "สายสัมพันธ์เดียวกัน"], paragraphs: ["เราเป็นกลุ่มครีเอเตอร์ VTuber ที่มาพบกันใน La Escuela สถานที่สำหรับทำให้ไอเดียมีชีวิตและแบ่งปันกับคุณ", "ทุกเสียงมีเอกลักษณ์ ทุกเรื่องราวมีโลกของตัวเอง และเมื่ออยู่ด้วยกัน เราทำให้หน้าจอเป็นได้มากกว่านั้น"], note: "โลกเสมือนพาเรามาพบกัน สิ่งที่แบ่งปันทำให้เราผูกพันกัน" },
    universe: { title: ["มีบางอย่างเสมอ", "ที่เชื่อมเราเข้าด้วยกัน"], introduction: "เลือกห้องเรียนของคุณ แล้วให้ความอยากรู้นำทางต่อไป", tabs: "สำรวจโลกของเรา", room: "ห้องเรียน" },
    worlds: [
      { label: "เกม", title: "เกมที่ดีที่สุดคือเกมที่เล่นด้วยกัน", description: "โลกให้ค้นพบ ความท้าทายที่ยังเอาชนะไม่ได้ และคำว่า 'อีกตา' ที่ไม่เคยเป็นตาสุดท้าย ที่นี่เราออกผจญภัยไปด้วยกัน", tags: ["การผจญภัยใหม่", "เล่นด้วยกัน", "ความท้าทาย"], quote: "เล่นอีกตาไหม?", sticker: "เล่นด้วยกัน" },
      { label: "ดนตรี", title: "บางเรื่องราวถ่ายทอดได้ด้วยเพลงเท่านั้น", description: "หนึ่งเสียง หนึ่งเพลง และความรู้สึกได้อีกนับพันแบบ ดนตรีก็มีห้องเรียนของตัวเอง พื้นที่ให้แสดงตัวตนและแบ่งปันสิ่งที่ทำให้ใจสั่นไหว", tags: ["เสียงเสมือน", "เพลงคัฟเวอร์", "ความคิดสร้างสรรค์"], quote: "เพิ่มเสียงอีกนิด", sticker: "สัมผัสดนตรี" },
      { label: "พูดคุย", title: "สายสัมพันธ์ดี ๆ เริ่มจากคำทักทาย", description: "บทสนทนาไม่เร่งรีบ เรื่องราวที่คาดไม่ถึง และเสียงหัวเราะที่มาโดยไม่รู้ตัว บางครั้งสิ่งที่ดีที่สุดในไลฟ์คือแค่ได้อยู่ด้วยกัน", tags: ["บทสนทนา", "เสียงหัวเราะ", "ช่วงเวลาดี ๆ"], quote: "อยู่ด้วยกันอีกหน่อยนะ", sticker: "เพื่อนที่อบอุ่น" },
    ],
    people: { eyebrow: "ผู้คนของ LA ESCUELA", title: ["อาจารย์และ", "นักเรียนกิตติมศักดิ์"], intro: "คนที่มอบเสียงให้ La Escuela และคนที่ช่วยให้เราเติบโตในทุกวัน", tabs: "รู้จักผู้คนของ La Escuela", teachers: "อาจารย์", honor: "นักเรียนกิตติมศักดิ์", teacherLabel: "ครีเอเตอร์ของกลุ่ม", honorLabel: "การสนับสนุนที่มีความหมาย", teacherTitle: "อาจารย์แต่ละคนมีโลกของตัวเอง", honorTitle: "ที่นั่งแห่งเกียรติใน La Escuela", teacherDescription: "อาจารย์คือสมาชิกของกลุ่ม VTuber ของเรา เสียงและอวตารที่ทำให้ La Escuela มีชีวิต", honorDescription: "นักเรียนกิตติมศักดิ์คือผู้ที่สนับสนุน La Escuela มากที่สุด พื้นที่นี้ขอบคุณความอบอุ่น การอยู่เคียงข้าง และทุกสิ่งที่พวกเขามอบให้ชุมชนของเรา", soon: "โปรไฟล์และการแนะนำตัวจะเปิดให้ชมเร็ว ๆ นี้" },
    community: { badge: "สร้างมาเพื่อแบ่งปัน", title: ["สถานที่ที่ดีที่สุด", "คือ", "อยู่กับพวกคุณ"], description: ["เบื้องหลังทุกอวตาร มีคนคนหนึ่ง", "อีกฝั่งของทุกไลฟ์ มีชุมชนอยู่เสมอ"], values: [{ title: "เป็นตัวคุณเอง", description: "ตัวตนในแบบของคุณก็มีที่อยู่ที่นี่" }, { title: "ใส่ใจกันและกัน", description: "ความเคารพทำให้ทุกคนมีความสุขไปด้วยกัน" }, { title: "แบ่งปันช่วงเวลา", description: "สิ่งเล็ก ๆ กลายเป็นเรื่องพิเศษเมื่อได้อยู่ด้วยกัน" }], ending: "แล้วพบกันอีกฝั่งของหน้าจอ" },
    footer: "อยู่ด้วยกัน แม้ในอีกโลกหนึ่ง",
  },
};
