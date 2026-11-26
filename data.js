window.DUI_DATA = {
  steps: {
    step_road: {
      key: 'roadType',
      title: '第 1 步：駕駛行為發生地點是否為「道路」？',
      desc: '測試連線用精簡版，確認畫面正常後再擴充完整分支。',
      options: [
        { value: 'road', title: '是，屬於「道路」範圍', sub: '一般道路、供公眾通行處所', next: 'step_discovery' },
        { value: 'non_road', title: '否，屬於「非道路」範圍', sub: '私人封閉場域', next: 'RESULT' }
      ]
    },
    step_discovery: {
      key: 'discovery',
      title: '第 2 步：如何發現？',
      desc: '請選擇查獲方式',
      options: [
        { value: 'checkpoint', title: '路檢攔查／巡邏盤查', sub: '攔停或路檢點實施酒測', next: 'RESULT' },
        { value: 'accident', title: '交通事故', sub: '車禍現場酒測', next: 'RESULT' }
      ]
    }
  },
  evaluateCase(ans) {
    return {
      criminalTitle: ans.roadType === 'non_road' ? '視情節評估刑法第 185-3 條' : '依酒測值判定是否移送 185-3',
      criminalDesc: '精簡測試判定結果。',
      criminalClass: 'verdict-warning',
      adminTitle: ans.roadType === 'non_road' ? '非道路不開道交罰單' : '依道交條例第 35 條或第 73 條舉發',
      adminDesc: '請依實際車種與酒測數值製單。',
      adminClass: 'verdict-warning',
      actions: ['確認 15 分鐘觀測與酒測程序', '依規定移置保管車輛與代保管證件'],
      recommendedTicketId: 'dui_general'
    };
  },
  tickets: [
    {
      id: 'dui_general',
      title: '一般酒後駕車範例',
      article: '道交條例第 35 條第 1 項第 1 款',
      fine: '機車 1.5萬～9萬 / 汽車 3萬～12萬',
      template: '駕駛【車種】，於【時間】在【地點】經警實施呼氣酒精濃度測試，測得每公升【0.XX】毫克。',
      note: '測試用精簡例稿'
    }
  ],
  checklists: [
    {
      category: '基本檢核',
      items: [{ title: '漱口／飲酒結束滿 15 分鐘', sub: '確認觀測時間' }]
    }
  ],
  laws: [
    {
      title: '道交條例第 35 條',
      tags: '35條 酒駕',
      content: '汽機車駕駛人酒後駕車處罰規定。'
    }
  ]
};
