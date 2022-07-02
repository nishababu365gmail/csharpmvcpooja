using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CsharpMVCPooja.CustomAttributes
{
    public class RequiresAuthenticationAttribute: ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            //You can put your check here. This particular
            //check is for default asp.net membership authentication
            
            //if (!filterContext.HttpContext.User.Identity.IsAuthenticated)
                if (filterContext.HttpContext.Session.GetString("_UserName")!="")
                {
                RedirectToLogin(filterContext);
            }
        }

        private void RedirectToLogin(ActionExecutingContext filterContext)
        {
            var redirectTarget = new RouteValueDictionary
    {

                
        {"action", "Index"},
        {"controller", "Employee"}
    };

            filterContext.Result = new RedirectToRouteResult(redirectTarget);
        }
    
}
}
