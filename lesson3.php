<?php
/**
 * регулярные выражения
 *http://www.regexr.com/
 * */

$string = 'The quick brown between this fox jumped over between this fox the lazy between this fox dog.';

$patterns = array();
$patterns[0] = '/quick/';
$patterns[1] = '/brown/';
$patterns[2] = '/fox/';
$replacements = array();
$replacements[2] = 'bear';
$replacements[1] = 'black';
$replacements[0] = 'slow';
echo preg_replace($patterns, $replacements, $string);
echo $string;


preg_match('/between\s(.*?)\sfox/',$string,$result);
print_r($result);


preg_match_all('/between\s(.*?)\sfox/',$string,$result);
print_r($result);
/***
"The bear black between this slow jumped over between this slow the lazy between this slow dog.The quick brown between this fox jumped over between this fox the lazy between this fox dog.Array
(
    [0] => between this fox
    [1] => this
)
Array
(
    [0] => Array
        (
            [0] => between this fox
            [1] => between this fox
            [2] => between this fox
        )

    [1] => Array
        (
            [0] => this
            [1] => this
            [2] => this
        )

)"*/
?>
<script>
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    var regexp = /[A-E]/gi;

    var matches = str.match(regexp);

    console.log(matches);
/**
 * ["A", "B", "C", "D", "E", "a", "b", "c", "d", "e"]
 * **/
</script>