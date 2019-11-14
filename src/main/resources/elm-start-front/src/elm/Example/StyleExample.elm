module Example.StyleExample exposing (Model, Msg(..), init, main, update, view)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)


main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }


type alias Model =
    { firstName : String
    , familyName : String
    , fullName : String
    }


init : Model
init =
    { firstName = ""
    , familyName = ""
    , fullName = ""
    }


type Msg
    = InputFirstName String
    | InputFamilyName String


update : Msg -> Model -> Model
update msg model =
    case msg of
        InputFirstName firstName ->
            { model | firstName = firstName }

        InputFamilyName familyName ->
            { model | familyName = familyName }


view : Model -> Html Msg
view model =
    div
        []
        [ section
            [ class "section" ]
            [ div
                [ class "container" ]
                [ div
                    [ class "column is-one-third" ]
                    [ div
                        [ class "field" ]
                        [ div
                            [ class "control" ]
                            [ input
                                [ type_ "text", placeholder "firstName", value model.firstName, onInput InputFirstName ]
                                []
                            ]
                        ]
                    , div
                        [ class "field" ]
                        [ div
                            [ class "control" ]
                            [ input
                                [ type_ "text", placeholder "familyName", value model.familyName, onInput InputFamilyName ]
                                []
                            ]
                        ]
                    ]
                ]
            ]
        ]
