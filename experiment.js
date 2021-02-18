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
var Q_v1 = '<a target=_blank href=/other/https:/www.wjx.cn/jq/104106776.aspx>问卷链接</a>';
var Q_v2 = '<a target=_blank href=/other/https:/www.wjx.cn/jq/104122961.aspx>问卷链接</a>';
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
    <span style='color: red'>现在请点击<${Final_Q}>填写一份
