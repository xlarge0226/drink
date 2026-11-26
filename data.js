window.DUI_DATA = {
  steps: {
    step_road: {
      key: 'roadType',
      title: '第 1 步：發生地點是否為「道路」？',
      desc: '依道交條例第 3 條第 1 款，供公眾通行之地方。',
      options: [
        { value: 'road', title: '是，屬於「道路」', sub: '一般道路、巷弄、公有開放處所', next: 'step_discovery' },
        { value: 'non_road', title: '否，屬於「非道路」', sub: '私人封閉場域，僅評估刑法 185-3', next: 'RESULT' }
      ]
    },
    step_discovery: {
      key: 'discovery',
      title: '第 2 步：如何發現？',
      desc: '請選擇查獲來源',
      options: [
        { value: 'checkpoint', title: '路檢攔查 / 巡邏盤查', sub: '攔停或路檢實施酒測', next: 'RESULT' },
        { value: 'accident', title: '交通事故', sub: '車禍現場酒測', next: 'RESULT' },
        { value: 'report', title: '民眾報案 / 監視器追查', sub: '接獲通報到場處理', next: 'RESULT' }
      ]
    }
  },
  evaluateCase(ans) {
    return {
      criminalTitle: ans.roadType === 'non_road' ? '視酒測值／不能安全駕駛評估 185-3' : '吐氣 ≥ 0.25 須依刑法第 185-3 條移送',
      criminalDesc: '請依現場實際酒精濃度數值與駕車情狀判定。',
      criminalClass: 'verdict-warning',
      adminTitle: ans.roadType === 'non_road' ? '非道路不開道交罰單' : '依道交條例第 35 條或第 73 條舉發',
      adminDesc: '確認車種、累犯紀錄、拒測或同車乘客連坐條件。',
      adminClass: 'verdict-warning',
      actions: ['確認 15 分鐘觀測與酒測程序', '依規定移置保管車輛、扣牌 2 年與代保管證件'],
      recommendedTicketId: 'dui_general'
    };
  },
  tickets: [
    {
      id: 'dui_general',
      title: '一般酒後駕車例稿',
      article: '道交條例第 35 條第 1 項第 1 款',
      fine: '機車 1.5萬～9萬 / 汽車 3萬～12萬',
      template: '駕駛【車種】，經警於【時間】在【地點】實施呼氣酒精濃度測試，測得每公升【0.XX】毫克。',
      note: '達 0.25 mg/L 以上併案刑事移送。'
    }
  ],
  checklists: [
    {
      category: '基本檢核',
      items: [{ title: '飲酒結束／漱口已滿 15 分鐘', sub: '確認觀測時間與酒測器合格證書效期' }]
    }
  ],
  laws: [
    {
      title: '道路交通管理處罰條例 第 35 條',
      tags: '35條 酒駕 拒測 扣牌',
      content: '汽機車駕駛人酒後駕車、拒測、累犯、同車乘客連坐及吊扣牌照 2 年等規定。'
    }
  ]
};

