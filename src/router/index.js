import Vue from 'vue'
import VueRouter from 'vue-router'
import adminStore from '@/store/admin.js'

const Home = () => import(/* webpackChunkName: "Home" */ '@/views/home/Home.vue')
const Article = () => import(/* webpackChunkName: "Article" */ '@/views/Article.vue')
const MainTeam = () =>
  import(/* webpackChunkName: "MainTeamPrefix" */ '@/views/mainTeam/Prefix.vue')
const Team = () => import(/* webpackChunkName: "Team" */ '@/views/mainTeam/children/Team.vue')
const Matches = () =>
  import(/* webpackChunkName: "Matches" */ '@/views/mainTeam/children/Matches.vue')
const Leaderboard = () =>
  import(/* webpackChunkName: "Leaderboard" */ '@/views/mainTeam/children/Leaderboard.vue')
const Statistics = () =>
  import(/* webpackChunkName: "Statistics" */ '@/views/mainTeam/children/Statistics.vue')
const Player = () =>
  import(/* webpackChunkName: Player" */ '@/views/mainTeam/children/player/Prefix.vue')
const PlayerInfo = () =>
  import(/* webpackChunkName: PlayerInfo" */ '@/views/mainTeam/children/player/PlayerInfo.vue')
const PlayerCompetition = () =>
  import(
    /* webpackChunkName: PlayerCompetition" */ '@/views/mainTeam/children/player/PlayerCompetition.vue'
  )
const Match = () => import(/* webpackChunkName: Match" */ '@/views/mainTeam/children/Match.vue')

// youngerTeams
const YoungerTeams = () =>
  import(/* webpackChunkName: YoungerTeams" */ '@/views/youngerTeams/Prefix.vue')
const U7 = () => import(/* webpackChunkName: U7" */ '@/views/youngerTeams/children/U7.vue')
const U9 = () => import(/* webpackChunkName: U9" */ '@/views/youngerTeams/children/U9.vue')
const U11 = () => import(/* webpackChunkName: U11" */ '@/views/youngerTeams/children/U11.vue')
const U13 = () => import(/* webpackChunkName: U13" */ '@/views/youngerTeams/children/U13.vue')
const U15 = () => import(/* webpackChunkName: U15" */ '@/views/youngerTeams/children/U15.vue')
const U17 = () => import(/* webpackChunkName: U17" */ '@/views/youngerTeams/children/U17.vue')
const U19 = () => import(/* webpackChunkName: U19" */ '@/views/youngerTeams/children/U19.vue')
const Camp = () => import(/* webpackChunkName: Camp" */ '@/views/youngerTeams/children/Camp.vue')
const LeadershipAndCoaches = () =>
  import(
    /* webpackChunkName: LeadershipAndCoaches" */ '@/views/youngerTeams/children/LeadershipAndCoaches.vue'
  )
const ActivitiesAndDocuments = () =>
  import(
    /* webpackChunkName: ActivitiesAndDocuments" */ '@/views/youngerTeams/children/ActivitiesAndDocuments.vue'
  )

// ADMIN
const Admin = () => import(/* webpackChunkName: Match" */ '@/views/admin/Admin.vue')
const Login = () => import(/* webpackChunkName: Login" */ '@/views/admin/Login.vue')
const Dashboard = () =>
  import(/* webpackChunkName: Dashboard" */ '@/views/admin/children/Dashboard.vue')
const Players = () =>
  import(/* webpackChunkName: Players" */ '@/views/admin/children/players/Players.vue')
const ListPlayers = () =>
  import(
    /* webpackChunkName: ListPlayers" */ '@/views/admin/children/players/children/ListPlayers.vue'
  )
const EditPlayer = () =>
  import(
    /* webpackChunkName: EditPlayer" */ '@/views/admin/children/players/children/EditPlayer.vue'
  )
const Clubs = () => import(/* webpackChunkName: Clubs" */ '@/views/admin/children/clubs/Clubs.vue')
const ListClubs = () =>
  import(/* webpackChunkName: ListClubs" */ '@/views/admin/children/clubs/children/ListClubs.vue')
const EditClub = () =>
  import(/* webpackChunkName: EditClub" */ '@/views/admin/children/clubs/children/EditClub.vue')
const Staff = () => import(/* webpackChunkName: Staff" */ '@/views/admin/children/Staff.vue')
const ListArticles = () =>
  import(
    /* webpackChunkName: ListArticles" */ '@/views/admin/children/articles/children/ListArticles.vue'
  )
const EditArticle = () =>
  import(
    /* webpackChunkName: EditArticle" */ '@/views/admin/children/articles/children/EditArticle.vue'
  )
const Seasons = () => import(/* webpackChunkName: Seasons" */ '@/views/admin/children/Seasons.vue')
const Syncs = () => import(/* webpackChunkName: Syncs" */ '@/views/admin/children/Syncs.vue')
const AdminSponsors = () =>
  import(/* webpackChunkName: Syncs" */ '@/views/admin/children/Sponsors.vue')
const Calendar = () =>
  import(/* webpackChunkName: Calendar" */ '@/views/admin/children/Calendar.vue')
const YoungerTeam = () =>
  import(/* webpackChunkName: YoungerTeam" */ '@/views/admin/children/YoungerTeam.vue')

const Club = () => import(/* webpackChunkName: Club" */ '@/views/club/Prefix.vue')
const Sponsors = () =>
  import(/* webpackChunkName: Sponsors" */ '@/views/club/children/Sponsors.vue')

const History = () =>
  import(/* webpackChunkName: History" */ '@/views/club/children/history/History.vue')
const History19211971 = () =>
  import(
    /* webpackChunkName: History1921_1971" */ '@/views/club/children/history/children/History19211971.vue'
  )

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/clansko-mostvo',
    name: 'mainTeam',
    component: MainTeam,
    redirect: '/clansko-mostvo/ekipa',
    children: [
      { path: 'ekipa/:seasonID?', name: 'main team', component: Team },
      { path: 'tekme/:seasonID?', name: 'matches', component: Matches },
      { path: 'lestvica/:seasonID?', name: 'leaderboard', component: Leaderboard },
      { path: 'statistika/:seasonID?', name: 'statistics', component: Statistics },
      { path: 'tekma/:matchID?', name: 'match', component: Match },
      {
        path: 'igralec/:playerID',
        name: 'player',
        component: Player,
        redirect: 'igralec/:playerID/info',
        children: [
          {
            path: 'info',
            name: 'playerInfo',
            component: PlayerInfo,
          },
          {
            path: 'tekmovanje/:competitionID',
            name: 'playerCompetition',
            component: PlayerCompetition,
          },
        ],
      },
    ],
  },
  {
    path: '/mlajse-selekcije',
    name: 'youngerTeams',
    component: YoungerTeams,
    redirect: '/mlajse-selekcije/U7',
    children: [
      {
        path: 'vodstvo-in-trenerji',
        name: 'LeadershipAndCoaches',
        component: LeadershipAndCoaches,
      },
      {
        path: 'nogometni-kamp',
        name: 'camp',
        component: Camp,
      },
      {
        path: 'aktivnosti-in-dokumenti',
        name: 'activitiesAndDocuments',
        component: ActivitiesAndDocuments,
      },
      { path: 'U7', name: 'U7', component: U7 },
      { path: 'U9', name: 'U9', component: U9 },
      { path: 'U11', name: 'U11', component: U11 },
      { path: 'U13', name: 'U13', component: U13 },
      { path: 'U15', name: 'U15', component: U15 },
      { path: 'U17', name: 'U17', component: U17 },
      { path: 'U19', name: 'U19', component: U19 },
    ],
  },
  {
    path: '/clanek/:articleID',
    name: 'Clanek',
    component: Article,
  },
  {
    path: '/admin',
    name: 'Admin',
    redirect: '/admin/pregled',
    component: Admin,
    beforeEnter: (to, from, next) => {
      const store = adminStore()
      if (store.user) {
        next()
      } else {
        store.isLoggedIn().then(() => {
          if (store.user) {
            next()
          } else {
            next({ name: 'Login' })
          }
        })
      }
    },
    children: [
      {
        path: 'pregled',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: 'sezone',
        name: 'Seasons',
        component: Seasons,
      },
      {
        path: 'sinhronizacije',
        name: 'Syncs',
        component: Syncs,
      },
      {
        path: 'sponzorji',
        name: 'Sponsors',
        component: AdminSponsors,
      },
      {
        path: 'igralci',
        name: 'Players',
        redirect: 'igralci/seznam',
        component: Players,
        children: [
          {
            path: 'seznam',
            name: 'PlayersList',
            component: ListPlayers,
          },
          {
            path: 'uredi/:playerID?',
            name: 'EditPlayer',
            component: EditPlayer,
          },
        ],
      },
      {
        path: 'klubi',
        name: 'Clubs',
        redirect: 'klubi/seznam',
        component: Clubs,
        children: [
          {
            path: 'seznam',
            name: 'ClubsList',
            component: ListClubs,
          },
          {
            path: 'uredi/:clubID?',
            name: 'EditClub',
            component: EditClub,
          },
        ],
      },
      {
        path: 'osebje/:seasonID?',
        name: 'Staff',
        component: Staff,
      },
      {
        path: 'mlajse_selekcije',
        name: 'YoungerTeam',
        component: YoungerTeam,
      },
      {
        path: 'prispevki',
        name: 'Articles',
        redirect: 'prispevki/seznam',
        component: Clubs,
        children: [
          {
            path: 'seznam',
            name: 'ArticleList',
            component: ListArticles,
          },
          {
            path: 'uredi/:articleID?',
            name: 'EditArticle',
            component: EditArticle,
          },
        ],
      },
      {
        path: 'dogodki',
        name: 'Events',
        component: Dashboard,
      },
      {
        path: 'koledar',
        name: 'Calendar',
        component: Calendar,
      },
    ],
  },
  {
    path: '/prijava',
    name: 'Login',
    component: Login,
  },
  {
    path: '/klub',
    name: 'Club',
    component: Club,
    redirect: '/klub/sponzorji',
    children: [
      {
        path: 'sponzorji',
        name: 'sponsors',
        component: Sponsors,
      },
      {
        path: 'zgodovina',
        name: 'history',
        component: History,
        // redirect: '/klub/zgodovina/1921-1971',
        // children: [
        //   {
        //     path: '1921-1971',
        //     name: 'history1921-1971',
        //     component: History19211971,
        //   },
        // ],
      },
    ],
  },
  // TODO add page not found component
  // { path: '*', redirect: '/' },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
// router.beforeEach((to, from, next) => {
//   console.log()
//   if (to.matched[0].name === 'Admin') {
//     const store = adminStore()
//     if (store.user) {
//       next()
//     } else {
//       store.isLoggedIn().then(() => {
//         if (store.user) {
//           console.log('user exists now')
//           next()
//         } else {
//           console.log('user does not exist')
//           return '/login'
//         }
//       })
//     }
//   } else next()
// })
export default router
