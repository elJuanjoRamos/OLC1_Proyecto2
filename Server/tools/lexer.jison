ID              [a-zA-Z_][a-zA-Z0-9_-]*
NUMBER          [0-9][0-9]* ("."[0-9][0-9]*)*
DECIMAL          [0-9][0-9]* "."[0-9][0-9]*
BR              \r\n|\n|\r

%%

"/*"(.|\n|\r)*?"*/"                                                         return 'COMENTARIO_MULTI_LINEA'
("/""/")("/")*(.|{identifier}|{number}|{decimal}|{stringliteral})*          return 'COMENTARIO_LINEA';

{BR}+                           /* */
\s+                             /* */


{ID}                            return 'ID';
{DECIMAL}                       return 'DECIMAL';
{NUMBER}                        return 'NUMBER';
{BR}+                           return 'SCAPE';
\"("\\\\"|'\"'|[^"])*\"         yytext = yytext.replace(/\\"/g,'"'); return 'CADENA';
"'"("\\\\"|"\'"|[^'])*"'"       yytext = yytext.replace(/\\'/g,"'"); return 'CHAR';
"|"                             return 'PLECA';
"="                             return 'IGUAL';
"_"                             return 'GUION_BAJO';
"("                             return 'PAR_IZ';
")"                             return 'PAR_DER';
"+"                             return 'MAS';
"-"                             return 'MENOS';
"*"                             return 'POR';
"^"                             return 'POTENCIA';
"%"                             return 'PORCENTAJE';
"?"                             return 'INTERROGACION';
","                             return 'COMA';
";"                             return 'PUNTO_Y_COMA';
"<<EOF>>"                       return '$';
"<"                             return 'MENOR_QUE';
">"                             return 'MAYOR_QUE';
"/!"                            return '/!';
"/"                             return '/';
"\\"([0-7]{1,3}|[rfntvsSbBwWdD\\*+()${}|[\]\/.^?]|"c"[A-Z]|"x"[0-9A-F]{2}|"u"[a-fA-F0-9]{4})      return 'ESCAPE_CHAR';
"\\".                           yytext = yytext.replace(/^\\/g,''); return 'ESCAPE_CHAR';
"."                             return 'PUNTO';
"{"                             return 'LLAVE_IZ';
"}"                             return 'LLAVE_DER';
"!"                             return 'EXCLAMACION';
"&"                             return 'ROMANA'
":"                             return 'DOS PUNTOS';
"["                             return 'PAR_IZ';
"]"                             return 'PAR_DER';
'"'                             return 'COMILLA';
"'"                             return 'COMILLA_SIMPLE'
.                               return 'LEXICAL_ERROR'
<*><<EOF>>                      return 'EOF';
%%
