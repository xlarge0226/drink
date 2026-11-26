window.DUI_DATA = {
  steps: {
    step_bac: {
      key: 'bac',
      title: '第 1 步：酒測值或拒測',
      desc: '飲酒或漱口後須滿 15 分鐘再測；拒測須先告知後果並全程錄影。',
      options: [
        { value: 'under_015', title: '0 - 0.14 mg/L', sub: '未達酒駕超標門檻', next: 'step_road' },
        { value: '015_024', title: '0.15 - 0.24 mg/L', sub: '有肇事＝公共危險＋逮捕告知三項權利；無肇事＝行政罰', next: 'step_accident' },
        { value: 'over_025', title: '0.25 mg/L 以上', sub: '公共危險罪（須逮捕並告知三項權利）', next: 'step_road' },
        { value: 'refuse', title: '拒絕酒測', sub: '先告知拒測後果並全程錄影', next: 'step_road' }
      ]
    },
    step_accident: {
      key: 'accident',
      title: '0.15 - 0.24 mg/L：有無肇事？',
      desc: '有肇事走公共危險罪；無肇事走行政罰。',
      options: [
        { value: 'yes', title: '有肇事', sub: '公共危險罪＋逮捕告知三項權利', next: 'step_road' },
        { value: 'no', title: '無肇事', sub: '行政罰', next: 'step_road' }
      ]
    },
    step_road: {
      key: 'roadType',
      title: '道路或非道路？',
      desc: '非道路不開道交罰單。',
      options: [
        { value: 'road', title: '道路', sub: '適用道交條例與刑法第 185-3 條', next: 'step_discovery' },
        { value: 'non_road', title: '非道路', sub: '不開道交罰單', next: 'step_discovery' }
      ]
    },
    step_discovery: {
      key: 'discovery',
      title: '如何抓到駕駛人？',
      desc: '有事故時事故卷宗與公共危險卷宗都要。',
      options: [
        { value: 'checkpoint', title: '路檢 / 盤查', sub: '攔查查獲', next: 'step_passengers' },
        { value: 'accident_scene', title: '交通事故', sub: '事故卷宗＋公共危險卷宗都要', next: 'step_passengers' },
        { value: 'report_cctv', title: '報案 / 監視器', sub: '追查查獲', next: 'step_passengers' }
      ]
    },
    step_passengers: {
      key: 'passengers',
      title: '車上有沒有人？',
      desc: '駕駛人 ≥ 0.25 且乘客年滿 18 歲評估連坐罰。',
      options: [
        { value: 'yes', title: '車上有人', sub: '確認是否年滿 18 歲', next: 'RESULT' },
        { value: 'no', title: '車上沒人', sub: '單獨駕駛', next: 'RESULT' }
      ]
    }
  },
  evaluateCase: function(ans) {
    var hasAccident = ans.accident === 'yes' || ans.discovery === 'accident_scene';
    var isRefuse = ans.bac === 'refuse';
    var isCriminal = ans.bac === 'over_025' || (ans.bac === '015_024' && hasAccident);
    var actions = [
      '應到案處所寫「駕籍地」，應到案時間「30 日」。',
      ans.roadType === 'road' && ans.bac !== 'under_015' ? '當場移置保管車輛。' : '依現場情形評估車輛處置。'
    ];
    if (hasAccident) actions.push('有肇事：事故卷宗＋公共危險卷宗都要。');
    if (isRefuse) actions.push('須先告知拒測法律後果並全程錄影。');
    return {
      criminalTitle: isCriminal ? '公共危險罪（須逮捕告知三項權利）' : (isRefuse ? '拒絕酒測（告知後果＋錄影）' : '非公共危險罪／另依規定辦理'),
      criminalDesc: '請依現場事證與卷宗檢核辦理。',
      criminalClass: isCriminal || isRefuse ? 'verdict-danger' : 'verdict-success',
      adminTitle: ans.roadType === 'non_road' || ans.bac === 'under_015' ? '共開 0 張道交罰單' : (ans.passengers === 'yes' && ans.bac === 'over_025' ? '共開至少 2 張（駕駛人＋同車乘客）' : '共開 1 張（駕駛人）'),
      adminDesc: '應到案處所：駕籍地；應到案時間：30 日。',
      adminClass: 'verdict-warning',
      actions: actions,
      recommendedTicketId: 't1'
    };
  },
  tickets: [
    { id: 't1', title: '酒駕／拒測紅單例稿', article: '道交條例第 35 條', fine: '依規定', template: '已移置保管車輛。應到案處所：駕籍地；應到案時間：30日內。', note: '駕籍地、30日、移置保管。' }
  ],
    notes: [
    {
      id: 'note_second_10q',
      title: '第二次詢問筆錄（10 題問答）',
      sub: '不含提審法、三項權利告知、法律扶助',
      template: '第 1 題：你今天／昨天幾點開始喝酒？喝到幾點結束？喝了什麼酒、喝了多少？\n答：【回答】。\n\n第 2 題：你是在哪裡喝酒的？是自己喝還是跟誰一起喝？同桌的人知不知道你等一下要開車／騎車？\n答：【回答】。\n\n第 3 題：你喝完酒之後，經過多久才開車／騎車上路？中間有沒有再喝酒或使用漱口水、含片？\n答：【回答】。\n\n第 4 題：你從哪裡出發？打算開／騎去哪裡？行經路線是不是一般道路？\n答：【回答】。\n\n第 5 題：你當時開／騎的是什麼車、車號多少？這台車是你的還是跟別人借的？車主知不知道你喝酒開車？\n答：【回答】。\n\n第 6 題：車上有沒有其他人？如果有，是誰、幾歲、跟你是什麼關係？他知不知道你喝酒？\n答：【回答】。\n\n第 7 題：警方幾點在什麼地方攔查或處理你？你當時行車狀況有沒有蛇行、超速或違規？\n答：【回答】。\n\n第 8 題：你有沒有發生交通事故？如果有的話，是怎麼撞上的？有沒有人受傷或財物受損？\n答：【回答】。\n\n第 9 題：警方對你做酒測前，有沒有讓你休息或漱口滿 15 分鐘？酒測過程有沒有全程錄影？測出來的數值是每公升【0.XX】毫克，你有沒有意見？\n答：【回答】。\n\n第 10 題：你以前有沒有酒駕或拒測被取締過？現在身體狀況好不好？還有沒有其他要補充說明的？\n答：【回答】。\n\n【筆錄確認】\n問：以上筆錄經交閱或朗讀，記載是否與你所說相符？\n答：【相符】。',
      note: '共 10 題問答，不含提審法、三項權利告知與法律扶助。'
    }
  ],

  checklists: [
    {
      category: '卷宗檢核（逐條勾選）',
      items: [
        { title: '酒測單', sub: '已附' },
        { title: '紅單影本', sub: '已附' },
        { title: '陳報單', sub: '已附' },
        { title: '平衡測試', sub: '已附' },
        { title: '筆錄', sub: '已附' },
        { title: '逮捕通知書', sub: '已附' },
        { title: '親友通知書', sub: '已附' },
        { title: '國民影像', sub: '已附' },
        { title: '戶役政', sub: '已附' },
        { title: '前科素行', sub: '已附' },
        { title: '移置保管車輛單據', sub: '已附' },
        { title: '交通事故圖（有事故時）', sub: '事故卷宗＋公共危險卷宗都要' }
      ]
    }
  ],
  laws: [
    { title: '道交條例第 35 條與刑法第 185-3 條', tags: '35 185-3 拒測 移置保管', content: '依現行規定辦理。' }
  ]
};
