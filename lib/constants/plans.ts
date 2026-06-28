export const PLANS = {
  FREE:      { name:'Free',       price:0,    maxWorkflows:3,  maxExec:100,   aiNodes:false },
  PRO:       { name:'Pro',        price:1900, maxWorkflows:50, maxExec:10000, aiNodes:true  },
  ENTERPRISE:{ name:'Enterprise', price:-1,   maxWorkflows:999, maxExec:999999, aiNodes:true }
} as const
