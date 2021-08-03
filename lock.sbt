// DON'T EDIT THIS FILE.
// This file is auto generated by sbt-lock 0.6.2.
// https://github.com/tkawachi/sbt-lock/
dependencyOverrides in Compile ++= {
  if (!(sbtLockHashIsUpToDate in ThisBuild).value && sbtLockIgnoreOverridesOnStaleHash.value) {
    Seq.empty
  } else {
    Seq(
      "ch.qos.logback" % "logback-classic" % "1.2.3",
      "ch.qos.logback" % "logback-core" % "1.2.3",
      "com.atlassian.jwt" % "jwt-api" % "2.0.5",
      "com.atlassian.jwt" % "jwt-core" % "2.0.5",
      "com.auth0" % "java-jwt" % "3.11.0",
      "com.carrotsearch" % "hppc" % "0.7.1",
      "com.fasterxml.jackson.core" % "jackson-annotations" % "2.10.5",
      "com.fasterxml.jackson.core" % "jackson-core" % "2.10.5",
      "com.fasterxml.jackson.core" % "jackson-databind" % "2.10.5",
      "com.fasterxml.jackson.dataformat" % "jackson-dataformat-cbor" % "2.10.4",
      "com.fasterxml.jackson.dataformat" % "jackson-dataformat-smile" % "2.8.10",
      "com.fasterxml.jackson.dataformat" % "jackson-dataformat-yaml" % "2.8.10",
      "com.fasterxml.jackson.datatype" % "jackson-datatype-jdk8" % "2.10.5",
      "com.fasterxml.jackson.datatype" % "jackson-datatype-jsr310" % "2.10.5",
      "com.fasterxml.jackson.module" % "jackson-module-parameter-names" % "2.10.4",
      "com.fasterxml.jackson.module" % "jackson-module-paranamer" % "2.10.4",
      "com.fasterxml.jackson.module" % "jackson-module-scala_2.12" % "2.10.4",
      "com.github.ben-manes.caffeine" % "caffeine" % "2.8.4",
      "com.github.ben-manes.caffeine" % "jcache" % "2.8.4",
      "com.github.etaty" % "rediscala_2.12" % "1.9.0",
      "com.github.jnr" % "jffi" % "1.2.17",
      "com.github.jnr" % "jnr-a64asm" % "1.0.0",
      "com.github.jnr" % "jnr-ffi" % "2.1.9",
      "com.github.jnr" % "jnr-x86asm" % "1.0.2",
      "com.github.scribejava" % "scribejava-apis" % "6.9.0",
      "com.github.scribejava" % "scribejava-core" % "6.9.0",
      "com.github.spullara.mustache.java" % "compiler" % "0.9.3",
      "com.github.stephenc.jcip" % "jcip-annotations" % "1.0-1",
      "com.google.code.findbugs" % "jsr305" % "3.0.2",
      "com.google.code.gson" % "gson" % "2.8.6",
      "com.google.errorprone" % "error_prone_annotations" % "2.3.4",
      "com.google.guava" % "failureaccess" % "1.0.1",
      "com.google.guava" % "guava" % "28.2-jre",
      "com.google.guava" % "listenablefuture" % "9999.0-empty-to-avoid-conflict-with-guava",
      "com.google.j2objc" % "j2objc-annotations" % "1.3",
      "com.lambdaworks" % "scrypt" % "1.4.0",
      "com.mohiva" % "play-silhouette-crypto-jca_2.12" % "7.0.0",
      "com.mohiva" % "play-silhouette_2.12" % "7.0.0",
      "com.nimbusds" % "nimbus-jose-jwt" % "4.41.1",
      "com.squareup.okhttp3" % "okhttp" % "3.9.0",
      "com.squareup.okio" % "okio" % "1.13.0",
      "com.sun.mail" % "javax.mail" % "1.5.6",
      "com.tdunning" % "t-digest" % "3.0",
      "com.thoughtworks.paranamer" % "paranamer" % "2.8",
      "com.typesafe" % "config" % "1.4.0",
      "com.typesafe" % "ssl-config-core_2.12" % "0.4.2",
      "com.typesafe.akka" % "akka-actor-typed_2.12" % "2.6.8",
      "com.typesafe.akka" % "akka-actor_2.12" % "2.6.8",
      "com.typesafe.akka" % "akka-http-core_2.12" % "10.1.12",
      "com.typesafe.akka" % "akka-parsing_2.12" % "10.1.12",
      "com.typesafe.akka" % "akka-protobuf-v3_2.12" % "2.6.8",
      "com.typesafe.akka" % "akka-serialization-jackson_2.12" % "2.6.8",
      "com.typesafe.akka" % "akka-slf4j_2.12" % "2.6.8",
      "com.typesafe.akka" % "akka-stream_2.12" % "2.6.8",
      "com.typesafe.play" % "build-link" % "2.8.5",
      "com.typesafe.play" % "cachecontrol_2.12" % "2.0.0",
      "com.typesafe.play" % "filters-helpers_2.12" % "2.8.5",
      "com.typesafe.play" % "play-ahc-ws-standalone_2.12" % "2.1.2",
      "com.typesafe.play" % "play-ahc-ws_2.12" % "2.8.5",
      "com.typesafe.play" % "play-akka-http-server_2.12" % "2.8.5",
      "com.typesafe.play" % "play-cache_2.12" % "2.8.5",
      "com.typesafe.play" % "play-caffeine-cache_2.12" % "2.8.5",
      "com.typesafe.play" % "play-exceptions" % "2.8.5",
      "com.typesafe.play" % "play-functional_2.12" % "2.9.1",
      "com.typesafe.play" % "play-json-joda_2.12" % "2.7.4",
      "com.typesafe.play" % "play-json_2.12" % "2.9.1",
      "com.typesafe.play" % "play-logback_2.12" % "2.8.5",
      "com.typesafe.play" % "play-openid_2.12" % "2.8.1",
      "com.typesafe.play" % "play-server_2.12" % "2.8.5",
      "com.typesafe.play" % "play-streams_2.12" % "2.8.5",
      "com.typesafe.play" % "play-ws-standalone-json_2.12" % "2.1.2",
      "com.typesafe.play" % "play-ws-standalone-xml_2.12" % "2.1.2",
      "com.typesafe.play" % "play-ws-standalone_2.12" % "2.1.2",
      "com.typesafe.play" % "play-ws_2.12" % "2.8.5",
      "com.typesafe.play" % "play_2.12" % "2.8.5",
      "com.typesafe.play" % "shaded-asynchttpclient" % "2.1.2",
      "com.typesafe.play" % "shaded-oauth" % "2.1.2",
      "com.typesafe.play" % "twirl-api_2.12" % "1.5.0",
      "com.vividsolutions" % "jts" % "1.13",
      "com.zaxxer" % "HikariCP" % "3.2.0",
      "commons-beanutils" % "commons-beanutils" % "1.9.2",
      "commons-codec" % "commons-codec" % "1.14",
      "commons-collections" % "commons-collections" % "3.2.2",
      "commons-digester" % "commons-digester" % "1.8.1",
      "commons-logging" % "commons-logging" % "1.2",
      "commons-validator" % "commons-validator" % "1.6",
      "dev.paseto" % "jpaseto-api" % "0.6.0",
      "dev.paseto" % "jpaseto-gson" % "0.6.0",
      "dev.paseto" % "jpaseto-impl" % "0.6.0",
      "dev.paseto" % "jpaseto-sodium" % "0.6.0",
      "io.dropwizard.metrics" % "metrics-core" % "4.1.12.1",
      "io.dropwizard.metrics" % "metrics-healthchecks" % "4.1.9",
      "io.jaegertracing" % "jaeger-client" % "0.32.0",
      "io.jaegertracing" % "jaeger-core" % "0.32.0",
      "io.jaegertracing" % "jaeger-thrift" % "0.32.0",
      "io.jaegertracing" % "jaeger-tracerresolver" % "0.32.0",
      "io.jsonwebtoken" % "jjwt" % "0.9.1",
      "io.netty" % "netty-buffer" % "4.1.16.Final",
      "io.netty" % "netty-codec" % "4.1.16.Final",
      "io.netty" % "netty-codec-http" % "4.1.16.Final",
      "io.netty" % "netty-common" % "4.1.16.Final",
      "io.netty" % "netty-handler" % "4.1.16.Final",
      "io.netty" % "netty-resolver" % "4.1.16.Final",
      "io.netty" % "netty-transport" % "4.1.16.Final",
      "io.opentracing" % "opentracing-api" % "0.31.0",
      "io.opentracing" % "opentracing-noop" % "0.31.0",
      "io.opentracing" % "opentracing-util" % "0.31.0",
      "io.opentracing.contrib" % "opentracing-tracerresolver" % "0.1.5",
      "jakarta.activation" % "jakarta.activation-api" % "1.2.2",
      "jakarta.transaction" % "jakarta.transaction-api" % "1.3.3",
      "jakarta.xml.bind" % "jakarta.xml.bind-api" % "2.3.3",
      "javax.activation" % "activation" % "1.1",
      "javax.cache" % "cache-api" % "1.1.1",
      "javax.inject" % "javax.inject" % "1",
      "joda-time" % "joda-time" % "2.10.1",
      "log4j" % "log4j" % "1.2.17",
      "net.logstash.logback" % "logstash-logback-encoder" % "4.11",
      "net.minidev" % "accessors-smart" % "1.2",
      "net.minidev" % "json-smart" % "2.3",
      "net.sf.jopt-simple" % "jopt-simple" % "5.0.2",
      "nl.grons" % "metrics4-scala_2.12" % "4.1.9",
      "nu.validator.htmlparser" % "htmlparser" % "1.4",
      "org.apache.commons" % "commons-email" % "1.5",
      "org.apache.commons" % "commons-lang3" % "3.8.1",
      "org.apache.httpcomponents" % "httpasyncclient" % "4.1.2",
      "org.apache.httpcomponents" % "httpclient" % "4.5.2",
      "org.apache.httpcomponents" % "httpcore" % "4.4.5",
      "org.apache.httpcomponents" % "httpcore-nio" % "4.4.5",
      "org.apache.logging.log4j" % "log4j-api" % "2.9.1",
      "org.apache.logging.log4j" % "log4j-core" % "2.9.1",
      "org.apache.lucene" % "lucene-analyzers-common" % "7.2.1",
      "org.apache.lucene" % "lucene-backward-codecs" % "7.2.1",
      "org.apache.lucene" % "lucene-core" % "7.2.1",
      "org.apache.lucene" % "lucene-grouping" % "7.2.1",
      "org.apache.lucene" % "lucene-highlighter" % "7.2.1",
      "org.apache.lucene" % "lucene-join" % "7.2.1",
      "org.apache.lucene" % "lucene-memory" % "7.2.1",
      "org.apache.lucene" % "lucene-misc" % "7.2.1",
      "org.apache.lucene" % "lucene-queries" % "7.2.1",
      "org.apache.lucene" % "lucene-queryparser" % "7.2.1",
      "org.apache.lucene" % "lucene-sandbox" % "7.2.1",
      "org.apache.lucene" % "lucene-spatial" % "7.2.1",
      "org.apache.lucene" % "lucene-spatial-extras" % "7.2.1",
      "org.apache.lucene" % "lucene-spatial3d" % "7.2.1",
      "org.apache.lucene" % "lucene-suggest" % "7.2.1",
      "org.apache.thrift" % "libthrift" % "0.11.0",
      "org.apache.tika" % "tika-core" % "1.25",
      "org.apache.tuweni" % "tuweni-bytes" % "0.10.0",
      "org.apache.tuweni" % "tuweni-crypto" % "0.10.0",
      "org.apache.tuweni" % "tuweni-io" % "0.10.0",
      "org.apache.tuweni" % "tuweni-units" % "0.10.0",
      "org.bouncycastle" % "bcpkix-jdk15on" % "1.60",
      "org.bouncycastle" % "bcprov-jdk15on" % "1.60",
      "org.checkerframework" % "checker-qual" % "3.4.0",
      "org.elasticsearch" % "elasticsearch" % "6.2.4",
      "org.elasticsearch" % "elasticsearch-cli" % "6.2.4",
      "org.elasticsearch" % "elasticsearch-core" % "6.2.4",
      "org.elasticsearch" % "jna" % "4.5.1",
      "org.elasticsearch" % "securesm" % "1.2",
      "org.elasticsearch.client" % "elasticsearch-rest-client" % "6.2.4",
      "org.elasticsearch.client" % "transport" % "6.2.4",
      "org.elasticsearch.plugin" % "lang-mustache-client" % "6.2.4",
      "org.elasticsearch.plugin" % "parent-join-client" % "6.2.4",
      "org.elasticsearch.plugin" % "percolator-client" % "6.2.4",
      "org.elasticsearch.plugin" % "rank-eval-client" % "6.2.4",
      "org.elasticsearch.plugin" % "reindex-client" % "6.2.4",
      "org.elasticsearch.plugin" % "transport-netty4-client" % "6.2.4",
      "org.flywaydb" % "flyway-core" % "5.0.7",
      "org.hdrhistogram" % "HdrHistogram" % "2.1.9",
      "org.jsoup" % "jsoup" % "1.13.1",
      "org.locationtech.spatial4j" % "spatial4j" % "0.6",
      "org.lz4" % "lz4-java" % "1.7.1",
      "org.ow2.asm" % "asm" % "5.0.4",
      "org.ow2.asm" % "asm-analysis" % "5.0.3",
      "org.ow2.asm" % "asm-commons" % "5.0.3",
      "org.ow2.asm" % "asm-tree" % "5.0.3",
      "org.ow2.asm" % "asm-util" % "5.0.3",
      "org.owasp.encoder" % "encoder" % "1.2.1",
      "org.postgresql" % "postgresql" % "42.2.4",
      "org.reactivestreams" % "reactive-streams" % "1.0.3",
      "org.scala-lang.modules" % "scala-java8-compat_2.12" % "0.9.1",
      "org.scala-lang.modules" % "scala-parser-combinators_2.12" % "1.1.2",
      "org.scala-lang.modules" % "scala-xml_2.12" % "1.2.0",
      "org.scala-stm" % "scala-stm_2.12" % "0.9.1",
      "org.scalactic" % "scalactic_2.12" % "3.1.4",
      "org.slf4j" % "jcl-over-slf4j" % "1.7.30",
      "org.slf4j" % "jul-to-slf4j" % "1.7.30",
      "org.slf4j" % "slf4j-api" % "1.7.30",
      "org.yaml" % "snakeyaml" % "1.17"
    )
  }
}
// LIBRARY_DEPENDENCIES_HASH a8155a25c7e7032c39904d87514fa1c85d054162
