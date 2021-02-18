// 网页阅读实验
// By Lu Li from BNUPSY
// 2021.01-2021.02

//设置网页背景、字体等
var set_html_style = {
  type: "call-function",
  func: function(){
    document.body.style.backgroundColor = "#F5F5F5"; //
    document.body.style.color = "black"; // font color
    document.body.style.fontSize = "24px";  // 1px = 0.75pt; px = pt * DPI / 72
    document.body.style.fontFamily = "等线";
    document.body.style.fontWeight = "bold";  // or "normal"
    document.body.style.cursor = 'default' // 'default', 'none', 'wait', ...
    document.body.onselectstart = function() { return false } // 禁止选中文字 <body oncontextmenu="return false">
    document.body.oncontextmenu = function() { return false } // 禁用鼠标右键 <body onselectstart="return false">
    document.onkeydown = function() {
        // 屏蔽键盘按键 (https://www.bejson.com/othertools/keycodes/)
        if ((event.keyCode in { 27: 'Esc', 116: 'F5', 123: 'F12' }) ||
            (event.ctrlKey && event.keyCode in { 85: 'U' })
        ) { return false }
    }
  },
};

//设置阅读测验网页背景、字体等
var set_test_style = {
  type: "call-function",
  func: function(){
    document.body.style.backgroundColor = "#F5F5F5"; //
    document.body.style.color = "black"; // font color
    document.body.style.fontSize = "20px";  // 1px = 0.75pt; px = pt * DPI / 72
    document.body.style.fontFamily = "等线";
    document.body.style.fontWeight = "bold";  // or "normal"
  },
};


// generate a random subject ID with 8 characters
var subject_id = jsPsych.randomization.randomID(8);

// pick a random condition for the subject at the start of the experiment
/* conditionA:延迟生成关键词-先填问卷
   conditionB:延迟生成关键词-先完成阅读任务
   conditionC:不生成关键词-先填问卷
   conditionD:不生成关键词-先完成阅读任务 */
var condition_assignment = jsPsych.randomization.sampleWithoutReplacement(['conditionA', 'conditionB', 'conditionC', 'conditionD'], 1)[0];
var arr = [0,1,2,3,4];
var subject_arr = randSort1(arr);

// 问卷随机填写一个版本
var Q_v1 = '<a target="_blank" href="https://www.baidu.com">问卷链接</a>';
var Q_v2 = '<a target="_blank" href="https://www.baidu.com">问卷链接</a>';
var Final_Q = [];
var randomNum = parseInt(Math.random()*2+1); // 生成1和2中的随机数

if (randomNum == 1) {
      Final_Q = Q_v1
    } else {
      Final_Q = Q_v2
  }

// record the condition assignment in the jsPsych data
// this adds a property called 'subject' and a property called 'condition' to every trial
jsPsych.data.addProperties({
  subject_id: subject_id,
  condition: condition_assignment,
  subject_arr: subject_arr,
  Questionnaire_version:Final_Q,
});



// 使用instructions呈现指导语（可以连续呈现多屏）
// 欢迎页、知情同意书
var welcome = {
  type: "instructions",
  pages: [
    "<p style='font: bold 42px 黑体; color: #474554'>\
    网页阅读实验平台</p>\
    <p style='font: 24px 华文中宋; color: grey'>\
    北京师范大学心理学部<br/>2021年</p>",

    "<h1 style='font: bold 24px 黑体'>指导语</h1>\
    <p style='font: bold  20px 等线; text-align: center; line-height:25px'>\
    亲爱的同学，您好！欢迎参加本实验。<br/>\
    本实验需要您通过浏览<b style='color: red'>电脑网页</b>完成一项阅读任务。<br/>\
    请点击【继续】，阅读本实验的知情同意书。<br/><br/><br/><br/><br/><br/></p>",

    `<h1 style='font: bold 24px 黑体'>行为实验被试知情同意书</h1>
    <h2 style='font: bold 18px 黑体; text-align: left'>研究目的</h2>
    <p style='font: normal  18px 等线; text-align: left; line-height:22px'>
    您今天参加的实验是<b>北京师范大学心理学部本科生毕业设计</b>研究的一部分。<br/>
    该研究主要探讨与人类阅读理解有关的心理活动。<br/></p>
    <h2 style='font: bold 18px 黑体; text-align: left'>研究程序</h2>
    <p style='font: normal  18px 等线; text-align: left'>
    整个实验过程中，您只需要按照要求完成线上阅读和测验任务，并填写相关的问卷。</p>
    <h2 style='font: bold 18px 黑体; text-align: left'>风险/不适</h2>
    <p style='font: normal  18px 等线; text-align: left; line-height:22px'>
    在实验过程中，我们将要求您通过<b>电脑浏览器</b>阅读若干篇<b>说明文</b>，并完成相应的<b>阅读理解测验</b>。<br/>
    这一任务将持续较长时间，并且需要您进行较高的认知努力，可能会造成一定的疲劳。<br/>
    如果您有任何不适，请告诉我们，我们可以做相应的调整，而且我们会留有一定的时间间隔供您放松休息。<br/>
    在实验中您需要集中注意观看屏幕，严格执行实验要求，以保证实验结果的可靠性。<br/>
    </p>`,

    `<h1 style='font: bold 24px 黑体'>行为实验被试知情同意书</h1>
    <h2 style='font: bold 18px 黑体; text-align: left'>参与的自愿性与机密性</h2>
    <p style='font: normal  18px 等线; text-align: left; line-height:22px'>
    参与本实验是<b>完全自愿</b>的，您可以在任何时候按自己的意愿退出实验。<br/>
    实验所得到的科学资料，可能会出版在科学界的文章里，
    但这些文章不会含有您的姓名或任何有关您身份的信息。<br/>
    所有记录的机密性，将依法达到最高程度。
    为了保护您的隐私，所有资料都以编号而非姓名形式来存档。<br/></p>
    <h2 style='font: bold 18px 黑体; text-align: left'>费用/报酬</h2>
    <p style='font: bold  18px 等线; text-align: left'>
    参与本实验的报酬为15元人民币和一份详细的个性化反馈。</p>
    <h2 style='font: bold 18px 黑体; text-align: left'>信息询问</h2>
    <p style='font: normal  18px 等线; text-align: left; line-height:22px'>
    如果您对本研究有任何疑问，欢迎联系本研究主试（手机号：15180298339；邮箱：lulihello@qq.com）。<br/>
    <b><span style='color:red'>请您保留这份信息文件（单击<a target=_blank href='知情同意书.pdf'><b/>此处</b></a>下载pdf格式文件）。</span></b></p>
    <h2 style='font: bold 18px 黑体; text-align: left'>同意参与本实验的声明</h2>
    <p style='font: normal  18px 等线; text-align: left; line-height:22px'>
    点击【继续】，表示您已阅读知情同意书上的内容，决定参与本实验。<br/>
    </p>`,

    `<h1 style='font: bold 24px 黑体'>实验开始前的温馨提示</h1>
    <p style='font: bold  20px 等线; text-align: left; line-height:25px'>
    请注意，当前页面，即<span style='color:red'>名称为“网页阅读实验”的标签页</span>，<br/>是您进行实验的页面。
    <br/><br/>请勿在实验过程中关闭此页面！`,

    `<h1 style='font: bold 24px 黑体'>指导语</h1>
    <p style='font: bold  20px 等线; text-align: left; line-height:25px'>
    在实验正式开始之前，为确保最佳效果，请您：<br/>
    （1）在电脑上进行实验，并使用主流浏览器打开本网页<br/>
    &emsp;&emsp;（Chrome、Edge、Firefox、Safari等，不要用IE）<br/>
    （2）关掉电脑上其他正在运行的程序或将其最小化<br/>
    （3）将手机调至静音，并尽可能减少环境噪音干扰<br/>
    （4）保持舒适的坐姿和合适的距离面对屏幕<br/>
    （5）检查电脑网络连接，确保网络状况良好<br/>
    （6）务必认真作答<br/><br/>
    如果您同意参与，并且清楚理解了上述要求，<br/>
    请点击【继续】，按照提示完成实验。</p>`,

  ],

  show_clickable_nav: true,
  allow_backward: true,
  button_label_previous: "返回",
  button_label_next: "继续",
};

// 问卷部分指导语
var questionnaire = {
  type: "instructions",
  pages: [
    `<h1 style='font: bold 24px 黑体'>问卷填写</h1>
    <p style='font: bold  20px 等线; text-align: left; line-height:26px'>
    您参加本实验的专属ID是：<span style='color: red'>${subject_id}</span><br/>
    请您记住这一ID，在填写问卷时输入。<br/>
    <span style='color: blue'>建议您将它记在笔记本上以防遗忘~</span><br/><br/>
    <span style='color: red'>现在请点击<${Final_Q}>填写一份问卷。<br/><br/>
    请确保在填写完毕后，再关闭问卷页面，回到本页面。</span><br/><br/><br/><br/>
    <br/></p>`,
  ],

  show_clickable_nav: true,
  allow_backward: true,
  button_label_previous: "返回",
  button_label_next: "我已完成问卷的填写",
};

// 阅读任务指导语
var readingTaskInstr = {
  type: "instructions",
  pages: [
    `<h1 style='font: bold 24px 黑体'>阅读任务</h1>
    <p style='font: bold  18px 等线; text-align: left; line-height:25px'>下面将进行阅读任务。<br/>
    这一任务包括【阅读——评估——测验——选择文章重读——再次测验】五个部分。</p>
    <p style='font: bold  18px 等线; text-align: left; line-height:25px'>
    具体来说，在这一任务中，您将会阅读到<b style='color:red'>5篇呈现在不同网站上的简短的说明文</b>。<br/>
    <b>说明文的内容和论述风格与我们平时在科学论文中读到的内容类似。</b><br/><br/>
    依次阅读完所有的文章后，您需要<b style='color:red'>评估自己对每一篇文章的理解程度。</b><br/>
    评估结束后，您将完成每一篇文章的<b style='color:red'>阅读理解测验</b>。测验题包括细节题和推理题。<br/>
    <b style='color:red'>在完成测验过程中，请关闭所有文章的页面。</b><br/><br/>
    第一次测验结束后，您将得到自己在整个测验中的正确率的反馈。<br/>
    为了提高第二次测验的正确率，您有一次选择文章进行重新阅读的机会。<br/><br/>
    请放心，在每个阶段开始之前都有相应的指导语，请您根据指导语完成这一任务。<br/></p>`,
  ],

  show_clickable_nav: true,
  allow_backward: true,
  button_label_previous: "返回",
  button_label_next: "继续",
};

// 延迟生成关键词组的指导语
var keywordsInstr = {
  type: "instructions",
  pages: [
    `<h1 style='font: bold 24px 黑体'>阅读</h1>
    <p style='font: bold  20px 等线; text-align: left; line-height:25px'>
    接下来您将阅读到5篇科学论文风格的说明文。<br/><br/>
    为了更好地理解文章内容，把握文章核心主旨、观点，<br/>
    <span style='color:red'>【为每一篇文章总结出能够体现文章要义的若干个关键词】<br/></span>是一种较为有效的方法。<br/>
    e.g.《泰坦尼克号》的关键词为：冰山、船遇难、悲剧……<br/><br/>
    我们将在练习阶段给出这一方法的一个具体示例。<br/>
    请您在此次阅读任务中使用这种方法。<br/><br/>
    下面请继续按照提示完成实验。<br/><br/></p>`,
  ],

  show_clickable_nav: true,
  allow_backward: true,
  button_label_previous: "返回",
  button_label_next: "继续",
};

// 练习指导语
var PracticeInstr = {
  type: "instructions",
  pages: [
    `<h1 style='font: bold 24px 黑体'>练习</h1>
    <p style='font: bold  20px 等线; text-align: left; line-height:26px'>
    在正式开始阅读任务之前，<br/>
    为了让您熟悉实验流程，请先完成一篇示例文章的练习。<br/>
    点击【继续】开始练习。<br/><br/><br/><br/><br/><br/></p>`,

    `<h1 style='font: bold 24px 黑体'>练习</h1>
    <p style='font: bold  20px 等线; text-align: left; line-height:30px'>
    <span style='color:blue'>现在请先点击下方链接，进入一个新页面，<br/>
    <a style='font: bold  20px 等线' target=_blank href=https://www.jianshu.com/p/0ac04a95376b>《人类的进化停止了》</a><br/>
    阅读一篇标题为“人类的进化停止了”的示例文章。<br/>
    <br/>请您在【阅读完毕】后，关闭这篇文章的页面，</span><br/>回到当前页面后再点击【继续】。<br/>
    <br/><span style='color:red; text-align: left'>注意：请务必在点击上方链接并阅读完这篇文章之后，<br/>再点击下方的【继续】！！</span>
    <br/><br/><br/><br/><br/></p>`,

  ],

  show_clickable_nav: true,
  allow_backward: true,
  button_label_previous: "返回",
  button_label_next: "继续",
};
// 关键词示例（延迟生成关键词组）
var keywordsExample = {
  type: "instructions",
  pages: [
    `<h1 style='font: bold 24px 黑体'>关键词示例</h1>
    <p style='font: bold  20px 等线; text-align: left; line-height:28px'>
    根据《人类的进化停止了》一文的内容，<br/>
    为了便于理解作者表达的含义，总结出以下<span style='color:red'>5个关键词</span>：
    <li style='font: bold  20px 等线; text-align: center; line-height:28px'>男女比</li>
    <li style='font: bold  20px 等线; text-align: center; line-height:28px'>男性过剩</li>
    <li style='font: bold  20px 等线; text-align: center; line-height:28px'>少生孩子</li>
    <li style='font: bold  20px 等线; text-align: center; line-height:28px'>进化结束</li>
    <li style='font: bold  20px 等线; text-align: center; line-height:28px'>长相不变</li>
    <p style='font: bold  20px 等线; text-align: left; line-height:28px'>
    请您结合刚才的阅读，体会在阅读文章后“总结关键词”的方法，<br/>
    并在接下来的正式任务中使用这一方法，以促进对文章的理解。</p>
    </p>`,

  ],

  show_clickable_nav: true,
  allow_backward: true,
  button_label_previous: "返回",
  button_label_next: "继续",
};

var Prac_metacomprehension = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: `
        <p style="font-size: 14pt; font-weight: bold">
        现在请您评估自己对该文章的理解程度<br/>
        点击相应的数字等级即可<br/>
        1 = 完全不理解，2 = 不理解<br/>
        3 = 比较不理解，4 = 不确定<br/>
        5 = 比较理解，
        6 = 理解，
        7 = 完全理解<br/></p>`,
        choices: ['1', '2', '3', '4', '5', '6', '7'],
        on_finish: function(data) { addRespFromButtonScale(data, 'Prac_metacomprehension') },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i:1, article: '《人类的进化停止了》' }, s: '《人类的进化停止了》'},
    ],
    randomize_order: false
}
var Prac_test_Instr = {
  type: "instructions",
  pages: [
    `<h1 style='font: bold 24px 黑体'>练习</h1>
    <p style='font: bold  20px 等线; text-align: left; line-height:28px'>
    接下来请您完成刚才这篇文章的阅读理解测验。<br/>
    注意：在完成测验过程中，请确保相应文章的页面已经关闭。<br/>
    所有测试题均为单项选择题。<br/><br/><br/><br/><br/><br/></p>`,

  ],

  show_clickable_nav: true,
  allow_backward: true,
  button_label_previous: "返回",
  button_label_next: "开始测验",
}

/* practice reading test */
var evolution_items = [
  { data: { question: 'evolution1', correct_answer: "C", test: 'practice'},
    preamble: '【《人类的进化停止了》 第1题】<br/>文章一开头指出，作为一名男性是一件非常危险的事情。这里指的危险来源于：',
    html: `
      <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
      <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
      <option>A.配偶的缺乏</option>
      <option>B.激烈的竞争</option>
      <option>C.较低的存活率</option>
      <option>D.存在缺陷的基因</option>
      </select></p>`,
  },
  { data: { question: 'evolution2', correct_answer: "C", test: 'practice'},
    preamble: '【《人类的进化停止了》第2题】<br/>根据文章第一段我们可以推断出：',
    html: `
      <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
      <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
      <option>A.不良的生活作息是男性死亡率偏高的原因</option>
      <option>B.在过去，大部分到了婚匹年龄的男性寻找不到伴侣</option>
      <option>C.过去女性出生时的体重是符合生存标准的，而男性则不然</option>
      <option>D.与女性相比，男性更不关心自己的生命</option>
      </select></p>`,
  },
  { data: { question: 'evolution3', correct_answer: "A", test: 'practice'},
    preamble: '【《人类的进化停止了》第3题】<br/>文章通过举出印度的例子说明了什么？',
    html: `
      <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
      <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
      <option>A.富裕家庭的孩子一般比贫穷家庭的孩子少</option>
      <option>B.自然选择在富人和穷人中几乎起不了作用</option>
      <option>C.中产阶级人口数量比部落人口少80%</option>
      <option>D.印度是出生率很高的国家之一</option>
      </select></p>`,
  },
  { data: { question: 'evolution4', correct_answer: "A", test: 'practice'},
    preamble: '【《人类的进化停止了》第4题】<br/>作者提出，我们的身体已经停止进化了，这是因为：',
    html: `
      <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
      <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
      <option>A.技术的进步改善了人的生活</option>
      <option>B.女婴的数量一直在减少</option>
      <option>C.人类这一物种已经达到了进化的最高阶段</option>
      <option>D.贫富之间的差距正在消失</option>
      </select></p>`,
  },
  { data: { question: 'evolution5', correct_answer: "B", test: 'practice'},
    preamble: `【《人类的进化停止了》第5题】<br/>文章的最后出现，“生物学上的乌托邦已经降临”
    <br/>和“我们的子孙后代可能会惊讶于我们距离乌托邦如此遥远”两句话，这说明了：`,
    html: `
      <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
      <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
      <option>A.达尔文预测到我们的子孙后代对进化论一无所知</option>
      <option>B.尽管我们的生活从没停止变化，但我们的身体早已停止改变</option>
      <option>C.我们的身体随着社会环境的改变而发生变化</option>
      <option>D.未来的人类对于他们优越的生活环境沾沾自喜</option>
      </select></p>`,
  },
];
var practice_test_items = {
    timeline_variables: evolution_items,
    timeline:[
      { type: 'survey-html-form',
        data: jsPsych.timelineVariable('data'),
        preamble: jsPsych.timelineVariable('preamble'),
        html: jsPsych.timelineVariable('html'),
        button_label: '下一题',
        on_finish:
          function(data) { addRespFromSurvey(data);
            if(data.response == data.correct_answer){
              data.correct_p = true; // can add property correct by modify data object directly
            } else {
              data.correct_p = false;}
          },
      }
    ],
    randomize_order: false,
  };

var Prac_end_Instr = {
  type: "instructions",
  pages: [
    `<h1 style='font: bold 24px 黑体'>练习</h1>
    <p style='font: bold  20px 等线; text-align: center; line-height:28px'>
    练习结束！<br/>
    如果您已经了解了阅读任务的流程，<br/>
    请点击下方按钮正式开始阅读任务。</p>`,
  ],

  show_clickable_nav: true,
  allow_backward: true,
  button_label_previous: "返回",
  button_label_next: "正式开始阅读任务",
}

/* 正式阅读任务开始 */
// 阅读指导语
var read_Instr = {
  type: "instructions",
  pages: [
    `<h1 style='font: bold 24px 黑体'>阅读任务</h1>
    <p style='font: bold  20px 等线; text-align: left; line-height:28px'>
    在接下来的5个页面中，<br/>
    您将在每个页面看到一篇文章的标题。<br/>
    <span style='color:red'>请点击该标题进入相应页面完成阅读。<br/>
    阅读完毕后关闭该页面，回到实验页面。</span><br/>
    如果已准备好，请点击继续。</p>`,
  ],

  show_clickable_nav: true,
  allow_backward: true,
  button_label_previous: "返回",
  button_label_next: "继续",
}


// Stimuli

// 《动物园》网页链接
var zoo_link_zhihu = '<a target=_blank href="https:/zhuanlan.zhihu.com/p/342343116">《动物园》</a>',
zoo_link_js = '<a target=_blank href="https://page.om.qq.com/page/O0loOb9FFoqdSq_PFUZRuXOw0">《动物园》</a>',
zoo_link_db = '<a target=_blank href="https://www.douban.com/note/790655431/">《动物园》</a>',
zoo_link_bili = '<a target=_blank href="https://www.bilibili.com/read/cv9159133">《动物园》</a>',
zoo_link_toutiao = '<a target=_blank href="https://www.toutiao.com/i6914601525617164804/">《动物园》</a>';

// 《电视新闻》网页链接
var news_link_zhihu = '<a target=_blank href="https://zhuanlan.zhihu.com/p/342354069">《电视新闻》</a>',
news_link_js = '<a target=_blank href="https://page.om.qq.com/page/Oca9xsC3SdDxCJ2DatIti3bg0">《电视新闻》</a>',
news_link_db = '<a target=_blank href="https://www.douban.com/note/790655504/">《电视新闻》</a>',
news_link_bili = '<a target=_blank href="https://www.bilibili.com/read/cv9159160">《电视新闻》</a>',
news_link_toutiao = '<a target=_blank href="https://www.toutiao.com/i6914602700927894023/">《电视新闻》</a>';

// 《植物》网页链接
var plants_link_zhihu = '<a target=_blank href="https://zhuanlan.zhihu.com/p/342358567">《植物》</a>',
plants_link_js = '<a target=_blank href="https://page.om.qq.com/page/ODOmIQk3whymrShisJ5cG6Kw0">《植物》</a>',
plants_link_db = '<a target=_blank href="https://www.douban.com/note/790655852/">《植物》</a>',
plants_link_bili = '<a target=_blank href="https://www.bilibili.com/read/cv9159180">《植物》</a>',
plants_link_toutiao = '<a target=_blank href="https://www.toutiao.com/i6914603678645273096/">《植物》</a>';

// 《职业妇女》网页链接
var wm_link_zhihu = '<a target=_blank href="https://zhuanlan.zhihu.com/p/342359448">《职业妇女》</a>',
wm_link_js = '<a target=_blank href="https://page.om.qq.com/page/OiedFj7lRTYQgSvJzlDn7wkQ0">《职业妇女》</a>',
wm_link_db = '<a target=_blank href="https://www.douban.com/note/790656015/">《职业妇女》</a>',
wm_link_bili = '<a target=_blank href="https://www.bilibili.com/read/cv9159201">《职业妇女》</a>',
wm_link_toutiao = '<a target=_blank href="https://www.toutiao.com/i6914603665563173389/">《职业妇女》</a>';

// 《赝品》网页链接
var cf_link_zhihu = '<a target=_blank href="https://zhuanlan.zhihu.com/p/342361231">《赝品》</a>',
cf_link_js = '<a target=_blank href="https://page.om.qq.com/page/OTZMIYp3LkFJdvtXaKGZUd6Q0">《赝品》</a>',
cf_link_db = '<a target=_blank href="https://www.douban.com/note/790656150/">《赝品》</a>',
cf_link_bili = '<a target=_blank href="https://www.bilibili.com/read/cv9159223">《赝品》</a>',
cf_link_toutiao = '<a target=_blank href="https://www.toutiao.com/i6914602760113537539/">《赝品》</a>';

var articleArray = ['zoo', 'news','plants','wm','cf'];
var linkArray = ['zhihu', 'js', 'db', 'bili', 'toutiao'];
var final_link = [ 1, 2, 3, 4, 5 ];
var reread_string = [ 1, 2, 3, 4, 5];

for(var i = 0; i < 5; i++) {
  a = eval("articleArray[subject_arr[i]]");
  b = eval("linkArray[i]");
  c = a + "_link_" + b;
  final_link[i] = eval(c);
  reread_string[i] = c;
}

// 重读文章的链接需要与第一次阅读的相匹配
var zoo_rereadlink = [], news_rereadlink = [], plants_rereadlink = [], wm_rereadlink = [], cf_rereadlink = [];
for (var i = 0; i < reread_string.length; i++) {
  switch (reread_string[i]) {
      case "zoo_link_zhihu":
      case "zoo_link_js":
      case "zoo_link_db":
      case "zoo_link_bili":
      case "zoo_link_toutiao":
           zoo_rereadlink = eval(reread_string[i]);
           break;
      case "news_link_zhihu":
      case "news_link_js":
      case "news_link_db":
      case "news_link_bili":
      case "news_link_toutiao":
           news_rereadlink = eval(reread_string[i]);
           break;
      case "plants_link_zhihu":
      case "plants_link_js":
      case "plants_link_db":
      case "plants_link_bili":
      case "plants_link_toutiao":
           plants_rereadlink = eval(reread_string[i]);
           break;
      case "wm_link_zhihu":
      case "wm_link_js":
      case "wm_link_db":
      case "wm_link_bili":
      case "wm_link_toutiao":
           wm_rereadlink = eval(reread_string[i]);
           break;
      case "cf_link_zhihu":
      case "cf_link_js":
      case "cf_link_db":
      case "cf_link_bili":
      case "cf_link_toutiao":
           cf_rereadlink = eval(reread_string[i]);
        }
}


var final_links = [
  {s: `请点击阅读文章1：${final_link[0]}<br/><br/>`},
  {s: `请点击阅读文章2：${final_link[1]}<br/><br/>`},
  {s: `请点击阅读文章3：${final_link[2]}<br/><br/>`},
  {s: `请点击阅读文章4：${final_link[3]}<br/><br/>`},
  {s: `请点击阅读文章5：${final_link[4]}<br/><br/>`},
]

var readingList = {
    timeline_variables: final_links,
    timeline:[{
      type:'html-button-response',
      stimulus: jsPsych.timelineVariable('s'),
      choices:  ["我已完成阅读且关闭了该页面，进入下一页"],
      },
    ],
};

var finish_reading_Instr = {
  type: "instructions",
  pages: [
    `<h1 style='font: bold 24px 黑体'>阅读任务</h1>
    <p style='font: bold  20px 等线; text-align: left; line-height:28px'>
    您已完成5篇文章的阅读！<br/></p>`,
  ],
  show_clickable_nav: true,
  allow_backward: true,
  button_label_previous: "返回",
  button_label_next: "继续",
}

var input_keywords_Instr = {
  type: "instructions",
  pages: [
    `<h1 style='font: bold 24px 黑体'>总结关键词</h1>
    <p style='font: bold  20px 等线; text-align: left; line-height:28px'>
    根据练习阶段的示例，现在请您对刚才阅读到的每篇文章<br/>
    分别总结出能够概括文章主旨和核心观点的5个关键词。<br/></p>`,
  ],
  show_clickable_nav: true,
  allow_backward: true,
  button_label_previous: "返回",
  button_label_next: "进入总结页面",
}


// 阅读理解测试题顺序需要与文章呈现顺序对应
var final_test = [ 1, 2, 3, 4, 5 ];
for(var i = 0; i < 5; i++) {
  a = eval("articleArray[subject_arr[i]]");
  final_test[i] = a;
}


/* reading questions */
var zoo_items = [
  { data: { question: 'zoo1', correct_answer: "D", type:"inference"},
    preamble: '【《动物园》 第1题】<br/>这篇文章的主要意图是：',
    html: `
      <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
      <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
      <option>A.强调美国动物园条件的改善</option>
      <option>B.说明动物园动物的行为特征</option>
      <option>C.促进科学家对动物行为做更多的研究</option>
      <option>D.引起对野生动物在动物园中的监禁生活的关注</option>
      </select></p>`, },
  { data: { question: 'zoo2', correct_answer: "A", type:"detail"},
    preamble: '【《动物园》 第2题】<br/>文中提到动物园是如何想办法减轻动物的压力的？',
    html: `
      <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
      <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
      <option>A.他们在动物园的设计上花了心思</option>
      <option>B.他们给动物提供了广阔的草原</option>
      <option>C.他们保持充分的动物数量以便它们形成社会结构</option>
      <option>D.他们提供饲养和照料</option>
      </select></p>`,},

  { data: { question: 'zoo3', correct_answer: "C", type:"inference"},
    preamble: '【《动物园》 第3题】<br/>这篇文章的一个主要含义是',
    html: `
      <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
      <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
      <option>A.圈养动物的生存环境与野生动物的生存环境一样</option>
      <option>B.动物灭绝主要归因于人类的活动</option>
      <option>C.当前保护动物的方法也许是有缺陷的</option>
      <option>D.媒体已经引起了公众对物种灭绝的关注</option>
      </select></p>`,},

  { data: { question: 'zoo4', correct_answer: "A", type:"inference"},
    preamble: '【《动物园》 第4题】<br/>下面哪种说法与文章对圈养动物的看法最不一致？',
    html: `
      <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
      <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
      <option>A.当动物园设在荒野旁边时圈养动物就有很高生存率</option>
      <option>B.如果一种濒危动物的自然生存环境受到保护，这个物种将重返这个环境</option>
      <option>C.有许多物种处于濒危状态</option>
      <option>D.圈养动物增强了人们的动物权利意识</option>
      </select></p>`,},

{ data: { question: 'zoo5', correct_answer: "A", type:"detail"},
  preamble: '【《动物园》 第5题】<br/>下面哪个关于野生动物的问题在文中没有做出回答？',
  html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.为什么有些动物习惯于在高山的或旷野上的活动？</option>
    <option>B.什么原因把一种动物推向灭绝的边缘？</option>
    <option>C.近亲交配给濒危动物带来什么影响？</option>
    <option>D.哪些信号表明动物园的动物有压力？</option>
    </select></p>`,},

{ data: { question: 'zoo6', correct_answer: "A", type:"inference"},
  preamble: '【《动物园》 第6题】<br/>从文中可以看出作者认为野生动物：',
  html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.应该在它们的自然生存环境恶化的时候才对它们进行转移</option>
    <option>B.长期受生存环境恶化的影响</option>
    <option>C.是关于野生生物生存环境保护的政治斗争中的一颗棋子</option>
    <option>D.对圈养环境的设计不能提供充分的依据</option>
    </select></p>`,},

{ data: { question: 'zoo7', correct_answer: "A", type:"detail"},
  preamble: '【《动物园》 第7题】<br/>作者认为下面哪个原因导致了动物的灭绝？',
  html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=5 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.生存环境的广泛破坏</option>
    <option>B.在动物园内的物种繁殖</option>
    <option>C.动物数量下降到一定数目以下</option>
    <option>D.缺乏使用导致的智慧和技能的衰退</option>
    <option>E.由于人类过度猎捕引起的灭绝</option>
    </select></p>`,},

{ data: { question: 'zoo8', correct_answer: "C", type:"detail"},
  preamble: '【《动物园》 第8题】<br/>下列哪一信号表明了一些动物有压力？',
  html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=5 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.懒惰和没有耐心</option>
    <option>B.智慧和技能的衰退</option>
    <option>C.反复走动</option>
    <option>D.动物数量下降到一定数目之下</option>
    <option>E.对人类饲养和照料的依赖</option>
    </select></p>`,},


];

var news_items = [
  { data: { question: 'news1', correct_answer: "A", type:"detail"},
    preamble: '【《电视新闻》 第1题】<br/>短文描述在二十世纪六十年代，当晚间新闻报道关于非暴力反抗运动的新闻时：',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.它使公民权利成为全国关注的话题</option>
    <option>B.它鼓舞了塞尔玛和蒙哥马利地区的反抗运动</option>
    <option>C.它煽动了一系列孤立的当地事件</option>
    <option>D.观众形成了对政治领袖的看法</option>
    </select></p>`, },
  { data: { question: 'news2', correct_answer: "B", type:"inference"},
    preamble: '【《电视新闻》 第2题】<br/>这篇短文主要讲了：',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.电视新闻有意歪曲信息</option>
    <option>B.电视通过对新闻的报道影响了观众</option>
    <option>C.由于媒体的约束使得事实让成果遭到破坏</option>
    <option>D.电视新闻的观众不能区分事实和谎言</option>
    </select></p>`, },

{ data: { question: 'news3', correct_answer: "C", type: "inference"},
  preamble: '【《电视新闻》 第3题】<br/>可以从这篇短文推断出在下述哪种情况下电视新闻能更好地告知公众意见？',
  html: `
  <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
  <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
  <option>A.只要是有相反意见、不是一面之辞的新闻报道</option>
  <option>B.禁止使用个人摄像的电视新闻</option>
  <option>C.发明了能检测出影像被纂改的技术</option>
  <option>D.高度机密信息不再出现在电视新闻上</option>
  </select></p>`, },

{ data: { question: 'news4', correct_answer: "D", type: "inference"},
  preamble: '【《电视新闻》 第4题】<br/>如果是事实，那么下面所述的哪一项最能增强观众对电视和美国公民权利运动的信心？',
  html: `
  <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
  <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
  <option>A.在二十世纪六十年代，许多与反对者有关的影片报道都要经过电视行政部门的审核</option>
  <option>B.在二十世纪六十年代，最近的调査对电视新闻关于非暴力反抗的报道的真实性提出质疑</option>
  <option>C.在二十世纪六十年代，一位公民权利主要领袖的传记详细地描述了曾在电视新闻上报道过的这位领袖的特殊事件。</option>
  <option>D.二十世纪六十年代的一项民意调査表明，那些把公民权利看成是国家头等大事的美国人都曾经看过非暴力反抗的电视新闻</option>
  </select></p>`, },

  { data: { question: 'news5', correct_answer: "A", type: "detail"},
    preamble: '【《电视新闻》 第5题】<br/>作者明确表示电视新闻的可信度也许要打个折扣，原因是',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.受计算机的影响</option>
    <option>B.个人摄像机的影像</option>
    <option>C.专业新闻机构的照片</option>
    <option>D.在各角落传播的报道</option>
    </select></p>`, },

{ data: { question: 'news6', correct_answer: "D", type: "detail"},
  preamble: '【《电视新闻》 第6题】<br/>根据短文，电视新闻对公民权利运动的报道没有包含下面哪一项？',
  html: `
  <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
  <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
  <option>A.告知反抗者他们不是孤军作战</option>
  <option>B.传播真实的信息</option>
  <option>C.描述了反抗运动的声势</option>
  <option>D.传达了政治领袖的意见</option>
  </select></p>`, },

{ data: { question: 'news7', correct_answer: "D", type: "inference"},
  preamble: '【《电视新闻》 第7题】<br/>作者提出了电视新闻能有效影响公众意见的一个主要原因。根据这个原因，下面那一项对公众意见的影响最有效？',
  html: `
  <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
  <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
  <option>A.日报</option>
  <option>B.广播电台</option>
  <option>C.课堂教学</option>
  <option>D.目击事件的第一手新闻</option>
  </select></p>`, },

  { data: { question: 'news8', correct_answer: "A", type: "detail"},
    preamble: '【《电视新闻》 第8题】<br/>本文提到的 Jack Nachbar是一位：',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.大众文化教授</option>
    <option>B.政府代言人</option>
    <option>C.专业新闻机构的记者</option>
    <option>D.公民权利活动家</option>
    </select></p>`, },

];

var plants_items = [
  { data: { question: 'plants1', correct_answer: "C", type: "inference"},
    preamble: '【《植物》 第1题】<br/>如果您在北极冰原上种植长灌木，下面哪种方法能最好地保护植物的生长？',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.覆盖底部枝叶以保持根部温度</option>
    <option>B.让底部枝叶周围的空气流动起来</option>
    <option>C.保护灌木的上半部分免受寒风的侵害</option>
    <option>D.修剪内部枝条以减少蒸发</option>
    </select></p>`, },
  { data: { question: 'plants2', correct_answer: "D", type: "detail"},
    preamble: '【《植物》 第2题】<br/>作者提出沙漠植物是棒状形态的原因是',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.植物不能把它的热量散发到周围的空气中</option>
    <option>B.大量植物表面必须暴露在阳光下</option>
    <option>C.缺乏能吹动又长又细的植物的风</option>
    <option>D.长在极热并缺水的地方</option>
    </select></p>`, },

  { data: { question: 'plants3', correct_answer: "C", type: "detail"},
    preamble: '【《植物》 第3题】<br/>沙漠植物通过以下哪种途径散热？',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.脱水</option>
    <option>B.蒸腾</option>
    <option>C.把热量辐射到大气中</option>
    <option>D.把尽可能小的表面暴露在太阳下</option>
    </select></p>`, },

  { data: { question: 'plants4', correct_answer: "A", type: "inference"},
    preamble: '【《植物》 第4题】<br/>下面哪种情况不符合文章关于植物形状和环境的观点？',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.寒冷的阿拉斯加北部的枫树长得很茂盛</option>
    <option>B.阔叶植物在河口沼泽地长得很茂盛</option>
    <option>C.开花灌木在非洲雨林长得很茂盛</option>
    <option>D.蒙大纳州的多风平原上长草茂盛</option>
    </select></p>`, },

  { data: { question: 'plants5', correct_answer: "A", type: "inference"},
    preamble: '【《植物》 第5题】<br/>如果您在居住的地方种植了一种叶子又宽又长的开花植物，并且它长得很茂盛。那么您所居住的地方属于下面描述的哪种气候？',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.热，少风，多雨</option>
    <option>B.冷，多风，多雨</option>
    <option>C.热，多风，干燥</option>
    <option>D.热，少风，干燥</option>
    </select></p>`, },

  { data: { question: 'plants6', correct_answer: "D", type: "inference"},
    preamble: '【《植物》 第6题】<br/>这篇短文主要描述了植物的哪个特征？',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.它们几乎能适应所有环境</option>
    <option>B.它们可以为干燥季节贮存水分</option>
    <option>C.它们有各种不同的形状和大小</option>
    <option>D.它们能够调节热量的输出</option>
    </select></p>`, },

  { data: { question: 'plants7', correct_answer: "C", type: "detail"},
    preamble: '【《植物》 第7题】<br/>根据短文，下面哪种情况最有可能阻碍北极植物的长高？',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.坚硬且结冻的地面</option>
    <option>B.较少的光照</option>
    <option>C.冷且带有毁灭性的风</option>
    <option>D.每年大量的降雪</option>
    </select></p>`, },

  { data: { question: 'plants8', correct_answer: "C", type: "detail"},
    preamble: '【《植物》 第8题】<br/>短文提到了一个把植物形状与一些因素联系的工作机制，那么下面哪个因素除外：',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.温度</option>
    <option>B.水分的可利用率</option>
    <option>C.风</option>
    <option>D.有无季节性差异</option>
    </select></p>`, },

];

var wm_items = [
  { data: { question: 'wm1', correct_answer: "A", type: "inference"},
    preamble: '【《职业妇女》 第1题】<br/>下面哪种说法最能够表明文章所描述的职业妇女的现状：',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.“妇女发挥的作用比我们想的要大。丈夫会从妻子新从事的活动中得到新的利益和供养来源。”</option>
    <option>B.“这个状况不能改变；反对妇女还不如团结她。”</option>
    <option>C.“妇女已经开始外出工作，她们致使一部分养家糊口的人失业。”</option>
    <option>D.“妇女在工厂里辛劳工作必定像离开了水的鱼儿一样的痛苦。”</option>
    </select></p>`, },
  { data: { question: 'wm2', correct_answer: "C", type: "detail"},
    preamble: '【《职业妇女》 第2题】<br/>下面哪个问题在文中没有提到？',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.为什么在19世纪普遍认为妇女的本职工作是照顾家庭？</option>
    <option>B.为什么那些为供养家庭而工作的妇女的薪水也很低？</option>
    <option>C.雇主和男性工作者通常是如何看待职业女性的？</option>
    <option>D.为什么单身女性比已婚女性更可能出去工作？</option>
    </select></p>`, },

  { data: { question: 'wm3', correct_answer: "C", type: "inference"},
    preamble: '【《职业妇女》 第3题】<br/>从文中可以看出在下列哪种情况下女性能更轻松地做职业妇女？',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.如果她们不必为供养家庭而工作</option>
    <option>B.如果她们可以自愿工作而不是被迫工作</option>
    <option>C.如果外出工作被认为是不与照顾家庭相冲突的</option>
    <option>D.如果某个年龄阶段的大多数妇女都外出工作</option>
    </select></p>`, },

  { data: { question: 'wm4', correct_answer: "A", type: "detail"},
    preamble: '【《职业妇女》 第4题】<br/>作者认为在19世纪职业妇女的薪水要低于男性是受什么影响？',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.为挣薪水工作不是妇女的本职的观念</option>
    <option>B.妇女一直在家里或农场工作的事实</option>
    <option>C.妇女被迫外出工作因此被利用的观念</option>
    <option>D.外出工作的妇女比例稳步提高</option>
    </select></p>`, },

  { data: { question: 'wm5', correct_answer: "D", type: "inference"},
    preamble: '【《职业妇女》 第5题】<br/>对文中所提到关于职业妇女的一对矛盾是：',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.妇女实际能得到的工作和她们想做的工作</option>
    <option>B.职业妇女家中的恶劣环境和人们期望妇女创造的舒适环境</option>
    <option>C.大多数妇女成为劳力的原因和一些妇女想晋升的野心</option>
    <option>D.妇女外出工作的现实和妇女家庭角色的理想</option>
    </select></p>`, },

  { data: { question: 'wm6', correct_answer: "A", type: "detail"},
    preamble: '【《职业妇女》 第6题】<br/>外出工作的第一个主要妇女群体是',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.未婚妇女</option>
    <option>B.寡妇</option>
    <option>C.丈夫残疾的已婚妇女</option>
    <option>D.未婚妇女的女儿</option>
    </select></p>`, },

  { data: { question: 'wm7', correct_answer: "B", type: "inference"},
    preamble: '【《职业妇女》 第7题】<br/>在19世纪晚期下面哪项措施可以扭转妇女外出工作的现状？',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.训练妇女提高工作技能</option>
    <option>B.对家庭提供财政支援的福利措施</option>
    <option>C.当妇女工作时提供儿童托管服务</option>
    <option>D.不能工作的丈夫承担起照顾家庭的责任</option>
    </select></p>`, },

  { data: { question: 'wm8', correct_answer: "A", type: "detail"},
    preamble: '【《职业妇女》 第8题】<br/>在19世纪，大部分已婚和已为人母的职业妇女会：',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.转变成经济上有依赖性的家庭妇女</option>
    <option>B.为家庭提供第二份收入</option>
    <option>C.只能够接受较低薪水的工作</option>
    <option>D.没有升职的冲动</option>
    </select></p>`, },



];

var cf_items = [
  { data: { question: 'cf1', correct_answer: "C", type: "inference"},
    preamble: '【《赝品》 第1题】<br/>文艺复兴时期的半身像这个例子用来说明：',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.一些收藏家喜欢购买赝品</option>
    <option>B.一些收藏家为赝品付出过高的代价</option>
    <option>C.一些收藏家更在乎美感而不是真实性</option>
    <option>D.很多收藏家能正确辨认赝品</option>
    </select></p>`, },
  { data: { question: 'cf2', correct_answer: "C", type: "inference"},
    preamble: '【《赝品》 第2题】<br/>下列哪项最能代表作者对赝品的态度？',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.某人眼中的垃圾可能是另一个人眼中的财富</option>
    <option>B.您看到的就是您获得的</option>
    <option>C.外表只是一个空皮囊</option>
    <option>D.玫瑰无论叫什么名字，都还是一样的香</option>
    </select></p>`, },

  { data: { question: 'cf3', correct_answer: "D", type: "inference"},
    preamble: '【《赝品》 第3题】<br/>这篇文章讨论了哪两者间的冲突：',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.艺术家和伪造者</option>
    <option>B.私人收藏家和博物馆</option>
    <option>C.艺术收藏家和科学分析家</option>
    <option>D.艺术作品的欣赏价值和真实性</option>
    </select></p>`, },

  { data: { question: 'cf4', correct_answer: "C", type: "detail"},
    preamble: '【《赝品》 第4题】<br/>作者提出的保留赝品的理由下面哪项不包含在内？',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.鼓励对赝品制造者智慧的赞赏</option>
    <option>B.破坏我们的审美信念</option>
    <option>C.调节真品的过高价格</option>
    <option>D.映射了我们对过去的看法</option>
    </select></p>`, },

  { data: { question: 'cf5', correct_answer: "A", type: "inference"},
    preamble: '【《赝品》 第5题】<br/>下面哪种人最有可能刻意买赝品？',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.科学分析家</option>
    <option>B.博物馆馆长</option>
    <option>C.私人收藏家</option>
    <option>D.艺术商人</option>
    </select></p>`, },

  { data: { question: 'cf6', correct_answer: "B", type: "detail"},
    preamble: '【《赝品》 第6题】<br/>作者明确指出对赝品不满主要表现在：',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.它们欺骗了所有者的钱财</option>
    <option>B.它们扭曲了我们对过去的理解</option>
    <option>C.它们引起了愤怒和羞耻感</option>
    <option>D.它们与天才艺术家没有直接联系</option>
    </select></p>`, },

  { data: { question: 'cf7', correct_answer: "D", type: "detail"},
    preamble: '【《赝品》 第7题】<br/>文章认为只有在什么情况下艺术作品的观赏者才会感到心旷神怡？',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.艺术作品的外观没有改变</option>
    <option>B.观赏者对艺术家比较熟悉</option>
    <option>C.我们对它的反应有极大改变时</option>
    <option>D.作品被认定是真实的</option>
    </select></p>`, },

  { data: { question: 'cf8', correct_answer: "A", type: "detail"},
    preamble: '【《赝品》 第8题】<br/>下列哪个关于赝品的问题文中没有作出回答？',
    html: `
    <p style="font-size:14px; font-family: 等线; font-weight:normal">(请选择您认为正确的选项)</p>
    <p><select required name="Q0" size=4 style="font-size:18px; font-family:等线; font-weight:bold">
    <option>A.在艺术作品的科学分析上有哪些进步？</option>
    <option>B.一旦赝品被揭露将会有什么样的命运？</option>
    <option>C.艺术作品的价值是什么？</option>
    <option>D.艺术品市场的动力可能是什么？</option>
    </select></p>`, },


];


var readingTest1_Instr = {
  type: "instructions",
  pages: [
    `<h1 style='font: bold 24px 黑体'>测验一</h1>
    <p style='font: bold  20px 等线; text-align: left; line-height:28px'>
    下面开始阅读理解测验。<br/>
    测验题为单项选择题，包括细节题和推理题。<br/>
    细节题涉及到文章中的陈述和细节，<br/>
    而推理题则需要您根据刚才读到的内容进行相应推理。<br/>
    两种题型都要求您选择出最恰当的答案。<br/>
    注意：在开始测验之前，请确保已经关闭所有文章的页面。<br/>
    </p>`,
  ],

  show_clickable_nav: true,
  allow_backward: true,
  button_label_previous: "返回",
  button_label_next: "开始测验",
}

/*  first reading tests  */
var first_test_items = {
    timeline_variables: eval(final_test[0] + "_items"),
    timeline:[
      { type: 'survey-html-form',
        data: jsPsych.timelineVariable('data'),
        preamble: jsPsych.timelineVariable('preamble'),
        html: jsPsych.timelineVariable('html'),
        button_label: '下一题',
        on_finish:
          function(data) { addRespFromSurvey(data);
            if(data.response == data.correct_answer){
              data.correct_1 = true; // can add property correct by modify data object directly
            } else {
              data.correct_1 = false;}
          },
      }
    ],
    randomize_order: false,
  };
var second_test_items = {
    timeline_variables: eval(final_test[1] + "_items"),
    timeline:[
      { type: 'survey-html-form',
        data: jsPsych.timelineVariable('data'),
        preamble: jsPsych.timelineVariable('preamble'),
        html: jsPsych.timelineVariable('html'),
        button_label: '下一题',
        on_finish:
          function(data) { addRespFromSurvey(data);
            if(data.response == data.correct_answer){
              data.correct_1 = true; // can add property correct by modify data object directly
            } else {
              data.correct_1 = false;}
          },
      }
    ],
    randomize_order: false,
  };
var third_test_items = {
    timeline_variables: eval(final_test[2] + "_items"),
    timeline:[
      { type: 'survey-html-form',
        data: jsPsych.timelineVariable('data'),
        preamble: jsPsych.timelineVariable('preamble'),
        html: jsPsych.timelineVariable('html'),
        button_label: '下一题',
        on_finish:
          function(data) { addRespFromSurvey(data);
            if(data.response == data.correct_answer){
              data.correct_1 = true; // can add property correct by modify data object directly
            } else {
              data.correct_1 = false;}
          },
      }
    ],
    randomize_order: false,
  };
var fourth_test_items = {
    timeline_variables: eval(final_test[3] + "_items"),
    timeline:[
      { type: 'survey-html-form',
        data: jsPsych.timelineVariable('data'),
        preamble: jsPsych.timelineVariable('preamble'),
        html: jsPsych.timelineVariable('html'),
        button_label: '下一题',
        on_finish:
          function(data) { addRespFromSurvey(data);
            if(data.response == data.correct_answer){
              data.correct_1 = true; // can add property correct by modify data object directly
            } else {
              data.correct_1 = false;}
          },
      }
    ],
    randomize_order: false,
  };
var fifth_test_items = {
    timeline_variables: eval(final_test[4] + "_items"),
    timeline:[
      { type: 'survey-html-form',
        data: jsPsych.timelineVariable('data'),
        preamble: jsPsych.timelineVariable('preamble'),
        html: jsPsych.timelineVariable('html'),
        button_label: '下一题',
        on_finish:
          function(data) { addRespFromSurvey(data);
            if(data.response == data.correct_answer){
              data.correct_1 = true; // can add property correct by modify data object directly
            } else {
              data.correct_1 = false;}
          },
      }
    ],
    randomize_order: false,
  };

var final_tests = {
  timeline:[first_test_items, second_test_items, third_test_items, fourth_test_items, fifth_test_items],
}

/*  second reading tests  */
var first_retest_items = {
    timeline_variables: eval(final_test[0] + "_items"),
    timeline:[
      { type: 'survey-html-form',
        data: jsPsych.timelineVariable('data'),
        preamble: jsPsych.timelineVariable('preamble'),
        html: jsPsych.timelineVariable('html'),
        button_label: '下一题',
        on_finish:
          function(data) { addRespFromSurvey(data);
            if(data.response == data.correct_answer){
              data.correct_2 = true; // can add property correct by modify data object directly
            } else {
              data.correct_2 = false;}
          },
      }
    ],
    randomize_order: false,
  };
var second_retest_items = {
    timeline_variables: eval(final_test[1] + "_items"),
    timeline:[
      { type: 'survey-html-form',
        data: jsPsych.timelineVariable('data'),
        preamble: jsPsych.timelineVariable('preamble'),
        html: jsPsych.timelineVariable('html'),
        button_label: '下一题',
        on_finish:
          function(data) { addRespFromSurvey(data);
            if(data.response == data.correct_answer){
              data.correct_2 = true; // can add property correct by modify data object directly
            } else {
              data.correct_2 = false;}
          },
      }
    ],
    randomize_order: false,
  };
var third_retest_items = {
    timeline_variables: eval(final_test[2] + "_items"),
    timeline:[
      { type: 'survey-html-form',
        data: jsPsych.timelineVariable('data'),
        preamble: jsPsych.timelineVariable('preamble'),
        html: jsPsych.timelineVariable('html'),
        button_label: '下一题',
        on_finish:
          function(data) { addRespFromSurvey(data);
            if(data.response == data.correct_answer){
              data.correct_2 = true; // can add property correct by modify data object directly
            } else {
              data.correct_2 = false;}
          },
      }
    ],
    randomize_order: false,
  };
var fourth_retest_items = {
    timeline_variables: eval(final_test[3] + "_items"),
    timeline:[
      { type: 'survey-html-form',
        data: jsPsych.timelineVariable('data'),
        preamble: jsPsych.timelineVariable('preamble'),
        html: jsPsych.timelineVariable('html'),
        button_label: '下一题',
        on_finish:
          function(data) { addRespFromSurvey(data);
            if(data.response == data.correct_answer){
              data.correct_2 = true; // can add property correct by modify data object directly
            } else {
              data.correct_2 = false;}
          },
      }
    ],
    randomize_order: false,
  };
var fifth_retest_items = {
    timeline_variables: eval(final_test[4] + "_items"),
    timeline:[
      { type: 'survey-html-form',
        data: jsPsych.timelineVariable('data'),
        preamble: jsPsych.timelineVariable('preamble'),
        html: jsPsych.timelineVariable('html'),
        button_label: '下一题',
        on_finish:
          function(data) { addRespFromSurvey(data);
            if(data.response == data.correct_answer){
              data.correct_2 = true; // can add property correct by modify data object directly
            } else {
              data.correct_2 = false;}
          },
      }
    ],
    randomize_order: false,
  };

var final_retests = {
  timeline:[first_retest_items, second_retest_items, third_retest_items, fourth_retest_items, fifth_retest_items],
}

var readingTest2_Instr = {
  type: "instructions",
  pages: [
    `<h1 style='font: bold 24px 黑体'>测验二</h1>
    <p style='font: bold  20px 等线; text-align: center; line-height:28px'>
    您已完成对所选文章的重读！<br/>
    下面开始第二次阅读理解测验。<br/>
    注意：在开始测验之前，请确保已经关闭所有文章的页面。<br/>
    </p>`,
  ],
  show_clickable_nav: true,
  allow_backward: true,
  button_label_previous: "返回",
  button_label_next: "开始测验",
}

/*  填写关键词  */
var zoo_keywords = [
  { data: {article: "zoo"}, s: `<span style='font: bold  24px 等线;'>《动物园》</span>` }
]
var news_keywords = [
  { data: {article: "news"}, s: `<span style='font: bold  24px 等线;'>《电视新闻》</span>` }
]
var plants_keywords = [
  { data: {article: "plants"}, s: `<span style='font: bold  24px 等线;'>《植物》</span>` }
]
var wm_keywords = [
  { data: {article: "wm"}, s: `<span style='font: bold  24px 等线;'>《职业妇女》</span>` }
]
var cf_keywords = [
  { data: {article: "cf"}, s: `<span style='font: bold  24px 等线;'>《赝品》</span>` }
]

var first_keywords = {
    timeline_variables: eval(final_test[0] + "_keywords"),
    timeline:[
      { type: 'survey-text',
        data: jsPsych.timelineVariable('data'),
        questions: [{
            prompt: '为了更好地理解文章内容，请根据您的阅读，<br/>为文章'+ eval(final_test[0] + "_keywords")[0].s + '总结5个关键词，输入到以下文本框中。',
            placeholder: '请输入5个关键词，用逗号隔开',
            rows: 5,
            columns: 50,
            required: true,
        }],
        button_label: '完成',
        on_finish: function(data) { addRespFromSurvey(data) }
      }
    ],
  };
var second_keywords = {
    timeline_variables: eval(final_test[1] + "_keywords"),
    timeline:[
      { type: 'survey-text',
        data: jsPsych.timelineVariable('data'),
        questions: [{
            prompt: '为了更好地理解文章内容，请根据您的阅读，<br/>为文章'+ eval(final_test[1] + "_keywords")[0].s + '总结5个关键词，输入到以下文本框中。',
            placeholder: '请输入5个关键词，用逗号隔开',
            rows: 5,
            columns: 50,
            required: true,
        }],
        button_label: '完成',
        on_finish: function(data) { addRespFromSurvey(data) }
      }
    ],
};
var third_keywords = {
    timeline_variables: eval(final_test[2] + "_keywords"),
    timeline:[
      { type: 'survey-text',
        data: jsPsych.timelineVariable('data'),
        questions: [{
            prompt: '为了更好地理解文章内容，请根据您的阅读，<br/>为文章'+ eval(final_test[2] + "_keywords")[0].s + '总结5个关键词，输入到以下文本框中。',
            placeholder: '请输入5个关键词，用逗号隔开',
            rows: 5,
            columns: 50,
            required: true,
        }],
        button_label: '完成',
        on_finish: function(data) { addRespFromSurvey(data) }
      }
    ],
};
var fourth_keywords = {
    timeline_variables: eval(final_test[3] + "_keywords"),
    timeline:[
      { type: 'survey-text',
        data: jsPsych.timelineVariable('data'),
        questions: [{
            prompt: '为了更好地理解文章内容，请根据您的阅读，<br/>为文章'+ eval(final_test[3] + "_keywords")[0].s + '总结5个关键词，输入到以下文本框中。',
            placeholder: '请输入5个关键词，用逗号隔开',
            rows: 5,
            columns: 50,
            required: true,
        }],
        button_label: '完成',
        on_finish: function(data) { addRespFromSurvey(data) }
      }
    ],
};
var fifth_keywords = {
    timeline_variables: eval(final_test[4] + "_keywords"),
    timeline:[
      { type: 'survey-text',
        data: jsPsych.timelineVariable('data'),
        questions: [{
            prompt: '为了更好地理解文章内容，请根据您的阅读，<br/>为文章'+ eval(final_test[4] + "_keywords")[0].s + '总结5个关键词，输入到以下文本框中。',
            placeholder: '请输入5个关键词，用逗号隔开',
            rows: 5,
            columns: 50,
            required: true,
        }],
        button_label: '完成',
        on_finish: function(data) { addRespFromSurvey(data) }
      }
    ],
};

var input_keywords = {
  timeline:[first_keywords, second_keywords, third_keywords, fourth_keywords, fifth_keywords],
}

/*  元理解监测：评估自己对每篇文章的理解程度   */
var instr_monitor = {
    type: 'instructions',
    pages: [
        `<h1 style='font: bold 24px 黑体'>评估理解程度</h1>
        <p style="text-align: center">
        下面请您评估自己对每篇文章的理解程度。</p>
        <p style="text-align:left">
        1 = 完全不理解<br/>
        2 = 不理解<br/>
        3 = 比较不理解<br/>
        4 = 不确定<br/>
        5 = 比较理解<br/>
        6 = 理解<br/>
        7 = 完全理解</p>`,
    ],
    show_clickable_nav: true,
    allow_backward: true,
    button_label_previous: '返回',
    button_label_next: '继续'
}

var metacomprehension = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: `
        <p style="font-size: 16pt; font-weight: normal">
        请评估您对该文章的理解程度<br/>
        （1 = 完全不理解，7 = 完全理解）</p>`,
        choices: ['1', '2', '3', '4', '5', '6', '7'],
        on_finish: function(data) { addRespFromButtonScale(data, 'metacomprehension') },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i:1, article: eval(final_test[0] + "_keywords")[0].s }, s: eval(final_test[0] + "_keywords")[0].s},
        { data: { i:2, article: eval(final_test[1] + "_keywords")[0].s }, s: eval(final_test[1] + "_keywords")[0].s},
        { data: { i:3, article: eval(final_test[2] + "_keywords")[0].s }, s: eval(final_test[2] + "_keywords")[0].s},
        { data: { i:4, article: eval(final_test[3] + "_keywords")[0].s }, s: eval(final_test[3] + "_keywords")[0].s},
        { data: { i:5, article: eval(final_test[4] + "_keywords")[0].s }, s: eval(final_test[4] + "_keywords")[0].s},
    ],
    randomize_order: false
}

// 呈现测验1的总体正确率
var debrief1 = {
    type: 'html-keyboard-response',
    stimulus: function() {
        var data = jsPsych.data.get()
        var test1_data = jsPsych.data.get().select('correct_1').mean();
        return `
        <p style="text-align: left">
        您已完成第一次测验！<br/><br/>
        结果反馈：<br/>
        在本次阅读理解测验中，您的整体正确率为：${test1_data.toFixed(2)*100+"%"}<br/>
        （按任意键继续）</p>`
    }
}

// 呈现测验2的总体正确率
var debrief2 = {
    type: 'html-keyboard-response',
    stimulus: function() {
        var data = jsPsych.data.get()
        var test2_data = jsPsych.data.get().select('correct_2').mean();
        return `
        <p style="text-align: left">
        您已完成第二次测验！<br/><br/>
        结果反馈：<br/>
        在本次阅读理解测验中，您的整体正确率为：${test2_data.toFixed(2)*100+"%"}<br/>
        （按任意键继续）</p>`
    }
}

// 稍作休息
var rest_Instr = {
    type: 'html-button-response',
    stimulus: '<p style="font-size:24px"><img border=0 width=120 height=120 src="love.jpg"></img><br/>请稍作调整，休息2分钟后继续完成实验:)</p>',
    choices: ['<span id="timer">120</span>秒后继续'],
    button_html: `<style onload="tid=setInterval(timer, 1000)"></style>
     <button onclick="clearInterval(tid)" class="jspsych-btn" disabled=true>%choice%</button>`
}


/*  选择文章重读  */
// 指导语
var reread_select_Instr = {
    type: 'instructions',
    pages: [
        `<h1 style='font: bold 24px 黑体'>选择文章重读</h1>
        <p style="font-size:20px text-align: center">
        您已经阅读了全部文章，完成了第一次测验。<br/>
        接下来会再次对这5篇文章进行测验。<br/>
        为了提高您对文章的阅读理解程度，<br/>
        请您根据自己的需要选择其中的0-5篇进行重新阅读。<br/></p>`,
    ],
    show_clickable_nav: true,
    allow_backward: true,
    button_label_previous: '返回',
    button_label_next: '进入选择页面'
}


var reread_items = {
  type: "survey-multi-select",
  data: { varname: 'reread_items' },
  questions:[
      { prompt: "请选择您想要重新阅读的文章。",
        options:[
                  eval(final_test[0] + "_keywords")[0].s,
                  eval(final_test[1] + "_keywords")[0].s,
                  eval(final_test[2] + "_keywords")[0].s,
                  eval(final_test[3] + "_keywords")[0].s,
                  eval(final_test[4] + "_keywords")[0].s,
              ],
        horizontal:false,
    },
  ],
  button_label:"继续",
};


// 呈现重新阅读的文章列表
var rereadingList = {
    type: 'html-keyboard-response',
    stimulus: function() {
        // var reread_links = [1,2,3,4,5];
        var reread_string = jsPsych.data.get().filter({ varname:'reread_items' }).select('responses').values;
        var reread_data = JSON.parse(reread_string).Q0;
        for (var i = 0; i < reread_data.length; i++) {
          switch (reread_data[i]) {
              case `<span style='font: bold  24px 等线;'>《动物园》</span>`:
                  reread_data[i] = `${zoo_rereadlink}`;
                  break;
              case `<span style='font: bold  24px 等线;'>《电视新闻》</span>`:
                  reread_data[i] = `${news_rereadlink}`;
                  break;
              case `<span style='font: bold  24px 等线;'>《植物》</span>`:
                  reread_data[i] = `${plants_rereadlink}`;
                  break;
              case `<span style='font: bold  24px 等线;'>《职业妇女》</span>`:
                  reread_data[i] = `${wm_rereadlink}`;
                  break;
              case `<span style='font: bold  24px 等线;'>《赝品》</span>`:
                  reread_data[i] = `${cf_rereadlink}`;
          }
        };
        return `
        <p style="text-align: center">
        以下是您想要再次阅读的文章列表：<br/>
         <span style='font: bold  24px 等线;'>${reread_data}</span><br/>
        <span style="color: red">请依次点击链接重新阅读以上所有文章。<br/>
        每读完一篇后，关闭该页面，回到实验页面，<br/>
        继续阅读下一篇文章，直到完成阅读。</span><br/>
        <span style="color: blue">注：以上文章阅读完毕且回到本页面后，再按空格键继续。
        <br/>（如果您刚才选择的重读文章数为0，则请直接按空格键继续。）</span></p>`
    }
}

// 认知负荷评定量表
var PASS_1 = {
    type: 'html-button-response',
    data: { varname: 'PASS_1' },
    stimulus: '在刚才的阅读任务（包括阅读和答题）中，您投入了多少心理努力？<br/>请从以下9个数字中选择适合您的数字。其中，1—最少努力，5—中等努力，9—最大努力。',
    choices: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    on_finish: function(data) { addRespFromButton(data) }
}

var PASS_2 = {
    type: 'html-button-response',
    data: { varname: 'PASS_2' },
    stimulus: '您认为刚才的阅读任务（包括阅读和答题）难度如何？<br/>请从以下9个数字中选择适合您的数字。其中，1—非常容易，5—中等难度，9—非常困难。',
    choices: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    on_finish: function(data) { addRespFromButton(data) }
}

// 专注度与兴趣评定
var concentration = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: `
        <p style="font-size: 16pt; font-weight: normal">
        请对以上内容进行评分<br/>
        （1 = 非常不专注， 7 = 非常专注）</p>`,
        choices: ['1', '2', '3', '4', '5', '6', '7'],
        on_finish: function(data) { addRespFromButtonScale(data, 'concentration') },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i: 1 }, s: '您在此次网页阅读任务（包括阅读和答题）中的专注程度' },
        { data: { i: 2 }, s: '平均来说，您在平时阅读网页时的专注程度' },
    ],
    randomize_order: false
}

var interest = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: `
        <p style="font-size: 16pt; font-weight: normal">
        请对以上内容进行评分<br/>
        （1 = 非常不感兴趣，7 = 非常感兴趣）</p>`,
        choices: ['1', '2', '3', '4', '5', '6', '7'],
        on_finish: function(data) { addRespFromButtonScale(data, 'interest') },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i: 1 }, s: '您在此次网页阅读任务（包括阅读和答题）中的感兴趣程度' },
        { data: { i: 2 }, s: '平均来说，您在平时阅读网页时的感兴趣程度' },
    ],
    randomize_order: false
}

var AfterReadingScale = {
  timeline: [PASS_1, PASS_2, concentration, interest],
};

// 结束语
var endingInstr = {
    type: 'instructions',
    pages: [
        `<h1 style='font: bold 24px 黑体'>数据保存与发送</h1>
        <p style="font-size:20px; text-align: left">
        点击【继续】后，您的浏览器将会自动下载您的实验数据。<br/>
        实验数据为csv格式。<br/>
        请您务必保存好该数据文件，不做任何改动，<br/>
        及时将该csv格式的数据文件通过邮件发送到主试的邮箱（lulihello@qq.com），<br/>
        凭借此邮件领取报酬。<br/>
        请将邮件命名为【网页阅读实验+您的专属ID】（如：网页阅读实验+4nwyrcr6），<br/>
        并将您的数据文件作为邮件附件。<br/>您可以在刚才下载的pdf文件中再次查看发送步骤。</p>`,
    ],
    show_clickable_nav: true,
    allow_backward: true,
    button_label_previous: '返回',
    button_label_next: '继续'
}


var ReadingTest1 = {
  timeline: [final_tests],
};

var ReadingTest2 = {
  timeline: [final_retests],
};

/* Timelines */
/*
• A组：延迟生成关键词组——先填问卷——再完成阅读理解任务
• B组：延迟生成关键词组——先完成阅读理解任务——再填问卷
• C组：不生成关键词组——先填问卷——再完成阅读理解任务
• D组：不生成关键词组——先完成阅读理解任务——再填问卷
*/

var mainTimelineA = [
  set_html_style,
  welcome,
  questionnaire,
  readingTaskInstr,
  keywordsInstr,
  PracticeInstr,
  keywordsExample,
  Prac_metacomprehension,
  Prac_test_Instr,
  set_test_style,
  practice_test_items,
  Prac_end_Instr,
  read_Instr,
  readingList,
  finish_reading_Instr,
  set_test_style,
  input_keywords_Instr,
  input_keywords,
  instr_monitor,
  metacomprehension,
  readingTest1_Instr,
  ReadingTest1,
  debrief1,
  rest_Instr,
  reread_select_Instr,
  reread_items,
  rereadingList,
  readingTest2_Instr,
  ReadingTest2,
  debrief2,
  AfterReadingScale,
  endingInstr,
];

var mainTimelineB = [
  set_html_style,
  welcome,
  readingTaskInstr,
  keywordsInstr,
  PracticeInstr,
  keywordsExample,
  Prac_metacomprehension,
  Prac_test_Instr,
  set_test_style,
  practice_test_items,
  Prac_end_Instr,
  read_Instr,
  readingList,
  finish_reading_Instr,
  set_test_style,
  input_keywords_Instr,
  input_keywords,
  instr_monitor,
  metacomprehension,
  readingTest1_Instr,
  ReadingTest1,
  debrief1,
  rest_Instr,
  reread_select_Instr,
  reread_items,
  rereadingList,
  readingTest2_Instr,
  ReadingTest2,
  debrief2,
  AfterReadingScale,
  questionnaire,
  endingInstr,
];

var mainTimelineC = [
  set_html_style,
  welcome,
  questionnaire,
  readingTaskInstr,
  PracticeInstr,
  Prac_metacomprehension,
  Prac_test_Instr,
  set_test_style,
  practice_test_items,
  Prac_end_Instr,
  read_Instr,
  readingList,
  finish_reading_Instr,
  set_test_style,
  instr_monitor,
  metacomprehension,
  readingTest1_Instr,
  ReadingTest1,
  debrief1,
  rest_Instr,
  reread_select_Instr,
  reread_items,
  rereadingList,
  readingTest2_Instr,
  ReadingTest2,
  debrief2,
  AfterReadingScale,
  endingInstr,
];

var mainTimelineD = [
  set_html_style,
  welcome,
  readingTaskInstr,
  PracticeInstr,
  Prac_metacomprehension,
  Prac_test_Instr,
  set_test_style,
  practice_test_items,
  Prac_end_Instr,
  read_Instr,
  readingList,
  finish_reading_Instr,
  set_test_style,
  instr_monitor,
  metacomprehension,
  readingTest1_Instr,
  ReadingTest1,
  debrief1,
  rest_Instr,
  reread_select_Instr,
  reread_items,
  rereadingList,
  readingTest2_Instr,
  ReadingTest2,
  debrief2,
  AfterReadingScale,
  questionnaire,
  endingInstr,
];

var mainTimeline = [];
switch (condition_assignment) {
    case 'conditionA':
        mainTimeline = mainTimelineA;
        break;
    case 'conditionB':
        mainTimeline = mainTimelineB;
        break;
    case 'conditionC':
        mainTimeline = mainTimelineC;
        break;
    case 'conditionD':
        mainTimeline = mainTimelineD;
};


jsPsych.init({
  timeline: mainTimeline,
  on_finish: function(){
    jsPsych.data.get().localSave("csv", `reading_exp_data_${condition_assignment}_${subject_id}.csv`); //download from browser
    document.write(`<h1 style='text-align:center; height:500pt; line-height:500pt'>实验到此结束，感谢您的参与！</h1>`);
  }
});
