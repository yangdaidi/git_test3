/**
 * [lovetestAPI 爱情小测试活动API]
 * @date {上线日期：-}
 * @type {Object}
 */
let lovetestAPI = {
    check: '/lovetest/checkLogin',
    friend: '/lovetest/getFriendsByFrom',
    answer: '/lovetest/answer'
}

/**
 * [masterquestionAPI 师傅答题活动API]
 * @date {上线日期：2017.12.07}
 * @type {Object}
 */
let masterquestionAPI = {
	get: '/activity/qa/getAllQuestions',
	answer: '/activity/qa/answer',
}

/**
 * [followgiftAPI 关注有礼活动API]
 * @date {上线日期：2017.12.07}
 * @type {Object}
 */
let followgiftAPI = {
	captcha: '/activity/login/captcha', //phone=xxx
	verifyCaptcha: '/activity/login/verifyCaptcha', //?phone=xxx&code=xxx
	addcoin:'/activity/misc/addcoinafterfocus',//accid=xxx
	checkcoin:'/activity/misc/hasJoinedActivity',//accid=xxx
	logout:'/activity/login/logout',
}

/**
 * [inviteAPI 邀请有礼活动API]
 * @date {上线日期：2017.12.07}
 * @type {Object}
 */
let inviteAPI = {
	invite: '/activity/misc/shareCallback',
	get: '/activity/misc/getFriendsInfo',
}

/**
 * [baoxiangAPI 邀请有礼活动API]
 * @date {上线日期：2017.12.07}
 * @type {Object}
 */
let baoxiangAPI = {
	get:"/activity/treasure/getAllTreasureItems",//?annoid=xxx
	list:"/activity/treasure/getTreasureRecords",//?accid=xxx&limit=xxx&page=xxx
	setAddress:"/activity/treasure/express",//?accid=xxx&name=xx&mobile=xx&address=xx&tsrid=xx
	lottery:"/activity/treasure/lottery",//?accid=xxx&annoid=xxx
	status:"/misc/anno/get",
}

/**
 * [milkteaAPI 奶茶活动API]
 * @date {上线日期：2017.12.28}
 * @type {Object}
 */
let milkteaAPI = {
	nick:"/activity/school/useCode2",//?nick
	use:"/activity/school/useCode",//?code
	checkAPI:"/activity/school/isLogined",//用户校验，白名单用户可以登录
}

export { lovetestAPI, masterquestionAPI, followgiftAPI, inviteAPI, baoxiangAPI, milkteaAPI};
