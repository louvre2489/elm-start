package elm_start

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.stream.ActorMaterializer
import akka.util.Timeout

import scala.concurrent.ExecutionContext
import scala.concurrent.duration._
import scala.io.StdIn

object WebServer {

  def main(args: Array[String]) {

    implicit val system: ActorSystem                = ActorSystem()
    implicit val materializer: ActorMaterializer    = ActorMaterializer()
    implicit val executionContext: ExecutionContext = system.dispatcher
    implicit val timeout: Timeout                   = Timeout(5.seconds)

    val host = "0.0.0.0"
    val port = 5000

    val bindingFuture =
      Http().bindAndHandle(Routes().routes, host, port)

    // message for console
    println(s"Server online at http://$host:$port/\nPress RETURN to stop...")

    StdIn.readLine()

    bindingFuture
      .flatMap(_.unbind())
      .onComplete(_ => {
        // システム終了
        system.terminate()
      })
  }
}
