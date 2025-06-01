// content_amazon.js (ページタイプ別処理の完全なコード案 - セレクタ調整必須)

function getPageType() {
    const url = window.location.href;
    if (url.includes('/wishlist/') || url.includes('/hz/wishlist/')) {
        return 'wishlist';
    } else if (url.includes('/s?') || url.includes('/s/ref=') || url.includes('/s?k=')) {
        return 'search_results';
    } else if (url.includes('/dp/') || url.includes('/gp/product/')) {
        return 'product_detail';
    } else if (url.includes('/s')) {
        return 'search_results';
    }
    return 'unknown';
}

function extractBookTitleFromProductPage() {
    const titleSelectors = [
        '#productTitle', // 通常の書籍タイトル
        '#ebooksProductTitle', // Kindle版のタイトル
        'h1#title', // 一般的なh1タイトル
        '.parseasinTitle #btAsinTitle', // 古い形式の可能性
        'span[data-hook="product-title"]' // Reactなどで生成される可能性
    ];
    for (const selector of titleSelectors) {
        const titleElement = document.querySelector(selector);
        if (titleElement) return titleElement.textContent.trim();
    }
    return null;
}

function getAttachElementAndTitleForSearchItem(searchItemElement) {
    // 検索結果の各アイテムからタイトルとボタンをアタッチする基準要素を取得
    const titleSelectors = [
        'h2 a span.a-text-normal', // 一般的な検索結果タイトル
        '.s-title-instructions-style span.a-text-normal',
        '.a-size-medium.a-color-base.a-text-normal',
        '.a-size-base-plus.a-color-base.a-text-normal', // 検索バーでの検索結果用
        '.a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal' // 新しい検索結果形式
    ];
    let title = null;
    for (const selector of titleSelectors) {
        const titleElement = searchItemElement.querySelector(selector);
        if (titleElement) {
            title = titleElement.textContent.trim();
            break;
        }
    }
    // ボタンをアタッチする場所の候補
    const attachPointSelectors = [
        '.a-section.a-spacing-small.a-spacing-top-small',
        '.a-row.a-spacing-micro',
        '.s-price-instructions-style',
        '.sg-col-inner',
        '.a-section.a-spacing-none.a-spacing-top-small', // 検索バーでの検索結果用
        '.a-row.a-spacing-base' // 新しい検索結果形式
    ];
    let attachElement = null;
    for (const selector of attachPointSelectors) {
        attachElement = searchItemElement.querySelector(selector);
        if (attachElement) break;
    }
    return { title, attachElement: attachElement || searchItemElement };
}

function getAttachElementAndTitleForWishlistItem(itemElement) {
    // ほしい物リストの各アイテムからタイトルとボタンをアタッチする基準要素を取得
    const titleSelectors = [
        'a[id^="itemName_"]',
        'a[id*="itemName"]',
        'h2 a',
        '.a-link-normal[title]',
        '.a-text-normal', // 表紙のみ表示の場合
        '.a-size-base-plus' // 表紙のみ表示の場合の別パターン
    ];
    let title = null;
    for (const selector of titleSelectors) {
        const titleElement = itemElement.querySelector(selector);
        if (titleElement) {
            title = titleElement.textContent.trim() || titleElement.getAttribute('title')?.trim();
            if (title) break;
        }
    }
    // 画像のalt属性やaria-labelからタイトルを取得（表紙のみ表示対応）
    if (!title) {
        const img = itemElement.querySelector('img');
        if (img) {
            title = img.getAttribute('alt') || img.getAttribute('aria-label');
        }
    }
    // ボタンをアタッチする場所の候補
    const attachPointSelectors = [
        '.a-section.a-spacing-small.a-spacing-top-small',
        '.a-row.a-spacing-micro',
        '.item-action-buttons',
        '.a-fixed-left-grid-col.a-col-right',
        '.a-row.a-spacing-small.item-title',
        '.a-row.item-main-price-info-spacing-top',
        '.g-item-sortable', // 表紙のみ表示の場合
        '.a-box-inner' // 表紙のみ表示の場合の別パターン
    ];
    let attachElement = null;
    for (const selector of attachPointSelectors) {
        attachElement = itemElement.querySelector(selector);
        if (attachElement) break;
    }
    // 表紙のみ表示の場合は画像の親要素にボタンを付ける
    if (!attachElement) {
        const img = itemElement.querySelector('img');
        if (img && img.parentElement) {
            attachElement = img.parentElement;
        }
    }
    return { title, attachElement: attachElement || itemElement };
}

function addSearchButtons(bookTitle, attachToElement, pageType) {
    if (!bookTitle || !attachToElement || attachToElement.classList.contains('multi-search-buttons-added')) {
        return;
    }

    const allButtonsContainer = document.createElement('div');
    allButtonsContainer.className = 'multi-search-buttons-container'; // CSSでのスタイリング用
    allButtonsContainer.style.marginTop = (pageType === 'product_detail') ? '15px' : '8px';
    allButtonsContainer.style.display = 'flex';
    allButtonsContainer.style.flexWrap = 'wrap';
    allButtonsContainer.style.gap = '6px';
    allButtonsContainer.style.paddingTop = '5px'; // 上部に少し余白

    // --- Kindle版検索ボタン ---
    // 商品詳細ページの場合、現在のページが紙書籍かKindle版かで挙動を変える（今回はシンプルに常に表示）
    const kindleSearchButton = document.createElement('button');
    kindleSearchButton.textContent = 'Kindle';
    kindleSearchButton.title = 'Amazon Kindle版を検索';
    kindleSearchButton.style.padding = '3px 8px';
    kindleSearchButton.style.fontSize = '0.8em';
    kindleSearchButton.style.cursor = 'pointer';
    kindleSearchButton.style.border = '1px solid #adb5bd';
    kindleSearchButton.style.backgroundColor = '#e9ecef';
    kindleSearchButton.style.color = '#212529';
    kindleSearchButton.style.borderRadius = '3px';
    kindleSearchButton.onmouseover = () => kindleSearchButton.style.backgroundColor = '#ced4da';
    kindleSearchButton.onmouseout = () => kindleSearchButton.style.backgroundColor = '#e9ecef';
    kindleSearchButton.onclick = function(e) {
        e.stopPropagation(); // 親要素へのイベント伝播を停止
        const searchTerm = encodeURIComponent(bookTitle);
        const kindleSearchUrl = `https://www.amazon.co.jp/s?k=${searchTerm}&i=digital-text`;
        window.open(kindleSearchUrl, '_blank');
    };
    allButtonsContainer.appendChild(kindleSearchButton);

    // --- 他サイト/サービス検索リンクの作成 ---
    const createExternalSearchLink = (displayName, baseUrl, queryParamOrPath, note = '') => {
        const link = document.createElement('a');
        link.textContent = displayName;
        if (note) link.title = note;

        const encodedBookTitle = encodeURIComponent(bookTitle);
        let finalSearchUrl = '';

        if (typeof queryParamOrPath === 'string' && queryParamOrPath.includes('【検索語句】')) {
            finalSearchUrl = baseUrl + queryParamOrPath.replace('【検索語句】', encodedBookTitle);
        } else if (typeof queryParamOrPath === 'string') {
             try {
                const url = new URL(baseUrl);
                url.searchParams.set(queryParamOrPath, bookTitle);
                finalSearchUrl = url.toString();
            } catch (e) {
                console.warn(`Failed to construct URL for ${displayName} with base ${baseUrl} and param ${queryParamOrPath}. Falling back.`);
                finalSearchUrl = `${baseUrl}?${queryParamOrPath}=${encodedBookTitle}`; // シンプルなフォールバック
            }
        } else {
            console.warn(`Invalid queryParamOrPath for ${displayName}:`, queryParamOrPath);
            return null; // 無効な場合はリンクを作成しない
        }


        link.href = finalSearchUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.style.display = 'inline-block';
        link.style.padding = '3px 8px';
        link.style.fontSize = '0.8em';
        link.style.border = '1px solid #adb5bd';
        link.style.backgroundColor = '#f8f9fa';
        link.style.borderRadius = '3px';
        link.style.textDecoration = 'none';
        link.style.color = '#007bff';
        link.onmouseover = () => link.style.backgroundColor = '#e2e6ea';
        link.onmouseout = () => link.style.backgroundColor = '#f8f9fa';
        link.onclick = (e) => e.stopPropagation(); // 親要素へのイベント伝播を停止

        return link;
    };

    const searchServices = [
        { name: '紀伊國屋', baseUrl: 'https://www.kinokuniya.co.jp/disp/CSfDispListPage_001.jsp', queryParam: 'q', note: '紀伊國屋書店で検索 / Search at Kinokuniya' },
        { name: 'honto', baseUrl: 'https://honto.jp/netstore/search.html', queryParam: 'k', note: 'hontoで検索 (電子/紙) / Search at honto (e-book/paper)' },
        { name: 'TSUTAYA', baseUrl: 'https://store-tsutaya.tsite.jp/search/result/', queryParam: 'keyword', note: 'TSUTAYAオンラインで検索 / Search at TSUTAYA Online' },
        { name: 'ヨドバシ', baseUrl: 'https://www.yodobashi.com/', queryParam: 'word', note: 'ヨドバシ.comで検索 / Search at Yodobashi.com' },
        { name: 'ブックオフ', baseUrl: 'https://shopping.bookoff.co.jp/search/keyword/', queryParamOrPath: '【検索語句】', note: 'ブックオフオンラインで検索 / Search at Bookoff Online'},
        { name: 'バリューブックス', baseUrl: 'https://www.valuebooks.jp/search', queryParam: 'keyword', note: 'バリューブックスで検索 / Search at Value Books'},
        { name: '図書館', baseUrl: 'https://calil.jp/search', queryParam: 'q', note: 'カーリルで図書館を横断検索 / Search across libraries with Calil'},
        { name: 'メルカリ', baseUrl: 'https://jp.mercari.com/search', queryParam: 'keyword', note: 'メルカリで中古本を検索 / Search used books on Mercari'},
        { name: '近くの書店', baseUrl: 'https://www.google.com/maps/search/', queryParamOrPath: '【検索語句】+書店', note: 'Googleマップで近くの書店を検索 / Search nearby bookstores on Google Maps'},
        { name: '近くのブックオフ', baseUrl: 'https://www.google.com/maps/search/', queryParamOrPath: '【検索語句】+ブックオフ', note: 'Googleマップで近くのブックオフを検索 / Search nearby Bookoff stores on Google Maps'}
    ];

    searchServices.forEach(service => {
        const searchLink = createExternalSearchLink(service.name, service.baseUrl, service.queryParamOrPath || service.queryParam, service.note);
        if (searchLink) allButtonsContainer.appendChild(searchLink);
    });

    // ボタンコンテナの挿入場所
    let insertionTarget = null;
    if (pageType === 'product_detail') {
        const detailTargets = [ // 優先順位が高い順
            attachToElement.querySelector('#buybox'), // カートボタンのコンテナの上
            attachToElement.querySelector('#centerCol'), // メインカラム
            attachToElement.querySelector('#dp-container') // 全体コンテナ
        ];
        for (const target of detailTargets) {
            if (target) {
                insertionTarget = target;
                break;
            }
        }
        if (insertionTarget && insertionTarget.id === 'buybox') {
            insertionTarget.parentNode.insertBefore(allButtonsContainer, insertionTarget);
        } else if (insertionTarget) {
            insertionTarget.appendChild(allButtonsContainer); // メインカラムやdp-containerの末尾
        } else {
            attachToElement.appendChild(allButtonsContainer); // フォールバック
        }
    } else if (pageType === 'search_results' || pageType === 'wishlist') {
        // 検索結果やほしい物リストのアイテム内
        const itemTargets = [ // 優先順位が高い順
            attachToElement.querySelector('.a-spacing-top-small.a-spacing-base, .a-row.a-spacing-small.item-title, .a-row.item-main-price-info-spacing-top'), // 価格やタイトルの近く
            attachToElement.querySelector('.item-action-buttons'), // 既存のアクションボタンエリア
            attachToElement.querySelector('.a-fixed-left-grid-col.a-col-right') // 右側カラム
        ];
        for (const target of itemTargets) {
            if (target) {
                insertionTarget = target;
                break;
            }
        }
        if (insertionTarget) {
            // 要素の種類や既存のコンテンツによって挿入方法を調整
            if (insertionTarget.classList.contains('item-action-buttons') || insertionTarget.children.length > 0) {
                 insertionTarget.appendChild(allButtonsContainer); // 既存要素があればその最後
            } else {
                 insertionPoint.parentNode.insertBefore(allButtonsContainer, insertionPoint.nextSibling);
            }
        } else {
            attachToElement.appendChild(allButtonsContainer); // フォールバック
        }
    } else {
        attachToElement.appendChild(allButtonsContainer); // 不明なページタイプの場合
    }
    attachToElement.classList.add('multi-search-buttons-added');
}

// --- メイン処理の実行と監視 ---
let mainProcessingDebounceTimer;

function runMainProcessing() {
    const page = getPageType();
    // console.log("Current Page Type:", page);

    if (page === 'wishlist') {
        const itemSelectorsWishlist = [
            'div[data-item-index]',
            'li[data-itemid]',
            '.g-item-sortable',
            '[id^="item_"]',
            '.a-box-inner', // 表紙のみ表示の場合
            '.a-carousel-card' // 表紙のみ表示の場合の別パターン
        ];
        let wishlistItems = [];
        for (const selector of itemSelectorsWishlist) {
            wishlistItems = document.querySelectorAll(selector);
            if (wishlistItems.length > 0) break;
        }
        wishlistItems.forEach(itemElement => {
            if (itemElement.classList.contains('multi-search-buttons-added')) return;
            const { title, attachElement } = getAttachElementAndTitleForWishlistItem(itemElement);
            if (title && attachElement) {
                addSearchButtons(title, attachElement, 'wishlist');
            }
        });
    } else if (page === 'search_results') {
        // 検索結果アイテムのセレクタを拡充
        const searchItemSelectors = [
            '.s-result-item[data-component-type="s-search-result"]',
            'div[data-asin][data-index]',
            '.s-result-item', // より一般的なセレクタ
            '.sg-col-4-of-24', // 検索バーでの検索結果用
            '.s-include-content-margin' // 新しい検索結果形式
        ];
        let searchResultItems = [];
        for (const selector of searchItemSelectors) {
            searchResultItems = document.querySelectorAll(selector);
            if (searchResultItems.length > 0) break;
        }
        searchResultItems.forEach(itemElement => {
            if (itemElement.classList.contains('multi-search-buttons-added')) return;
            const { title, attachElement } = getAttachElementAndTitleForSearchItem(itemElement);
            if (title && attachElement) addSearchButtons(title, attachElement, 'search_results');
        });
    } else if (page === 'product_detail') {
        const productPageContainer = document.querySelector('#dp, #dp-container'); // 商品ページ全体のコンテナ
        if (productPageContainer && !productPageContainer.classList.contains('multi-search-buttons-added')) {
            const bookTitle = extractBookTitleFromProductPage();
            if (bookTitle) {
                addSearchButtons(bookTitle, productPageContainer, 'product_detail');
            }
        }
    }
}

function debouncedMainProcessing() {
    clearTimeout(mainProcessingDebounceTimer);
    mainProcessingDebounceTimer = setTimeout(runMainProcessing, 750); // 750msのデバウンス
}

// 初期実行
if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(runMainProcessing, 2500); // ページ描画完了後、少し長めに待つ
} else {
    document.addEventListener("DOMContentLoaded", () => setTimeout(runMainProcessing, 2500));
}

// DOM変更監視
const observer = new MutationObserver((mutationsList) => {
    // 変更があったらデバウンス付きで再処理
    // console.log("DOM mutated, queueing main processing.");
    debouncedMainProcessing();
});

// 監視開始 (body全体を監視するのは負荷が高いので、主要なコンテンツエリアを特定できればそちらが良い)
// Amazonは動的にコンテンツを書き換えるため、監視範囲とタイミングが難しい
const mainContentArea = document.querySelector('#centerCol, #contentGrid_ストリーム') || document.body;
observer.observe(mainContentArea, {
    childList: true,
    subtree: true
});

// ページ遷移を検知する別の方法 (SPA的な挙動に対応するため)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    // console.log("URL changed, queueing main processing for new URL:", url);
    debouncedMainProcessing();
  }
}).observe(document, {subtree: true, childList: true});

console.log("Amazon Multi-Search Helper content script loaded and observer set up.");