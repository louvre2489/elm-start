package elm_start

import akka.actor.ActorSystem
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import akka.util.Timeout

/**
  * Routing Object
  */
object Routes {

  def apply()(implicit system: ActorSystem, timeout: Timeout): Routes =
    new Routes()
}

/**
  * Routing
  */
class Routes()(implicit system: ActorSystem, timeout: Timeout) {

  /***
    * Routing
    */
  val routes: Route = {
    extractLog { implicit log =>
      extractUri { uri =>
        extractMethod { method =>
          log.info(s"call api. method: ${method.value}, uri: $uri")

          path(pm = "public" / Remaining) { resource =>
            pathEndOrSingleSlash {
              get {
                getFromResource(resourceName = "elm-start-front/public/" + resource)
              }
            }
          }
        }
      }
    }
  }
}
