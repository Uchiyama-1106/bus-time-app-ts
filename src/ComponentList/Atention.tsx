const Atention = () => {
  return (
    <div>
      <div className="text-base font-semibold text-red-500">注意事項</div>
      <div className="text-sm">
        <p>
          このバス時刻検索アプリは
          <a
            className="text-blue-600 underline decoration-solid"
            href="https://creativecommons.org/licenses/by/4.0/deed.ja"
          >
            クリエイティブ・コモンズ表示4.0国際ライセンス
          </a>
          に従っています。
        </p>
        <p>
          またこのアプリでは、関越交通株式会社が作成した
          <a
            className="text-blue-600 underline decoration-solid"
            href="https://kan-etsu.net/publics/index/193/"
            target="_blank"
            rel="noopener noreferrer"
          >
            GTFS-JP(kan-etsu)(2025-04-17・2242KB) のGTFSデータ
          </a>
          から、前橋渋川線に関する情報を抽出して利用しています。
        </p>
      </div>
    </div>
  );
};

export default Atention;
