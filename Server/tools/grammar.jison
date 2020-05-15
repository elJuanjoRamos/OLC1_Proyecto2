%{
    const {Tree}                    = require('./components/Tree');
    const {DataType}                = require('./components/DataType');
    const {Declaration}             = require('./components/Declaration');
    const {Assignation}             = require('./components/Assignation');
    const {Expression}              = require('./components/Expression');
    const {Class}                   = require('./components/Class');
    const {Import}                  = require('./components/Import');
    const {If}                      = require('./components/If');
    const {Else}                    = require('./components/Else');
    const {Identifier}              = require('./components/Identifier');
    const {Switch}                  = require('./components/Switch');
    const {Case}                    = require('./components/Case');
    const {Default}                 = require('./components/Default');
    const {While}                   = require('./components/While');
    const {DoWhile}                 = require('./components/DoWhile');
    const {For}                     = require('./components/For');
    const {Increment}               = require('./components/Increment');
    const {Decrement}               = require('./components/Decrement');
    const {Break}                   = require('./components/Break');
    const {Continue}                = require('./components/Continue');
    const {Return}                  = require('./components/Return');
    const {Comment}                 = require('./components/Comment');
    const {Function}                = require('./components/Function');
    const {Print}                   = require('./components/Print');
    const {CallFunction}            = require('./components/CallFunction');
    const {ArithmeticExpression}    = require('./components/ArithmeticExpression');
    const {LogicExpression}         = require('./components/LogicExpression');
    const {RelationalExpression}    = require('./components/RelationalExpression');
    const {Exception}               = require('./components/Exception');
    
%}
%lex
%options case-insensitive
number                  [0-9]+
decimal                 [0-9][0-9]* "."[0-9][0-9]*
stringliteral           (\"[^"]*\")
charliteral             (\'[a-zA-Z_]\')
identifier              ([a-zA-Z_])[a-zA-Z0-9_]*
BR                      \r\n|\n|\r
multilinecomment        "/*"(.|\n|\r)*?"*/"
linecomment             ("/""/")("/")*(.|{identifier}|{number}|{decimal}|{stringliteral})*

%%

\s+                   /* skip whitespace */

{decimal}             return 'decimal' 
{number}              return 'number' 
{stringliteral}       return 'STRING_LITERAL'
{multilinecomment}    return 'multilinecomment'
{charliteral}         return 'char_literal'
{linecomment}         return 'linecomment'

"*"                   return '*'
"/"                   return '/'
";"                   return ';'
":"                   return ':'
"."                   return '.'
"-"                   return '-'
"+"                   return '+'
"*"                   return '*'
"<"                   return '<'
">"                   return '>'
"<="                  return '<='
">="                  return '>='
"=="                  return '=='
"!="                  return '!='
"||"                  return '||'
"&&"                  return '&&'
"!"                   return '!'
"="                   return '='
","                   return ','
"("                   return '('
")"                   return ')'  
"["                   return '['
"]"                   return ']'
"{"                   return '{'
"}"                   return '}'
"import"              return 'import'
"class"               return 'class'
"System"              return 'System'  
"out"                 return 'out'  
"println"             return 'println'  
"for"                 return 'for'  
"true"                return 'true'
"false"               return 'false'
"print"               return 'print'
"main"                return 'main'
"if"                  return 'if'
"else"                return 'else'
"break"               return 'break'
"continue"            return 'continue'
"return"              return 'return'
"switch"              return 'switch'
"default"             return 'default'
"case"                return 'case'
"void"                return 'void'  
"do"                  return 'do'
"while"               return 'while'
"int"                 return 'int'
"String"              return 'String'
"boolean"             return 'boolean'
"char"                return 'char'
"double"              return 'double'
{identifier}          return 'identifier'
<<EOF>>	              return 'EOF'

/lex
%left 'else'
%left '||'
%left '&&'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+' '-'
%left '*' '/'
%right '!'
%left UMENOS

%start INIT

%%

INIT 
    : CLASS EOF             {$$ = new Tree($1); return $$;}    
    ;

/*INIT     
    :                       { $$ = ''; console.log("empty"); } 
    | INSTRUCCIONS EOF      {$$ = new Tree($1); return $$;}
    ;*/

//INSTRUCCIONES GLOBALES
INSTRUCCIONS 
    : INSTRUCCIONS DECLARATION_TYPE   { $$ = $1; $$.push($2); }
    | DECLARATION_TYPE                { $$ = [$1]; }
    ;


//INSTRUCCIONES EN FUNCION O METODO
INSTRUCCIONS2 
    : INSTRUCCIONS2 DECLARATION_TYPE_FUNCTION   { $$ = $1; $$.push($2); }
    | DECLARATION_TYPE_FUNCTION                 { $$ = [$1]; }
    ;



//GLOBALES
DECLARATION_TYPE
    : DECLARATION       {$$ = $1;}
    | ASIGNATION        {$$ = $1;}
    | IF                {$$ = $1;}
    | COMMENTS          {$$ = $1;}
    | WHILE             {$$ = $1;}
    | DOWHILE           {$$ = $1;}
    | PRINT             {$$ = $1;}
    | FOR               {$$ = $1;}
    | SWITCH            {$$ = $1;}
    | VOID_METHOD       {$$ = $1;}
    | 'continue' ';'    {$$ = new Continue($1, this._$.first_line, this._$.first_column);}
    | 'break' ';'       {$$ = new Break($1, this._$.first_line, this._$.first_column);}
    | 'return' RETURN   {$$ = new Return( $1, $2, this._$.first_line, this._$.first_column);}
    | error             {$$ = new Exception(yytext, "ERROR SINTACTICO: " + yytext + " en linea: " + (this._$.first_line) 
                                                    + ", columna: " +  this._$.last_column, this._$.first_line, this._$.first_column)}
    
    ;


//NIVEL DE METODO O FUNCION
DECLARATION_TYPE_FUNCTION 
    : DECLARATION2      {$$ = $1;}
    | ASIGNATION3       {$$ = $1;}
    | IF                {$$ = $1;}
    | COMMENTS          {$$ = $1;}
    | WHILE             {$$ = $1;}
    | DOWHILE           {$$ = $1;}
    | PRINT             {$$ = $1;}
    | FOR               {$$ = $1;}
    | SWITCH            {$$ = $1;}
    | 'continue' ';'    {$$ = new Continue($1, this._$.first_line, this._$.first_column);}
    | 'break' ';'       {$$ = new Break($1, this._$.first_line, this._$.first_column);}
    | 'return' RETURN   {$$ = new Return( $1, $2, this._$.first_line, this._$.first_column);}
    | error             {$$ = new Exception(yytext, "ERROR SINTACTICO: " + yytext + " en linea: " + (this._$.first_line) 
                                                    + ", columna: " +  this._$.last_column, this._$.first_line, this._$.first_column)}
    ;


ERROR 
    : '}'
    | ';'        
    | ')'        
    | '{'        
    | '('        
    ;

/*SECCION CLASS*/
CLASS 
    : IMPORTS 'class' identifier '{' INSTRUCCIONS '}' {$$ = new Class($3, $5, $1);} 
    ;
RETURN 
    : EXPRESION ';'     {$$ = $1;}
    | ';'               {$$ = [];}
    ;

/* SECCION IMPORT */


IMPORTS 
    : IMPORT                                {$$ = [$1];}
    | /*EPSILON*/                           {$$ = null;}
    ;
IMPORT 
    : 'import' identifier ';' MORE_IMPORTS  {$$ = new Import($2,  this._$.first_line, this._$.first_column);}
    ;
MORE_IMPORTS 
    : 'import' identifier ';' MORE_IMPORTS  {$$ = new Import($2,  this._$.first_line, this._$.first_column);}
    | //EPSILON
    ;


TYPE : 'int'        {$$ = new DataType('int');}
     | 'String'     {$$ = new DataType('string');}
     | 'boolean'    {$$ = new DataType('boolean');}
     | 'char'       {$$ = new DataType('char');}
     | 'double'     {$$ = new DataType('double');}
     ;

/* SECCION COMENTARIO*/
COMMENTS 
    : linecomment       {$$ = new Comment('Line', this._$.first_line, this._$.first_column);} 
    | multilinecomment  {$$ = new Comment('Multi line', this._$.first_line, this._$.first_column);} 
    ;

/* VARIABLES */

DECLARATION 
    : TYPE identifier VALUE              ';'     {$$ = new Declaration($1, $2, $3, this._$.first_line, this._$.first_column);}  
    | TYPE identifier '(' PARAMETERS ')'        '{' INSTRUCCIONS '}' {$$ = new Function($1, $2, [$4], $7, this._$.first_line, this._$.first_column);} 
    ;


DECLARATION2 
    : TYPE identifier VALUE             ';'      {$$ = new Declaration($1, $2, $3, this._$.first_line, this._$.first_column);}  
    ;

VALUE 
    : '=' EXPRESION MORE_VALUES     {$$ = $2}
    | ',' MORE_ELEMENTS             {$$ = null;}
    | /*epsilon*/                   {$$ = null;}
    ;



MORE_VALUES
    : ',' MORE_ELEMENTS   
    | //epsilon
    ;




ASIGNATION 
    : identifier '=' EXPRESION  ';'              {$$ = new Assignation($1, $3, this._$.first_line, this._$.first_column);}
    | identifier '(' FUNCTION_PARAMETERS ')' ';' {$$ = new CallFunction($1, [$3], this._$.first_line, this._$.first_column);}
    ;


ASIGNATION3 
    : identifier '=' EXPRESION  ';'              {$$ = new Assignation($1, $3, this._$.first_line, this._$.first_column);}
    ;

MORE_ELEMENTS 
    : ASIGNATION2 MORE_ELEMENTS2             
    ;

MORE_ELEMENTS2
    : ',' MORE_ELEMENTS
    | //epsilon                                 
    ;
ASIGNATION2 
    : identifier '=' EXPRESION                   {$$ = new Assignation($1, $3, this._$.first_line, this._$.first_column);}
    | identifier                                 {$$ = new Assignation($1, null, this._$.first_line, this._$.first_column);}
    ;


/*SECCION METODOS Y FUNCIONES*/
PARAMETERS 
    : PARAMETER
    | /*EPSILON*/                           {$$ = null;}
    ;

PARAMETER 
    : TYPE identifier MORE_PARAMETER        {$$ = new Declaration($1, $2, null, this._$.first_line, this._$.first_column);}
    ;
MORE_PARAMETER 
    : ',' TYPE identifier MORE_PARAMETER    {$$ = new Declaration($2, $3, null, this._$.first_line, this._$.first_column);}
    | //EPSILON
    ;

FUNCTION_PARAMETERS 
    : FUNCTION_PARAMETER                        {$$ = $1;}
    ;

FUNCTION_PARAMETER 
    : identifier MORE_FUNCTION_PARAMETER         {$$ = new Identifier($1, this._$.first_line, this._$.first_column);}
    | /*EPSILON*/                                {$$ = null;}
    ;
MORE_FUNCTION_PARAMETER 
    : ',' identifier  MORE_FUNCTION_PARAMETER
    | /*EPSILON*/                                
    ;

/* SECCION METODO*/
VOID_METHOD 
    : 'void' 'main' '('  ')'     '{' INSTRUCCIONS '}'    {$$ = new Function('void', 'main', [], $6, this._$.first_line, this._$.first_column);} 
    | 'void' identifier '(' PARAMETERS ')' '{' INSTRUCCIONS '}'    {$$ = new Function('void', $2, [$4], $7, this._$.first_line, this._$.first_column);}
    ;

/*SECCION IF*/

IF : 'if' IF_CONDITION INSTRUCCIONS_BLOCK                           {$$ = new If($2, $3, [], this._$.first_line, this._$.first_column);}
   | 'if' IF_CONDITION INSTRUCCIONS_BLOCK 'else' INSTRUCCIONS_BLOCK {$$ = new If($2, $3, [new Else($5,this._$.first_line, this._$.first_column)], this._$.first_line, this._$.first_column);}
   | 'if' IF_CONDITION INSTRUCCIONS_BLOCK 'else' IF                 {$$ = new If($2, $3, [$5], this._$.first_line, this._$.first_column);}
   ;

IF_CONDITION 
    : '(' EXPRESION ')' {$$ = $2;}
    ;

INSTRUCCIONS_BLOCK 
    : '{' INSTRUCCIONS2 '}' {$$ = $2;}
    | '{' '}' {$$ = [];}
    ;

/* SECCION WHILE*/

WHILE : 'while' IF_CONDITION INSTRUCCIONS_BLOCK {$$ = new While($2, $3, this._$.first_line, this._$.first_column);}
      ;

/* SECCION DO WHILE*/

DOWHILE 
    : 'do'  INSTRUCCIONS_BLOCK 'while' IF_CONDITION ';' {$$ = new DoWhile($2, $4, this._$.first_line, this._$.first_column);}
    ;

/* SECCION FOR*/

FOR 
    : 'for' '(' TYPE_FOR ';' EXPRESION ';' INCREMENT_DECREMENT  ')' INSTRUCCIONS_BLOCK  {$$ = new For($3, $5, $7, $9, this._$.first_line, this._$.first_column);}
    ;

TYPE_FOR 
    : ASIGNATION_FOR  {$$ = $1;}  
    | DECLARATION_FOR {$$ = $1;}
    ;

DECLARATION_FOR 
    : TYPE identifier  '=' EXPRESION        {$$ = new Declaration($1, $2, $4, this._$.first_line, this._$.first_column);}
    ;
ASIGNATION_FOR : identifier '=' EXPRESION   {$$ = new Assignation($1, $3, this._$.first_line, this._$.first_column);}
    ;

INCREMENT_DECREMENT 
    : identifier '+' '+'        {$$ = new Increment($1, $2, $3, this._$.first_line, this._$.first_column);}
    | identifier '-' '-'        {$$ = new Decrement($1, $2, $3, this._$.first_line, this._$.first_column);}
    | identifier '*' '-' number {$$ = [];}
    ;

/* SECCION SWITCH*/

SWITCH
    : 'switch' IF_CONDITION '{'  CASE DEFAULT  '}' {$$ = new Switch($2, [$4], $5, this._$.first_line, this._$.first_column);}
    ;

CASE 
    : 'case' EXPRESION ':' INSTRUCCIONS 'break' ';' MORE_CASES {$$ = new Case($2, $4, this._$.first_line, this._$.first_column);}
    ;

MORE_CASES
    : CASE
    | //epsilon
    ;
DEFAULT 
    : 'default' ':' INSTRUCCIONS {$$ = new Default($3, this._$.first_line, this._$.first_column);}
    ;


/* SECCION PRINT */
PRINT
    : 'System' '.' 'out' '.' TYPE_PRINT { $$ = $5 }
    ;
TYPE_PRINT
    : 'print'   '(' EXPRESION ')' ';'   {$$ = new Print($3, this._$.first_line, this._$.first_column);}
    | 'println' '(' EXPRESION ')' ';'   {$$ = new Print($3, this._$.first_line, this._$.first_column);}
    ;

/*  SECCION LLAMADA A FUNCIONES */
CALL_FUNCTION 
    : identifier '(' PARAMETERS ')' ';'
    ;

EXPRESION 
    : '-' EXPRESION %prec UMENOS	       { $$ = new ArithmeticExpression($1, null, '-', this._$.first_line, this._$.first_column); }
    | EXPRESION '+' EXPRESION		       { $$ = new ArithmeticExpression($1, $3, '+', this._$.first_line, this._$.first_column); }
    | EXPRESION '-' EXPRESION		       { $$ = new ArithmeticExpression($1, $3, '-', this._$.first_line, this._$.first_column); }
    | EXPRESION '*' EXPRESION		       { $$ = new ArithmeticExpression($1, $3, '*', this._$.first_line, this._$.first_column); }
    | EXPRESION '/' EXPRESION	           { $$ = new ArithmeticExpression($1, $3, '/', this._$.first_line, this._$.first_column); }
    
    | '<''='                  	           { $$ = new RelationalExpression(null, null, '<=', this._$.first_line, this._$.first_column); }
    
    
    | EXPRESION '>=' EXPRESION	           { $$ = new RelationalExpression($1, $3, '>=',this._$.first_line, this._$.first_column); }
    | EXPRESION '<=' EXPRESION	           { $$ = new RelationalExpression($1, $3, '<=', this._$.first_line, this._$.first_column); }
    | EXPRESION '<' EXPRESION		       { $$ = new RelationalExpression($1, $3, '<', this._$.first_line, this._$.first_column); }
    | EXPRESION '>' EXPRESION		       { $$ = new RelationalExpression($1, $3, '>', this._$.first_line, this._$.first_column); }
    | EXPRESION '==' EXPRESION	           { $$ = new RelationalExpression($1, $3, '==', this._$.first_line, this._$.first_column); }
    | EXPRESION '!=' EXPRESION	           { $$ = new RelationalExpression($1, $3, '!=', this._$.first_line, this._$.first_column); }
    | '!' EXPRESION	                       { $$ = new LogicExpression($2, null, '!', this._$.first_line, this._$.first_column); }
    | EXPRESION '||' EXPRESION	           { $$ = new LogicExpression($1, $3, '||', this._$.first_line, this._$.first_column); }
    | EXPRESION '&&' EXPRESION	           { $$ = new LogicExpression($1, $3, '&&', this._$.first_line, this._$.first_column); }
    | 'decimal'				               { $$ = new Expression(new DataType('double'), Number($1), this._$.first_line, this._$.first_column); }
    | 'number'				               { $$ = new Expression(new DataType('int'), Number($1), this._$.first_line, this._$.first_column); }
    | 'true'				               { $$ = new Expression(new DataType('boolean'), true, this._$.first_line, this._$.first_column); }
    | 'false'				               { $$ = new Expression(new DataType('boolean'), false, this._$.first_line, this._$.first_column); }
    | STRING_LITERAL			           { $$ = new Expression(new DataType('string'), $1.replace(/\"/g,""), this._$.first_line, this._$.first_column); }
    | char_literal			               { $$ = new Expression(new DataType('char'), $1.replace(/\'/g,""), this._$.first_line, this._$.first_column); }*/
    | identifier		                   { $$ = new Identifier($1, this._$.first_line, this._$.first_column); }
    | '(' EXPRESION ')'		               { $$ = $2; }                          
    ;
