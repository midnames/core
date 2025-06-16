::: head
[![W3C](https://www.w3.org/StyleSheets/TR/2021/logos/W3C){crossorigin=""
height="48" width="72"}](https://www.w3.org/){.logo}

# Decentralized Identifiers (DIDs) v1.0 {#title .title}

## Core architecture, data model, and representations {#subtitle .subtitle}

[W3C Recommendation](https://www.w3.org/standards/types#REC) 19 July
2022

More details about this document

This version:
:   [https://www.w3.org/TR/2022/REC-did-core-20220719/](https://www.w3.org/TR/2022/REC-did-core-20220719/){.u-url}

Latest published version:
:   <https://www.w3.org/TR/did-core/>

Latest editor\'s draft:
:   <https://w3c.github.io/did-core/>

History:
:   <https://www.w3.org/standards/history/did-core>
:   [Commit history](https://github.com/w3c/did-core/commits/main)

Implementation report:
:   <https://w3c.github.io/did-test-suite/>

Editors:
:   [Manu Sporny](http://manu.sporny.org/){.u-url .url .p-name .fn}
    ([Digital Bazaar](https://digitalbazaar.com/){.p-org .org .h-org})
:   [Amy Guy](https://rhiaro.co.uk/){.u-url .url .p-name .fn} ([Digital
    Bazaar](https://digitalbazaar.com/){.p-org .org .h-org})
:   [Markus
    Sabadello](https://www.linkedin.com/in/markus-sabadello-353a0821){.u-url
    .url .p-name .fn} ([Danube Tech](https://danubetech.com/){.p-org
    .org .h-org})
:   [Drummond Reed](https://www.linkedin.com/in/drummondreed/){.u-url
    .url .p-name .fn} ([Evernym/Avast](https://www.evernym.com/){.p-org
    .org .h-org})

Authors:
:   [Manu Sporny](http://manu.sporny.org/){.u-url .url .p-name .fn}
    ([Digital Bazaar](https://digitalbazaar.com/){.p-org .org .h-org})
:   [Dave Longley](https://github.com/dlongley){.u-url .url .p-name .fn}
    ([Digital Bazaar](https://digitalbazaar.com/){.p-org .org .h-org})
:   [Markus
    Sabadello](https://www.linkedin.com/in/markus-sabadello-353a0821){.u-url
    .url .p-name .fn} ([Danube Tech](https://danubetech.com/){.p-org
    .org .h-org})
:   [Drummond Reed](https://www.linkedin.com/in/drummondreed/){.u-url
    .url .p-name .fn} ([Evernym/Avast](https://www.evernym.com/){.p-org
    .org .h-org})
:   [Orie Steele](https://www.linkedin.com/in/or13b/){.u-url .url
    .p-name .fn} ([Transmute](https://transmute.industries/){.p-org .org
    .h-org})
:   [Christopher Allen](https://www.linkedin.com/in/christophera){.u-url
    .url .p-name .fn} ([Blockchain
    Commons](https://www.BlockchainCommons.com){.p-org .org .h-org})

Feedback:
:   [GitHub w3c/did-core](https://github.com/w3c/did-core/) ([pull
    requests](https://github.com/w3c/did-core/pulls/), [new
    issue](https://github.com/w3c/did-core/issues/new/choose), [open
    issues](https://github.com/w3c/did-core/issues/))
:   [public-did-wg@w3.org](mailto:public-did-wg@w3.org?subject=%5Bdid-core%5D%20YOUR%20TOPIC%20HERE)
    with subject line [\[did-core\] *... message topic ...*]{.kbd}
    ([archives](https://lists.w3.org/Archives/Public/public-did-wg/){rel="discussion"})

Errata:
:   [Errata exists](https://w3c.github.io/did-core/errata.html).

Related Documents
:   [DID Use Cases and
    Requirements](https://www.w3.org/TR/did-use-cases/)
:   [DID Specification
    Registries](https://www.w3.org/TR/did-spec-registries/)
:   [DID Core Implementation
    Report](https://w3c.github.io/did-test-suite/)

See also
[**translations**](https://www.w3.org/Translations/?technology=did-core).

[Copyright](https://www.w3.org/Consortium/Legal/ipr-notice#Copyright) ©
2022 [W3C](https://www.w3.org/)^®^ ([MIT](https://www.csail.mit.edu/),
[ERCIM](https://www.ercim.eu/), [Keio](https://www.keio.ac.jp/),
[Beihang](https://ev.buaa.edu.cn/)). W3C
[liability](https://www.w3.org/Consortium/Legal/ipr-notice#Legal_Disclaimer),
[trademark](https://www.w3.org/Consortium/Legal/ipr-notice#W3C_Trademarks)
and [permissive document
license](https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document "W3C Software and Document Notice and License"){rel="license"}
rules apply.

------------------------------------------------------------------------
:::

::: {#abstract .section .introductory}
## Abstract

[Decentralized
identifiers](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-1
.internalDFN link-type="dfn"} (DIDs) are a new type of identifier that
enables verifiable, decentralized digital identity. A
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-2
.internalDFN link-type="dfn"} refers to any subject (e.g., a person,
organization, thing, data model, abstract entity, etc.) as determined by
the controller of the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-3
.internalDFN link-type="dfn"}. In contrast to typical, federated
identifiers,
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-4
.internalDFN link-type="dfn"} have been designed so that they may be
decoupled from centralized registries, identity providers, and
certificate authorities. Specifically, while other parties might be used
to help enable the discovery of information related to a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-5
.internalDFN link-type="dfn"}, the design enables the controller of a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-6
.internalDFN link-type="dfn"} to prove control over it without requiring
permission from any other party.
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-7
.internalDFN link-type="dfn"} are [URIs](#dfn-uri){#ref-for-dfn-uri-1
.internalDFN link-type="dfn"} that associate a [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-1 .internalDFN
link-type="dfn"} with a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-1 .internalDFN
link-type="dfn"} allowing trustable interactions associated with that
subject.

Each [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-2
.internalDFN link-type="dfn"} can express cryptographic material,
[verification
methods](#dfn-verification-method){#ref-for-dfn-verification-method-1
.internalDFN link-type="dfn"}, or
[services](#dfn-service){#ref-for-dfn-service-1 .internalDFN
link-type="dfn"}, which provide a set of mechanisms enabling a [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-1
.internalDFN link-type="dfn"} to prove control of the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-8
.internalDFN link-type="dfn"}.
[Services](#dfn-service){#ref-for-dfn-service-2 .internalDFN
link-type="dfn"} enable trusted interactions associated with the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-2 .internalDFN
link-type="dfn"}. A
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-9
.internalDFN link-type="dfn"} might provide the means to return the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-3 .internalDFN
link-type="dfn"} itself, if the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-4 .internalDFN
link-type="dfn"} is an information resource such as a data model.

This document specifies the DID syntax, a common data model, core
properties, serialized representations, DID operations, and an
explanation of the process of resolving DIDs to the resources that they
represent.
:::

::: {#sotd .section .introductory}
## Status of This Document

*This section describes the status of this document at the time of its
publication. A list of current W3C publications and the latest revision
of this technical report can be found in the [W3C technical reports
index](https://www.w3.org/TR/) at https://www.w3.org/TR/.*

At the time of publication, there existed [103 experimental DID Method
specifications](https://w3c.github.io/did-spec-registries/#did-methods),
32 experimental DID Method driver implementations, a [test
suite](https://w3c.github.io/did-test-suite/) that determines whether or
not a given implementation is conformant with this specification and 46
implementations submitted to the conformance test suite. Readers are
advised to heed the [DID Core
issues](https://github.com/w3c/did-core/issues) and [DID Core Test Suite
issues](https://github.com/w3c/did-test-suite/issues) that each contain
the latest list of concerns and proposed changes that might result in
alterations to this specification. At the time of publication, no
additional substantive issues, changes, or modifications are expected.

Comments regarding this document are welcome. Please file issues
directly on [GitHub](https://github.com/w3c/did-core/issues/), or send
them to <public-did-wg@w3.org> (
[subscribe](mailto:public-did-wg-request@w3.org?subject=subscribe),
[archives](https://lists.w3.org/Archives/Public/public-did-wg/)).

This document was published by the [Decentralized Identifier Working
Group](https://www.w3.org/groups/wg/did) as a Recommendation using the
[Recommendation
track](https://www.w3.org/2021/Process-20211102/#recs-and-notes).

W3C recommends the wide deployment of this specification as a standard
for the Web.

A W3C Recommendation is a specification that, after extensive
consensus-building, is endorsed by W3C and its Members, and has
commitments from Working Group members to [royalty-free
licensing](https://www.w3.org/Consortium/Patent-Policy/#sec-Requirements)
for implementations.

This document was produced by a group operating under the [W3C Patent
Policy](https://www.w3.org/Consortium/Patent-Policy/). W3C maintains a
[public list of any patent
disclosures](https://www.w3.org/groups/wg/did/ipr){rel="disclosure"}
made in connection with the deliverables of the group; that page also
includes instructions for disclosing a patent. An individual who has
actual knowledge of a patent which the individual believes contains
[Essential
Claim(s)](https://www.w3.org/Consortium/Patent-Policy/#def-essential)
must disclose the information in accordance with [section 6 of the W3C
Patent
Policy](https://www.w3.org/Consortium/Patent-Policy/#sec-Disclosure).

This document is governed by the [2 November 2021 W3C Process
Document](https://www.w3.org/2021/Process-20211102/){#w3c_process_revision}.
:::

## Table of Contents {#table-of-contents .introductory}

1.  [Abstract](#abstract){.tocxref}
2.  [Status of This Document](#sotd){.tocxref}
3.  [1. Introduction](#introduction){.tocxref}
    1.  [1.1 A Simple Example](#a-simple-example){.tocxref}
    2.  [1.2 Design Goals](#design-goals){.tocxref}
    3.  [1.3 Architecture Overview](#architecture-overview){.tocxref}
    4.  [1.4 Conformance](#conformance){.tocxref}
4.  [2. Terminology](#terminology){.tocxref}
5.  [3. Identifier](#identifier){.tocxref}
    1.  [3.1 DID Syntax](#did-syntax){.tocxref}
    2.  [3.2 DID URL Syntax](#did-url-syntax){.tocxref}
        1.  [3.2.1 DID Parameters](#did-parameters){.tocxref}
        2.  [3.2.2 Relative DID URLs](#relative-did-urls){.tocxref}
6.  [4. Data Model](#data-model){.tocxref}
    1.  [4.1 Extensibility](#extensibility){.tocxref}
7.  [5. Core Properties](#core-properties){.tocxref}
    1.  [5.1 Identifiers](#identifiers){.tocxref}
        1.  [5.1.1 DID Subject](#did-subject){.tocxref}
        2.  [5.1.2 DID Controller](#did-controller){.tocxref}
        3.  [5.1.3 Also Known As](#also-known-as){.tocxref}
    2.  [5.2 Verification Methods](#verification-methods){.tocxref}
        1.  [5.2.1 Verification
            Material](#verification-material){.tocxref}
        2.  [5.2.2 Referring to Verification
            Methods](#referring-to-verification-methods){.tocxref}
    3.  [5.3 Verification
        Relationships](#verification-relationships){.tocxref}
        1.  [5.3.1 Authentication](#authentication){.tocxref}
        2.  [5.3.2 Assertion](#assertion){.tocxref}
        3.  [5.3.3 Key Agreement](#key-agreement){.tocxref}
        4.  [5.3.4 Capability
            Invocation](#capability-invocation){.tocxref}
        5.  [5.3.5 Capability
            Delegation](#capability-delegation){.tocxref}
    4.  [5.4 Services](#services){.tocxref}
8.  [6. Representations](#representations){.tocxref}
    1.  [6.1 Production and
        Consumption](#production-and-consumption){.tocxref}
    2.  [6.2 JSON](#json){.tocxref}
        1.  [6.2.1 Production](#production){.tocxref}
        2.  [6.2.2 Consumption](#consumption){.tocxref}
    3.  [6.3 JSON-LD](#json-ld){.tocxref}
        1.  [6.3.1 Production](#production-0){.tocxref}
        2.  [6.3.2 Consumption](#consumption-0){.tocxref}
9.  [7. Resolution](#resolution){.tocxref}
    1.  [7.1 DID Resolution](#did-resolution){.tocxref}
        1.  [7.1.1 DID Resolution
            Options](#did-resolution-options){.tocxref}
        2.  [7.1.2 DID Resolution
            Metadata](#did-resolution-metadata){.tocxref}
        3.  [7.1.3 DID Document
            Metadata](#did-document-metadata){.tocxref}
    2.  [7.2 DID URL Dereferencing](#did-url-dereferencing){.tocxref}
        1.  [7.2.1 DID URL Dereferencing
            Options](#did-url-dereferencing-options){.tocxref}
        2.  [7.2.2 DID URL Dereferencing
            Metadata](#did-url-dereferencing-metadata){.tocxref}
    3.  [7.3 Metadata Structure](#metadata-structure){.tocxref}
10. [8. Methods](#methods){.tocxref}
    1.  [8.1 Method Syntax](#method-syntax){.tocxref}
    2.  [8.2 Method Operations](#method-operations){.tocxref}
    3.  [8.3 Security Requirements](#security-requirements){.tocxref}
    4.  [8.4 Privacy Requirements](#privacy-requirements){.tocxref}
11. [9. Security Considerations](#security-considerations){.tocxref}
    1.  [9.1 Choosing DID Resolvers](#choosing-did-resolvers){.tocxref}
    2.  [9.2 Proving Control and
        Binding](#proving-control-and-binding){.tocxref}
    3.  [9.3 Authentication Service
        Endpoints](#authentication-service-endpoints){.tocxref}
    4.  [9.4 Non-Repudiation](#non-repudiation){.tocxref}
    5.  [9.5 Notification of DID Document
        Changes](#notification-of-did-document-changes){.tocxref}
    6.  [9.6 Key and Signature
        Expiration](#key-and-signature-expiration){.tocxref}
    7.  [9.7 Verification Method
        Rotation](#verification-method-rotation){.tocxref}
    8.  [9.8 Verification Method
        Revocation](#verification-method-revocation){.tocxref}
    9.  [9.9 DID Recovery](#did-recovery){.tocxref}
    10. [9.10 The Role of Human-Friendly
        Identifiers](#the-role-of-human-friendly-identifiers){.tocxref}
    11. [9.11 DIDs as Enhanced URNs](#dids-as-enhanced-urns){.tocxref}
    12. [9.12 Immutability](#immutability){.tocxref}
    13. [9.13 Encrypted Data in DID
        Documents](#encrypted-data-in-did-documents){.tocxref}
    14. [9.14 Equivalence Properties](#equivalence-properties){.tocxref}
    15. [9.15 Content Integrity
        Protection](#content-integrity-protection){.tocxref}
    16. [9.16 Persistence](#persistence){.tocxref}
    17. [9.17 Level of Assurance](#level-of-assurance){.tocxref}
12. [10. Privacy Considerations](#privacy-considerations){.tocxref}
    1.  [10.1 Keep Personal Data
        Private](#keep-personal-data-private){.tocxref}
    2.  [10.2 DID Correlation Risks](#did-correlation-risks){.tocxref}
    3.  [10.3 DID Document Correlation
        Risks](#did-document-correlation-risks){.tocxref}
    4.  [10.4 DID Subject
        Classification](#did-subject-classification){.tocxref}
    5.  [10.5 Herd Privacy](#herd-privacy){.tocxref}
    6.  [10.6 Service Privacy](#service-privacy){.tocxref}
13. [A. Examples](#examples){.tocxref}
    1.  [A.1 DID Documents](#did-documents){.tocxref}
    2.  [A.2 Proving](#proving){.tocxref}
    3.  [A.3 Encrypting](#encrypting){.tocxref}
14. [B. Architectural
    Considerations](#architectural-considerations){.tocxref}
    1.  [B.1 Detailed Architecture
        Diagram](#detailed-architecture-diagram){.tocxref}
    2.  [B.2 Creation of a DID](#creation-of-a-did){.tocxref}
    3.  [B.3 Determining the DID
        subject](#determining-the-did-subject){.tocxref}
    4.  [B.4 Referring to the DID
        document](#referring-to-the-did-document){.tocxref}
    5.  [B.5 Statements in the DID
        document](#statements-in-the-did-document){.tocxref}
    6.  [B.6 Discovering more information about the DID
        subject](#discovering-more-information-about-the-did-subject){.tocxref}
    7.  [B.7 Serving a representation of the DID
        subject](#serving-a-representation-of-the-did-subject){.tocxref}
    8.  [B.8 Assigning DIDs to existing web
        resources](#assigning-dids-to-existing-web-resources){.tocxref}
    9.  [B.9 The relationship between DID controllers and DID
        subjects](#the-relationship-between-did-controllers-and-did-subjects){.tocxref}
        1.  [B.9.1 Set #1: The DID subject *is* the DID
            controller](#set-1-the-did-subject-is-the-did-controller){.tocxref}
        2.  [B.9.2 Set #2: The DID subject is *not* the DID
            controller](#set-2-the-did-subject-is-not-the-did-controller){.tocxref}
    10. [B.10 Multiple DID
        controllers](#multiple-did-controllers){.tocxref}
        1.  [B.10.1 Independent Control](#independent-control){.tocxref}
        2.  [B.10.2 Group Control](#group-control){.tocxref}
    11. [B.11 Changing the DID
        subject](#changing-the-did-subject){.tocxref}
    12. [B.12 Changing the DID
        controller](#changing-the-did-controller){.tocxref}
15. [C. Revision History](#revision-history){.tocxref}
16. [D. Acknowledgements](#acknowledgements){.tocxref}
17. [E. IANA Considerations](#iana-considerations){.tocxref}
    1.  [E.1 application/did+json](#application-did-json){.tocxref}
    2.  [E.2
        application/did+ld+json](#application-did-ld-json){.tocxref}
18. [F. References](#references){.tocxref}
    1.  [F.1 Normative references](#normative-references){.tocxref}
    2.  [F.2 Informative references](#informative-references){.tocxref}

::::::::::::::: {#introduction .section .informative}
::: header-wrapper
## 1. Introduction {#x1-introduction}

[](#introduction){.self-link aria-label="Permalink for Section 1."}
:::

*This section is non-normative.*

As individuals and organizations, many of us use globally unique
identifiers in a wide variety of contexts. They serve as communications
addresses (telephone numbers, email addresses, usernames on social
media), ID numbers (for passports, drivers licenses, tax IDs, health
insurance), and product identifiers (serial numbers, barcodes, RFIDs).
URIs (Uniform Resource Identifiers) are used for resources on the Web
and each web page you view in a browser has a globally unique URL
(Uniform Resource Locator).

The vast majority of these globally unique identifiers are not under our
control. They are issued by external authorities that decide who or what
they refer to and when they can be revoked. They are useful only in
certain contexts and recognized only by certain bodies not of our
choosing. They might disappear or cease to be valid with the failure of
an organization. They might unnecessarily reveal personal information.
In many cases, they can be fraudulently replicated and asserted by a
malicious third-party, which is more commonly known as \"identity
theft\".

The Decentralized Identifiers (DIDs) defined in this specification are a
new type of globally unique identifier. They are designed to enable
individuals and organizations to generate their own identifiers using
systems they trust. These new identifiers enable entities to prove
control over them by authenticating using cryptographic proofs such as
digital signatures.

Since the generation and assertion of Decentralized Identifiers is
entity-controlled, each entity can have as many DIDs as necessary to
maintain their desired separation of identities, personas, and
interactions. The use of these identifiers can be scoped appropriately
to different contexts. They support interactions with other people,
institutions, or systems that require entities to identify themselves,
or things they control, while providing control over how much personal
or private data should be revealed, all without depending on a central
authority to guarantee the continued existence of the identifier. These
ideas are explored in the DID Use Cases document
\[[DID-USE-CASES](#bib-did-use-cases "Use Cases and Requirements for Decentralized Identifiers"){.bibref
link-type="biblio"}\].

This specification does not presuppose any particular technology or
cryptography to underpin the generation, persistence, resolution, or
interpretation of DIDs. For example, implementers can create
Decentralized Identifiers based on identifiers registered in federated
or centralized identity management systems. Indeed, almost all types of
identifier systems can add support for DIDs. This creates an
interoperability bridge between the worlds of centralized, federated,
and decentralized identifiers. This also enables implementers to design
specific types of DIDs to work with the computing infrastructure they
trust, such as distributed ledgers, decentralized file systems,
distributed databases, and peer-to-peer networks.

This specification is for:

-   Anyone that wants to understand the core architectural principles
    that are the foundation for Decentralized Identifiers;
-   Software developers that want to produce and consume Decentralized
    Identifiers and their associated data formats;
-   Systems integrators that want to understand how to use Decentralized
    Identifiers in their software and hardware systems;
-   Specification authors that want to create new DID infrastructures,
    known as DID methods, that conform to the ecosystem described by
    this document.

In addition to this specification, readers might find the Use Cases and
Requirements for Decentralized Identifiers
\[[DID-USE-CASES](#bib-did-use-cases "Use Cases and Requirements for Decentralized Identifiers"){.bibref
link-type="biblio"}\] document useful.

:::::: {#a-simple-example .section .informative}
::: header-wrapper
### 1.1 A Simple Example {#x1-1-a-simple-example}

[](#a-simple-example){.self-link aria-label="Permalink for Section 1.1"}
:::

*This section is non-normative.*

A
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-10
.internalDFN link-type="dfn"} is a simple text string consisting of
three parts: 1) the `did` URI scheme identifier, 2) the identifier for
the [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-1
.internalDFN link-type="dfn"}, and 3) the DID method-specific
identifier.

<figure id="parts-of-a-did">
<img src="diagrams/parts-of-a-did.svg"
style="margin: auto; display: block; width: 75%;" width="500"
height="157"
alt=" A diagram showing the parts of a DID. The left-most letters spell &#39;did&#39; in blue, are enclosed in a horizontal bracket from above and a label that reads &#39;scheme&#39; above the bracket. A gray colon follows the &#39;did&#39; letters. The middle letters spell &#39;example&#39; in magenta, are enclosed in a horizontal bracket from below and a label that reads &#39;DID Method&#39; below the bracket. A gray colon follows the DID Method. Finally, the letters at the end read &#39;123456789abcdefghi&#39; in green, are enclosed in a horizontal bracket from below and a label that reads &#39;DID Method Specific String&#39; below the bracket. " />
<figcaption>Figure 1 <span class="fig-title"> A simple example of a
decentralized identifier (DID) </span></figcaption>
</figure>

The example
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-11
.internalDFN link-type="dfn"} above resolves to a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-3 .internalDFN
link-type="dfn"}. A [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-4 .internalDFN
link-type="dfn"} contains information associated with the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-12
.internalDFN link-type="dfn"}, such as ways to cryptographically
[authenticate](#dfn-authenticated){#ref-for-dfn-authenticated-1
.internalDFN link-type="dfn"} a [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-2
.internalDFN link-type="dfn"}.

:::: {#example-a-simple-did-document .example}
::: marker
[Example 1](#example-a-simple-did-document){.self-link}[: A simple DID
document]{.example-title}
:::

``` nohighlight
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/suites/ed25519-2020/v1"
  ]
  "id": "did:example:123456789abcdefghi",
  "authentication": [{
    // used to authenticate as did:...fghi
    "id": "did:example:123456789abcdefghi#keys-1",
    "type": "Ed25519VerificationKey2020",
    "controller": "did:example:123456789abcdefghi",
    "publicKeyMultibase": "zH3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"
  }]
}
```
::::
::::::

:::: {#design-goals .section .informative}
::: header-wrapper
### 1.2 Design Goals {#x1-2-design-goals}

[](#design-goals){.self-link aria-label="Permalink for Section 1.2"}
:::

*This section is non-normative.*

[Decentralized
Identifiers](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-13
.internalDFN link-type="dfn"} are a component of larger systems, such as
the Verifiable Credentials ecosystem
\[[VC-DATA-MODEL](#bib-vc-data-model "Verifiable Credentials Data Model v1.1"){.bibref
link-type="biblio"}\], which influenced the design goals for this
specification. The design goals for Decentralized Identifiers are
summarized here.

  Goal               Description
  ------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Decentralization   Eliminate the requirement for centralized authorities or single point failure in identifier management, including the registration of globally unique identifiers, public verification keys, [services](#dfn-service){#ref-for-dfn-service-3 .internalDFN link-type="dfn"}, and other information.
  Control            Give entities, both human and non-human, the power to directly control their digital identifiers without the need to rely on external authorities.
  Privacy            Enable entities to control the privacy of their information, including minimal, selective, and progressive disclosure of attributes or other data.
  Security           Enable sufficient security for requesting parties to depend on [DID documents](#dfn-did-documents){#ref-for-dfn-did-documents-5 .internalDFN link-type="dfn"} for their required level of assurance.
  Proof-based        Enable [DID controllers](#dfn-did-controllers){#ref-for-dfn-did-controllers-3 .internalDFN link-type="dfn"} to provide cryptographic proof when interacting with other entities.
  Discoverability    Make it possible for entities to discover [DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-14 .internalDFN link-type="dfn"} for other entities, to learn more about or interact with those entities.
  Interoperability   Use interoperable standards so [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-15 .internalDFN link-type="dfn"} infrastructure can make use of existing tools and software libraries designed for interoperability.
  Portability        Be system- and network-independent and enable entities to use their digital identifiers with any system that supports [DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-16 .internalDFN link-type="dfn"} and [DID methods](#dfn-did-methods){#ref-for-dfn-did-methods-2 .internalDFN link-type="dfn"}.
  Simplicity         Favor a reduced set of simple features to make the technology easier to understand, implement, and deploy.
  Extensibility      Where possible, enable extensibility provided it does not greatly hinder interoperability, portability, or simplicity.
::::

::::: {#architecture-overview .section .informative}
::: header-wrapper
### 1.3 Architecture Overview {#x1-3-architecture-overview}

[](#architecture-overview){.self-link
aria-label="Permalink for Section 1.3"}
:::

*This section is non-normative.*

This section provides a basic overview of the major components of
Decentralized Identifier architecture.

<figure id="brief-architecture-overview">
<img src="diagrams/did_brief_architecture_overview.svg"
style="margin: auto; display: block; width: 75%;" width="944"
height="555"
alt=" DIDs and DID documents are recorded on a Verifiable Data Registry; DIDs resolve to DID documents; DIDs refer to DID subjects; a DID controller controls a DID document; DID URLs contains a DID; DID URLs dereferenced to DID document fragments or external resources. " />
<figcaption>Figure 2 <span class="fig-title"> Overview of DID
architecture and the relationship of the basic components. See also: <a
href="#brief-architecture-overview-longdesc"
class="longdesc-link">narrative description</a>. </span></figcaption>
</figure>

::: {#brief-architecture-overview-longdesc .longdesc}
Six internally-labeled shapes appear in the diagram, with labeled arrows
between them, as follows. In the center of the diagram is a rectangle
labeled DID URL, containing small typewritten text
\"did:example:123/path/to/rsrc\". At the center top of the diagram is a
rectangle labeled, \"DID\", containing small typewritten text
\"did:example:123\". At the top left of the diagram is an oval, labeled
\"DID Subject\". At the bottom center of the diagram is a rectangle
labeled, \"DID document\". At the bottom left is an oval, labeled, \"DID
Controller\". On the center right of the diagram is a two-dimensional
rendering of a cylinder, labeled, \"Verifiable Data Registry\".

From the top of the \"DID URL\" rectangle, an arrow, labeled
\"contains\", extends upwards, pointing to the \"DID\" rectangle. From
the bottom of the \"DID URL\" rectangle, an arrow, labeled \"refers, and
***dereferences***, to\", extends downward, pointing to the \"DID
document\" rectangle. An arrow from the \"DID\" rectangle, labeled
\"***resolves*** to\", points down to the \"DID document\" rectangle. An
arrow from the \"DID\" rectangle, labeled \"refers to\", points left to
the \"DID subject\" oval. An arrow from the \"DID controller\" oval,
labeled \"controls\", points right to the \"DID document\" rectangle. An
arrow from the \"DID\" rectangle, labeled \"recorded on\", points
downards to the right, to the \"Verifiable Data Registry\" cylinder. An
arrow from the \"DID document\" rectangle, labeled \"recorded on\",
points upwards to the right to the \"Verifiable Data Registry\"
cylinder.
:::

DIDs and DID URLs
:   A Decentralized Identifier, or
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-17
    .internalDFN link-type="dfn"}, is a
    [URI](#dfn-uri){#ref-for-dfn-uri-2 .internalDFN link-type="dfn"}
    composed of three parts: the scheme `did:`, a method identifier, and
    a unique, method-specific identifier specified by the [DID
    method](#dfn-did-methods){#ref-for-dfn-did-methods-3 .internalDFN
    link-type="dfn"}.
    [DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-18
    .internalDFN link-type="dfn"} are resolvable to [DID
    documents](#dfn-did-documents){#ref-for-dfn-did-documents-6
    .internalDFN link-type="dfn"}. A [DID
    URL](#dfn-did-urls){#ref-for-dfn-did-urls-1 .internalDFN
    link-type="dfn"} extends the syntax of a basic
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-19
    .internalDFN link-type="dfn"} to incorporate other standard
    [URI](#dfn-uri){#ref-for-dfn-uri-3 .internalDFN link-type="dfn"}
    components such as path, query, and fragment in order to locate a
    particular [resource](#dfn-resources){#ref-for-dfn-resources-1
    .internalDFN link-type="dfn"}---for example, a cryptographic public
    key inside a [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-7
    .internalDFN link-type="dfn"}, or a
    [resource](#dfn-resources){#ref-for-dfn-resources-2 .internalDFN
    link-type="dfn"} external to the [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-8
    .internalDFN link-type="dfn"}. These concepts are elaborated upon in
    [3.1 DID Syntax](#did-syntax){.sec-ref} and [3.2 DID URL
    Syntax](#did-url-syntax){.sec-ref}.

DID subjects
:   The subject of a
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-20
    .internalDFN link-type="dfn"} is, by definition, the entity
    identified by the
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-21
    .internalDFN link-type="dfn"}. The [DID
    subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-5 .internalDFN
    link-type="dfn"} might also be the [DID
    controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-4
    .internalDFN link-type="dfn"}. Anything can be the subject of a
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-22
    .internalDFN link-type="dfn"}: person, group, organization, thing,
    or concept. This is further defined in [5.1.1 DID
    Subject](#did-subject){.sec-ref}.

DID controllers
:   The [controller](#dfn-controller){#ref-for-dfn-controller-1
    .internalDFN link-type="dfn"} of a
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-23
    .internalDFN link-type="dfn"} is the entity (person, organization,
    or autonomous software) that has the capability---as defined by a
    [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-4
    .internalDFN link-type="dfn"}---to make changes to a [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-9
    .internalDFN link-type="dfn"}. This capability is typically asserted
    by the control of a set of cryptographic keys used by software
    acting on behalf of the controller, though it might also be asserted
    via other mechanisms. Note that a
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-24
    .internalDFN link-type="dfn"} might have more than one controller,
    and the [DID subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-6
    .internalDFN link-type="dfn"} can be the [DID
    controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-5
    .internalDFN link-type="dfn"}, or one of them. This concept is
    documented in [5.1.2 DID Controller](#did-controller){.sec-ref}.

Verifiable data registries
:   In order to be resolvable to [DID
    documents](#dfn-did-documents){#ref-for-dfn-did-documents-10
    .internalDFN link-type="dfn"},
    [DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-25
    .internalDFN link-type="dfn"} are typically recorded on an
    underlying system or network of some kind. Regardless of the
    specific technology used, any such system that supports recording
    [DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-26
    .internalDFN link-type="dfn"} and returning data necessary to
    produce [DID
    documents](#dfn-did-documents){#ref-for-dfn-did-documents-11
    .internalDFN link-type="dfn"} is called a [verifiable data
    registry](#dfn-verifiable-data-registry){#ref-for-dfn-verifiable-data-registry-1
    .internalDFN link-type="dfn"}. Examples include [distributed
    ledgers](#dfn-distributed-ledger-technology){#ref-for-dfn-distributed-ledger-technology-1
    .internalDFN link-type="dfn"}, decentralized file systems, databases
    of any kind, peer-to-peer networks, and other forms of trusted data
    storage. This concept is further elaborated upon in [8.
    Methods](#methods){.sec-ref}.

DID documents
:   [DID documents](#dfn-did-documents){#ref-for-dfn-did-documents-12
    .internalDFN link-type="dfn"} contain information associated with a
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-27
    .internalDFN link-type="dfn"}. They typically express [verification
    methods](#dfn-verification-method){#ref-for-dfn-verification-method-2
    .internalDFN link-type="dfn"}, such as cryptographic public keys,
    and [services](#dfn-service){#ref-for-dfn-service-4 .internalDFN
    link-type="dfn"} relevant to interactions with the [DID
    subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-7 .internalDFN
    link-type="dfn"}. The generic properties supported in a [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-13
    .internalDFN link-type="dfn"} are specified in [5. Core
    Properties](#core-properties){.sec-ref}. A [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-14
    .internalDFN link-type="dfn"} can be serialized to a byte stream
    (see [6. Representations](#representations){.sec-ref}). The
    properties present in a [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-15
    .internalDFN link-type="dfn"} can be updated according to the
    applicable operations outlined in [8. Methods](#methods){.sec-ref}.

DID methods
:   [DID methods](#dfn-did-methods){#ref-for-dfn-did-methods-5
    .internalDFN link-type="dfn"} are the mechanism by which a
    particular type of
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-28
    .internalDFN link-type="dfn"} and its associated [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-16
    .internalDFN link-type="dfn"} are created, resolved, updated, and
    deactivated. [DID
    methods](#dfn-did-methods){#ref-for-dfn-did-methods-6 .internalDFN
    link-type="dfn"} are defined using separate DID method
    specifications as defined in [8. Methods](#methods){.sec-ref}.

DID resolvers and DID resolution
:   A [DID resolver](#dfn-did-resolvers){#ref-for-dfn-did-resolvers-1
    .internalDFN link-type="dfn"} is a system component that takes a
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-29
    .internalDFN link-type="dfn"} as input and produces a conforming
    [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-17
    .internalDFN link-type="dfn"} as output. This process is called [DID
    resolution](#dfn-did-resolution){#ref-for-dfn-did-resolution-1
    .internalDFN link-type="dfn"}. The steps for resolving a specific
    type of
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-30
    .internalDFN link-type="dfn"} are defined by the relevant [DID
    method](#dfn-did-methods){#ref-for-dfn-did-methods-7 .internalDFN
    link-type="dfn"} specification. The process of [DID
    resolution](#dfn-did-resolution){#ref-for-dfn-did-resolution-2
    .internalDFN link-type="dfn"} is elaborated upon in [7.
    Resolution](#resolution){.sec-ref}.

DID URL dereferencers and DID URL dereferencing
:   A [DID URL
    dereferencer](#dfn-did-url-dereferencers){#ref-for-dfn-did-url-dereferencers-1
    .internalDFN link-type="dfn"} is a system component that takes a
    [DID URL](#dfn-did-urls){#ref-for-dfn-did-urls-2 .internalDFN
    link-type="dfn"} as input and produces a
    [resource](#dfn-resources){#ref-for-dfn-resources-3 .internalDFN
    link-type="dfn"} as output. This process is called [DID URL
    dereferencing](#dfn-did-url-dereferencing){#ref-for-dfn-did-url-dereferencing-1
    .internalDFN link-type="dfn"}. The process of [DID URL
    dereferencing](#dfn-did-url-dereferencing){#ref-for-dfn-did-url-dereferencing-2
    .internalDFN link-type="dfn"} is elaborated upon in [7.2 DID URL
    Dereferencing](#did-url-dereferencing){.sec-ref}.
:::::

:::: {#conformance .section}
::: header-wrapper
### 1.4 Conformance {#x1-4-conformance}

[](#conformance){.self-link aria-label="Permalink for Section 1.4"}
:::

As well as sections marked as non-normative, all authoring guidelines,
diagrams, examples, and notes in this specification are non-normative.
Everything else in this specification is normative.

The key words *MAY*, *MUST*, *MUST NOT*, *OPTIONAL*, *RECOMMENDED*,
*REQUIRED*, *SHOULD*, and *SHOULD NOT* in this document are to be
interpreted as described in [BCP
14](https://datatracker.ietf.org/doc/html/bcp14)
\[[RFC2119](#bib-rfc2119 "Key words for use in RFCs to Indicate Requirement Levels"){.bibref
link-type="biblio"}\]
\[[RFC8174](#bib-rfc8174 "Ambiguity of Uppercase vs Lowercase in RFC 2119 Key Words"){.bibref
link-type="biblio"}\] when, and only when, they appear in all capitals,
as shown here.

This document contains examples that contain JSON and JSON-LD content.
Some of these examples contain characters that are invalid, such as
inline comments (`//`) and the use of ellipsis (`...`) to denote
information that adds little value to the example. Implementers are
cautioned to remove this content if they desire to use the information
as valid JSON or JSON-LD.

Some examples contain terms, both property names and values, that are
not defined in this specification. These are indicated with a comment
(`// external (property name|value)`). Such terms, when used in a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-18 .internalDFN
link-type="dfn"}, are expected to be registered in the DID Specification
Registries
\[[DID-SPEC-REGISTRIES](#bib-did-spec-registries "DID Specification Registries"){.bibref
link-type="biblio"}\] with links to both a formal definition and a
JSON-LD context.

Interoperability of implementations for
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-31
.internalDFN link-type="dfn"} and [DID
documents](#dfn-did-documents){#ref-for-dfn-did-documents-19
.internalDFN link-type="dfn"} is tested by evaluating an
implementation\'s ability to create and parse
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-32
.internalDFN link-type="dfn"} and [DID
documents](#dfn-did-documents){#ref-for-dfn-did-documents-20
.internalDFN link-type="dfn"} that conform to this specification.
Interoperability for producers and consumers of
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-33
.internalDFN link-type="dfn"} and [DID
documents](#dfn-did-documents){#ref-for-dfn-did-documents-21
.internalDFN link-type="dfn"} is provided by ensuring the
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-34
.internalDFN link-type="dfn"} and [DID
documents](#dfn-did-documents){#ref-for-dfn-did-documents-22
.internalDFN link-type="dfn"} conform. Interoperability for [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-8 .internalDFN
link-type="dfn"} specifications is provided by the details in each [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-9 .internalDFN
link-type="dfn"} specification. It is understood that, in the same way
that a web browser is not required to implement all known
[URI](#dfn-uri){#ref-for-dfn-uri-4 .internalDFN link-type="dfn"}
schemes, conformant software that works with
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-35
.internalDFN link-type="dfn"} is not required to implement all known
[DID methods](#dfn-did-methods){#ref-for-dfn-did-methods-10 .internalDFN
link-type="dfn"}. However, all implementations of a given [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-11 .internalDFN
link-type="dfn"} are expected to be interoperable for that method.

A [conforming DID]{#dfn-conforming-did .dfn plurals="conforming dids"
tabindex="0" aria-haspopup="dialog" dfn-type="dfn"} is any concrete
expression of the rules specified in [3.
Identifier](#identifier){.sec-ref} which complies with relevant
normative statements in that section.

A [conforming DID document]{#dfn-conforming-did-document .dfn
plurals="conforming did documents" tabindex="0" aria-haspopup="dialog"
dfn-type="dfn"} is any concrete expression of the data model described
in this specification which complies with the relevant normative
statements in [4. Data Model](#data-model){.sec-ref} and [5. Core
Properties](#core-properties){.sec-ref}. A serialization format for the
conforming document is deterministic, bi-directional, and lossless, as
described in [6. Representations](#representations){.sec-ref}.

A [conforming producer]{#dfn-conforming-producer .dfn
plurals="conforming producers" tabindex="0" aria-haspopup="dialog"
dfn-type="dfn"} is any algorithm realized as software and/or hardware
that generates [conforming
DIDs](#dfn-conforming-did){#ref-for-dfn-conforming-did-1 .internalDFN
link-type="dfn"} or [conforming DID
Documents](#dfn-conforming-did-document){#ref-for-dfn-conforming-did-document-1
.internalDFN link-type="dfn"} and complies with the relevant normative
statements in [6. Representations](#representations){.sec-ref}.

A [conforming consumer]{#dfn-conforming-consumer .dfn
plurals="conforming consumers" tabindex="0" aria-haspopup="dialog"
dfn-type="dfn"} is any algorithm realized as software and/or hardware
that consumes [conforming
DIDs](#dfn-conforming-did){#ref-for-dfn-conforming-did-2 .internalDFN
link-type="dfn"} or [conforming DID
documents](#dfn-conforming-did-document){#ref-for-dfn-conforming-did-document-2
.internalDFN link-type="dfn"} and complies with the relevant normative
statements in [6. Representations](#representations){.sec-ref}.

A [conforming DID resolver]{#dfn-conforming-did-resolver .dfn
.lint-ignore tabindex="0" aria-haspopup="dialog" dfn-type="dfn"} is any
algorithm realized as software and/or hardware that complies with the
relevant normative statements in [7.1 DID
Resolution](#did-resolution){.sec-ref}.

A [conforming DID URL dereferencer]{#dfn-conforming-did-url-dereferencer
.dfn .lint-ignore tabindex="0" aria-haspopup="dialog" dfn-type="dfn"} is
any algorithm realized as software and/or hardware that complies with
the relevant normative statements in [7.2 DID URL
Dereferencing](#did-url-dereferencing){.sec-ref}.

A [conforming DID method]{#dfn-conforming-did-method .dfn .lint-ignore
tabindex="0" aria-haspopup="dialog" dfn-type="dfn"} is any specification
that complies with the relevant normative statements in [8.
Methods](#methods){.sec-ref}.
::::
:::::::::::::::

::::: {#terminology .section .informative}
::: header-wrapper
## 2. Terminology {#x2-terminology}

[](#terminology){.self-link aria-label="Permalink for Section 2."}
:::

*This section is non-normative.*

<div>

This section defines the terms used in this specification and throughout
[decentralized
identifier](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-36
.internalDFN link-type="dfn"} infrastructure. A link to these terms is
included whenever they appear in this specification.

[amplification attack]{#dfn-amplification .dfn lt="amplification|amplification attack" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   A class of attack where the attacker attempts to exhaust a target
    system\'s CPU, storage, network, or other resources by providing
    small, valid inputs into the system that result in damaging effects
    that can be exponentially more costly to process than the inputs
    themselves.

[authenticate]{#dfn-authenticated .dfn lt="authenticated|authenticate" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   Authentication is a process by which an entity can prove it has a
    specific attribute or controls a specific secret using one or more
    [verification
    methods](#dfn-verification-method){#ref-for-dfn-verification-method-3
    .internalDFN link-type="dfn"}. With
    [DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-37
    .internalDFN link-type="dfn"}, a common example would be proving
    control of the cryptographic private key associated with a public
    key published in a [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-23
    .internalDFN link-type="dfn"}.

[cryptographic suite]{#dfn-cryptosuite .dfn lt="cryptosuite|cryptographic suite" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   A specification defining the usage of specific cryptographic
    primitives in order to achieve a particular security goal. These
    documents are often used to specify [verification
    methods](#dfn-verification-method){#ref-for-dfn-verification-method-4
    .internalDFN link-type="dfn"}, digital signature types, their
    identifiers, and other related properties.

[decentralized identifier]{#dfn-decentralized-identifiers .dfn lt="decentralized identifiers|DID|DIDs|decentralized identifier" plurals="dids|did" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"} (DID)
:   A globally unique persistent identifier that does not require a
    centralized registration authority and is often generated and/or
    registered cryptographically. The generic format of a DID is defined
    in [3.1 DID Syntax](#did-syntax){.sec-ref}. A specific [DID
    scheme](#dfn-did-schemes){#ref-for-dfn-did-schemes-1 .internalDFN
    link-type="dfn"} is defined in a [DID
    method](#dfn-did-methods){#ref-for-dfn-did-methods-12 .internalDFN
    link-type="dfn"} specification. Many---but not all---DID methods
    make use of [distributed ledger
    technology](#dfn-distributed-ledger-technology){#ref-for-dfn-distributed-ledger-technology-2
    .internalDFN link-type="dfn"} (DLT) or some other form of
    decentralized network.

[decentralized identity management]{#dfn-decentralized-identity-management .dfn tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   [Identity
    management](https://en.wikipedia.org/wiki/Identity_management) that
    is based on the use of [decentralized
    identifiers](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-38
    .internalDFN link-type="dfn"}. Decentralized identity management
    extends authority for identifier generation, registration, and
    assignment beyond traditional roots of trust such as [X.500
    directory services](https://en.wikipedia.org/wiki/X.500), the
    [Domain Name
    System](https://en.wikipedia.org/wiki/Domain_Name_System), and most
    national ID systems.

[DID controller]{#dfn-did-controllers .dfn lt="did controllers|did controller(s)|DID controller" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   An entity that has the capability to make changes to a [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-25
    .internalDFN link-type="dfn"}. A
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-40
    .internalDFN link-type="dfn"} might have more than one DID
    controller. The DID controller(s) can be denoted by the optional
    `controller` property at the top level of the [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-26
    .internalDFN link-type="dfn"}. Note that a DID controller might be
    the [DID subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-8
    .internalDFN link-type="dfn"}.

[DID delegate]{#dfn-did-delegate .dfn tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   An entity to whom a [DID
    controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-6
    .internalDFN link-type="dfn"} has granted permission to use a
    [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-5
    .internalDFN link-type="dfn"} associated with a
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-41
    .internalDFN link-type="dfn"} via a [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-27
    .internalDFN link-type="dfn"}. For example, a parent who controls a
    child\'s [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-28
    .internalDFN link-type="dfn"} might permit the child to use their
    personal device in order to
    [authenticate](#dfn-authenticated){#ref-for-dfn-authenticated-2
    .internalDFN link-type="dfn"}. In this case, the child is the [DID
    delegate](#dfn-did-delegate){#ref-for-dfn-did-delegate-1
    .internalDFN link-type="dfn"}. The child\'s personal device would
    contain the private cryptographic material enabling the child to
    [authenticate](#dfn-authenticated){#ref-for-dfn-authenticated-3
    .internalDFN link-type="dfn"} using the
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-42
    .internalDFN link-type="dfn"}. However, the child might not be
    permitted to add other personal devices without the parent\'s
    permission.

[DID document]{#dfn-did-documents .dfn lt="DID documents|DID document" plurals="did documents" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   A set of data describing the [DID
    subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-9 .internalDFN
    link-type="dfn"}, including mechanisms, such as cryptographic public
    keys, that the [DID
    subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-10
    .internalDFN link-type="dfn"} or a [DID
    delegate](#dfn-did-delegate){#ref-for-dfn-did-delegate-2
    .internalDFN link-type="dfn"} can use to
    [authenticate](#dfn-authenticated){#ref-for-dfn-authenticated-4
    .internalDFN link-type="dfn"} itself and prove its association with
    the
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-43
    .internalDFN link-type="dfn"}. A DID document might have one or more
    different
    [representations](#dfn-representations){#ref-for-dfn-representations-1
    .internalDFN link-type="dfn"} as defined in [6.
    Representations](#representations){.sec-ref} or in the W3C DID
    Specification Registries
    \[[DID-SPEC-REGISTRIES](#bib-did-spec-registries "DID Specification Registries"){.bibref
    link-type="biblio"}\].

[DID fragment]{#dfn-did-fragments .dfn lt="DID fragments|DID fragment" plurals="did fragments" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   The portion of a [DID URL](#dfn-did-urls){#ref-for-dfn-did-urls-3
    .internalDFN link-type="dfn"} that follows the first hash sign
    character (`#`). DID fragment syntax is identical to URI fragment
    syntax.

[DID method]{#dfn-did-methods .dfn lt="DID methods|DID method" plurals="did methods" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   A definition of how a specific [DID method
    scheme](#dfn-did-schemes){#ref-for-dfn-did-schemes-2 .internalDFN
    link-type="dfn"} is implemented. A DID method is defined by a DID
    method specification, which specifies the precise operations by
    which
    [DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-44
    .internalDFN link-type="dfn"} and [DID
    documents](#dfn-did-documents){#ref-for-dfn-did-documents-29
    .internalDFN link-type="dfn"} are created, resolved, updated, and
    deactivated. See [8. Methods](#methods){.sec-ref}.

[DID path]{#dfn-did-paths .dfn lt="DID paths|DID path" plurals="did paths" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   The portion of a [DID URL](#dfn-did-urls){#ref-for-dfn-did-urls-4
    .internalDFN link-type="dfn"} that begins with and includes the
    first forward slash (`/`) character and ends with either a question
    mark (`?`) character, a fragment hash sign (`#`) character, or the
    end of the [DID URL](#dfn-did-urls){#ref-for-dfn-did-urls-5
    .internalDFN link-type="dfn"}. DID path syntax is identical to URI
    path syntax. See [Path](#path){.sec-ref}.

[DID query]{#dfn-did-queries .dfn lt="DID queries|DID query" plurals="did queries" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   The portion of a [DID URL](#dfn-did-urls){#ref-for-dfn-did-urls-6
    .internalDFN link-type="dfn"} that follows and includes the first
    question mark character (`?`). DID query syntax is identical to URI
    query syntax. See [Query](#query){.sec-ref}.

[DID resolution]{#dfn-did-resolution .dfn tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   The process that takes as its input a
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-45
    .internalDFN link-type="dfn"} and a set of resolution options and
    returns a [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-30
    .internalDFN link-type="dfn"} in a conforming
    [representation](#dfn-representations){#ref-for-dfn-representations-2
    .internalDFN link-type="dfn"} plus additional metadata. This process
    relies on the \"Read\" operation of the applicable [DID
    method](#dfn-did-methods){#ref-for-dfn-did-methods-13 .internalDFN
    link-type="dfn"}. The inputs and outputs of this process are defined
    in [7.1 DID Resolution](#did-resolution){.sec-ref}.

[DID resolver]{#dfn-did-resolvers .dfn lt="DID resolvers|DID resolver" plurals="did resolvers" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   A [DID resolver](#dfn-did-resolvers){#ref-for-dfn-did-resolvers-3
    .internalDFN link-type="dfn"} is a software and/or hardware
    component that performs the [DID
    resolution](#dfn-did-resolution){#ref-for-dfn-did-resolution-3
    .internalDFN link-type="dfn"} function by taking a
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-46
    .internalDFN link-type="dfn"} as input and producing a conforming
    [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-31
    .internalDFN link-type="dfn"} as output.

[DID scheme]{#dfn-did-schemes .dfn lt="DID schemes|DID method scheme|DID scheme" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   The formal syntax of a [decentralized
    identifier](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-47
    .internalDFN link-type="dfn"}. The generic DID scheme begins with
    the prefix `did:` as defined in [3.1 DID
    Syntax](#did-syntax){.sec-ref}. Each [DID
    method](#dfn-did-methods){#ref-for-dfn-did-methods-14 .internalDFN
    link-type="dfn"} specification defines a specific DID method scheme
    that works with that specific [DID
    method](#dfn-did-methods){#ref-for-dfn-did-methods-15 .internalDFN
    link-type="dfn"}. In a specific DID method scheme, the DID method
    name follows the first colon and terminates with the second colon,
    e.g., `did:example:`

[DID subject]{#dfn-did-subjects .dfn lt="DID subjects|DID subject" plurals="did subjects" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   The entity identified by a
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-48
    .internalDFN link-type="dfn"} and described by a [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-32
    .internalDFN link-type="dfn"}. Anything can be a DID subject:
    person, group, organization, physical thing, digital thing, logical
    thing, etc.

[DID URL]{#dfn-did-urls .dfn lt="DID URLs|DID URL" plurals="did urls" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   A
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-49
    .internalDFN link-type="dfn"} plus any additional syntactic
    component that conforms to the definition in [3.2 DID URL
    Syntax](#did-url-syntax){.sec-ref}. This includes an optional [DID
    path](#dfn-did-paths){#ref-for-dfn-did-paths-1 .internalDFN
    link-type="dfn"} (with its leading `/` character), optional [DID
    query](#dfn-did-queries){#ref-for-dfn-did-queries-1 .internalDFN
    link-type="dfn"} (with its leading `?` character), and optional [DID
    fragment](#dfn-did-fragments){#ref-for-dfn-did-fragments-1
    .internalDFN link-type="dfn"} (with its leading `#` character).

[DID URL dereferencing]{#dfn-did-url-dereferencing .dfn tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   The process that takes as its input a [DID
    URL](#dfn-did-urls){#ref-for-dfn-did-urls-7 .internalDFN
    link-type="dfn"} and a set of input metadata, and returns a
    [resource](#dfn-resources){#ref-for-dfn-resources-4 .internalDFN
    link-type="dfn"}. This resource might be a [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-33
    .internalDFN link-type="dfn"} plus additional metadata, a secondary
    resource contained within the [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-34
    .internalDFN link-type="dfn"}, or a resource entirely external to
    the [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-35
    .internalDFN link-type="dfn"}. The process uses [DID
    resolution](#dfn-did-resolution){#ref-for-dfn-did-resolution-4
    .internalDFN link-type="dfn"} to fetch a [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-36
    .internalDFN link-type="dfn"} indicated by the
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-50
    .internalDFN link-type="dfn"} contained within the [DID
    URL](#dfn-did-urls){#ref-for-dfn-did-urls-8 .internalDFN
    link-type="dfn"}. The dereferencing process can then perform
    additional processing on the [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-37
    .internalDFN link-type="dfn"} to return the dereferenced resource
    indicated by the [DID URL](#dfn-did-urls){#ref-for-dfn-did-urls-9
    .internalDFN link-type="dfn"}. The inputs and outputs of this
    process are defined in [7.2 DID URL
    Dereferencing](#did-url-dereferencing){.sec-ref}.

[DID URL dereferencer]{#dfn-did-url-dereferencers .dfn lt="DID URL dereferencers|DID URL dereferencer" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   A software and/or hardware system that performs the [DID URL
    dereferencing](#dfn-did-url-dereferencing){#ref-for-dfn-did-url-dereferencing-3
    .internalDFN link-type="dfn"} function for a given [DID
    URL](#dfn-did-urls){#ref-for-dfn-did-urls-10 .internalDFN
    link-type="dfn"} or [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-38
    .internalDFN link-type="dfn"}.

[distributed ledger]{#dfn-distributed-ledger-technology .dfn lt="distributed ledger technology|DLT|distributed ledger" plurals="distributed ledgers|dlts" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"} (DLT)
:   A non-centralized system for recording events. These systems
    establish sufficient confidence for participants to rely upon the
    data recorded by others to make operational decisions. They
    typically use distributed databases where different nodes use a
    consensus protocol to confirm the ordering of cryptographically
    signed transactions. The linking of digitally signed transactions
    over time often makes the history of the ledger effectively
    immutable.

[public key description]{#dfn-public-key-description .dfn plurals="public key descriptions" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   A data object contained inside a [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-39
    .internalDFN link-type="dfn"} that contains all the metadata
    necessary to use a public key or a verification key.

[resource]{#dfn-resources .dfn lt="resources|resource" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   As defined by
    \[[RFC3986](#bib-rfc3986 "Uniform Resource Identifier (URI): Generic Syntax"){.bibref
    link-type="biblio"}\]: \"\...the term \'resource\' is used in a
    general sense for whatever might be identified by a URI.\"
    Similarly, any resource might serve as a [DID
    subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-11
    .internalDFN link-type="dfn"} identified by a
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-51
    .internalDFN link-type="dfn"}.

[representation]{#dfn-representations .dfn lt="representations|representation" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   As defined for HTTP by
    \[[RFC7231](#bib-rfc7231 "Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content"){.bibref
    link-type="biblio"}\]: \"information that is intended to reflect a
    past, current, or desired state of a given resource, in a format
    that can be readily communicated via the protocol, and that consists
    of a set of representation metadata and a potentially unbounded
    stream of representation data.\" A [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-40
    .internalDFN link-type="dfn"} is a representation of information
    describing a [DID
    subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-12
    .internalDFN link-type="dfn"}. See [6.
    Representations](#representations){.sec-ref}.

[representation-specific entries]{#dfn-representation-specific-entry .dfn lt="representation-specific entry|non-representation-specific entry|representation-specific entries" plurals="non-representation-specific entries" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   Entries in a [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-41
    .internalDFN link-type="dfn"} whose meaning is particular to a
    specific
    [representation](#dfn-representations){#ref-for-dfn-representations-3
    .internalDFN link-type="dfn"}. Defined in [4. Data
    Model](#data-model){.sec-ref} and [6.
    Representations](#representations){.sec-ref}. For example,
    [`@context`](#dfn-context){#ref-for-dfn-context-1 .internalDFN
    link-type="dfn"} in the [JSON-LD representation](#json-ld) is a
    *representation-specific entry*.

[services]{#dfn-service .dfn lt="service|services" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   Means of communicating or interacting with the [DID
    subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-13
    .internalDFN link-type="dfn"} or associated entities via one or more
    [service
    endpoints](#dfn-service-endpoints){#ref-for-dfn-service-endpoints-1
    .internalDFN link-type="dfn"}. Examples include discovery services,
    agent services, social networking services, file storage services,
    and verifiable credential repository services.

[service endpoint]{#dfn-service-endpoints .dfn lt="service endpoints|service endpoint" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   A network address, such as an HTTP URL, at which
    [services](#dfn-service){#ref-for-dfn-service-5 .internalDFN
    link-type="dfn"} operate on behalf of a [DID
    subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-14
    .internalDFN link-type="dfn"}.

[Uniform Resource Identifier]{#dfn-uri .dfn lt="URI|URIs|Uniform Resource Identifier" plurals="uris" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"} (URI)
:   The standard identifier format for all resources on the World Wide
    Web as defined by
    \[[RFC3986](#bib-rfc3986 "Uniform Resource Identifier (URI): Generic Syntax"){.bibref
    link-type="biblio"}\]. A
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-52
    .internalDFN link-type="dfn"} is a type of URI scheme.

[verifiable credential]{#dfn-verifiable-credentials .dfn lt="verifiable credentials|verifiable credential" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   A standard data model and representation format for
    cryptographically-verifiable digital credentials as defined by the
    W3C Verifiable Credentials specification
    \[[VC-DATA-MODEL](#bib-vc-data-model "Verifiable Credentials Data Model v1.1"){.bibref
    link-type="biblio"}\].

[ verifiable data registry]{#dfn-verifiable-data-registry .dfn lt="verifiable data registry|verifiable data registries" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   A system that facilitates the creation, verification, updating,
    and/or deactivation of [decentralized
    identifiers](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-53
    .internalDFN link-type="dfn"} and [DID
    documents](#dfn-did-documents){#ref-for-dfn-did-documents-42
    .internalDFN link-type="dfn"}. A verifiable data registry might also
    be used for other cryptographically-verifiable data structures such
    as [verifiable
    credentials](#dfn-verifiable-credentials){#ref-for-dfn-verifiable-credentials-1
    .internalDFN link-type="dfn"}. For more information, see the W3C
    Verifiable Credentials specification
    \[[VC-DATA-MODEL](#bib-vc-data-model "Verifiable Credentials Data Model v1.1"){.bibref
    link-type="biblio"}\].

[verifiable timestamp]{#dfn-verifiable-timestamp .dfn plurals="verifiable timestamps" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   A verifiable timestamp enables a third-party to verify that a data
    object existed at a specific moment in time and that it has not been
    modified or corrupted since that moment in time. If the data
    integrity could reasonably have been modified or corrupted since
    that moment in time, the timestamp is not verifiable.

[verification method]{#dfn-verification-method .dfn lt="" plurals="verification methods" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}

:   A set of parameters that can be used together with a process to
    independently verify a proof. For example, a cryptographic public
    key can be used as a verification method with respect to a digital
    signature; in such usage, it verifies that the signer possessed the
    associated cryptographic private key.

    \"Verification\" and \"proof\" in this definition are intended to
    apply broadly. For example, a cryptographic public key might be used
    during Diffie-Hellman key exchange to negotiate a shared symmetric
    key for encryption. This guarantees the integrity of the key
    agreement process. It is thus another type of verification method,
    even though descriptions of the process might not use the words
    \"verification\" or \"proof.\"

[verification relationship]{#dfn-verification-relationship .dfn lt="" plurals="verification relationships" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}

:   An expression of the relationship between the [DID
    subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-15
    .internalDFN link-type="dfn"} and a [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-6
    .internalDFN link-type="dfn"}. An example of a verification
    relationship is [5.3.1 Authentication](#authentication){.sec-ref}.

[Universally Unique Identifier]{#dfn-uuid .dfn lt="UUID|UUIDs|Universally Unique Identifier" plurals="uuid" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"} (UUID)
:   A type of globally unique identifier defined by
    \[[RFC4122](#bib-rfc4122 "A Universally Unique IDentifier (UUID) URN Namespace"){.bibref
    link-type="biblio"}\]. UUIDs are similar to DIDs in that they do not
    require a centralized registration authority. UUIDs differ from DIDs
    in that they are not resolvable or cryptographically-verifiable.

</div>

In addition to the terminology above, this specification also uses
terminology from the \[[INFRA](#bib-infra "Infra Standard"){.bibref
link-type="biblio"}\] specification to formally define the [data
model](#data-model). When \[[INFRA](#bib-infra "Infra Standard"){.bibref
link-type="biblio"}\] terminology is used, such as
[string](https://infra.spec.whatwg.org/#strings),
[set](https://infra.spec.whatwg.org/#ordered-set), and
[map](https://infra.spec.whatwg.org/#maps), it is linked directly to
that specification.
:::::

:::::::::::::::::::::::::::::::::::::::::: {#identifier .section}
::: header-wrapper
## 3. Identifier {#x3-identifier}

[](#identifier){.self-link aria-label="Permalink for Section 3."}
:::

This section describes the formal syntax for
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-54
.internalDFN link-type="dfn"} and [DID
URLs](#dfn-did-urls){#ref-for-dfn-did-urls-11 .internalDFN
link-type="dfn"}. The term \"generic\" is used to differentiate the
syntax defined here from syntax defined by *specific* [DID
methods](#dfn-did-methods){#ref-for-dfn-did-methods-16 .internalDFN
link-type="dfn"} in their respective specifications. The creation
processes, and their timing, for
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-55
.internalDFN link-type="dfn"} and [DID
URLs](#dfn-did-urls){#ref-for-dfn-did-urls-12 .internalDFN
link-type="dfn"} are described in [8.2 Method
Operations](#method-operations){.sec-ref} and [B.2 Creation of a
DID](#creation-of-a-did){.sec-ref}.

:::: {#did-syntax .section .normative}
::: header-wrapper
### 3.1 DID Syntax {#x3-1-did-syntax}

[](#did-syntax){.self-link aria-label="Permalink for Section 3.1"}
:::

The generic [DID scheme](#dfn-did-schemes){#ref-for-dfn-did-schemes-3
.internalDFN link-type="dfn"} is a [URI](#dfn-uri){#ref-for-dfn-uri-5
.internalDFN link-type="dfn"} scheme conformant with
\[[RFC3986](#bib-rfc3986 "Uniform Resource Identifier (URI): Generic Syntax"){.bibref
link-type="biblio"}\]. The ABNF definition can be found below, which
uses the syntax in
\[[RFC5234](#bib-rfc5234 "Augmented BNF for Syntax Specifications: ABNF"){.bibref
link-type="biblio"}\] and the corresponding definitions for `ALPHA` and
`DIGIT`. All other rule names not defined in the ABNF below are defined
in
\[[RFC3986](#bib-rfc3986 "Uniform Resource Identifier (URI): Generic Syntax"){.bibref
link-type="biblio"}\]. All
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-56
.internalDFN link-type="dfn"} *MUST* conform to the DID Syntax ABNF
Rules.

+-----------------------------------------------------------------------+
| The DID Syntax ABNF Rules                                             |
+=======================================================================+
| ``` nohighlight                                                       |
| did                = "did:" method-name ":" method-specific-id        |
| method-name        = 1*method-char                                    |
| method-char        = %x61-7A / DIGIT                                  |
| method-specific-id = *( *idchar ":" ) 1*idchar                        |
| idchar             = ALPHA / DIGIT / "." / "-" / "_" / pct-encoded    |
| pct-encoded        = "%" HEXDIG HEXDIG                                |
| ```                                                                   |
+-----------------------------------------------------------------------+

For requirements on [DID
methods](#dfn-did-methods){#ref-for-dfn-did-methods-17 .internalDFN
link-type="dfn"} relating to the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-57
.internalDFN link-type="dfn"} syntax, see Section [8.1 Method
Syntax](#method-syntax){.sec-ref}.
::::

:::::::::::::::::::::::::::::::::::::: {#did-url-syntax .section .normative}
::: header-wrapper
### 3.2 DID URL Syntax {#x3-2-did-url-syntax}

[](#did-url-syntax){.self-link aria-label="Permalink for Section 3.2"}
:::

A [DID URL](#dfn-did-urls){#ref-for-dfn-did-urls-13 .internalDFN
link-type="dfn"} is a network location identifier for a specific
[resource](#dfn-resources){#ref-for-dfn-resources-5 .internalDFN
link-type="dfn"}. It can be used to retrieve things like representations
of [DID subjects](#dfn-did-subjects){#ref-for-dfn-did-subjects-16
.internalDFN link-type="dfn"}, [verification
methods](#dfn-verification-method){#ref-for-dfn-verification-method-7
.internalDFN link-type="dfn"},
[services](#dfn-service){#ref-for-dfn-service-6 .internalDFN
link-type="dfn"}, specific parts of a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-43 .internalDFN
link-type="dfn"}, or other resources.

The following is the ABNF definition using the syntax in
\[[RFC5234](#bib-rfc5234 "Augmented BNF for Syntax Specifications: ABNF"){.bibref
link-type="biblio"}\]. It builds on the `did` scheme defined in [3.1 DID
Syntax](#did-syntax){.sec-ref}. The
[`path-abempty`](https://www.rfc-editor.org/rfc/rfc3986#section-3.3),
[`query`](https://www.rfc-editor.org/rfc/rfc3986#section-3.4), and
[`fragment`](https://www.rfc-editor.org/rfc/rfc3986#section-3.5)
components are defined in
\[[RFC3986](#bib-rfc3986 "Uniform Resource Identifier (URI): Generic Syntax"){.bibref
link-type="biblio"}\]. All [DID
URLs](#dfn-did-urls){#ref-for-dfn-did-urls-14 .internalDFN
link-type="dfn"} *MUST* conform to the DID URL Syntax ABNF Rules. [DID
methods](#dfn-did-methods){#ref-for-dfn-did-methods-18 .internalDFN
link-type="dfn"} can further restrict these rules, as described in [8.1
Method Syntax](#method-syntax){.sec-ref}.

+-----------------------------------------------------------------------+
| The DID URL Syntax ABNF Rules                                         |
+=======================================================================+
| ``` nohighlight                                                       |
| did-url = did path-abempty [ "?" query ] [ "#" fragment ]             |
| ```                                                                   |
+-----------------------------------------------------------------------+

:::: {#issue-container-generatedID .note role="note"}
::: {#h-note .note-title .marker role="heading" aria-level="4"}
Note[: Semicolon character is reserved for future use]{.issue-label}
:::

Although the semicolon (`;`) character can be used according to the
rules of the [DID URL](#dfn-did-urls){#ref-for-dfn-did-urls-15
.internalDFN link-type="dfn"} syntax, future versions of this
specification may use it as a sub-delimiter for parameters as described
in
\[[MATRIX-URIS](#bib-matrix-uris "Matrix URIs - Ideas about Web Architecture"){.bibref
link-type="biblio"}\]. To avoid future conflicts, developers ought to
refrain from using it.
::::

:::::: {.section .notoc}
::: header-wrapper
#### Path

[](#path){.self-link aria-label="Permalink for this Section"}
:::

A [DID path](#dfn-did-paths){#ref-for-dfn-did-paths-2 .internalDFN
link-type="dfn"} is identical to a generic
[URI](#dfn-uri){#ref-for-dfn-uri-6 .internalDFN link-type="dfn"} path
and conforms to the `path-abempty` ABNF rule in [RFC 3986, section
3.3](https://www.rfc-editor.org/rfc/rfc3986#section-3.3). As with
[URIs](#dfn-uri){#ref-for-dfn-uri-7 .internalDFN link-type="dfn"}, path
semantics can be specified by [DID
Methods](#dfn-did-methods){#ref-for-dfn-did-methods-19 .internalDFN
link-type="dfn"}, which in turn might enable [DID
controllers](#dfn-did-controllers){#ref-for-dfn-did-controllers-7
.internalDFN link-type="dfn"} to further specialize those semantics.

:::: {#example-2 .example}
::: marker
[Example 2](#example-2){.self-link}
:::

``` nohighlight
did:example:123456/path
```
::::
::::::

:::::: {.section .notoc}
::: header-wrapper
#### Query

[](#query){.self-link aria-label="Permalink for this Section"}
:::

A [DID query](#dfn-did-queries){#ref-for-dfn-did-queries-2 .internalDFN
link-type="dfn"} is identical to a generic
[URI](#dfn-uri){#ref-for-dfn-uri-8 .internalDFN link-type="dfn"} query
and conforms to the `query` ABNF rule in [RFC 3986, section
3.4](https://www.rfc-editor.org/rfc/rfc3986#section-3.4). This syntax
feature is elaborated upon in [3.2.1 DID
Parameters](#did-parameters){.sec-ref}.

:::: {#example-3 .example}
::: marker
[Example 3](#example-3){.self-link}
:::

``` nohighlight
did:example:123456?versionId=1
```
::::
::::::

:::::::::::: {.section .notoc}
::: header-wrapper
#### Fragment

[](#fragment){.self-link aria-label="Permalink for this Section"}
:::

[DID fragment](#dfn-did-fragments){#ref-for-dfn-did-fragments-2
.internalDFN link-type="dfn"} syntax and semantics are identical to a
generic [URI](#dfn-uri){#ref-for-dfn-uri-9 .internalDFN link-type="dfn"}
fragment and conforms to the `fragment` ABNF rule in [RFC 3986, section
3.5](https://www.rfc-editor.org/rfc/rfc3986#section-3.5).

A [DID fragment](#dfn-did-fragments){#ref-for-dfn-did-fragments-3
.internalDFN link-type="dfn"} is used as a method-independent reference
into a [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-44
.internalDFN link-type="dfn"} or external
[resource](#dfn-resources){#ref-for-dfn-resources-6 .internalDFN
link-type="dfn"}. Some examples of DID fragment identifiers are shown
below.

:::: {#example-a-unique-verification-method-in-a-did-document .example}
::: marker
[Example
4](#example-a-unique-verification-method-in-a-did-document){.self-link}[:
A unique verification method in a DID Document]{.example-title}
:::

``` nohighlight
did:example:123#public-key-0
```
::::

:::: {#example-a-unique-service-in-a-did-document .example}
::: marker
[Example 5](#example-a-unique-service-in-a-did-document){.self-link}[: A
unique service in a DID Document]{.example-title}
:::

``` nohighlight
did:example:123#agent
```
::::

:::: {#example-a-resource-external-to-a-did-document .example}
::: marker
[Example
6](#example-a-resource-external-to-a-did-document){.self-link}[: A
resource external to a DID Document]{.example-title}
:::

``` nohighlight
did:example:123?service=agent&relativeRef=/credentials#degree
```
::::

:::: {#issue-container-generatedID-0 .note role="note"}
::: {#h-note-0 .note-title .marker role="heading" aria-level="5"}
Note[: Fragment semantics across representations]{.issue-label}
:::

In order to maximize interoperability, implementers are urged to ensure
that [DID fragments](#dfn-did-fragments){#ref-for-dfn-did-fragments-4
.internalDFN link-type="dfn"} are interpreted in the same way across
[representations](#dfn-representations){#ref-for-dfn-representations-4
.internalDFN link-type="dfn"} (see [6.
Representations](#representations){.sec-ref}). For example, while JSON
Pointer
\[[RFC6901](#bib-rfc6901 "JavaScript Object Notation (JSON) Pointer"){.bibref
link-type="biblio"}\] can be used in a [DID
fragment](#dfn-did-fragments){#ref-for-dfn-did-fragments-5 .internalDFN
link-type="dfn"}, it will not be interpreted in the same way across
non-JSON
[representations](#dfn-representations){#ref-for-dfn-representations-5
.internalDFN link-type="dfn"}.
::::

Additional semantics for fragment identifiers, which are compatible with
and layered upon the semantics in this section, are described for
JSON-LD representations in [E.2
application/did+ld+json](#application-did-ld-json){.sec-ref}. For
information about how to dereference a [DID
fragment](#dfn-did-fragments){#ref-for-dfn-did-fragments-6 .internalDFN
link-type="dfn"}, see [7.2 DID URL
Dereferencing](#did-url-dereferencing){.sec-ref}.
::::::::::::

:::::::::::: {#did-parameters .section}
::: header-wrapper
#### 3.2.1 DID Parameters {#x3-2-1-did-parameters}

[](#did-parameters){.self-link aria-label="Permalink for Section 3.2.1"}
:::

The [DID URL](#dfn-did-urls){#ref-for-dfn-did-urls-16 .internalDFN
link-type="dfn"} syntax supports a simple format for parameters based on
the `query` component described in [Query](#query){.sec-ref}. Adding a
DID parameter to a [DID URL](#dfn-did-urls){#ref-for-dfn-did-urls-17
.internalDFN link-type="dfn"} means that the parameter becomes part of
the identifier for a [resource](#dfn-resources){#ref-for-dfn-resources-7
.internalDFN link-type="dfn"}.

:::: {#example-a-did-url-with-a-versiontime-did-parameter .example}
::: marker
[Example
7](#example-a-did-url-with-a-versiontime-did-parameter){.self-link}[: A
DID URL with a \'versionTime\' DID parameter]{.example-title}
:::

``` nohighlight
did:example:123?versionTime=2021-05-10T17:00:00Z
```
::::

:::: {#example-a-did-url-with-a-service-and-a-relativeref-did-parameter .example}
::: marker
[Example
8](#example-a-did-url-with-a-service-and-a-relativeref-did-parameter){.self-link}[:
A DID URL with a \'service\' and a \'relativeRef\' DID
parameter]{.example-title}
:::

``` nohighlight
did:example:123?service=files&relativeRef=/resume.pdf
```
::::

Some DID parameters are completely independent of of any specific [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-20 .internalDFN
link-type="dfn"} and function the same way for all
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-58
.internalDFN link-type="dfn"}. Other DID parameters are not supported by
all [DID methods](#dfn-did-methods){#ref-for-dfn-did-methods-21
.internalDFN link-type="dfn"}. Where optional parameters are supported,
they are expected to operate uniformly across the [DID
methods](#dfn-did-methods){#ref-for-dfn-did-methods-22 .internalDFN
link-type="dfn"} that do support them. The following table provides
common DID parameters that function the same way across all [DID
methods](#dfn-did-methods){#ref-for-dfn-did-methods-23 .internalDFN
link-type="dfn"}. Support for all [DID Parameters](#did-parameters) is
*OPTIONAL*.

:::: {#issue-container-generatedID-1 .note role="note"}
::: {#h-note-1 .note-title .marker role="heading" aria-level="5"}
Note
:::

It is generally expected that DID URL dereferencer implementations will
reference
\[[DID-RESOLUTION](#bib-did-resolution "Decentralized Identifier Resolution"){.bibref
link-type="biblio"}\] for additional implementation details. The scope
of this specification only defines the contract of the most common query
parameters.
::::

  Parameter Name                                                                   Description
  -------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  [`service`](#dfn-service){#ref-for-dfn-service-7 .internalDFN link-type="dfn"}   Identifies a service from the [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-45 .internalDFN link-type="dfn"} by service ID. If present, the associated value *MUST* be an [ASCII string](https://infra.spec.whatwg.org/#ascii-string){lt="ascii string" data-type="dfn"}.
  `relativeRef`                                                                    A relative [URI](#dfn-uri){#ref-for-dfn-uri-10 .internalDFN link-type="dfn"} reference according to [RFC3986 Section 4.2](https://www.rfc-editor.org/rfc/rfc3986#section-4.2) that identifies a [resource](#dfn-resources){#ref-for-dfn-resources-8 .internalDFN link-type="dfn"} at a [service endpoint](#dfn-service-endpoints){#ref-for-dfn-service-endpoints-2 .internalDFN link-type="dfn"}, which is selected from a [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-46 .internalDFN link-type="dfn"} by using the `service` parameter. If present, the associated value *MUST* be an [ASCII string](https://infra.spec.whatwg.org/#ascii-string){lt="ascii string" data-type="dfn"} and *MUST* use percent-encoding for certain characters as specified in [RFC3986 Section 2.1](https://www.rfc-editor.org/rfc/rfc3986#section-2.1).
  `versionId`                                                                      Identifies a specific version of a [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-47 .internalDFN link-type="dfn"} to be resolved (the version ID could be sequential, or a [UUID](#dfn-uuid){#ref-for-dfn-uuid-1 .internalDFN link-type="dfn"}, or method-specific). If present, the associated value *MUST* be an [ASCII string](https://infra.spec.whatwg.org/#ascii-string){lt="ascii string" data-type="dfn"}.
  `versionTime`                                                                    Identifies a certain version timestamp of a [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-48 .internalDFN link-type="dfn"} to be resolved. That is, the [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-49 .internalDFN link-type="dfn"} that was valid for a [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-59 .internalDFN link-type="dfn"} at a certain time. If present, the associated value *MUST* be an [ASCII string](https://infra.spec.whatwg.org/#ascii-string){lt="ascii string" data-type="dfn"} which is a valid XML datetime value, as defined in section 3.3.7 of [W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes](https://www.w3.org/TR/xmlschema11-2/) \[[XMLSCHEMA11-2](#bib-xmlschema11-2 "W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes"){.bibref link-type="biblio"}\]. This datetime value *MUST* be normalized to UTC 00:00:00 and without sub-second decimal precision. For example: `2020-12-20T19:17:47Z`.
  `hl`                                                                             A resource hash of the [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-50 .internalDFN link-type="dfn"} to add integrity protection, as specified in \[[HASHLINK](#bib-hashlink "Cryptographic Hyperlinks"){.bibref link-type="biblio"}\]. This parameter is non-normative. If present, the associated value *MUST* be an [ASCII string](https://infra.spec.whatwg.org/#ascii-string){lt="ascii string" data-type="dfn"}.

Implementers as well as [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-24 .internalDFN
link-type="dfn"} specification authors might use additional DID
parameters that are not listed here. For maximum interoperability, it is
*RECOMMENDED* that DID parameters use the DID Specification Registries
mechanism
\[[DID-SPEC-REGISTRIES](#bib-did-spec-registries "DID Specification Registries"){.bibref
link-type="biblio"}\], to avoid collision with other uses of the same
DID parameter with different semantics.

DID parameters might be used if there is a clear use case where the
parameter needs to be part of a
[URL](https://url.spec.whatwg.org/#concept-url){data-type="dfn"} that
references a [resource](#dfn-resources){#ref-for-dfn-resources-9
.internalDFN link-type="dfn"} with more precision than using the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-60
.internalDFN link-type="dfn"} alone. It is expected that DID parameters
are *not* used if the same functionality can be expressed by passing
input metadata to a [DID
resolver](#dfn-did-resolvers){#ref-for-dfn-did-resolvers-4 .internalDFN
link-type="dfn"}. Additional considerations for processing these
parameters are discussed in
\[[DID-RESOLUTION](#bib-did-resolution "Decentralized Identifier Resolution"){.bibref
link-type="biblio"}\].

:::: {#issue-container-generatedID-2 .note role="note"}
::: {#h-note-2 .note-title .marker role="heading" aria-level="5"}
Note[: DID parameters and DID resolution]{.issue-label}
:::

The [DID resolution](#dfn-did-resolution){#ref-for-dfn-did-resolution-5
.internalDFN link-type="dfn"} and the [DID URL
dereferencing](#dfn-did-url-dereferencing){#ref-for-dfn-did-url-dereferencing-4
.internalDFN link-type="dfn"} functions can be influenced by passing
input metadata to a [DID
resolver](#dfn-did-resolvers){#ref-for-dfn-did-resolvers-5 .internalDFN
link-type="dfn"} that are not part of the [DID
URL](#dfn-did-urls){#ref-for-dfn-did-urls-18 .internalDFN
link-type="dfn"} (see [7.1.1 DID Resolution
Options](#did-resolution-options){.sec-ref}). This is comparable to
HTTP, where certain parameters could either be included in an HTTP URL,
or alternatively passed as HTTP headers during the dereferencing
process. The important distinction is that DID parameters that are part
of the [DID URL](#dfn-did-urls){#ref-for-dfn-did-urls-19 .internalDFN
link-type="dfn"} should be used to specify *what
[resource](#dfn-resources){#ref-for-dfn-resources-10 .internalDFN
link-type="dfn"} is being identified*, whereas input metadata that is
not part of the [DID URL](#dfn-did-urls){#ref-for-dfn-did-urls-20
.internalDFN link-type="dfn"} should be use to control *how that
[resource](#dfn-resources){#ref-for-dfn-resources-11 .internalDFN
link-type="dfn"} is resolved or dereferenced*.
::::
::::::::::::

:::::: {#relative-did-urls .section}
::: header-wrapper
#### 3.2.2 Relative DID URLs {#x3-2-2-relative-did-urls}

[](#relative-did-urls){.self-link
aria-label="Permalink for Section 3.2.2"}
:::

A relative [DID URL](#dfn-did-urls){#ref-for-dfn-did-urls-21
.internalDFN link-type="dfn"} is any URL value in a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-51 .internalDFN
link-type="dfn"} that does not start with
`did:<method-name>:<method-specific-id>`. More specifically, it is any
URL value that does not start with the ABNF defined in [3.1 DID
Syntax](#did-syntax){.sec-ref}. The URL is expected to reference a
[resource](#dfn-resources){#ref-for-dfn-resources-12 .internalDFN
link-type="dfn"} in the same [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-52 .internalDFN
link-type="dfn"}. Relative [DID
URLs](#dfn-did-urls){#ref-for-dfn-did-urls-22 .internalDFN
link-type="dfn"} *MAY* contain relative path components, query
parameters, and fragment identifiers.

When resolving a relative [DID
URL](#dfn-did-urls){#ref-for-dfn-did-urls-23 .internalDFN
link-type="dfn"} reference, the algorithm specified in [RFC3986 Section
5: Reference
Resolution](https://www.rfc-editor.org/rfc/rfc3986#section-5) *MUST* be
used. The **base URI** value is the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-61
.internalDFN link-type="dfn"} that is associated with the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-17 .internalDFN
link-type="dfn"}, see [5.1.1 DID Subject](#did-subject){.sec-ref}. The
**scheme** is `did`. The **authority** is a combination of
`<method-name>:<method-specific-id>`, and the **path**, **query**, and
**fragment** values are those defined in [Path](#path){.sec-ref},
[Query](#query){.sec-ref}, and [Fragment](#fragment){.sec-ref},
respectively.

Relative [DID URLs](#dfn-did-urls){#ref-for-dfn-did-urls-24 .internalDFN
link-type="dfn"} are often used to reference [verification
methods](#dfn-verification-method){#ref-for-dfn-verification-method-8
.internalDFN link-type="dfn"} and
[services](#dfn-service){#ref-for-dfn-service-8 .internalDFN
link-type="dfn"} in a [DID
Document](#dfn-did-documents){#ref-for-dfn-did-documents-53 .internalDFN
link-type="dfn"} without having to use absolute URLs. [DID
methods](#dfn-did-methods){#ref-for-dfn-did-methods-25 .internalDFN
link-type="dfn"} where storage size is a consideration might use
relative URLs to reduce the storage size of [DID
documents](#dfn-did-documents){#ref-for-dfn-did-documents-54
.internalDFN link-type="dfn"}.

:::: {#example-an-example-of-a-relative-did-url .example}
::: marker
[Example 9](#example-an-example-of-a-relative-did-url){.self-link}[: An
example of a relative DID URL]{.example-title}
:::

``` nohighlight
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/suites/ed25519-2020/v1"
  ]
  "id": "did:example:123456789abcdefghi",
  "verificationMethod": [{
    "id": "did:example:123456789abcdefghi#key-1",
    "type": "Ed25519VerificationKey2020", // external (property value)
    "controller": "did:example:123456789abcdefghi",
    "publicKeyMultibase": "zH3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"
  }, ...],
  "authentication": [
    // a relative DID URL used to reference a verification method above
    "#key-1"
  ]
}
```
::::

In the example above, the relative [DID
URL](#dfn-did-urls){#ref-for-dfn-did-urls-25 .internalDFN
link-type="dfn"} value will be transformed to an absolute [DID
URL](#dfn-did-urls){#ref-for-dfn-did-urls-26 .internalDFN
link-type="dfn"} value of `did:example:123456789abcdefghi#key-1`.
::::::
::::::::::::::::::::::::::::::::::::::
::::::::::::::::::::::::::::::::::::::::::

::::::::: {#data-model .section}
::: header-wrapper
## 4. Data Model {#x4-data-model}

[](#data-model){.self-link aria-label="Permalink for Section 4."}
:::

This specification defines a data model that can be used to express [DID
documents](#dfn-did-documents){#ref-for-dfn-did-documents-55
.internalDFN link-type="dfn"} and DID document data structures, which
can then be serialized into multiple concrete
[representations](#dfn-representations){#ref-for-dfn-representations-6
.internalDFN link-type="dfn"}. This section provides a high-level
description of the data model, descriptions of the ways different types
of properties are expressed in the data model, and instructions for
extending the data model.

A [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-56
.internalDFN link-type="dfn"} consists of a
[map](https://infra.spec.whatwg.org/#maps) of
[entries](https://infra.spec.whatwg.org/#map-entry), where each entry
consists of a key/value pair. The [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-57 .internalDFN
link-type="dfn"} data model contains at least two different classes of
entries. The first class of entries is called properties, and is
specified in section [5. Core Properties](#core-properties){.sec-ref}.
The second class is made up of [representation-specific
entries](#dfn-representation-specific-entry){#ref-for-dfn-representation-specific-entry-1
.internalDFN link-type="dfn"}, and is specified in section [6.
Representations](#representations){.sec-ref}.

<figure id="did-document-entries">
<img src="diagrams/diagram-did-document-entries.svg"
style="margin: auto; display: block;" width="1320" height="502"
alt=" Diagram illustrating the entries in the DID document, including properties and representation-specific entries; some entries are defined by this specification; others are defined by registered or unregistered extensions." />
<figcaption>Figure 3 <span class="fig-title"> The entries in a DID
document. See also: <a href="#did-document-entries-longdesc"
class="longdesc-link">narrative description</a>. </span></figcaption>
</figure>

::: {#did-document-entries-longdesc .longdesc}
The diagram is titled, \"Entries in the DID Document map\". A dotted
grey line runs horizontally through the center of the diagram. The space
above the line is labeled \"Properties\", and the space below it,
\"Representation-specific entries\". Six labeled rectangles appear in
the diagram, three lying above the dotted grey line and three below it.
A large green rectangle, labeled \"DID Specification Registries\",
encloses the four leftmost rectangles (upper left, upper center, lower
left, and lower center). The two leftmost rectangles (upper left and
lower left) are outlined in blue and labeled in blue, as follows. The
upper left rectangle is labeled \"Core Properties\", and contains text
\"id, alsoKnownAs, controller, authentication, verificationMethod,
service, serviceEndpoint, \...\". The lower left rectangle is labeled
\"Core Representation-specific Entries\", and contains text
\"@context\". The four rightmost rectangles (upper center, upper right,
lower center, and lower right) are outlined in grey and labeled in
black, as follows. The upper center rectangle is labeled, \"Property
Extensions\", and contains text \"ethereumAddress\". The lower center
rectangle is labeled, \"Representation-specific Entry Extensions\", and
contains no other text. The upper right rectangle is labeled,
\"Unregistered Property Extensions\", and contains text \"foo\". The
lower right rectangle is labeled \"Unregistered Representation-specific
Entry Extensions\", and contains text \"%YAML, xmlns\".
:::

All entry keys in the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-58 .internalDFN
link-type="dfn"} data model are
[strings](https://infra.spec.whatwg.org/#strings). All entry values are
expressed using one of the abstract data types in the table below, and
each
[representation](#dfn-representations){#ref-for-dfn-representations-7
.internalDFN link-type="dfn"} specifies the concrete serialization
format of each data type.

  Data Type                                                                                               Considerations
  ------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  [map](https://infra.spec.whatwg.org/#maps)                                                              A finite ordered sequence of key/value pairs, with no key appearing twice as specified in \[[INFRA](#bib-infra "Infra Standard"){.bibref link-type="biblio"}\]. A map is sometimes referred to as an [ordered map](https://infra.spec.whatwg.org/#maps) in \[[INFRA](#bib-infra "Infra Standard"){.bibref link-type="biblio"}\].
  [list](https://infra.spec.whatwg.org/#list)                                                             A finite ordered sequence of items as specified in \[[INFRA](#bib-infra "Infra Standard"){.bibref link-type="biblio"}\].
  [set](https://infra.spec.whatwg.org/#ordered-set)                                                       A finite ordered sequence of items that does not contain the same item twice as specified in \[[INFRA](#bib-infra "Infra Standard"){.bibref link-type="biblio"}\]. A set is sometimes referred to as an [ordered set](https://infra.spec.whatwg.org/#ordered-set) in \[[INFRA](#bib-infra "Infra Standard"){.bibref link-type="biblio"}\].
  [datetime]{#dfn-datetime .dfn plurals="datetimes" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}   A date and time value that is capable of losslessly expressing all values expressible by a `dateTime` as specified in \[[XMLSCHEMA11-2](https://www.w3.org/TR/xmlschema11-2/#dateTime)\].
  [string](https://infra.spec.whatwg.org/#string)                                                         A sequence of code units often used to represent human readable language as specified in \[[INFRA](#bib-infra "Infra Standard"){.bibref link-type="biblio"}\].
  [integer]{#dfn-integer .dfn tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}                         A real number without a fractional component as specified in \[[XMLSCHEMA11-2](https://www.w3.org/TR/xmlschema11-2/#decimal)\]. To maximize interoperability, implementers are urged to heed the advice regarding integers in [RFC8259, Section 6: Numbers](https://www.rfc-editor.org/rfc/rfc8259#section-6).
  [double]{#dfn-double .dfn tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}                           A value that is often used to approximate arbitrary real numbers as specified in \[[XMLSCHEMA11-2](https://www.w3.org/TR/xmlschema11-2/#double)\]. To maximize interoperability, implementers are urged to heed the advice regarding doubles in [RFC8259, Section 6: Numbers](https://www.rfc-editor.org/rfc/rfc8259#section-6).
  [boolean](https://infra.spec.whatwg.org/#boolean)                                                       A value that is either true or false as defined in \[[INFRA](#bib-infra "Infra Standard"){.bibref link-type="biblio"}\].
  [null](https://infra.spec.whatwg.org/#nulls)                                                            A value that is used to indicate the lack of a value as defined in \[[INFRA](#bib-infra "Infra Standard"){.bibref link-type="biblio"}\].

As a result of the [data model](#data-model) being defined using
terminology from \[[INFRA](#bib-infra "Infra Standard"){.bibref
link-type="biblio"}\], property values which can contain more than one
item, such as [lists](https://infra.spec.whatwg.org/#list),
[maps](https://infra.spec.whatwg.org/#ordered-map) and
[sets](https://infra.spec.whatwg.org/#ordered-set), are explicitly
ordered. All list-like value structures in
\[[INFRA](#bib-infra "Infra Standard"){.bibref link-type="biblio"}\] are
ordered, whether or not that order is significant. For the purposes of
this specification, unless otherwise stated,
[map](https://infra.spec.whatwg.org/#ordered-map) and
[set](https://infra.spec.whatwg.org/#ordered-set) ordering is not
important and implementations are not expected to produce or consume
deterministically ordered values.

:::::: {#extensibility .section}
::: header-wrapper
### 4.1 Extensibility {#x4-1-extensibility}

[](#extensibility){.self-link aria-label="Permalink for Section 4.1"}
:::

The data model supports two types of extensibility.

1.  For maximum interoperability, it is *RECOMMENDED* that extensions
    use the W3C DID Specification Registries mechanism
    \[[DID-SPEC-REGISTRIES](#bib-did-spec-registries "DID Specification Registries"){.bibref
    link-type="biblio"}\]. The use of this mechanism for new properties
    or other extensions is the only specified mechanism that ensures
    that two different
    [representations](#dfn-representations){#ref-for-dfn-representations-8
    .internalDFN link-type="dfn"} will be able to work together.
2.  [Representations](#dfn-representations){#ref-for-dfn-representations-9
    .internalDFN link-type="dfn"} *MAY* define other extensibility
    mechanisms, including ones that do not require the use of the DID
    Specification Registries. Such extension mechanisms *SHOULD* support
    lossless conversion into any other conformant
    [representation](#dfn-representations){#ref-for-dfn-representations-10
    .internalDFN link-type="dfn"}. Extension mechanisms for a
    [representation](#dfn-representations){#ref-for-dfn-representations-11
    .internalDFN link-type="dfn"} *SHOULD* define a mapping of all
    properties and
    [representation](#dfn-representations){#ref-for-dfn-representations-12
    .internalDFN link-type="dfn"} syntax into the [data
    model](#data-model) and its type system.

:::: {#issue-container-generatedID-3 .note role="note"}
::: {#h-note-3 .note-title .marker role="heading" aria-level="4"}
Note[: Unregistered extensions are less reliable]{.issue-label}
:::

It is always possible for two specific implementations to agree
out-of-band to use a mutually understood extension or
[representation](#dfn-representations){#ref-for-dfn-representations-13
.internalDFN link-type="dfn"} that is not recorded in the DID
Specification Registries
\[[DID-SPEC-REGISTRIES](#bib-did-spec-registries "DID Specification Registries"){.bibref
link-type="biblio"}\]; interoperability between such implementations and
the larger ecosystem will be less reliable.
::::
::::::
:::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: {#core-properties .section}
::: header-wrapper
## 5. Core Properties {#x5-core-properties}

[](#core-properties){.self-link aria-label="Permalink for Section 5."}
:::

A
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-62
.internalDFN link-type="dfn"} is associated with a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-59 .internalDFN
link-type="dfn"}. [DID
documents](#dfn-did-documents){#ref-for-dfn-did-documents-60
.internalDFN link-type="dfn"} are expressed using the [data
model](#data-model) and can be serialized into a
[representation](#representations). The following sections define the
properties in a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-61 .internalDFN
link-type="dfn"}, including whether these properties are required or
optional. These properties describe relationships between the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-18 .internalDFN
link-type="dfn"} and the value of the property.

The following tables contain informative references for the core
properties defined by this specification, with expected values, and
whether or not they are required. The property names in the tables are
linked to the normative definitions and more detailed descriptions of
each property.

:::: {#issue-container-generatedID-4 .note role="note"}
::: {#h-note-4 .note-title .marker role="heading" aria-level="3"}
Note[: Property names used in maps of different types]{.issue-label}
:::

The property names `id`, `type`, and `controller` can be present in maps
of different types with possible differences in constraints.
::::

:::: {.section .notoc}
::: header-wrapper
### DID Document properties

[](#did-document-properties){.self-link
aria-label="Permalink for this Section"}
:::

  Property                                                                                                                Required?   Value constraints
  ----------------------------------------------------------------------------------------------------------------------- ----------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  [`id`](#dfn-id){#ref-for-dfn-id-1 .internalDFN link-type="dfn"}                                                         yes         A [string](https://infra.spec.whatwg.org/#string) that conforms to the rules in [3.1 DID Syntax](#did-syntax){.sec-ref}.
  [`alsoKnownAs`](#dfn-alsoknownas){#ref-for-dfn-alsoknownas-1 .internalDFN link-type="dfn"}                              no          A [set](https://infra.spec.whatwg.org/#ordered-set) of [strings](https://infra.spec.whatwg.org/#string) that conform to the rules of \[[RFC3986](#bib-rfc3986 "Uniform Resource Identifier (URI): Generic Syntax"){.bibref link-type="biblio"}\] for [URIs](#dfn-uri){#ref-for-dfn-uri-11 .internalDFN link-type="dfn"}.
  [`controller`](#dfn-controller){#ref-for-dfn-controller-2 .internalDFN link-type="dfn"}                                 no          A [string](https://infra.spec.whatwg.org/#string) or a [set](https://infra.spec.whatwg.org/#ordered-set) of [strings](https://infra.spec.whatwg.org/#string) that conform to the rules in [3.1 DID Syntax](#did-syntax){.sec-ref}.
  [`verificationMethod`](#dfn-verificationmethod){#ref-for-dfn-verificationmethod-1 .internalDFN link-type="dfn"}         no          A [set](https://infra.spec.whatwg.org/#ordered-set) of [Verification Method](#dfn-verification-method){#ref-for-dfn-verification-method-9 .internalDFN link-type="dfn"} [maps](https://infra.spec.whatwg.org/#ordered-map) that conform to the rules in [Verification Method properties](#verification-method-properties){.sec-ref}.
  [`authentication`](#dfn-authentication){#ref-for-dfn-authentication-1 .internalDFN link-type="dfn"}                     no          A [set](https://infra.spec.whatwg.org/#ordered-set) of either [Verification Method](#dfn-verification-method){#ref-for-dfn-verification-method-10 .internalDFN link-type="dfn"} [maps](https://infra.spec.whatwg.org/#ordered-map) that conform to the rules in [Verification Method properties](#verification-method-properties){.sec-ref}) or [strings](https://infra.spec.whatwg.org/#string) that conform to the rules in [3.2 DID URL Syntax](#did-url-syntax){.sec-ref}.
  [`assertionMethod`](#dfn-assertionmethod){#ref-for-dfn-assertionmethod-1 .internalDFN link-type="dfn"}                  no          
  [`keyAgreement`](#dfn-keyagreement){#ref-for-dfn-keyagreement-1 .internalDFN link-type="dfn"}                           no          
  [`capabilityInvocation`](#dfn-capabilityinvocation){#ref-for-dfn-capabilityinvocation-1 .internalDFN link-type="dfn"}   no          
  [`capabilityDelegation`](#dfn-capabilitydelegation){#ref-for-dfn-capabilitydelegation-1 .internalDFN link-type="dfn"}   no          
  [`service`](#dfn-service){#ref-for-dfn-service-9 .internalDFN link-type="dfn"}                                          no          A [set](https://infra.spec.whatwg.org/#ordered-set) of [Service Endpoint](#dfn-service-endpoints){#ref-for-dfn-service-endpoints-3 .internalDFN link-type="dfn"} [maps](https://infra.spec.whatwg.org/#ordered-map) that conform to the rules in [Service properties](#service-properties){.sec-ref}.
::::

:::: {.section .notoc}
::: header-wrapper
### Verification Method properties

[](#verification-method-properties){.self-link
aria-label="Permalink for this Section"}
:::

  Property                                                                                                          Required?   Value constraints
  ----------------------------------------------------------------------------------------------------------------- ----------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  `id`                                                                                                              yes         A [string](https://infra.spec.whatwg.org/#string) that conforms to the rules in [3.2 DID URL Syntax](#did-url-syntax){.sec-ref}.
  [`controller`](#dfn-controller){#ref-for-dfn-controller-3 .internalDFN link-type="dfn"}                           yes         A [string](https://infra.spec.whatwg.org/#string) that conforms to the rules in [3.1 DID Syntax](#did-syntax){.sec-ref}.
  `type`                                                                                                            yes         A [string](https://infra.spec.whatwg.org/#string).
  [`publicKeyJwk`](#dfn-publickeyjwk){#ref-for-dfn-publickeyjwk-1 .internalDFN link-type="dfn"}                     no          A [map](https://infra.spec.whatwg.org/#maps) representing a JSON Web Key that conforms to \[[RFC7517](#bib-rfc7517 "JSON Web Key (JWK)"){.bibref link-type="biblio"}\]. See [definition of publicKeyJwk](#dfn-publickeyjwk){#ref-for-dfn-publickeyjwk-2} for additional constraints.
  [`publicKeyMultibase`](#dfn-publickeymultibase){#ref-for-dfn-publickeymultibase-1 .internalDFN link-type="dfn"}   no          A [string](https://infra.spec.whatwg.org/#string) that conforms to a \[[MULTIBASE](#bib-multibase "The Multibase Encoding Scheme"){.bibref link-type="biblio"}\] encoded public key.
::::

:::: {.section .notoc}
::: header-wrapper
### Service properties

[](#service-properties){.self-link
aria-label="Permalink for this Section"}
:::

  Property                                                                                                 Required?   Value constraints
  -------------------------------------------------------------------------------------------------------- ----------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  `id`                                                                                                     yes         A [string](https://infra.spec.whatwg.org/#string) that conforms to the rules of \[[RFC3986](#bib-rfc3986 "Uniform Resource Identifier (URI): Generic Syntax"){.bibref link-type="biblio"}\] for [URIs](#dfn-uri){#ref-for-dfn-uri-12 .internalDFN link-type="dfn"}.
  `type`                                                                                                   yes         A [string](https://infra.spec.whatwg.org/#string) or a [set](https://infra.spec.whatwg.org/#ordered-set) of [strings](https://infra.spec.whatwg.org/#string).
  [`serviceEndpoint`](#dfn-serviceendpoint){#ref-for-dfn-serviceendpoint-1 .internalDFN link-type="dfn"}   yes         A [string](https://infra.spec.whatwg.org/#string) that conforms to the rules of \[[RFC3986](#bib-rfc3986 "Uniform Resource Identifier (URI): Generic Syntax"){.bibref link-type="biblio"}\] for [URIs](#dfn-uri){#ref-for-dfn-uri-13 .internalDFN link-type="dfn"}, a [map](https://infra.spec.whatwg.org/#string), or a [set](https://infra.spec.whatwg.org/#ordered-set) composed of a one or more [strings](https://infra.spec.whatwg.org/#string) that conform to the rules of \[[RFC3986](#bib-rfc3986 "Uniform Resource Identifier (URI): Generic Syntax"){.bibref link-type="biblio"}\] for [URIs](#dfn-uri){#ref-for-dfn-uri-14 .internalDFN link-type="dfn"} and/or [maps](https://infra.spec.whatwg.org/#string).
::::

::::::::::::::::::::: {#identifiers .section}
::: header-wrapper
### 5.1 Identifiers {#x5-1-identifiers}

[](#identifiers){.self-link aria-label="Permalink for Section 5.1"}
:::

This section describes the mechanisms by which [DID
documents](#dfn-did-documents){#ref-for-dfn-did-documents-62
.internalDFN link-type="dfn"} include identifiers for [DID
subjects](#dfn-did-subjects){#ref-for-dfn-did-subjects-19 .internalDFN
link-type="dfn"} and [DID
controllers](#dfn-did-controllers){#ref-for-dfn-did-controllers-8
.internalDFN link-type="dfn"}.

:::::::: {#did-subject .section}
::: header-wrapper
#### 5.1.1 DID Subject {#x5-1-1-did-subject}

[](#did-subject){.self-link aria-label="Permalink for Section 5.1.1"}
:::

The
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-63
.internalDFN link-type="dfn"} for a particular [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-20 .internalDFN
link-type="dfn"} is expressed using the
[`id`](#dfn-id){#ref-for-dfn-id-2 .internalDFN link-type="dfn"} property
in the [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-63
.internalDFN link-type="dfn"}.

[id]{#dfn-id .dfn tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   The value of `id` *MUST* be a
    [string](https://infra.spec.whatwg.org/#string) that conforms to the
    rules in [3.1 DID Syntax](#did-syntax){.sec-ref} and *MUST* exist in
    the root [map](https://infra.spec.whatwg.org/#ordered-map) of the
    [data model](#data-model) for the [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-64
    .internalDFN link-type="dfn"}.

:::: {#example-10 .example}
::: marker
[Example 10](#example-10){.self-link}
:::

``` nohighlight
{
  "id": "did:example:123456789abcdefghijk"
}
```
::::

The `id` property only denotes the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-64
.internalDFN link-type="dfn"} of the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-21 .internalDFN
link-type="dfn"} when it is present in the *topmost*
[map](https://infra.spec.whatwg.org/#ordered-map) of the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-65 .internalDFN
link-type="dfn"}.

:::: {#issue-container-generatedID-5 .note role="note"}
::: {#h-note-5 .note-title .marker role="heading" aria-level="5"}
Note[: Intermediate representations]{.issue-label}
:::

[DID method](#dfn-did-methods){#ref-for-dfn-did-methods-26 .internalDFN
link-type="dfn"} specifications can create intermediate representations
of a [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-66
.internalDFN link-type="dfn"} that do not contain the
[`id`](#dfn-id){#ref-for-dfn-id-3 .internalDFN link-type="dfn"}
property, such as when a [DID
resolver](#dfn-did-resolvers){#ref-for-dfn-did-resolvers-6 .internalDFN
link-type="dfn"} is performing [DID
resolution](#dfn-did-resolution){#ref-for-dfn-did-resolution-6
.internalDFN link-type="dfn"}. However, the fully resolved [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-67 .internalDFN
link-type="dfn"} always contains a valid
[`id`](#dfn-id){#ref-for-dfn-id-4 .internalDFN link-type="dfn"}
property.
::::
::::::::

:::::::: {#did-controller .section}
::: header-wrapper
#### 5.1.2 DID Controller {#x5-1-2-did-controller}

[](#did-controller){.self-link aria-label="Permalink for Section 5.1.2"}
:::

A [DID controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-9
.internalDFN link-type="dfn"} is an entity that is authorized to make
changes to a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-68 .internalDFN
link-type="dfn"}. The process of authorizing a [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-10
.internalDFN link-type="dfn"} is defined by the [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-27 .internalDFN
link-type="dfn"}.

[controller]{#dfn-controller .dfn plurals="controllers" tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   The `controller` property is *OPTIONAL*. If present, the value
    *MUST* be a [string](https://infra.spec.whatwg.org/#string) or a
    [set](https://infra.spec.whatwg.org/#ordered-set) of
    [strings](https://infra.spec.whatwg.org/#string) that conform to the
    rules in [3.1 DID Syntax](#did-syntax){.sec-ref}. The corresponding
    [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-69
    .internalDFN link-type="dfn"}(s) *SHOULD* contain [verification
    relationships](#dfn-verification-relationship){#ref-for-dfn-verification-relationship-1
    .internalDFN link-type="dfn"} that explicitly permit the use of
    certain [verification
    methods](#dfn-verification-method){#ref-for-dfn-verification-method-11
    .internalDFN link-type="dfn"} for specific purposes.

When a [`controller`](#dfn-controller){#ref-for-dfn-controller-4
.internalDFN link-type="dfn"} property is present in a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-70 .internalDFN
link-type="dfn"}, its value expresses one or more
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-65
.internalDFN link-type="dfn"}. Any [verification
methods](#dfn-verification-method){#ref-for-dfn-verification-method-12
.internalDFN link-type="dfn"} contained in the [DID
documents](#dfn-did-documents){#ref-for-dfn-did-documents-71
.internalDFN link-type="dfn"} for those
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-66
.internalDFN link-type="dfn"} *SHOULD* be accepted as authoritative,
such that proofs that satisfy those [verification
methods](#dfn-verification-method){#ref-for-dfn-verification-method-13
.internalDFN link-type="dfn"} are to be considered equivalent to proofs
provided by the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-22 .internalDFN
link-type="dfn"}.

:::: {#example-did-document-with-a-controller-property .example}
::: marker
[Example
11](#example-did-document-with-a-controller-property){.self-link}[: DID
document with a controller property]{.example-title}
:::

``` nohighlight
{
  "@context": "https://www.w3.org/ns/did/v1",
  "id": "did:example:123456789abcdefghi",
  "controller": "did:example:bcehfew7h32f32h7af3",
}
```
::::

:::: {#issue-container-generatedID-6 .note role="note"}
::: {#h-note-6 .note-title .marker role="heading" aria-level="5"}
Note[: Authorization vs authentication]{.issue-label}
:::

Note that authorization provided by the value of `controller` is
separate from authentication as described in [5.3.1
Authentication](#authentication){.sec-ref}. This is particularly
important for key recovery in the case of cryptographic key loss, where
the [DID subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-23
.internalDFN link-type="dfn"} no longer has access to their keys, or key
compromise, where the [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-11
.internalDFN link-type="dfn"}\'s trusted third parties need to override
malicious activity by an attacker. See [9. Security
Considerations](#security-considerations){.sec-ref} for information
related to threat models and attack vectors.
::::
::::::::

::::::: {#also-known-as .section}
::: header-wrapper
#### 5.1.3 Also Known As {#x5-1-3-also-known-as}

[](#also-known-as){.self-link aria-label="Permalink for Section 5.1.3"}
:::

A [DID subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-24
.internalDFN link-type="dfn"} can have multiple identifiers for
different purposes, or at different times. The assertion that two or
more
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-67
.internalDFN link-type="dfn"} (or other types of
[URI](#dfn-uri){#ref-for-dfn-uri-15 .internalDFN link-type="dfn"}) refer
to the same [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-25 .internalDFN
link-type="dfn"} can be made using the
[`alsoKnownAs`](#dfn-alsoknownas){#ref-for-dfn-alsoknownas-2
.internalDFN link-type="dfn"} property.

[alsoKnownAs]{#dfn-alsoknownas .dfn tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   The `alsoKnownAs` property is *OPTIONAL*. If present, the value
    *MUST* be a [set](https://infra.spec.whatwg.org/#ordered-set) where
    each item in the set is a [URI](#dfn-uri){#ref-for-dfn-uri-16
    .internalDFN link-type="dfn"} conforming to
    \[[RFC3986](#bib-rfc3986 "Uniform Resource Identifier (URI): Generic Syntax"){.bibref
    link-type="biblio"}\].
:   This relationship is a statement that the subject of this identifier
    is also identified by one or more other identifiers.

::::: {#issue-container-generatedID-7 .note role="note"}
::: {#h-note-7 .note-title .marker role="heading" aria-level="5"}
Note[: Equivalence and alsoKnownAs]{.issue-label}
:::

<div>

Applications might choose to consider two identifiers related by
[`alsoKnownAs`](#dfn-alsoknownas){#ref-for-dfn-alsoknownas-3
.internalDFN link-type="dfn"} to be equivalent *if* the
[`alsoKnownAs`](#dfn-alsoknownas){#ref-for-dfn-alsoknownas-4
.internalDFN link-type="dfn"} relationship is reciprocated in the
reverse direction. It is best practice *not* to consider them equivalent
in the absence of this inverse relationship. In other words, the
presence of an
[`alsoKnownAs`](#dfn-alsoknownas){#ref-for-dfn-alsoknownas-5
.internalDFN link-type="dfn"} assertion does not prove that this
assertion is true. Therefore, it is strongly advised that a requesting
party obtain independent verification of an `alsoKnownAs` assertion.

Given that the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-26 .internalDFN
link-type="dfn"} might use different identifiers for different purposes,
an expectation of strong equivalence between the two identifiers, or
merging the information of the two corresponding [DID
documents](#dfn-did-documents){#ref-for-dfn-did-documents-72
.internalDFN link-type="dfn"}, is not necessarily appropriate, *even
with* a reciprocal relationship.

</div>
:::::
:::::::
:::::::::::::::::::::

:::::::::::::::: {#verification-methods .section}
::: header-wrapper
### 5.2 Verification Methods {#x5-2-verification-methods}

[](#verification-methods){.self-link
aria-label="Permalink for Section 5.2"}
:::

A [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-73
.internalDFN link-type="dfn"} can express [verification
methods](#dfn-verification-method){#ref-for-dfn-verification-method-14
.internalDFN link-type="dfn"}, such as cryptographic public keys, which
can be used to
[authenticate](#dfn-authenticated){#ref-for-dfn-authenticated-5
.internalDFN link-type="dfn"} or authorize interactions with the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-27 .internalDFN
link-type="dfn"} or associated parties. For example, a cryptographic
public key can be used as a [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-15
.internalDFN link-type="dfn"} with respect to a digital signature; in
such usage, it verifies that the signer could use the associated
cryptographic private key. [Verification
methods](#dfn-verification-method){#ref-for-dfn-verification-method-16
.internalDFN link-type="dfn"} might take many parameters. An example of
this is a set of five cryptographic keys from which any three are
required to contribute to a cryptographic threshold signature.

[verificationMethod]{#dfn-verificationmethod .dfn tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}

:   The `verificationMethod` property is *OPTIONAL*. If present, the
    value *MUST* be a [set](https://infra.spec.whatwg.org/#ordered-set)
    of [verification
    methods](#dfn-verification-method){#ref-for-dfn-verification-method-17
    .internalDFN link-type="dfn"}, where each [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-18
    .internalDFN link-type="dfn"} is expressed using a
    [map](https://infra.spec.whatwg.org/#ordered-map). The [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-19
    .internalDFN link-type="dfn"}
    [map](https://infra.spec.whatwg.org/#ordered-map) *MUST* include the
    `id`, `type`, `controller`, and specific verification material
    properties that are determined by the value of `type` and are
    defined in [5.2.1 Verification
    Material](#verification-material){.sec-ref}. A [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-20
    .internalDFN link-type="dfn"} *MAY* include additional properties.
    [Verification
    methods](#dfn-verification-method){#ref-for-dfn-verification-method-21
    .internalDFN link-type="dfn"} *SHOULD* be registered in the DID
    Specification Registries
    \[[DID-SPEC-REGISTRIES](#bib-did-spec-registries "DID Specification Registries"){.bibref
    link-type="biblio"}\].

    id

    :   The value of the [`id`](#dfn-id){#ref-for-dfn-id-5 .internalDFN
        link-type="dfn"} property for a [verification
        method](#dfn-verification-method){#ref-for-dfn-verification-method-22
        .internalDFN link-type="dfn"} *MUST* be a
        [string](https://infra.spec.whatwg.org/#string) that conforms to
        the rules in Section [3.2 DID URL
        Syntax](#did-url-syntax){.sec-ref}.

    type
    :   The value of the `type` property *MUST* be a
        [string](https://infra.spec.whatwg.org/#string) that references
        exactly one [verification
        method](#dfn-verification-method){#ref-for-dfn-verification-method-23
        .internalDFN link-type="dfn"} type. In order to maximize global
        interoperability, the [verification
        method](#dfn-verification-method){#ref-for-dfn-verification-method-24
        .internalDFN link-type="dfn"} type *SHOULD* be registered in the
        DID Specification Registries
        \[[DID-SPEC-REGISTRIES](#bib-did-spec-registries "DID Specification Registries"){.bibref
        link-type="biblio"}\].

    controller
    :   The value of the `controller` property *MUST* be a
        [string](https://infra.spec.whatwg.org/#string) that conforms to
        the rules in [3.1 DID Syntax](#did-syntax){.sec-ref}.

:::: {#example-example-verification-method-structure .example}
::: marker
[Example
12](#example-example-verification-method-structure){.self-link}[:
Example verification method structure]{.example-title}
:::

``` {aria-busy="false"}
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/suites/jws-2020/v1"
    "https://w3id.org/security/suites/ed25519-2020/v1"
  ]
  "id": "did:example:123456789abcdefghi",
  ...
  "verificationMethod": [{
    "id": ...,
    "type": ...,
    "controller": ...,
    "publicKeyJwk": ...
  }, {
    "id": ...,
    "type": ...,
    "controller": ...,
    "publicKeyMultibase": ...
  }]
}
```
::::

:::: {#issue-container-generatedID-8 .note role="note"}
::: {#h-note-8 .note-title .marker role="heading" aria-level="4"}
Note[: Verification method controller(s) and DID
controller(s)]{.issue-label}
:::

The semantics of the `controller` property are the same when the subject
of the relationship is the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-74 .internalDFN
link-type="dfn"} as when the subject of the relationship is a
[verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-25
.internalDFN link-type="dfn"}, such as a cryptographic public key. Since
a key can\'t control itself, and the key controller cannot be inferred
from the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-75 .internalDFN
link-type="dfn"}, it is necessary to explicitly express the identity of
the controller of the key. The difference is that the value of
`controller` for a [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-26
.internalDFN link-type="dfn"} is *not* necessarily a [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-12
.internalDFN link-type="dfn"}. [DID
controllers](#dfn-did-controllers){#ref-for-dfn-did-controllers-13
.internalDFN link-type="dfn"} are expressed using the
[`controller`](#dfn-controller){#ref-for-dfn-controller-5 .internalDFN
link-type="dfn"} property at the highest level of the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-76 .internalDFN
link-type="dfn"} (the topmost
[map](https://infra.spec.whatwg.org/#ordered-map) in the [data
model](#data-model)); see [5.1.2 DID
Controller](#did-controller){.sec-ref}.
::::

:::::: {#verification-material .section}
::: header-wrapper
#### 5.2.1 Verification Material {#x5-2-1-verification-material}

[](#verification-material){.self-link
aria-label="Permalink for Section 5.2.1"}
:::

Verification material is any information that is used by a process that
applies a [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-27
.internalDFN link-type="dfn"}. The `type` of a [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-28
.internalDFN link-type="dfn"} is expected to be used to determine its
compatibility with such processes. Examples of verification material
properties are
[`publicKeyJwk`](#dfn-publickeyjwk){#ref-for-dfn-publickeyjwk-3
.internalDFN link-type="dfn"} or
[`publicKeyMultibase`](#dfn-publickeymultibase){#ref-for-dfn-publickeymultibase-2
.internalDFN link-type="dfn"}. A [cryptographic
suite](#dfn-cryptosuite){#ref-for-dfn-cryptosuite-1 .internalDFN
link-type="dfn"} specification is responsible for specifying the
[verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-29
.internalDFN link-type="dfn"} `type` and its associated verification
material. For example, see [JSON Web Signature
2020](https://w3c-ccg.github.io/lds-jws2020/) and [Ed25519 Signature
2020](https://w3c-ccg.github.io/lds-ed25519-2020/). For all registered
[verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-30
.internalDFN link-type="dfn"} types and associated verification material
available for
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-68
.internalDFN link-type="dfn"}, please see the DID Specification
Registries
\[[DID-SPEC-REGISTRIES](#bib-did-spec-registries "DID Specification Registries"){.bibref
link-type="biblio"}\].

To increase the likelihood of interoperable implementations, this
specification limits the number of formats for expressing verification
material in a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-77 .internalDFN
link-type="dfn"}. The fewer formats that implementers have to implement,
the more likely it will be that they will support all of them. This
approach attempts to strike a delicate balance between ease of
implementation and supporting formats that have historically had broad
deployment. Two supported verification material properties are listed
below:

[publicKeyJwk]{#dfn-publickeyjwk .dfn tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}

:   The `publicKeyJwk` property is *OPTIONAL*. If present, the value
    *MUST* be a [map](https://infra.spec.whatwg.org/#ordered-map)
    representing a JSON Web Key that conforms to
    \[[RFC7517](#bib-rfc7517 "JSON Web Key (JWK)"){.bibref
    link-type="biblio"}\]. The
    [map](https://infra.spec.whatwg.org/#ordered-map) *MUST NOT* contain
    \"d\", or any other members of the private information class as
    described in [Registration
    Template](https://tools.ietf.org/html/rfc7517#section-8.1.1). It is
    *RECOMMENDED* that verification methods that use JWKs
    \[[RFC7517](#bib-rfc7517 "JSON Web Key (JWK)"){.bibref
    link-type="biblio"}\] to represent their public keys use the value
    of `kid` as their [fragment identifier](#fragment). It is
    *RECOMMENDED* that JWK `kid` values are set to the public key
    fingerprint
    \[[RFC7638](#bib-rfc7638 "JSON Web Key (JWK) Thumbprint"){.bibref
    link-type="biblio"}\]. See the first key in [Example
    13](#example-various-verification-method-types){.box-ref} for an
    example of a public key with a compound key identifier.

[publicKeyMultibase]{#dfn-publickeymultibase .dfn tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}

:   The `publicKeyMultibase` property is *OPTIONAL*. This feature is
    non-normative. If present, the value *MUST* be a
    [string](https://infra.spec.whatwg.org/#string) representation of a
    \[[MULTIBASE](#bib-multibase "The Multibase Encoding Scheme"){.bibref
    link-type="biblio"}\] encoded public key.

    Note that the
    \[[MULTIBASE](#bib-multibase "The Multibase Encoding Scheme"){.bibref
    link-type="biblio"}\] specification is not yet a standard and is
    subject to change. There might be some use cases for this data
    format where **`public`**`KeyMultibase` is defined, to allow for
    expression of public keys, but **`private`**`KeyMultibase` is not
    defined, to protect against accidental leakage of secret keys.

A [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-31
.internalDFN link-type="dfn"} *MUST NOT* contain multiple verification
material properties for the same material. For example, expressing key
material in a [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-32
.internalDFN link-type="dfn"} using both `publicKeyJwk` and
`publicKeyMultibase` at the same time is prohibited.

An example of a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-78 .internalDFN
link-type="dfn"} containing [verification
methods](#dfn-verification-method){#ref-for-dfn-verification-method-33
.internalDFN link-type="dfn"} using both properties above is shown
below.

:::: {#example-various-verification-method-types .example}
::: marker
[Example 13](#example-various-verification-method-types){.self-link}[:
Verification methods using publicKeyJwk and
publicKeyMultibase]{.example-title}
:::

``` nohighlight
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/suites/jws-2020/v1",
    "https://w3id.org/security/suites/ed25519-2020/v1"
  ]
  "id": "did:example:123456789abcdefghi",
  ...
  "verificationMethod": [{
    "id": "did:example:123#_Qq0UL2Fq651Q0Fjd6TvnYE-faHiOpRlPVQcY_-tA4A",
    "type": "JsonWebKey2020", // external (property value)
    "controller": "did:example:123",
    "publicKeyJwk": {
      "crv": "Ed25519", // external (property name)
      "x": "VCpo2LMLhn6iWku8MKvSLg2ZAoC-nlOyPVQaO3FxVeQ", // external (property name)
      "kty": "OKP", // external (property name)
      "kid": "_Qq0UL2Fq651Q0Fjd6TvnYE-faHiOpRlPVQcY_-tA4A" // external (property name)
    }
  }, {
    "id": "did:example:123456789abcdefghi#keys-1",
    "type": "Ed25519VerificationKey2020", // external (property value)
    "controller": "did:example:pqrstuvwxyz0987654321",
    "publicKeyMultibase": "zH3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"
  }],
  ...
}
```
::::
::::::

:::::: {#referring-to-verification-methods .section}
::: header-wrapper
#### 5.2.2 Referring to Verification Methods {#x5-2-2-referring-to-verification-methods}

[](#referring-to-verification-methods){.self-link
aria-label="Permalink for Section 5.2.2"}
:::

[Verification
methods](#dfn-verification-method){#ref-for-dfn-verification-method-34
.internalDFN link-type="dfn"} can be embedded in or referenced from
properties associated with various [verification
relationships](#dfn-verification-relationship){#ref-for-dfn-verification-relationship-2
.internalDFN link-type="dfn"} as described in [5.3 Verification
Relationships](#verification-relationships){.sec-ref}. Referencing
[verification
methods](#dfn-verification-method){#ref-for-dfn-verification-method-35
.internalDFN link-type="dfn"} allows them to be used by more than one
[verification
relationship](#dfn-verification-relationship){#ref-for-dfn-verification-relationship-3
.internalDFN link-type="dfn"}.

If the value of a [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-36
.internalDFN link-type="dfn"} property is a
[map](https://infra.spec.whatwg.org/#ordered-map), the [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-37
.internalDFN link-type="dfn"} has been embedded and its properties can
be accessed directly. However, if the value is a URL
[string](https://infra.spec.whatwg.org/#string), the [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-38
.internalDFN link-type="dfn"} has been included by reference and its
properties will need to be retrieved from elsewhere in the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-79 .internalDFN
link-type="dfn"} or from another [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-80 .internalDFN
link-type="dfn"}. This is done by dereferencing the URL and searching
the resulting [resource](#dfn-resources){#ref-for-dfn-resources-13
.internalDFN link-type="dfn"} for a [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-39
.internalDFN link-type="dfn"}
[map](https://infra.spec.whatwg.org/#ordered-map) with an `id` property
whose value matches the URL.

:::: {#example-embedding-and-referencing-verification-methods .example}
::: marker
[Example
14](#example-embedding-and-referencing-verification-methods){.self-link}[:
Embedding and referencing verification methods]{.example-title}
:::

``` nohighlight
{
...

  "authentication": [
    // this key is referenced and might be used by
    // more than one verification relationship
    "did:example:123456789abcdefghi#keys-1",
    // this key is embedded and may *only* be used for authentication
    {
      "id": "did:example:123456789abcdefghi#keys-2",
      "type": "Ed25519VerificationKey2020", // external (property value)
      "controller": "did:example:123456789abcdefghi",
      "publicKeyMultibase": "zH3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"
    }
  ],

...
}
```
::::
::::::
::::::::::::::::

:::::::::::::::::::::::: {#verification-relationships .section}
::: header-wrapper
### 5.3 Verification Relationships {#x5-3-verification-relationships}

[](#verification-relationships){.self-link
aria-label="Permalink for Section 5.3"}
:::

A [verification
relationship](#dfn-verification-relationship){#ref-for-dfn-verification-relationship-4
.internalDFN link-type="dfn"} expresses the relationship between the
[DID subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-28
.internalDFN link-type="dfn"} and a [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-40
.internalDFN link-type="dfn"}.

Different [verification
relationships](#dfn-verification-relationship){#ref-for-dfn-verification-relationship-5
.internalDFN link-type="dfn"} enable the associated [verification
methods](#dfn-verification-method){#ref-for-dfn-verification-method-41
.internalDFN link-type="dfn"} to be used for different purposes. It is
up to a *verifier* to ascertain the validity of a verification attempt
by checking that the [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-42
.internalDFN link-type="dfn"} used is contained in the appropriate
[verification
relationship](#dfn-verification-relationship){#ref-for-dfn-verification-relationship-6
.internalDFN link-type="dfn"} property of the [DID
Document](#dfn-did-documents){#ref-for-dfn-did-documents-81 .internalDFN
link-type="dfn"}.

The [verification
relationship](#dfn-verification-relationship){#ref-for-dfn-verification-relationship-7
.internalDFN link-type="dfn"} between the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-29 .internalDFN
link-type="dfn"} and the [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-43
.internalDFN link-type="dfn"} is explicit in the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-82 .internalDFN
link-type="dfn"}. [Verification
methods](#dfn-verification-method){#ref-for-dfn-verification-method-44
.internalDFN link-type="dfn"} that are not associated with a particular
[verification
relationship](#dfn-verification-relationship){#ref-for-dfn-verification-relationship-8
.internalDFN link-type="dfn"} cannot be used for that [verification
relationship](#dfn-verification-relationship){#ref-for-dfn-verification-relationship-9
.internalDFN link-type="dfn"}. For example, a [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-45
.internalDFN link-type="dfn"} in the value of the
[`authentication`](#dfn-authentication){#ref-for-dfn-authentication-2
.internalDFN link-type="dfn"} property cannot be used to engage in key
agreement protocols with the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-30 .internalDFN
link-type="dfn"}---the value of the
[`keyAgreement`](#dfn-keyagreement){#ref-for-dfn-keyagreement-2
.internalDFN link-type="dfn"} property needs to be used for that.

The [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-83
.internalDFN link-type="dfn"} does not express revoked keys using a
[verification
relationship](#dfn-verification-relationship){#ref-for-dfn-verification-relationship-10
.internalDFN link-type="dfn"}. If a referenced verification method is
not in the latest [DID
Document](#dfn-did-documents){#ref-for-dfn-did-documents-84 .internalDFN
link-type="dfn"} used to dereference it, then that verification method
is considered invalid or revoked. Each [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-28 .internalDFN
link-type="dfn"} specification is expected to detail how revocation is
performed and tracked.

The following sections define several useful [verification
relationships](#dfn-verification-relationship){#ref-for-dfn-verification-relationship-11
.internalDFN link-type="dfn"}. A [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-85 .internalDFN
link-type="dfn"} *MAY* include any of these, or other properties, to
express a specific [verification
relationship](#dfn-verification-relationship){#ref-for-dfn-verification-relationship-12
.internalDFN link-type="dfn"}. In order to maximize global
interoperability, any such properties used *SHOULD* be registered in the
DID Specification Registries
\[[DID-SPEC-REGISTRIES](#bib-did-spec-registries "DID Specification Registries"){.bibref
link-type="biblio"}\].

:::::: {#authentication .section}
::: header-wrapper
#### 5.3.1 Authentication {#x5-3-1-authentication}

[](#authentication){.self-link aria-label="Permalink for Section 5.3.1"}
:::

The `authentication` [verification
relationship](#dfn-verification-relationship){#ref-for-dfn-verification-relationship-13
.internalDFN link-type="dfn"} is used to specify how the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-31 .internalDFN
link-type="dfn"} is expected to be
[authenticated](#dfn-authenticated){#ref-for-dfn-authenticated-6
.internalDFN link-type="dfn"}, for purposes such as logging into a
website or engaging in any sort of challenge-response protocol.

[authentication]{#dfn-authentication .dfn tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   The `authentication` property is *OPTIONAL*. If present, the
    associated value *MUST* be a
    [set](https://infra.spec.whatwg.org/#ordered-set) of one or more
    [verification
    methods](#dfn-verification-method){#ref-for-dfn-verification-method-46
    .internalDFN link-type="dfn"}. Each [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-47
    .internalDFN link-type="dfn"} *MAY* be embedded or referenced.

:::: {#example-authentication-property-containing-three-verification-methods .example}
::: marker
[Example
15](#example-authentication-property-containing-three-verification-methods){.self-link}[:
Authentication property containing three verification
methods]{.example-title}
:::

``` nohighlight
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/suites/ed25519-2020/v1"
  ],
  "id": "did:example:123456789abcdefghi",
  ...
  "authentication": [
    // this method can be used to authenticate as did:...fghi
    "did:example:123456789abcdefghi#keys-1",
    // this method is *only* approved for authentication, it may not
    // be used for any other proof purpose, so its full description is
    // embedded here rather than using only a reference
    {
      "id": "did:example:123456789abcdefghi#keys-2",
      "type": "Ed25519VerificationKey2020",
      "controller": "did:example:123456789abcdefghi",
      "publicKeyMultibase": "zH3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"
    }
  ],
  ...
}
```
::::

If authentication is established, it is up to the [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-29 .internalDFN
link-type="dfn"} or other application to decide what to do with that
information. A particular [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-30 .internalDFN
link-type="dfn"} could decide that authenticating as a [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-14
.internalDFN link-type="dfn"} is sufficient to, for example, update or
delete the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-86 .internalDFN
link-type="dfn"}. Another [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-31 .internalDFN
link-type="dfn"} could require different keys, or a different
[verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-48
.internalDFN link-type="dfn"} entirely, to be presented in order to
update or delete the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-87 .internalDFN
link-type="dfn"} than that used to
[authenticate](#dfn-authenticated){#ref-for-dfn-authenticated-7
.internalDFN link-type="dfn"}. In other words, what is done *after* the
authentication check is out of scope for the [data model](#data-model);
[DID methods](#dfn-did-methods){#ref-for-dfn-did-methods-32 .internalDFN
link-type="dfn"} and applications are expected to define this
themselves.

This is useful to any *authentication verifier* that needs to check to
see if an entity that is attempting to
[authenticate](#dfn-authenticated){#ref-for-dfn-authenticated-8
.internalDFN link-type="dfn"} is, in fact, presenting a valid proof of
authentication. When a *verifier* receives some data (in some
protocol-specific format) that contains a proof that was made for the
purpose of \"authentication\", and that says that an entity is
identified by the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-69
.internalDFN link-type="dfn"}, then that *verifier* checks to ensure
that the proof can be verified using a [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-49
.internalDFN link-type="dfn"} (e.g., public key) listed under
[`authentication`](#dfn-authentication){#ref-for-dfn-authentication-3
.internalDFN link-type="dfn"} in the [DID
Document](#dfn-did-documents){#ref-for-dfn-did-documents-88 .internalDFN
link-type="dfn"}.

Note that the [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-50
.internalDFN link-type="dfn"} indicated by the
[`authentication`](#dfn-authentication){#ref-for-dfn-authentication-4
.internalDFN link-type="dfn"} property of a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-89 .internalDFN
link-type="dfn"} can only be used to
[authenticate](#dfn-authenticated){#ref-for-dfn-authenticated-9
.internalDFN link-type="dfn"} the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-32 .internalDFN
link-type="dfn"}. To
[authenticate](#dfn-authenticated){#ref-for-dfn-authenticated-10
.internalDFN link-type="dfn"} a different [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-15
.internalDFN link-type="dfn"}, the entity associated with the value of
`controller`, as defined in [5.1.2 DID
Controller](#did-controller){.sec-ref}, needs to
[authenticate](#dfn-authenticated){#ref-for-dfn-authenticated-11
.internalDFN link-type="dfn"} with its *own* [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-90 .internalDFN
link-type="dfn"} and associated
[`authentication`](#dfn-authentication){#ref-for-dfn-authentication-5
.internalDFN link-type="dfn"} [verification
relationship](#dfn-verification-relationship){#ref-for-dfn-verification-relationship-14
.internalDFN link-type="dfn"}.
::::::

:::::: {#assertion .section}
::: header-wrapper
#### 5.3.2 Assertion {#x5-3-2-assertion}

[](#assertion){.self-link aria-label="Permalink for Section 5.3.2"}
:::

The `assertionMethod` [verification
relationship](#dfn-verification-relationship){#ref-for-dfn-verification-relationship-15
.internalDFN link-type="dfn"} is used to specify how the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-33 .internalDFN
link-type="dfn"} is expected to express claims, such as for the purposes
of issuing a Verifiable Credential
\[[VC-DATA-MODEL](#bib-vc-data-model "Verifiable Credentials Data Model v1.1"){.bibref
link-type="biblio"}\].

[assertionMethod]{#dfn-assertionmethod .dfn tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   The `assertionMethod` property is *OPTIONAL*. If present, the
    associated value *MUST* be a
    [set](https://infra.spec.whatwg.org/#ordered-set) of one or more
    [verification
    methods](#dfn-verification-method){#ref-for-dfn-verification-method-51
    .internalDFN link-type="dfn"}. Each [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-52
    .internalDFN link-type="dfn"} *MAY* be embedded or referenced.

This property is useful, for example, during the processing of a
[verifiable
credential](#dfn-verifiable-credentials){#ref-for-dfn-verifiable-credentials-2
.internalDFN link-type="dfn"} by a verifier. During verification, a
verifier checks to see if a [verifiable
credential](#dfn-verifiable-credentials){#ref-for-dfn-verifiable-credentials-3
.internalDFN link-type="dfn"} contains a proof created by the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-34 .internalDFN
link-type="dfn"} by checking that the [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-53
.internalDFN link-type="dfn"} used to assert the proof is associated
with the
[`assertionMethod`](#dfn-assertionmethod){#ref-for-dfn-assertionmethod-2
.internalDFN link-type="dfn"} property in the corresponding [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-91 .internalDFN
link-type="dfn"}.

:::: {#example-assertion-method-property-containing-two-verification-methods .example}
::: marker
[Example
16](#example-assertion-method-property-containing-two-verification-methods){.self-link}[:
Assertion method property containing two verification
methods]{.example-title}
:::

``` nohighlight
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/suites/ed25519-2020/v1"
  ],
  "id": "did:example:123456789abcdefghi",
  ...
  "assertionMethod": [
    // this method can be used to assert statements as did:...fghi
    "did:example:123456789abcdefghi#keys-1",
    // this method is *only* approved for assertion of statements, it is not
    // used for any other verification relationship, so its full description is
    // embedded here rather than using a reference
    {
      "id": "did:example:123456789abcdefghi#keys-2",
      "type": "Ed25519VerificationKey2020", // external (property value)
      "controller": "did:example:123456789abcdefghi",
      "publicKeyMultibase": "zH3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"
    }
  ],
  ...
}
```
::::
::::::

:::::: {#key-agreement .section}
::: header-wrapper
#### 5.3.3 Key Agreement {#x5-3-3-key-agreement}

[](#key-agreement){.self-link aria-label="Permalink for Section 5.3.3"}
:::

The `keyAgreement` [verification
relationship](#dfn-verification-relationship){#ref-for-dfn-verification-relationship-16
.internalDFN link-type="dfn"} is used to specify how an entity can
generate encryption material in order to transmit confidential
information intended for the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-35 .internalDFN
link-type="dfn"}, such as for the purposes of establishing a secure
communication channel with the recipient.

[keyAgreement]{#dfn-keyagreement .dfn tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   The `keyAgreement` property is *OPTIONAL*. If present, the
    associated value *MUST* be a
    [set](https://infra.spec.whatwg.org/#ordered-set) of one or more
    [verification
    methods](#dfn-verification-method){#ref-for-dfn-verification-method-54
    .internalDFN link-type="dfn"}. Each [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-55
    .internalDFN link-type="dfn"} *MAY* be embedded or referenced.

An example of when this property is useful is when encrypting a message
intended for the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-36 .internalDFN
link-type="dfn"}. In this case, the counterparty uses the cryptographic
public key information in the [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-56
.internalDFN link-type="dfn"} to wrap a decryption key for the
recipient.

:::: {#example-key-agreement-property-containing-two-verification-methods .example}
::: marker
[Example
17](#example-key-agreement-property-containing-two-verification-methods){.self-link}[:
Key agreement property containing two verification
methods]{.example-title}
:::

``` nohighlight
{
  "@context": "https://www.w3.org/ns/did/v1",
  "id": "did:example:123456789abcdefghi",
  ...
  "keyAgreement": [
    // this method can be used to perform key agreement as did:...fghi
    "did:example:123456789abcdefghi#keys-1",
    // this method is *only* approved for key agreement usage, it will not
    // be used for any other verification relationship, so its full description is
    // embedded here rather than using only a reference
    {
      "id": "did:example:123#zC9ByQ8aJs8vrNXyDhPHHNNMSHPcaSgNpjjsBYpMMjsTdS",
      "type": "X25519KeyAgreementKey2019", // external (property value)
      "controller": "did:example:123",
      "publicKeyMultibase": "z9hFgmPVfmBZwRvFEyniQDBkz9LmV7gDEqytWyGZLmDXE"
    }
  ],
  ...
}
```
::::
::::::

:::::: {#capability-invocation .section}
::: header-wrapper
#### 5.3.4 Capability Invocation {#x5-3-4-capability-invocation}

[](#capability-invocation){.self-link
aria-label="Permalink for Section 5.3.4"}
:::

The `capabilityInvocation` [verification
relationship](#dfn-verification-relationship){#ref-for-dfn-verification-relationship-17
.internalDFN link-type="dfn"} is used to specify a [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-57
.internalDFN link-type="dfn"} that might be used by the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-37 .internalDFN
link-type="dfn"} to invoke a cryptographic capability, such as the
authorization to update the [DID
Document](#dfn-did-documents){#ref-for-dfn-did-documents-92 .internalDFN
link-type="dfn"}.

[capabilityInvocation]{#dfn-capabilityinvocation .dfn tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   The `capabilityInvocation` property is *OPTIONAL*. If present, the
    associated value *MUST* be a
    [set](https://infra.spec.whatwg.org/#ordered-set) of one or more
    [verification
    methods](#dfn-verification-method){#ref-for-dfn-verification-method-58
    .internalDFN link-type="dfn"}. Each [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-59
    .internalDFN link-type="dfn"} *MAY* be embedded or referenced.

An example of when this property is useful is when a [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-38 .internalDFN
link-type="dfn"} needs to access a protected HTTP API that requires
authorization in order to use it. In order to authorize when using the
HTTP API, the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-39 .internalDFN
link-type="dfn"} uses a capability that is associated with a particular
URL that is exposed via the HTTP API. The invocation of the capability
could be expressed in a number of ways, e.g., as a digitally signed
message that is placed into the HTTP Headers.

The server providing the HTTP API is the *verifier* of the capability
and it would need to verify that the [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-60
.internalDFN link-type="dfn"} referred to by the invoked capability
exists in the
[`capabilityInvocation`](#dfn-capabilityinvocation){#ref-for-dfn-capabilityinvocation-2
.internalDFN link-type="dfn"} property of the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-93 .internalDFN
link-type="dfn"}. The verifier would also check to make sure that the
action being performed is valid and the capability is appropriate for
the resource being accessed. If the verification is successful, the
server has cryptographically determined that the invoker is authorized
to access the protected resource.

:::: {#example-capability-invocation-property-containing-two-verification-methods .example}
::: marker
[Example
18](#example-capability-invocation-property-containing-two-verification-methods){.self-link}[:
Capability invocation property containing two verification
methods]{.example-title}
:::

``` nohighlight
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/suites/ed25519-2020/v1"
  ],
  "id": "did:example:123456789abcdefghi",
  ...
  "capabilityInvocation": [
    // this method can be used to invoke capabilities as did:...fghi
    "did:example:123456789abcdefghi#keys-1",
    // this method is *only* approved for capability invocation usage, it will not
    // be used for any other verification relationship, so its full description is
    // embedded here rather than using only a reference
    {
    "id": "did:example:123456789abcdefghi#keys-2",
    "type": "Ed25519VerificationKey2020", // external (property value)
    "controller": "did:example:123456789abcdefghi",
    "publicKeyMultibase": "zH3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"
    }
  ],
  ...
}
```
::::
::::::

:::::: {#capability-delegation .section}
::: header-wrapper
#### 5.3.5 Capability Delegation {#x5-3-5-capability-delegation}

[](#capability-delegation){.self-link
aria-label="Permalink for Section 5.3.5"}
:::

The `capabilityDelegation` [verification
relationship](#dfn-verification-relationship){#ref-for-dfn-verification-relationship-18
.internalDFN link-type="dfn"} is used to specify a mechanism that might
be used by the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-40 .internalDFN
link-type="dfn"} to delegate a cryptographic capability to another
party, such as delegating the authority to access a specific HTTP API to
a subordinate.

[capabilityDelegation]{#dfn-capabilitydelegation .dfn tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   The `capabilityDelegation` property is *OPTIONAL*. If present, the
    associated value *MUST* be a
    [set](https://infra.spec.whatwg.org/#ordered-set) of one or more
    [verification
    methods](#dfn-verification-method){#ref-for-dfn-verification-method-61
    .internalDFN link-type="dfn"}. Each [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-62
    .internalDFN link-type="dfn"} *MAY* be embedded or referenced.

An example of when this property is useful is when a [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-16
.internalDFN link-type="dfn"} chooses to delegate their capability to
access a protected HTTP API to a party other than themselves. In order
to delegate the capability, the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-41 .internalDFN
link-type="dfn"} would use a [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-63
.internalDFN link-type="dfn"} associated with the `capabilityDelegation`
[verification
relationship](#dfn-verification-relationship){#ref-for-dfn-verification-relationship-19
.internalDFN link-type="dfn"} to cryptographically sign the capability
over to another [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-42 .internalDFN
link-type="dfn"}. The delegate would then use the capability in a manner
that is similar to the example described in [5.3.4 Capability
Invocation](#capability-invocation){.sec-ref}.

:::: {#example-capability-delegation-property-containing-two-verification-methods .example}
::: marker
[Example
19](#example-capability-delegation-property-containing-two-verification-methods){.self-link}[:
Capability Delegation property containing two verification
methods]{.example-title}
:::

``` nohighlight
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/suites/ed25519-2020/v1"
  ],
  "id": "did:example:123456789abcdefghi",
  ...
  "capabilityDelegation": [
    // this method can be used to perform capability delegation as did:...fghi
    "did:example:123456789abcdefghi#keys-1",
    // this method is *only* approved for granting capabilities; it will not
    // be used for any other verification relationship, so its full description is
    // embedded here rather than using only a reference
    {
    "id": "did:example:123456789abcdefghi#keys-2",
    "type": "Ed25519VerificationKey2020", // external (property value)
    "controller": "did:example:123456789abcdefghi",
    "publicKeyMultibase": "zH3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"
    }
  ],
  ...
}
```
::::
::::::
::::::::::::::::::::::::

:::::: {#services .section}
::: header-wrapper
### 5.4 Services {#x5-4-services}

[](#services){.self-link aria-label="Permalink for Section 5.4"}
:::

[Services](#dfn-service){#ref-for-dfn-service-10 .internalDFN
link-type="dfn"} are used in [DID
documents](#dfn-did-documents){#ref-for-dfn-did-documents-94
.internalDFN link-type="dfn"} to express ways of communicating with the
[DID subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-43
.internalDFN link-type="dfn"} or associated entities. A
[service](#dfn-service){#ref-for-dfn-service-11 .internalDFN
link-type="dfn"} can be any type of service the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-44 .internalDFN
link-type="dfn"} wants to advertise, including [decentralized identity
management](#dfn-decentralized-identity-management){#ref-for-dfn-decentralized-identity-management-1
.internalDFN link-type="dfn"} services for further discovery,
authentication, authorization, or interaction.

Due to privacy concerns, revealing public information through
[services](#dfn-service){#ref-for-dfn-service-12 .internalDFN
link-type="dfn"}, such as social media accounts, personal websites, and
email addresses, is discouraged. Further exploration of privacy concerns
can be found in [10.1 Keep Personal Data
Private](#keep-personal-data-private){.sec-ref} and [10.6 Service
Privacy](#service-privacy){.sec-ref}. The information associated with
[services](#dfn-service){#ref-for-dfn-service-13 .internalDFN
link-type="dfn"} is often service specific. For example, the information
associated with an encrypted messaging service can express how to
initiate the encrypted link before messaging begins.

[Services](#dfn-service){#ref-for-dfn-service-14 .internalDFN
link-type="dfn"} are expressed using the
[`service`](#dfn-service){#ref-for-dfn-service-15 .internalDFN
link-type="dfn"} property, which is described below:

service

:   The `service` property is *OPTIONAL*. If present, the associated
    value *MUST* be a [set](https://infra.spec.whatwg.org/#ordered-set)
    of [services](#dfn-service){#ref-for-dfn-service-16 .internalDFN
    link-type="dfn"}, where each service is described by a
    [map](https://infra.spec.whatwg.org/#ordered-map). Each
    [service](#dfn-service){#ref-for-dfn-service-17 .internalDFN
    link-type="dfn"} [map](https://infra.spec.whatwg.org/#ordered-map)
    *MUST* contain [`id`](#dfn-id){#ref-for-dfn-id-6 .internalDFN
    link-type="dfn"}, `type`, and
    [`serviceEndpoint`](#dfn-serviceendpoint){#ref-for-dfn-serviceendpoint-2
    .internalDFN link-type="dfn"} properties. Each service extension
    *MAY* include additional properties and *MAY* further restrict the
    properties associated with the extension.

    id
    :   The value of the `id` property *MUST* be a
        [URI](#dfn-uri){#ref-for-dfn-uri-17 .internalDFN
        link-type="dfn"} conforming to
        \[[RFC3986](#bib-rfc3986 "Uniform Resource Identifier (URI): Generic Syntax"){.bibref
        link-type="biblio"}\]. A [conforming
        producer](#dfn-conforming-producer){#ref-for-dfn-conforming-producer-1
        .internalDFN link-type="dfn"} *MUST NOT* produce multiple
        `service` entries with the same `id`. A [conforming
        consumer](#dfn-conforming-consumer){#ref-for-dfn-conforming-consumer-1
        .internalDFN link-type="dfn"} *MUST* produce an error if it
        detects multiple `service` entries with the same `id`.

    type
    :   The value of the `type` property *MUST* be a
        [string](https://infra.spec.whatwg.org/#string) or a
        [set](https://infra.spec.whatwg.org/#ordered-set) of
        [strings](https://infra.spec.whatwg.org/#string). In order to
        maximize interoperability, the
        [service](#dfn-service){#ref-for-dfn-service-18 .internalDFN
        link-type="dfn"} type and its associated properties *SHOULD* be
        registered in the DID Specification Registries
        \[[DID-SPEC-REGISTRIES](#bib-did-spec-registries "DID Specification Registries"){.bibref
        link-type="biblio"}\].

    [serviceEndpoint]{#dfn-serviceendpoint .dfn tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
    :   The value of the `serviceEndpoint` property *MUST* be a
        [string](https://infra.spec.whatwg.org/#string), a
        [map](https://infra.spec.whatwg.org/#string), or a
        [set](https://infra.spec.whatwg.org/#ordered-set) composed of
        one or more [strings](https://infra.spec.whatwg.org/#string)
        and/or [maps](https://infra.spec.whatwg.org/#string). All
        [string](https://infra.spec.whatwg.org/#string) values *MUST* be
        valid [URIs](#dfn-uri){#ref-for-dfn-uri-18 .internalDFN
        link-type="dfn"} conforming to
        \[[RFC3986](#bib-rfc3986 "Uniform Resource Identifier (URI): Generic Syntax"){.bibref
        link-type="biblio"}\] and normalized according to the
        [Normalization and Comparison rules in
        RFC3986](https://www.rfc-editor.org/rfc/rfc3986#section-6) and
        to any normalization rules in its applicable
        [URI](#dfn-uri){#ref-for-dfn-uri-19 .internalDFN
        link-type="dfn"} scheme specification.

For more information regarding privacy and security considerations
related to [services](#dfn-service){#ref-for-dfn-service-19 .internalDFN
link-type="dfn"} see [10.6 Service Privacy](#service-privacy){.sec-ref},
[10.1 Keep Personal Data
Private](#keep-personal-data-private){.sec-ref}, [10.3 DID Document
Correlation Risks](#did-document-correlation-risks){.sec-ref}, and [9.3
Authentication Service
Endpoints](#authentication-service-endpoints){.sec-ref}.

:::: {#example-usage-of-the-service-property .example}
::: marker
[Example 20](#example-usage-of-the-service-property){.self-link}[: Usage
of the service property]{.example-title}
:::

``` nohighlight
{
  "service": [{
    "id":"did:example:123#linked-domain",
    "type": "LinkedDomains", // external (property value)
    "serviceEndpoint": "https://bar.example.com"
  }]
}
```
::::
::::::
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

::::::::::::::::::::::::::: {#representations .section .normative}
::: header-wrapper
## 6. Representations {#x6-representations}

[](#representations){.self-link aria-label="Permalink for Section 6."}
:::

A concrete serialization of a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-95 .internalDFN
link-type="dfn"} in this specification is called a
[representation](#dfn-representations){#ref-for-dfn-representations-14
.internalDFN link-type="dfn"}. A
[representation](#dfn-representations){#ref-for-dfn-representations-15
.internalDFN link-type="dfn"} is created by serializing the [data
model](#data-model) through a process called
[production]{#dfn-production .dfn tabindex="0" aria-haspopup="dialog"
dfn-type="dfn"}. A
[representation](#dfn-representations){#ref-for-dfn-representations-16
.internalDFN link-type="dfn"} is transformed into the [data
model](#data-model) through a process called
[consumption]{#dfn-consumption .dfn tabindex="0" aria-haspopup="dialog"
dfn-type="dfn"}. The *production* and *consumption* processes enable the
conversion of information from one
[representation](#dfn-representations){#ref-for-dfn-representations-17
.internalDFN link-type="dfn"} to another. This specification defines
[representations](#dfn-representations){#ref-for-dfn-representations-18
.internalDFN link-type="dfn"} for JSON and JSON-LD, and developers can
use any other
[representation](#dfn-representations){#ref-for-dfn-representations-19
.internalDFN link-type="dfn"}, such as XML or YAML, that is capable of
expressing the [data model](#data-model). The following sections define
the general rules for
[production](#dfn-production){#ref-for-dfn-production-1 .internalDFN
link-type="dfn"} and
[consumption](#dfn-consumption){#ref-for-dfn-consumption-1 .internalDFN
link-type="dfn"}, as well as the JSON and JSON-LD
[representations](#dfn-representations){#ref-for-dfn-representations-20
.internalDFN link-type="dfn"}.

::::::: {#production-and-consumption .section}
::: header-wrapper
### 6.1 Production and Consumption {#x6-1-production-and-consumption}

[](#production-and-consumption){.self-link
aria-label="Permalink for Section 6.1"}
:::

In addition to the
[representations](#dfn-representations){#ref-for-dfn-representations-21
.internalDFN link-type="dfn"} defined in this specification,
implementers can use other
[representations](#dfn-representations){#ref-for-dfn-representations-22
.internalDFN link-type="dfn"}, providing each such
[representation](#dfn-representations){#ref-for-dfn-representations-23
.internalDFN link-type="dfn"} is properly specified (including rules for
interoperable handling of properties not listed in the DID Specification
Registries
\[[DID-SPEC-REGISTRIES](#bib-did-spec-registries "DID Specification Registries"){.bibref
link-type="biblio"}\]). See [4.1
Extensibility](#extensibility){.sec-ref} for more information.

The requirements for all
[representations](#dfn-representations){#ref-for-dfn-representations-24
.internalDFN link-type="dfn"} are as follows:

1.  A
    [representation](#dfn-representations){#ref-for-dfn-representations-25
    .internalDFN link-type="dfn"} *MUST* define deterministic production
    and consumption rules for all data types specified in [4. Data
    Model](#data-model){.sec-ref}.
2.  A
    [representation](#dfn-representations){#ref-for-dfn-representations-26
    .internalDFN link-type="dfn"} *MUST* be uniquely associated with an
    IANA-registered Media Type.
3.  A
    [representation](#dfn-representations){#ref-for-dfn-representations-27
    .internalDFN link-type="dfn"} *MUST* define fragment processing
    rules for its Media Type that are conformant with the fragment
    processing rules defined in [Fragment](#fragment){.sec-ref}.
4.  A
    [representation](#dfn-representations){#ref-for-dfn-representations-28
    .internalDFN link-type="dfn"} *SHOULD* use the lexical
    representation of [data model](#data-model) data types. For example,
    JSON and JSON-LD use the XML Schema `dateTime` lexical serialization
    to represent [datetimes](#dfn-datetime){#ref-for-dfn-datetime-1
    .internalDFN link-type="dfn"}. A
    [representation](#dfn-representations){#ref-for-dfn-representations-29
    .internalDFN link-type="dfn"} *MAY* choose to serialize the [data
    model](#data-model) data types using a different lexical
    serializations as long as the
    [consumption](#dfn-consumption){#ref-for-dfn-consumption-2
    .internalDFN link-type="dfn"} process back into the [data
    model](#data-model) is lossless. For example, some CBOR-based
    [representations](#dfn-representations){#ref-for-dfn-representations-30
    .internalDFN link-type="dfn"} express
    [datetime](#dfn-datetime){#ref-for-dfn-datetime-2 .internalDFN
    link-type="dfn"} values using integers to represent the number of
    seconds since the Unix epoch.
5.  A
    [representation](#dfn-representations){#ref-for-dfn-representations-31
    .internalDFN link-type="dfn"} *MAY* define [representation-specific
    entries](#dfn-representation-specific-entry){#ref-for-dfn-representation-specific-entry-2
    .internalDFN link-type="dfn"} that are stored in a
    [representation-specific
    entries](#dfn-representation-specific-entry){#ref-for-dfn-representation-specific-entry-3
    .internalDFN link-type="dfn"}
    [map](https://infra.spec.whatwg.org/#maps) for use during the
    [production](#dfn-production){#ref-for-dfn-production-2 .internalDFN
    link-type="dfn"} and
    [consumption](#dfn-consumption){#ref-for-dfn-consumption-3
    .internalDFN link-type="dfn"} process. These entries are used when
    consuming or producing to aid in ensuring lossless conversion.
6.  In order to maximize interoperability,
    [representation](#dfn-representations){#ref-for-dfn-representations-32
    .internalDFN link-type="dfn"} specification authors *SHOULD*
    register their
    [representation](#dfn-representations){#ref-for-dfn-representations-33
    .internalDFN link-type="dfn"} in the DID Specification Registries
    \[[DID-SPEC-REGISTRIES](#bib-did-spec-registries "DID Specification Registries"){.bibref
    link-type="biblio"}\].

The requirements for all [conforming
producers](#dfn-conforming-producer){#ref-for-dfn-conforming-producer-2
.internalDFN link-type="dfn"} are as follows:

1.  A [conforming
    producer](#dfn-conforming-producer){#ref-for-dfn-conforming-producer-3
    .internalDFN link-type="dfn"} *MUST* take a [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-96
    .internalDFN link-type="dfn"} [data model](#data-model) and a
    [representation-specific
    entries](#dfn-representation-specific-entry){#ref-for-dfn-representation-specific-entry-4
    .internalDFN link-type="dfn"}
    [map](https://infra.spec.whatwg.org/#maps) as input into the
    [production](#dfn-production){#ref-for-dfn-production-3 .internalDFN
    link-type="dfn"} process. The [conforming
    producer](#dfn-conforming-producer){#ref-for-dfn-conforming-producer-4
    .internalDFN link-type="dfn"} *MAY* accept additional options as
    input into the
    [production](#dfn-production){#ref-for-dfn-production-4 .internalDFN
    link-type="dfn"} process.
2.  A [conforming
    producer](#dfn-conforming-producer){#ref-for-dfn-conforming-producer-5
    .internalDFN link-type="dfn"} *MUST* serialize all entries in the
    [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-97
    .internalDFN link-type="dfn"} [data model](#data-model), and the
    [representation-specific
    entries](#dfn-representation-specific-entry){#ref-for-dfn-representation-specific-entry-5
    .internalDFN link-type="dfn"}
    [map](https://infra.spec.whatwg.org/#maps), that do not have
    explicit processing rules for the
    [representation](#dfn-representations){#ref-for-dfn-representations-34
    .internalDFN link-type="dfn"} being produced using only the
    [representation](#dfn-representations){#ref-for-dfn-representations-35
    .internalDFN link-type="dfn"}\'s data type processing rules and
    return the serialization after the
    [production](#dfn-production){#ref-for-dfn-production-5 .internalDFN
    link-type="dfn"} process completes.
3.  A [conforming
    producer](#dfn-conforming-producer){#ref-for-dfn-conforming-producer-6
    .internalDFN link-type="dfn"} *MUST* return the Media Type
    [string](https://infra.spec.whatwg.org/#string) associated with the
    [representation](#dfn-representations){#ref-for-dfn-representations-36
    .internalDFN link-type="dfn"} after the
    [production](#dfn-production){#ref-for-dfn-production-6 .internalDFN
    link-type="dfn"} process completes.
4.  A conforming producer *MUST NOT* produce non-conforming
    [DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-70
    .internalDFN link-type="dfn"} or [DID
    documents](#dfn-did-documents){#ref-for-dfn-did-documents-98
    .internalDFN link-type="dfn"}.

The requirements for all [conforming
consumers](#dfn-conforming-consumer){#ref-for-dfn-conforming-consumer-2
.internalDFN link-type="dfn"} are as follows:

1.  A [conforming
    consumer](#dfn-conforming-consumer){#ref-for-dfn-conforming-consumer-3
    .internalDFN link-type="dfn"} *MUST* take a
    [representation](#dfn-representations){#ref-for-dfn-representations-37
    .internalDFN link-type="dfn"} and Media Type
    [string](https://infra.spec.whatwg.org/#string) as input into the
    [consumption](#dfn-consumption){#ref-for-dfn-consumption-4
    .internalDFN link-type="dfn"} process. A [conforming
    consumer](#dfn-conforming-consumer){#ref-for-dfn-conforming-consumer-4
    .internalDFN link-type="dfn"} *MAY* accept additional options as
    input into the
    [consumption](#dfn-consumption){#ref-for-dfn-consumption-5
    .internalDFN link-type="dfn"} process.
2.  A [conforming
    consumer](#dfn-conforming-consumer){#ref-for-dfn-conforming-consumer-5
    .internalDFN link-type="dfn"} *MUST* determine the
    [representation](#dfn-representations){#ref-for-dfn-representations-38
    .internalDFN link-type="dfn"} of a [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-99
    .internalDFN link-type="dfn"} using the Media Type input
    [string](https://infra.spec.whatwg.org/#string).
3.  A [conforming
    consumer](#dfn-conforming-consumer){#ref-for-dfn-conforming-consumer-6
    .internalDFN link-type="dfn"} *MUST* detect any
    [representation-specific
    entry](#dfn-representation-specific-entry){#ref-for-dfn-representation-specific-entry-6
    .internalDFN link-type="dfn"} across all known
    [representations](#dfn-representations){#ref-for-dfn-representations-39
    .internalDFN link-type="dfn"} and place the entry into a
    [representation-specific
    entries](#dfn-representation-specific-entry){#ref-for-dfn-representation-specific-entry-7
    .internalDFN link-type="dfn"}
    [map](https://infra.spec.whatwg.org/#maps) which is returned after
    the [consumption](#dfn-consumption){#ref-for-dfn-consumption-6
    .internalDFN link-type="dfn"} process completes. A list of all known
    [representation-specific
    entries](#dfn-representation-specific-entry){#ref-for-dfn-representation-specific-entry-8
    .internalDFN link-type="dfn"} is available in the DID Specification
    Registries
    \[[DID-SPEC-REGISTRIES](#bib-did-spec-registries "DID Specification Registries"){.bibref
    link-type="biblio"}\].
4.  A [conforming
    consumer](#dfn-conforming-consumer){#ref-for-dfn-conforming-consumer-7
    .internalDFN link-type="dfn"} *MUST* add all
    [non-representation-specific
    entries](#dfn-representation-specific-entry){#ref-for-dfn-representation-specific-entry-9
    .internalDFN link-type="dfn"} that do not have explicit processing
    rules for the
    [representation](#dfn-representations){#ref-for-dfn-representations-40
    .internalDFN link-type="dfn"} being consumed to the [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-100
    .internalDFN link-type="dfn"} [data model](#data-model) using only
    the
    [representation](#dfn-representations){#ref-for-dfn-representations-41
    .internalDFN link-type="dfn"}\'s data type processing rules and
    return the [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-101
    .internalDFN link-type="dfn"} data model after the
    [consumption](#dfn-consumption){#ref-for-dfn-consumption-7
    .internalDFN link-type="dfn"} process completes.
5.  A conforming consumer *MUST* produce errors when consuming
    non-conforming
    [DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-71
    .internalDFN link-type="dfn"} or [DID
    documents](#dfn-did-documents){#ref-for-dfn-did-documents-102
    .internalDFN link-type="dfn"}.

<figure id="production-consumption">
<img src="diagrams/diagram-production-consumption.svg"
style="margin: auto; display: block;" width="989" height="605"
alt=" Diagram illustrating how representations of the data model are produced and consumed, including in JSON and JSON-LD." />
<figcaption>Figure 4 <span class="fig-title"> Production and consumption
of representations. See also: <a href="#production-consumption-longdesc"
class="longdesc-link">narrative description</a>. </span></figcaption>
</figure>

::: {#production-consumption-longdesc .longdesc}
The upper left quadrant of the diagram contains a rectangle with dashed
grey outline, containing two blue-outlined rectangles, one above the
other. The upper, larger rectangle is labeled, in blue, \"Core
Properties\", and contains the following
[INFRA](https://infra.spec.whatwg.org/#maps) notation:

``` {aria-busy="false"}
«[
  "id" → "example:123",
  "verificationMethod" → « «[
    "id": "did:example:123#keys-1",
    "controller": "did:example:123",
    "type": "Ed25519VerificationKey2018",
    "publicKeyBase58": "H3C2AVvLMv6gmMNam3uVA"
  ]» »,
  "authentication" → «
    "did:example:123#keys-1"
  »
]»
```

The lower, smaller rectangle is labeled, in blue, \"Core
Representation-specific Entries (JSON-LD)\", and contains the following
monospaced [INFRA](https://infra.spec.whatwg.org/#maps) notation:

``` {aria-busy="false"}
«[ "@context" → "https://www.w3.org/ns/did/v1" ]»
```

From the grey-outlined rectangle, three pairs of arrows extend to three
different black-outlined rectangles, one on the upper right of the
diagram, one in the lower right, and one in the lower left. Each pair of
arrows consists of one blue arrow pointing from the grey-outlined
rectangle to the respective black-outlined rectangle, labeled
\"produce\", and one red arrow pointing in the reverse direction,
labeled \"consume\". The black-outlined rectangle in the upper right is
labeled \"application/did+cbor\", and contains hexadecimal data. The
rectangle in the lower right is labeled \"application/did+json\", and
contains the following JSON data:

``` {aria-busy="false"}
{
  "id": "did:example:123",
  "verificationMethod": [{
    "id": "did:example:123#keys-1",
    "controller": "did:example:123",
    "type": "Ed25519VerificationKey2018",
    "publicKeyBase58": "H3C2AVvLMv6gmMNam3uVA"
  }],
  "authentication": [
    "did:example:123#keys-1"
  ]
}
```

The rectangle in the lower left is labeled \"application/did+ld+json\",
and contains the following JSON-LD data:

``` {aria-busy="false"}
{
  "@context": ["https://www.w3.org/ns/did/v1"],
  "id": "did:example:123",
  "verificationMethod": [{
    "id": "did:example:123#keys-1",
    "controller": "did:example:123",
    "type": "Ed25519VerificationKey2018",
    "publicKeyBase58": "H3C2AVvLMv6gmMNam3uVA"
  }],
  "authentication": [
    "did:example:123#keys-1"
  ]
}
```
:::

:::: {#issue-container-generatedID-9 .note role="note"}
::: {#h-note-9 .note-title .marker role="heading" aria-level="4"}
Note[: Conversion between representations]{.issue-label}
:::

An implementation is expected to convert between
[representations](#dfn-representations){#ref-for-dfn-representations-42
.internalDFN link-type="dfn"} by using the *consumption* rules on the
source representation resulting in the [data model](#data-model) and
then using the *production* rules to serialize [data model](#data-model)
to the target representation, or any other mechanism that results in the
same target representation.
::::
:::::::

:::::::::: {#json .section}
::: header-wrapper
### 6.2 JSON {#x6-2-json}

[](#json){.self-link aria-label="Permalink for Section 6.2"}
:::

This section defines the
[production](#dfn-production){#ref-for-dfn-production-7 .internalDFN
link-type="dfn"} and
[consumption](#dfn-consumption){#ref-for-dfn-consumption-8 .internalDFN
link-type="dfn"} rules for the JSON
[representation](#dfn-representations){#ref-for-dfn-representations-43
.internalDFN link-type="dfn"}.

:::::: {#production .section}
::: header-wrapper
#### 6.2.1 Production {#x6-2-1-production}

[](#production){.self-link aria-label="Permalink for Section 6.2.1"}
:::

The [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-103
.internalDFN link-type="dfn"}, DID document data structures, and
[representation-specific
entries](#dfn-representation-specific-entry){#ref-for-dfn-representation-specific-entry-10
.internalDFN link-type="dfn"} [map](https://infra.spec.whatwg.org/#maps)
*MUST* be serialized to the JSON
[representation](#dfn-representations){#ref-for-dfn-representations-44
.internalDFN link-type="dfn"} according to the following
[production](#dfn-production){#ref-for-dfn-production-8 .internalDFN
link-type="dfn"} rules:

  Data Type                                                                         JSON Representation Type
  --------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  [map](https://infra.spec.whatwg.org/#maps)                                        A [JSON Object](https://www.rfc-editor.org/rfc/rfc8259#section-4), where each entry is serialized as a member of the JSON Object with the entry key as a [JSON String](https://www.rfc-editor.org/rfc/rfc8259#section-7) member name and the entry value according to its type, as defined in this table.
  [list](https://infra.spec.whatwg.org/#list)                                       A [JSON Array](https://www.rfc-editor.org/rfc/rfc8259#section-5), where each element of the list is serialized, in order, as a value of the array according to its type, as defined in this table.
  [set](https://infra.spec.whatwg.org/#ordered-set)                                 A [JSON Array](https://www.rfc-editor.org/rfc/rfc8259#section-5), where each element of the set is added, in order, as a value of the array according to its type, as defined in this table.
  [datetime](#dfn-datetime){#ref-for-dfn-datetime-3 .internalDFN link-type="dfn"}   A [JSON String](https://www.rfc-editor.org/rfc/rfc8259#section-7) serialized as an [XML Datetime](https://www.w3.org/TR/xmlschema11-2/#dateTime) normalized to UTC 00:00:00 and without sub-second decimal precision. For example: `2020-12-20T19:17:47Z`.
  [string](https://infra.spec.whatwg.org/#string)                                   A [JSON String](https://www.rfc-editor.org/rfc/rfc8259#section-7).
  [integer](#dfn-integer){#ref-for-dfn-integer-1 .internalDFN link-type="dfn"}      A [JSON Number](https://www.rfc-editor.org/rfc/rfc8259#section-6) without a decimal or fractional component.
  [double](#dfn-double){#ref-for-dfn-double-1 .internalDFN link-type="dfn"}         A [JSON Number](https://www.rfc-editor.org/rfc/rfc8259#section-6) with a decimal and fractional component.
  [boolean](https://infra.spec.whatwg.org/#boolean)                                 A [JSON Boolean](https://www.rfc-editor.org/rfc/rfc8259#section-3).
  [null](https://infra.spec.whatwg.org/#nulls)                                      A [JSON null literal](https://www.rfc-editor.org/rfc/rfc8259#section-3).

All implementers creating [conforming
producers](#dfn-conforming-producer){#ref-for-dfn-conforming-producer-7
.internalDFN link-type="dfn"} that produce JSON
[representations](#dfn-representations){#ref-for-dfn-representations-45
.internalDFN link-type="dfn"} are advised to ensure that their
algorithms are aligned with the [JSON serialization
rules](https://infra.spec.whatwg.org/#serialize-an-infra-value-to-json-bytes)
in the \[[INFRA](#bib-infra "Infra Standard"){.bibref
link-type="biblio"}\] specification and the [precision advisements
regarding Numbers](https://www.rfc-editor.org/rfc/rfc8259#section-6) in
the JSON
\[[RFC8259](#bib-rfc8259 "The JavaScript Object Notation (JSON) Data Interchange Format"){.bibref
link-type="biblio"}\] specification.

All entries of a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-104
.internalDFN link-type="dfn"} *MUST* be included in the root [JSON
Object](https://www.rfc-editor.org/rfc/rfc8259#section-4). Entries *MAY*
contain additional data substructures subject to the value
representation rules in the list above. When serializing a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-105
.internalDFN link-type="dfn"}, a [conforming
producer](#dfn-conforming-producer){#ref-for-dfn-conforming-producer-8
.internalDFN link-type="dfn"} *MUST* specify a media type of
`application/did+json` to downstream applications such as described in
[7.1.2 DID Resolution Metadata](#did-resolution-metadata){.sec-ref}.

:::: {#example-example-did-document-in-json-representation .example}
::: marker
[Example
21](#example-example-did-document-in-json-representation){.self-link}[:
Example DID document in JSON representation]{.example-title}
:::

``` nohighlight
{
  "id": "did:example:123456789abcdefghi",
  "authentication": [{
    "id": "did:example:123456789abcdefghi#keys-1",
    "type": "Ed25519VerificationKey2018",
    "controller": "did:example:123456789abcdefghi",
    "publicKeyBase58": "H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"
  }]
}
```
::::
::::::

:::: {#consumption .section}
::: header-wrapper
#### 6.2.2 Consumption {#x6-2-2-consumption}

[](#consumption){.self-link aria-label="Permalink for Section 6.2.2"}
:::

The [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-106
.internalDFN link-type="dfn"} and DID document data structures JSON
[representation](#dfn-representations){#ref-for-dfn-representations-46
.internalDFN link-type="dfn"} *MUST* be deserialized into the [data
model](#data-model) according to the following
[consumption](#dfn-consumption){#ref-for-dfn-consumption-9 .internalDFN
link-type="dfn"} rules:

  JSON Representation Type                                                                                                                                                                                                                                      Data Type
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  [JSON Object](https://www.rfc-editor.org/rfc/rfc8259#section-4)                                                                                                                                                                                               A [map](https://infra.spec.whatwg.org/#maps), where each member of the JSON Object is added as an entry to the map. Each entry key is set as the JSON Object member name. Each entry value is set by converting the JSON Object member value according to the JSON representation type as defined in this table. Since order is not specified by JSON Objects, no insertion order is guaranteed.
  [JSON Array](https://www.rfc-editor.org/rfc/rfc8259#section-5) where the [data model](#data-model) entry value is a [list](https://infra.spec.whatwg.org/#list) or unknown                                                                                    A [list](https://infra.spec.whatwg.org/#list), where each value of the JSON Array is added to the list in order, converted based on the JSON representation type of the array value, as defined in this table.
  [JSON Array](https://www.rfc-editor.org/rfc/rfc8259#section-5) where the [data model](#data-model) entry value is a [set](https://infra.spec.whatwg.org/#ordered-set)                                                                                         A [set](https://infra.spec.whatwg.org/#ordered-set), where each value of the JSON Array is added to the set in order, converted based on the JSON representation type of the array value, as defined in this table.
  [JSON String](https://www.rfc-editor.org/rfc/rfc8259#section-7) where [data model](#data-model) entry value is a [datetime](#dfn-datetime){#ref-for-dfn-datetime-4 .internalDFN link-type="dfn"}                                                              A [datetime](#dfn-datetime){#ref-for-dfn-datetime-5 .internalDFN link-type="dfn"}.
  [JSON String](https://www.rfc-editor.org/rfc/rfc8259#section-7), where the [data model](#data-model) entry value type is [string](https://infra.spec.whatwg.org/#string){data-type="dfn"} or unknown                                                          A [string](https://infra.spec.whatwg.org/#string).
  [JSON Number](https://www.rfc-editor.org/rfc/rfc8259#section-6) without a decimal or fractional component                                                                                                                                                     An [integer](#dfn-integer){#ref-for-dfn-integer-2 .internalDFN link-type="dfn"}.
  [JSON Number](https://www.rfc-editor.org/rfc/rfc8259#section-6) with a decimal and fractional component, or when entry value is a [double](#dfn-double){#ref-for-dfn-double-2 .internalDFN link-type="dfn"} regardless of inclusion of fractional component   A [double](#dfn-double){#ref-for-dfn-double-3 .internalDFN link-type="dfn"}.
  [JSON Boolean](https://www.rfc-editor.org/rfc/rfc8259#section-3)                                                                                                                                                                                              A [boolean](https://infra.spec.whatwg.org/#boolean).
  [JSON null literal](https://www.rfc-editor.org/rfc/rfc8259#section-3)                                                                                                                                                                                         A [null](https://infra.spec.whatwg.org/#nulls) value.

All implementers creating [conforming
consumers](#dfn-conforming-consumer){#ref-for-dfn-conforming-consumer-8
.internalDFN link-type="dfn"} that produce JSON
[representations](#dfn-representations){#ref-for-dfn-representations-47
.internalDFN link-type="dfn"} are advised to ensure that their
algorithms are aligned with the [JSON conversion
rules](https://infra.spec.whatwg.org/#parse-json-bytes-to-an-infra-value)
in the \[[INFRA](#bib-infra "Infra Standard"){.bibref
link-type="biblio"}\] specification and the [precision advisements
regarding Numbers](https://www.rfc-editor.org/rfc/rfc8259#section-6) in
the JSON
\[[RFC8259](#bib-rfc8259 "The JavaScript Object Notation (JSON) Data Interchange Format"){.bibref
link-type="biblio"}\] specification.

If media type information is available to a [conforming
consumer](#dfn-conforming-consumer){#ref-for-dfn-conforming-consumer-9
.internalDFN link-type="dfn"} and the media type value is
`application/did+json`, then the data structure being consumed is a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-107
.internalDFN link-type="dfn"}, and the root element *MUST* be a [JSON
Object](https://www.rfc-editor.org/rfc/rfc8259#section-4) where all
members of the object are entries of the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-108
.internalDFN link-type="dfn"}. A [conforming
consumer](#dfn-conforming-consumer){#ref-for-dfn-conforming-consumer-10
.internalDFN link-type="dfn"} for a JSON
[representation](#dfn-representations){#ref-for-dfn-representations-48
.internalDFN link-type="dfn"} that is consuming a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-109
.internalDFN link-type="dfn"} with a root element that is not a [JSON
Object](https://www.rfc-editor.org/rfc/rfc8259#section-4) *MUST* report
an error.
::::
::::::::::

:::::::::::: {#json-ld .section}
::: header-wrapper
### 6.3 JSON-LD {#x6-3-json-ld}

[](#json-ld){.self-link aria-label="Permalink for Section 6.3"}
:::

JSON-LD \[[JSON-LD11](#bib-json-ld11 "JSON-LD 1.1"){.bibref
link-type="biblio"}\] is a JSON-based format used to serialize [Linked
Data](https://www.w3.org/TR/ld-glossary/#linked-data). This section
defines the [production](#dfn-production){#ref-for-dfn-production-9
.internalDFN link-type="dfn"} and
[consumption](#dfn-consumption){#ref-for-dfn-consumption-10 .internalDFN
link-type="dfn"} rules for the JSON-LD
[representation](#dfn-representations){#ref-for-dfn-representations-49
.internalDFN link-type="dfn"}.

The JSON-LD
[representation](#dfn-representations){#ref-for-dfn-representations-50
.internalDFN link-type="dfn"} defines the following
[representation-specific
entries](#dfn-representation-specific-entry){#ref-for-dfn-representation-specific-entry-11
.internalDFN link-type="dfn"}:

[\@context]{#dfn-context .dfn tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   The [JSON-LD Context](https://www.w3.org/TR/json-ld11/#the-context)
    is either a [string](https://infra.spec.whatwg.org/#string) or a
    [list](https://infra.spec.whatwg.org/#list) containing any
    combination of [strings](https://infra.spec.whatwg.org/#string)
    and/or [ordered maps](https://infra.spec.whatwg.org/#maps).

:::::::: {#production-0 .section}
::: header-wrapper
#### 6.3.1 Production {#x6-3-1-production}

[](#production-0){.self-link aria-label="Permalink for Section 6.3.1"}
:::

The [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-110
.internalDFN link-type="dfn"}, DID document data structures, and
[representation-specific
entries](#dfn-representation-specific-entry){#ref-for-dfn-representation-specific-entry-12
.internalDFN link-type="dfn"} [map](https://infra.spec.whatwg.org/#maps)
*MUST* be serialized to the JSON-LD
[representation](#dfn-representations){#ref-for-dfn-representations-51
.internalDFN link-type="dfn"} according to the JSON
[representation](#dfn-representations){#ref-for-dfn-representations-52
.internalDFN link-type="dfn"}
[production](#dfn-production){#ref-for-dfn-production-10 .internalDFN
link-type="dfn"} rules as defined in [6.2 JSON](#json){.sec-ref}.

In addition to using the JSON
[representation](#dfn-representations){#ref-for-dfn-representations-53
.internalDFN link-type="dfn"}
[production](#dfn-production){#ref-for-dfn-production-11 .internalDFN
link-type="dfn"} rules, JSON-LD production *MUST* include the
[representation-specific](#dfn-representation-specific-entry){#ref-for-dfn-representation-specific-entry-13
.internalDFN lt="representation-specific entry" link-type="dfn"}
[`@context`](#dfn-context){#ref-for-dfn-context-2 .internalDFN
link-type="dfn"} entry. The serialized value of `@context` *MUST* be the
[JSON String](https://www.rfc-editor.org/rfc/rfc8259#section-7)
`https://www.w3.org/ns/did/v1`, or a [JSON
Array](https://www.rfc-editor.org/rfc/rfc8259#section-5) where the first
item is the [JSON
String](https://www.rfc-editor.org/rfc/rfc8259#section-7)
`https://www.w3.org/ns/did/v1` and the subsequent items are serialized
according to the JSON
[representation](#dfn-representations){#ref-for-dfn-representations-54
.internalDFN link-type="dfn"}
[production](#dfn-production){#ref-for-dfn-production-12 .internalDFN
link-type="dfn"} rules.

:::: {#example-a-valid-serialization-of-a-simple-context-entry .example}
::: marker
[Example
22](#example-a-valid-serialization-of-a-simple-context-entry){.self-link}[:
A valid serialization of a simple \@context entry]{.example-title}
:::

``` {aria-busy="false"}
{
  "@context": "https://www.w3.org/ns/did/v1",
  ...
}
```
::::

:::: {#example-a-valid-serialization-of-a-layered-context-entry .example}
::: marker
[Example
23](#example-a-valid-serialization-of-a-layered-context-entry){.self-link}[:
A valid serialization of a layered \@context entry]{.example-title}
:::

``` {aria-busy="false"}
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://did-method-extension.example/v1"
  ],
  ...
}
```
::::

All implementers creating [conforming
producers](#dfn-conforming-producer){#ref-for-dfn-conforming-producer-9
.internalDFN link-type="dfn"} that produce JSON-LD
[representations](#dfn-representations){#ref-for-dfn-representations-55
.internalDFN link-type="dfn"} are advised to ensure that their
algorithms produce valid JSON-LD
\[[JSON-LD11](#bib-json-ld11 "JSON-LD 1.1"){.bibref
link-type="biblio"}\] documents. Invalid JSON-LD documents will cause
JSON-LD processors to halt and report errors.

In order to achieve interoperability across different
[representations](#dfn-representations){#ref-for-dfn-representations-56
.internalDFN link-type="dfn"}, all JSON-LD Contexts and their terms
*SHOULD* be registered in the DID Specification Registries
\[[DID-SPEC-REGISTRIES](#bib-did-spec-registries "DID Specification Registries"){.bibref
link-type="biblio"}\].

A [conforming
producer](#dfn-conforming-producer){#ref-for-dfn-conforming-producer-10
.internalDFN link-type="dfn"} that generates a JSON-LD
[representation](#dfn-representations){#ref-for-dfn-representations-57
.internalDFN link-type="dfn"} *SHOULD NOT* produce a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-111
.internalDFN link-type="dfn"} that contains terms not defined via the
`@context` as [conforming
consumers](#dfn-conforming-consumer){#ref-for-dfn-conforming-consumer-11
.internalDFN link-type="dfn"} are expected to remove unknown terms. When
serializing a JSON-LD
[representation](#dfn-representations){#ref-for-dfn-representations-58
.internalDFN link-type="dfn"} of a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-112
.internalDFN link-type="dfn"}, a [conforming
producer](#dfn-conforming-producer){#ref-for-dfn-conforming-producer-11
.internalDFN link-type="dfn"} *MUST* specify a media type of
`application/did+ld+json` to downstream applications such as described
in [7.1.2 DID Resolution Metadata](#did-resolution-metadata){.sec-ref}.
::::::::

:::: {#consumption-0 .section}
::: header-wrapper
#### 6.3.2 Consumption {#x6-3-2-consumption}

[](#consumption-0){.self-link aria-label="Permalink for Section 6.3.2"}
:::

The [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-113
.internalDFN link-type="dfn"} and any DID document data structures
expressed by a JSON-LD
[representation](#dfn-representations){#ref-for-dfn-representations-59
.internalDFN link-type="dfn"} *MUST* be deserialized into the [data
model](#data-model) according to the JSON
[representation](#dfn-representations){#ref-for-dfn-representations-60
.internalDFN link-type="dfn"}
[consumption](#dfn-consumption){#ref-for-dfn-consumption-11 .internalDFN
link-type="dfn"} rules as defined in [6.2 JSON](#json){.sec-ref}.

All implementers creating [conforming
consumers](#dfn-conforming-consumer){#ref-for-dfn-conforming-consumer-12
.internalDFN link-type="dfn"} that consume JSON-LD
[representations](#dfn-representations){#ref-for-dfn-representations-61
.internalDFN link-type="dfn"} are advised to ensure that their
algorithms only accept valid JSON-LD
\[[JSON-LD11](#bib-json-ld11 "JSON-LD 1.1"){.bibref
link-type="biblio"}\] documents. Invalid JSON-LD documents will cause
JSON-LD processors to halt and report errors.

[Conforming
consumers](#dfn-conforming-consumer){#ref-for-dfn-conforming-consumer-13
.internalDFN link-type="dfn"} that process a JSON-LD
[representation](#dfn-representations){#ref-for-dfn-representations-62
.internalDFN link-type="dfn"} *SHOULD* drop all terms from a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-114
.internalDFN link-type="dfn"} that are not defined via the `@context`.
::::
::::::::::::
:::::::::::::::::::::::::::

:::::::::::::::::::::::::::::::::: {#resolution .section .normative}
::: header-wrapper
## 7. Resolution {#x7-resolution}

[](#resolution){.self-link aria-label="Permalink for Section 7."}
:::

This section defines the inputs and outputs of [DID
resolution](#dfn-did-resolution){#ref-for-dfn-did-resolution-7
.internalDFN link-type="dfn"} and [DID URL
dereferencing](#dfn-did-url-dereferencing){#ref-for-dfn-did-url-dereferencing-5
.internalDFN link-type="dfn"}. Their exact implementation is out of
scope for this specification, but some considerations for implementers
are discussed in
\[[DID-RESOLUTION](#bib-did-resolution "Decentralized Identifier Resolution"){.bibref
link-type="biblio"}\].

All conformant [DID
resolvers](#dfn-did-resolvers){#ref-for-dfn-did-resolvers-7 .internalDFN
link-type="dfn"} *MUST* implement the [DID
resolution](#dfn-did-resolution){#ref-for-dfn-did-resolution-8
.internalDFN link-type="dfn"} functions for at least one [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-33 .internalDFN
link-type="dfn"} and *MUST* be able to return a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-115
.internalDFN link-type="dfn"} in at least one conformant
[representation](#dfn-representations){#ref-for-dfn-representations-63
.internalDFN link-type="dfn"}.

::::::::::: {#did-resolution .section dfn-for="Resolver"}
::: header-wrapper
### 7.1 DID Resolution {#x7-1-did-resolution}

[](#did-resolution){.self-link aria-label="Permalink for Section 7.1"}
:::

The [DID resolution](#dfn-did-resolution){#ref-for-dfn-did-resolution-9
.internalDFN link-type="dfn"} functions resolve a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-72
.internalDFN link-type="dfn"} into a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-116
.internalDFN link-type="dfn"} by using the \"Read\" operation of the
applicable [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-34
.internalDFN link-type="dfn"} as described in [8.2 Method
Operations](#method-operations){.sec-ref}. The details of how this
process is accomplished are outside the scope of this specification, but
all conforming [DID
resolvers](#dfn-did-resolvers){#ref-for-dfn-did-resolvers-8 .internalDFN
link-type="dfn"} implement the functions below, which have the following
abstract forms:

``` {title="Abstract functions for DID Resolution" aria-busy="false"}
resolve(did, resolutionOptions) →
   « didResolutionMetadata, didDocument, didDocumentMetadata »

resolveRepresentation(did, resolutionOptions) →
   « didResolutionMetadata, didDocumentStream, didDocumentMetadata »
```

The `resolve` function returns the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-117
.internalDFN link-type="dfn"} in its abstract form (a
[map](https://infra.spec.whatwg.org/#maps)). The `resolveRepresentation`
function returns a byte stream of the [DID
Document](#dfn-did-documents){#ref-for-dfn-did-documents-118
.internalDFN link-type="dfn"} formatted in the corresponding
representation.

<figure id="resolve-resolverepresentation">
<img src="diagrams/diagram-resolve-resolverepresentation.svg"
style="margin: auto; display: block;" width="1056" height="595"
alt=" Diagram illustrating how resolve() returns the DID document data model in its abstract form and resolveRepresenation() returns it in one of the conformant representations; conversion is possible using production and consumption rules." />
<figcaption>Figure 5 <span class="fig-title"> Functions resolve() and
resolveRepresentation(). See also: <a
href="#resolve-resolverepresentation-longdesc"
class="longdesc-link">narrative description</a>. </span></figcaption>
</figure>

::: {#resolve-resolverepresentation-longdesc .longdesc}
The upper middle part of the diagram contains a rectangle with dashed
grey outline, containing two blue-outlined rectangles, one above the
other. The upper, larger rectangle is labeled, in blue, \"Core
Properties\", and contains the following
[INFRA](https://infra.spec.whatwg.org/#maps) notation:

``` {aria-busy="false"}
«[
  "id" → "example:123",
  "verificationMethod" → « «[
    "id": "did:example:123#keys-1",
    "controller": "did:example:123",
    "type": "Ed25519VerificationKey2018",
    "publicKeyBase58": "H3C2AVvLMv6gmMNam3uVA"
  ]» »,
  "authentication" → «
    "did:example:123#keys-1"
  »
]»
```

The lower, smaller rectangle is labeled, in blue, \"Core
Representation-specific Entries (JSON-LD)\", and contains the following
monospaced [INFRA](https://infra.spec.whatwg.org/#maps) notation:

``` {aria-busy="false"}
«[ "@context" → "https://www.w3.org/ns/did/v1" ]»
```

From the grey-outlined rectangle, three pairs of arrows extend to three
different black-outlined rectangles, aligned in a horizontal row
side-by-side, in the bottom half of the diagram. Each pair of arrows
consists of one blue arrow pointing from the grey-outlined rectangle to
the respective black-outlined rectangle, labeled \"produce\", and one
red arrow pointing in the reverse direction, labeled \"consume\". The
first black-outlined rectangle in the row is labeled
\"application/did+ld+json\", and contains the following JSON-LD data:

``` {aria-busy="false"}
{
  "@context": ["https://www.w3.org/ns/did/v1"],
  "id": "did:example:123",
  "verificationMethod": [{
    "id": "did:example:123#keys-1",
    "controller": "did:example:123",
    "type": "Ed25519VerificationKey2018",
    "publicKeyBase58": "H3C2AVvLMv6gmMNam3uVA"
  }],
  "authentication": [
    "did:example:123#keys-1"
  ]
}
```

The second rectangle in the row is labeled \"application/did+json\" and
contains the following JSON data:

``` {aria-busy="false"}
{
  "id": "did:example:123",
  "verificationMethod": [{
    "id": "did:example:123#keys-1",
    "controller": "did:example:123",
    "type": "Ed25519VerificationKey2018",
    "publicKeyBase58": "H3C2AVvLMv6gmMNam3uVA"
  }],
  "authentication": [
    "did:example:123#keys-1"
  ]
}
```

The third rectangle in the row is labeled \"application/did+cbor\", and
contains hexadecimal data.

In the left part of the diagram, in the middle, there is a box, with
black outline and light gray background. This box is labeled
\"VERIFIABLE DATA REGISTRY\" and contains a symbol representing a graph
with nodes and arcs. From this box, one arrow, labeled \"resolve()\",
extends upwards and points to the top half of the diagram where the
grey-outlined rectangle is located. Another arrow, labeled
\"resolveRepresentation()\", extends downwards and points to the bottom
half of the diagram, where the row of three black-outlined rectangles is
located.
:::

The input variables of the `resolve` and `resolveRepresentation`
functions are as follows:

did
:   This is the
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-73
    .internalDFN link-type="dfn"} to resolve. This input is *REQUIRED*
    and the value *MUST* be a conformant
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-74
    .internalDFN link-type="dfn"} as defined in [3.1 DID
    Syntax](#did-syntax){.sec-ref}.

resolutionOptions
:   A [metadata structure](#metadata-structure) containing properties
    defined in [7.1.1 DID Resolution
    Options](#did-resolution-options){.sec-ref}. This input is
    *REQUIRED*, but the structure *MAY* be empty.

These functions each return multiple values, and no limitations are
placed on how these values are returned together. The return values of
`resolve` are
[didResolutionMetadata](#dfn-didresolutionmetadata){#ref-for-dfn-didresolutionmetadata-1
.internalDFN link-type="dfn"},
[didDocument](#dfn-diddocument){#ref-for-dfn-diddocument-1 .internalDFN
link-type="dfn"}, and
[didDocumentMetadata](#dfn-diddocumentmetadata){#ref-for-dfn-diddocumentmetadata-1
.internalDFN link-type="dfn"}. The return values of
`resolveRepresentation` are
[didResolutionMetadata](#dfn-didresolutionmetadata){#ref-for-dfn-didresolutionmetadata-2
.internalDFN link-type="dfn"},
[didDocumentStream](#dfn-diddocumentstream){#ref-for-dfn-diddocumentstream-1
.internalDFN link-type="dfn"}, and
[didDocumentMetadata](#dfn-diddocumentmetadata){#ref-for-dfn-diddocumentmetadata-2
.internalDFN link-type="dfn"}. These values are described below:

[didResolutionMetadata]{#dfn-didresolutionmetadata .dfn tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   A [metadata structure](#metadata-structure) consisting of values
    relating to the results of the [DID
    resolution](#dfn-did-resolution){#ref-for-dfn-did-resolution-10
    .internalDFN link-type="dfn"} process which typically changes
    between invocations of the `resolve` and `resolveRepresentation`
    functions, as it represents data about the resolution process
    itself. This structure is *REQUIRED*, and in the case of an error in
    the resolution process, this *MUST NOT* be empty. This metadata is
    defined by [7.1.2 DID Resolution
    Metadata](#did-resolution-metadata){.sec-ref}. If
    `resolveRepresentation` was called, this structure *MUST* contain a
    `contentType` property containing the Media Type of the
    representation found in the `didDocumentStream`. If the resolution
    is not successful, this structure *MUST* contain an `error` property
    describing the error.

[didDocument]{#dfn-diddocument .dfn tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   If the resolution is successful, and if the `resolve` function was
    called, this *MUST* be a [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-119
    .internalDFN link-type="dfn"} abstract data model (a
    [map](https://infra.spec.whatwg.org/#maps)) as described in [4. Data
    Model](#data-model){.sec-ref} that is capable of being transformed
    into a [conforming DID
    Document](#dfn-conforming-did-document){#ref-for-dfn-conforming-did-document-3
    .internalDFN link-type="dfn"} (representation), using the production
    rules specified by the representation. The value of
    [`id`](#dfn-id){#ref-for-dfn-id-7 .internalDFN link-type="dfn"} in
    the resolved [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-120
    .internalDFN link-type="dfn"} *MUST* match the
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-75
    .internalDFN link-type="dfn"} that was resolved. If the resolution
    is unsuccessful, this value *MUST* be empty.

[didDocumentStream]{#dfn-diddocumentstream .dfn tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   If the resolution is successful, and if the `resolveRepresentation`
    function was called, this *MUST* be a byte stream of the resolved
    [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-121
    .internalDFN link-type="dfn"} in one of the conformant
    [representations](#representations). The byte stream might then be
    parsed by the caller of the `resolveRepresentation` function into a
    [data model](#data-model), which can in turn be validated and
    processed. If the resolution is unsuccessful, this value *MUST* be
    an empty stream.

[didDocumentMetadata]{#dfn-diddocumentmetadata .dfn tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   If the resolution is successful, this *MUST* be a [metadata
    structure](#metadata-structure). This structure contains metadata
    about the [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-122
    .internalDFN link-type="dfn"} contained in the `didDocument`
    property. This metadata typically does not change between
    invocations of the `resolve` and `resolveRepresentation` functions
    unless the [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-123
    .internalDFN link-type="dfn"} changes, as it represents metadata
    about the [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-124
    .internalDFN link-type="dfn"}. If the resolution is unsuccessful,
    this output *MUST* be an empty [metadata
    structure](#metadata-structure). Properties defined by this
    specification are in [7.1.3 DID Document
    Metadata](#did-document-metadata){.sec-ref}.

Conforming [DID
resolver](#dfn-did-resolvers){#ref-for-dfn-did-resolvers-9 .internalDFN
link-type="dfn"} implementations do not alter the signature of these
functions in any way. [DID
resolver](#dfn-did-resolvers){#ref-for-dfn-did-resolvers-10 .internalDFN
link-type="dfn"} implementations might map the `resolve` and
`resolveRepresentation` functions to a method-specific internal function
to perform the actual [DID
resolution](#dfn-did-resolution){#ref-for-dfn-did-resolution-11
.internalDFN link-type="dfn"} process. [DID
resolver](#dfn-did-resolvers){#ref-for-dfn-did-resolvers-11 .internalDFN
link-type="dfn"} implementations might implement and expose additional
functions with different signatures in addition to the `resolve` and
`resolveRepresentation` functions specified here.

:::: {#did-resolution-options .section}
::: header-wrapper
#### 7.1.1 DID Resolution Options {#x7-1-1-did-resolution-options}

[](#did-resolution-options){.self-link
aria-label="Permalink for Section 7.1.1"}
:::

The possible properties within this structure and their possible values
are registered in the DID Specification Registries
\[[DID-SPEC-REGISTRIES](#bib-did-spec-registries "DID Specification Registries"){.bibref
link-type="biblio"}\]. This specification defines the following common
properties.

accept
:   The Media Type of the caller\'s preferred
    [representation](#dfn-representations){#ref-for-dfn-representations-64
    .internalDFN link-type="dfn"} of the [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-125
    .internalDFN link-type="dfn"}. The Media Type *MUST* be expressed as
    an [ASCII
    string](https://infra.spec.whatwg.org/#ascii-string){lt="ascii
    string" data-type="dfn"}. The [DID
    resolver](#dfn-did-resolvers){#ref-for-dfn-did-resolvers-12
    .internalDFN link-type="dfn"} implementation *SHOULD* use this value
    to determine the
    [representation](#dfn-representations){#ref-for-dfn-representations-65
    .internalDFN link-type="dfn"} contained in the returned
    `didDocumentStream` if such a
    [representation](#dfn-representations){#ref-for-dfn-representations-66
    .internalDFN link-type="dfn"} is supported and available. This
    property is *OPTIONAL* for the `resolveRepresentation` function and
    *MUST NOT* be used with the `resolve` function.
::::

:::: {#did-resolution-metadata .section}
::: header-wrapper
#### 7.1.2 DID Resolution Metadata {#x7-1-2-did-resolution-metadata}

[](#did-resolution-metadata){.self-link
aria-label="Permalink for Section 7.1.2"}
:::

The possible properties within this structure and their possible values
are registered in the DID Specification Registries
\[[DID-SPEC-REGISTRIES](#bib-did-spec-registries "DID Specification Registries"){.bibref
link-type="biblio"}\]. This specification defines the following DID
resolution metadata properties:

contentType
:   The Media Type of the returned `didDocumentStream`. This property is
    *REQUIRED* if resolution is successful and if the
    `resolveRepresentation` function was called. This property *MUST
    NOT* be present if the `resolve` function was called. The value of
    this property *MUST* be an [ASCII
    string](https://infra.spec.whatwg.org/#ascii-string){lt="ascii string"
    data-type="dfn"} that is the Media Type of the conformant
    [representations](#dfn-representations){#ref-for-dfn-representations-67
    .internalDFN link-type="dfn"}. The caller of the
    `resolveRepresentation` function *MUST* use this value when
    determining how to parse and process the `didDocumentStream`
    returned by this function into the [data model](#data-model).

error
:   The error code from the resolution process. This property is
    *REQUIRED* when there is an error in the resolution process. The
    value of this property *MUST* be a single keyword [ASCII
    string](https://infra.spec.whatwg.org/#ascii-string){lt="ascii string"
    data-type="dfn"}. The possible property values of this field
    *SHOULD* be registered in the DID Specification Registries
    \[[DID-SPEC-REGISTRIES](#bib-did-spec-registries "DID Specification Registries"){.bibref
    link-type="biblio"}\]. This specification defines the following
    common error values:

    invalidDid
    :   The
        [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-76
        .internalDFN link-type="dfn"} supplied to the [DID
        resolution](#dfn-did-resolution){#ref-for-dfn-did-resolution-12
        .internalDFN link-type="dfn"} function does not conform to valid
        syntax. (See [3.1 DID Syntax](#did-syntax){.sec-ref}.)

    notFound
    :   The [DID
        resolver](#dfn-did-resolvers){#ref-for-dfn-did-resolvers-13
        .internalDFN link-type="dfn"} was unable to find the [DID
        document](#dfn-did-documents){#ref-for-dfn-did-documents-126
        .internalDFN link-type="dfn"} resulting from this resolution
        request.

    representationNotSupported
    :   This error code is returned if the
        [representation](#dfn-representations){#ref-for-dfn-representations-68
        .internalDFN link-type="dfn"} requested via the `accept` input
        metadata property is not supported by the [DID
        method](#dfn-did-methods){#ref-for-dfn-did-methods-35
        .internalDFN link-type="dfn"} and/or [DID
        resolver](#dfn-did-resolvers){#ref-for-dfn-did-resolvers-14
        .internalDFN link-type="dfn"} implementation.
::::

:::: {#did-document-metadata .section}
::: header-wrapper
#### 7.1.3 DID Document Metadata {#x7-1-3-did-document-metadata}

[](#did-document-metadata){.self-link
aria-label="Permalink for Section 7.1.3"}
:::

The possible properties within this structure and their possible values
*SHOULD* be registered in the DID Specification Registries
\[[DID-SPEC-REGISTRIES](#bib-did-spec-registries "DID Specification Registries"){.bibref
link-type="biblio"}\]. This specification defines the following common
properties.

[created]{#dfn-created .dfn .lint-ignore tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-127
    .internalDFN link-type="dfn"} metadata *SHOULD* include a `created`
    property to indicate the timestamp of the [Create
    operation](#method-operations). The value of the property *MUST* be
    a [string](https://infra.spec.whatwg.org/#string) formatted as an
    [XML Datetime](https://www.w3.org/TR/xmlschema11-2/#dateTime)
    normalized to UTC 00:00:00 and without sub-second decimal precision.
    For example: `2020-12-20T19:17:47Z`.

[updated]{#dfn-updated .dfn .lint-ignore tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-128
    .internalDFN link-type="dfn"} metadata *SHOULD* include an `updated`
    property to indicate the timestamp of the last [Update
    operation](#method-operations) for the document version which was
    resolved. The value of the property *MUST* follow the same
    formatting rules as the `created` property. The `updated` property
    is omitted if an Update operation has never been performed on the
    [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-129
    .internalDFN link-type="dfn"}. If an `updated` property exists, it
    can be the same value as the `created` property when the difference
    between the two timestamps is less than one second.

[deactivated]{#dfn-deactivated .dfn .lint-ignore tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   If a DID has been [deactivated](#method-operations), [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-130
    .internalDFN link-type="dfn"} metadata *MUST* include this property
    with the boolean value `true`. If a DID has not been deactivated,
    this property is *OPTIONAL*, but if included, *MUST* have the
    boolean value `false`.

[nextUpdate]{#dfn-nextupdate .dfn .lint-ignore tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-131
    .internalDFN link-type="dfn"} metadata *MAY* include a `nextUpdate`
    property if the resolved document version is not the latest version
    of the document. It indicates the timestamp of the next [Update
    operation](#method-operations). The value of the property *MUST*
    follow the same formatting rules as the `created` property.

[versionId]{#dfn-versionid .dfn .lint-ignore tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-132
    .internalDFN link-type="dfn"} metadata *SHOULD* include a
    `versionId` property to indicate the version of the last [Update
    operation](#method-operations) for the document version which was
    resolved. The value of the property *MUST* be an [ASCII
    string](https://infra.spec.whatwg.org/#ascii-string){lt="ascii string"
    data-type="dfn"}.

[nextVersionId]{#dfn-nextversionid .dfn .lint-ignore tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}
:   [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-133
    .internalDFN link-type="dfn"} metadata *MAY* include a
    `nextVersionId` property if the resolved document version is not the
    latest version of the document. It indicates the version of the next
    [Update operation](#method-operations). The value of the property
    *MUST* be an [ASCII
    string](https://infra.spec.whatwg.org/#ascii-string){lt="ascii
    string" data-type="dfn"}.

[equivalentId]{#dfn-equivalentid .dfn tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}

:   A [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-36
    .internalDFN link-type="dfn"} can define different forms of a
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-77
    .internalDFN link-type="dfn"} that are logically equivalent. An
    example is when a
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-78
    .internalDFN link-type="dfn"} takes one form prior to registration
    in a [verifiable data
    registry](#dfn-verifiable-data-registry){#ref-for-dfn-verifiable-data-registry-2
    .internalDFN link-type="dfn"} and another form after such
    registration. In this case, the [DID
    method](#dfn-did-methods){#ref-for-dfn-did-methods-37 .internalDFN
    link-type="dfn"} specification might need to express one or more
    [DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-79
    .internalDFN link-type="dfn"} that are logically equivalent to the
    resolved
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-80
    .internalDFN link-type="dfn"} as a property of the [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-134
    .internalDFN link-type="dfn"}. This is the purpose of the
    [`equivalentId`](#dfn-equivalentid){#ref-for-dfn-equivalentid-1
    .internalDFN link-type="dfn"} property.

    [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-135
    .internalDFN link-type="dfn"} metadata *MAY* include an
    `equivalentId` property. If present, the value *MUST* be a
    [set](https://infra.spec.whatwg.org/#ordered-set) where each item is
    a [string](https://infra.spec.whatwg.org/#string) that conforms to
    the rules in Section [3.1 DID Syntax](#did-syntax){.sec-ref}. The
    relationship is a statement that each
    [`equivalentId`](#dfn-equivalentid){#ref-for-dfn-equivalentid-2
    .internalDFN link-type="dfn"} value is logically equivalent to the
    `id` property value and thus refers to the same [DID
    subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-45
    .internalDFN link-type="dfn"}. Each
    [`equivalentId`](#dfn-equivalentid){#ref-for-dfn-equivalentid-3
    .internalDFN link-type="dfn"} DID value *MUST* be produced by, and a
    form of, the same [DID
    method](#dfn-did-methods){#ref-for-dfn-did-methods-38 .internalDFN
    link-type="dfn"} as the `id` property value. (e.g.,
    `did:example:abc` == `did:example:ABC`)

    A conforming [DID
    method](#dfn-did-methods){#ref-for-dfn-did-methods-39 .internalDFN
    link-type="dfn"} specification *MUST* guarantee that each
    [`equivalentId`](#dfn-equivalentid){#ref-for-dfn-equivalentid-4
    .internalDFN link-type="dfn"} value is logically equivalent to the
    `id` property value.

    A requesting party is expected to retain the values from the `id`
    and [`equivalentId`](#dfn-equivalentid){#ref-for-dfn-equivalentid-5
    .internalDFN link-type="dfn"} properties to ensure any subsequent
    interactions with any of the values they contain are correctly
    handled as logically equivalent (e.g., retain all variants in a
    database so an interaction with any one maps to the same underlying
    account).

    :::: {#issue-container-generatedID-10 .note role="note"}
    ::: {#h-note-10 .note-title .marker role="heading" aria-level="5"}
    Note[: Stronger equivalence]{.issue-label}
    :::

    [`equivalentId`](#dfn-equivalentid){#ref-for-dfn-equivalentid-6
    .internalDFN link-type="dfn"} is a much stronger form of equivalence
    than [`alsoKnownAs`](#dfn-alsoknownas){#ref-for-dfn-alsoknownas-6
    .internalDFN link-type="dfn"} because the equivalence *MUST* be
    guaranteed by the governing [DID
    method](#dfn-did-methods){#ref-for-dfn-did-methods-40 .internalDFN
    link-type="dfn"}.
    [`equivalentId`](#dfn-equivalentid){#ref-for-dfn-equivalentid-7
    .internalDFN link-type="dfn"} represents a full graph merge because
    the same [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-136
    .internalDFN link-type="dfn"} describes both the
    [`equivalentId`](#dfn-equivalentid){#ref-for-dfn-equivalentid-8
    .internalDFN link-type="dfn"}
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-81
    .internalDFN link-type="dfn"} and the `id` property
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-82
    .internalDFN link-type="dfn"}.
    ::::

    If a requesting party does not retain the values from the `id` and
    [`equivalentId`](#dfn-equivalentid){#ref-for-dfn-equivalentid-9
    .internalDFN link-type="dfn"} properties and ensure any subsequent
    interactions with any of the values they contain are correctly
    handled as logically equivalent, there might be negative or
    unexpected issues that arise. Implementers are strongly advised to
    observe the directives related to this metadata property.

[canonicalId]{#dfn-canonicalid .dfn tabindex="0" aria-haspopup="dialog" dfn-type="dfn"}

:   The [`canonicalId`](#dfn-canonicalid){#ref-for-dfn-canonicalid-1
    .internalDFN link-type="dfn"} property is identical to the
    [`equivalentId`](#dfn-equivalentid){#ref-for-dfn-equivalentid-10
    .internalDFN link-type="dfn"} property except: a) it is associated
    with a single value rather than a set, and b) the
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-83
    .internalDFN link-type="dfn"} is defined to be the canonical ID for
    the [DID subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-46
    .internalDFN link-type="dfn"} within the scope of the containing
    [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-137
    .internalDFN link-type="dfn"}.

    [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-138
    .internalDFN link-type="dfn"} metadata *MAY* include a `canonicalId`
    property. If present, the value *MUST* be a
    [string](https://infra.spec.whatwg.org/#string) that conforms to the
    rules in Section [3.1 DID Syntax](#did-syntax){.sec-ref}. The
    relationship is a statement that the
    [`canonicalId`](#dfn-canonicalid){#ref-for-dfn-canonicalid-2
    .internalDFN link-type="dfn"} value is logically equivalent to the
    `id` property value and that the
    [`canonicalId`](#dfn-canonicalid){#ref-for-dfn-canonicalid-3
    .internalDFN link-type="dfn"} value is defined by the [DID
    method](#dfn-did-methods){#ref-for-dfn-did-methods-41 .internalDFN
    link-type="dfn"} to be the canonical ID for the [DID
    subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-47
    .internalDFN link-type="dfn"} in the scope of the containing [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-139
    .internalDFN link-type="dfn"}. A
    [`canonicalId`](#dfn-canonicalid){#ref-for-dfn-canonicalid-4
    .internalDFN link-type="dfn"} value *MUST* be produced by, and a
    form of, the same [DID
    method](#dfn-did-methods){#ref-for-dfn-did-methods-42 .internalDFN
    link-type="dfn"} as the `id` property value. (e.g.,
    `did:example:abc` == `did:example:ABC`).

    A conforming [DID
    method](#dfn-did-methods){#ref-for-dfn-did-methods-43 .internalDFN
    link-type="dfn"} specification *MUST* guarantee that the
    [`canonicalId`](#dfn-canonicalid){#ref-for-dfn-canonicalid-5
    .internalDFN link-type="dfn"} value is logically equivalent to the
    `id` property value.

    A requesting party is expected to use the
    [`canonicalId`](#dfn-canonicalid){#ref-for-dfn-canonicalid-6
    .internalDFN link-type="dfn"} value as its primary ID value for the
    [DID subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-48
    .internalDFN link-type="dfn"} and treat all other equivalent values
    as secondary aliases (e.g., update corresponding primary references
    in their systems to reflect the new canonical ID directive).

    :::: {#issue-container-generatedID-11 .note role="note"}
    ::: {#h-note-11 .note-title .marker role="heading" aria-level="5"}
    Note[: Canonical equivalence]{.issue-label}
    :::

    [`canonicalId`](#dfn-canonicalid){#ref-for-dfn-canonicalid-7
    .internalDFN link-type="dfn"} is the same statement of equivalence
    as [`equivalentId`](#dfn-equivalentid){#ref-for-dfn-equivalentid-11
    .internalDFN link-type="dfn"} except it is constrained to a single
    value that is defined to be canonical for the [DID
    subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-49
    .internalDFN link-type="dfn"} in the scope of the [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-140
    .internalDFN link-type="dfn"}. Like
    [`equivalentId`](#dfn-equivalentid){#ref-for-dfn-equivalentid-12
    .internalDFN link-type="dfn"},
    [`canonicalId`](#dfn-canonicalid){#ref-for-dfn-canonicalid-8
    .internalDFN link-type="dfn"} represents a full graph merge because
    the same [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-141
    .internalDFN link-type="dfn"} describes both the
    [`canonicalId`](#dfn-canonicalid){#ref-for-dfn-canonicalid-9
    .internalDFN link-type="dfn"} DID and the `id` property
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-84
    .internalDFN link-type="dfn"}.
    ::::

    If a resolving party does not use the
    [`canonicalId`](#dfn-canonicalid){#ref-for-dfn-canonicalid-10
    .internalDFN link-type="dfn"} value as its primary ID value for the
    DID subject and treat all other equivalent values as secondary
    aliases, there might be negative or unexpected issues that arise
    related to user experience. Implementers are strongly advised to
    observe the directives related to this metadata property.
::::
:::::::::::

::::::::: {#did-url-dereferencing .section}
::: header-wrapper
### 7.2 DID URL Dereferencing {#x7-2-did-url-dereferencing}

[](#did-url-dereferencing){.self-link
aria-label="Permalink for Section 7.2"}
:::

The [DID URL
dereferencing](#dfn-did-url-dereferencing){#ref-for-dfn-did-url-dereferencing-6
.internalDFN link-type="dfn"} function dereferences a [DID
URL](#dfn-did-urls){#ref-for-dfn-did-urls-27 .internalDFN
link-type="dfn"} into a
[resource](#dfn-resources){#ref-for-dfn-resources-14 .internalDFN
link-type="dfn"} with contents depending on the [DID
URL](#dfn-did-urls){#ref-for-dfn-did-urls-28 .internalDFN
link-type="dfn"}\'s components, including the [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-44 .internalDFN
link-type="dfn"}, method-specific identifier, path, query, and fragment.
This process depends on [DID
resolution](#dfn-did-resolution){#ref-for-dfn-did-resolution-13
.internalDFN link-type="dfn"} of the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-85
.internalDFN link-type="dfn"} contained in the [DID
URL](#dfn-did-urls){#ref-for-dfn-did-urls-29 .internalDFN
link-type="dfn"}. [DID URL
dereferencing](#dfn-did-url-dereferencing){#ref-for-dfn-did-url-dereferencing-7
.internalDFN link-type="dfn"} might involve multiple steps (e.g., when
the DID URL being dereferenced includes a fragment), and the function is
defined to return the final resource after all steps are completed. The
details of how this process is accomplished are outside the scope of
this specification. The following figure depicts the relationship
described above.

<figure id="did-url-dereference-overview">
<img src="diagrams/did_url_dereference_overview.svg"
style="margin: auto; display: block; width: 75%;" width="1070"
height="504"
alt=" DIDs resolve to DID documents; DID URLs contains a DID; DID URLs dereferenced to DID document fragments or external resources. " />
<figcaption>Figure 6 <span class="fig-title"> Overview of DID URL
dereference See also: <a href="#did-url-dereference-overview-longdesc"
class="longdesc-link">narrative description</a>. </span></figcaption>
</figure>

::: {#did-url-dereference-overview-longdesc .longdesc}
The top left part of the diagram contains a rectangle with black
outline, labeled \"DID\".

The bottom left part of the diagram contains a rectangle with black
outline, labeled \"DID URL\". This rectangle contains four smaller
black-outlined rectangles, aligned in a horizontal row adjacent to each
other. These smaller rectangles are labeled, in order, \"DID\",
\"path\", \"query\", and \"fragment.

The top right part of the diagram contains a rectangle with black
outline, labeled \"DID document\". This rectangle contains three smaller
black-outlined rectangles. These smaller rectangles are labeled \"id\",
\"(property X)\", and \"(property Y)\", and are surrounded by multiple
series of three dots (ellipses). A curved black arrow, labeled \"DID
document - relative fragment dereference\", extends from the rectangle
labeled \"(property X)\", and points to the rectangle labeled
\"(property Y)\".

The bottom right part of the diagram contains an oval shape with black
outline, labeled \"Resource\".

A black arrow, labeled \"resolves to a DID document\", extends from the
rectangle in the top left part of the diagram, labeled \"DID\", and
points to the rectangle in the top right part of diagram, labeled \"DID
document\".

A black arrow, labeled \"refers to\", extends from the rectangle in the
top right part of the diagram, labeled \"DID document\", and points to
the oval shape in the bottom right part of diagram, labeled
\"Resource\".

A black arrow, labeled \"contains\", extends from the small rectangle
labeled \"DID\" inside the rectangle in the bottom left part of the
diagram, labeled \"DID URL\", and points to the rectangle in the top
left part of diagram, labeled \"DID\".

A black arrow, labeled \"dereferences to a DID document\", extends from
the rectangle in the bottom left part of the diagram, labeled \"DID
URL\", and points to the rectangle in the top right part of diagram,
labeled \"DID document\".

A black arrow, labeled \"dereferences to a resource\", extends from the
rectangle in the bottom left part of the diagram, labeled \"DID URL\",
and points to the oval shape in the bottom right part of diagram,
labeled \"Resource\".
:::

All conforming [DID
resolvers](#dfn-did-resolvers){#ref-for-dfn-did-resolvers-15
.internalDFN link-type="dfn"} implement the following function which has
the following abstract form:

``` {title="Abstract functions for DID URL Dereferencing" aria-busy="false"}
dereference(didUrl, dereferenceOptions) →
   « dereferencingMetadata, contentStream, contentMetadata »
```

The input variables of the `dereference` function are as follows:

didUrl
:   A conformant [DID URL](#dfn-did-urls){#ref-for-dfn-did-urls-30
    .internalDFN link-type="dfn"} as a single
    [string](https://infra.spec.whatwg.org/#string). This is the [DID
    URL](#dfn-did-urls){#ref-for-dfn-did-urls-31 .internalDFN
    link-type="dfn"} to dereference. To dereference a [DID
    fragment](#dfn-did-fragments){#ref-for-dfn-did-fragments-7
    .internalDFN link-type="dfn"}, the complete [DID
    URL](#dfn-did-urls){#ref-for-dfn-did-urls-32 .internalDFN
    link-type="dfn"} including the [DID
    fragment](#dfn-did-fragments){#ref-for-dfn-did-fragments-8
    .internalDFN link-type="dfn"} *MUST* be used. This input is
    *REQUIRED*.
    :::: {#issue-container-generatedID-12 .note role="note"}
    ::: {#h-note-12 .note-title .marker role="heading" aria-level="4"}
    Note[: DID URL dereferencer patterns]{.issue-label}
    :::

    While it is valid for any `didUrl` to be passed to a DID URL
    dereferencer, implementers are expected to refer to
    \[[DID-RESOLUTION](#bib-did-resolution "Decentralized Identifier Resolution"){.bibref
    link-type="biblio"}\] to further understand common patterns for how
    a [DID URL](#dfn-did-urls){#ref-for-dfn-did-urls-33 .internalDFN
    link-type="dfn"} is expected to be dereferenced.
    ::::

dereferencingOptions
:   A [metadata structure](#metadata-structure) consisting of input
    options to the `dereference` function in addition to the `didUrl`
    itself. Properties defined by this specification are in [7.2.1 DID
    URL Dereferencing
    Options](#did-url-dereferencing-options){.sec-ref}. This input is
    *REQUIRED*, but the structure *MAY* be empty.

This function returns multiple values, and no limitations are placed on
how these values are returned together. The return values of the
`dereference` include `dereferencingMetadata`, `contentStream`, and
`contentMetadata`:

dereferencingMetadata
:   A [metadata structure](#metadata-structure) consisting of values
    relating to the results of the [DID URL
    dereferencing](#dfn-did-url-dereferencing){#ref-for-dfn-did-url-dereferencing-8
    .internalDFN link-type="dfn"} process. This structure is *REQUIRED*,
    and in the case of an error in the dereferencing process, this *MUST
    NOT* be empty. Properties defined by this specification are in
    [7.2.2 DID URL Dereferencing
    Metadata](#did-url-dereferencing-metadata){.sec-ref}. If the
    dereferencing is not successful, this structure *MUST* contain an
    `error` property describing the error.

contentStream
:   If the `dereferencing` function was called and successful, this
    *MUST* contain a
    [resource](#dfn-resources){#ref-for-dfn-resources-15 .internalDFN
    link-type="dfn"} corresponding to the [DID
    URL](#dfn-did-urls){#ref-for-dfn-did-urls-34 .internalDFN
    link-type="dfn"}. The `contentStream` *MAY* be a
    [resource](#dfn-resources){#ref-for-dfn-resources-16 .internalDFN
    link-type="dfn"} such as a [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-142
    .internalDFN link-type="dfn"} that is serializable in one of the
    conformant
    [representations](#dfn-representations){#ref-for-dfn-representations-69
    .internalDFN link-type="dfn"}, a [Verification
    Method](#verification-methods), a [service](#services), or any other
    resource format that can be identified via a Media Type and obtained
    through the resolution process. If the dereferencing is
    unsuccessful, this value *MUST* be empty.

contentMetadata
:   If the dereferencing is successful, this *MUST* be a [metadata
    structure](#metadata-structure), but the structure *MAY* be empty.
    This structure contains metadata about the `contentStream`. If the
    `contentStream` is a [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-143
    .internalDFN link-type="dfn"}, this *MUST* be a
    [didDocumentMetadata](#dfn-diddocumentmetadata){#ref-for-dfn-diddocumentmetadata-3
    .internalDFN link-type="dfn"} structure as described in [DID
    Resolution](#dfn-did-resolution){#ref-for-dfn-did-resolution-14
    .internalDFN link-type="dfn"}. If the dereferencing is unsuccessful,
    this output *MUST* be an empty [metadata
    structure](#metadata-structure).

Conforming [DID URL
dereferencing](#dfn-did-url-dereferencing){#ref-for-dfn-did-url-dereferencing-9
.internalDFN link-type="dfn"} implementations do not alter the signature
of these functions in any way. [DID URL
dereferencing](#dfn-did-url-dereferencing){#ref-for-dfn-did-url-dereferencing-10
.internalDFN link-type="dfn"} implementations might map the
`dereference` function to a method-specific internal function to perform
the actual [DID URL
dereferencing](#dfn-did-url-dereferencing){#ref-for-dfn-did-url-dereferencing-11
.internalDFN link-type="dfn"} process. [DID URL
dereferencing](#dfn-did-url-dereferencing){#ref-for-dfn-did-url-dereferencing-12
.internalDFN link-type="dfn"} implementations might implement and expose
additional functions with different signatures in addition to the
`dereference` function specified here.

:::: {#did-url-dereferencing-options .section}
::: header-wrapper
#### 7.2.1 DID URL Dereferencing Options {#x7-2-1-did-url-dereferencing-options}

[](#did-url-dereferencing-options){.self-link
aria-label="Permalink for Section 7.2.1"}
:::

The possible properties within this structure and their possible values
*SHOULD* be registered in the DID Specification Registries
\[[DID-SPEC-REGISTRIES](#bib-did-spec-registries "DID Specification Registries"){.bibref
link-type="biblio"}\]. This specification defines the following common
properties for dereferencing options:

accept
:   The Media Type that the caller prefers for `contentStream`. The
    Media Type *MUST* be expressed as an [ASCII
    string](https://infra.spec.whatwg.org/#ascii-string){lt="ascii string"
    data-type="dfn"}. The [DID URL
    dereferencing](#dfn-did-url-dereferencing){#ref-for-dfn-did-url-dereferencing-13
    .internalDFN link-type="dfn"} implementation *SHOULD* use this value
    to determine the `contentType` of the
    [representation](#dfn-representations){#ref-for-dfn-representations-70
    .internalDFN link-type="dfn"} contained in the returned value if
    such a
    [representation](#dfn-representations){#ref-for-dfn-representations-71
    .internalDFN link-type="dfn"} is supported and available.
::::

:::: {#did-url-dereferencing-metadata .section}
::: header-wrapper
#### 7.2.2 DID URL Dereferencing Metadata {#x7-2-2-did-url-dereferencing-metadata}

[](#did-url-dereferencing-metadata){.self-link
aria-label="Permalink for Section 7.2.2"}
:::

The possible properties within this structure and their possible values
are registered in the DID Specification Registries
\[[DID-SPEC-REGISTRIES](#bib-did-spec-registries "DID Specification Registries"){.bibref
link-type="biblio"}\]. This specification defines the following common
properties.

contentType
:   The Media Type of the returned `contentStream` *SHOULD* be expressed
    using this property if dereferencing is successful. The Media Type
    value *MUST* be expressed as an [ASCII
    string](https://infra.spec.whatwg.org/#ascii-string){lt="ascii string"
    data-type="dfn"}.

error
:   The error code from the dereferencing process. This property is
    *REQUIRED* when there is an error in the dereferencing process. The
    value of this property *MUST* be a single keyword expressed as an
    [ASCII
    string](https://infra.spec.whatwg.org/#ascii-string){lt="ascii string"
    data-type="dfn"}. The possible property values of this field
    *SHOULD* be registered in the DID Specification Registries
    \[[DID-SPEC-REGISTRIES](#bib-did-spec-registries "DID Specification Registries"){.bibref
    link-type="biblio"}\]. This specification defines the following
    common error values:

    invalidDidUrl
    :   The [DID URL](#dfn-did-urls){#ref-for-dfn-did-urls-35
        .internalDFN link-type="dfn"} supplied to the [DID URL
        dereferencing](#dfn-did-url-dereferencing){#ref-for-dfn-did-url-dereferencing-14
        .internalDFN link-type="dfn"} function does not conform to valid
        syntax. (See [3.2 DID URL Syntax](#did-url-syntax){.sec-ref}.)

    notFound
    :   The [DID URL
        dereferencer](#dfn-did-url-dereferencers){#ref-for-dfn-did-url-dereferencers-3
        .internalDFN link-type="dfn"} was unable to find the
        `contentStream` resulting from this dereferencing request.
::::
:::::::::

:::::::::::::::: {#metadata-structure .section}
::: header-wrapper
### 7.3 Metadata Structure {#x7-3-metadata-structure}

[](#metadata-structure){.self-link
aria-label="Permalink for Section 7.3"}
:::

Input and output metadata is often involved during the [DID
Resolution](#dfn-did-resolution){#ref-for-dfn-did-resolution-15
.internalDFN link-type="dfn"}, [DID URL
dereferencing](#dfn-did-url-dereferencing){#ref-for-dfn-did-url-dereferencing-15
.internalDFN link-type="dfn"}, and other DID-related processes. The
structure used to communicate this metadata *MUST* be a
[map](https://infra.spec.whatwg.org/#maps) of properties. Each property
name *MUST* be a [string](https://infra.spec.whatwg.org/#string). Each
property value *MUST* be a
[string](https://infra.spec.whatwg.org/#string),
[map](https://infra.spec.whatwg.org/#maps),
[list](https://infra.spec.whatwg.org/#list),
[set](https://infra.spec.whatwg.org/#ordered-set),
[boolean](https://infra.spec.whatwg.org/#boolean), or
[null](https://infra.spec.whatwg.org/#nulls). The values within any
complex data structures such as maps and lists *MUST* be one of these
data types as well. All metadata property definitions registered in the
DID Specification Registries
\[[DID-SPEC-REGISTRIES](#bib-did-spec-registries "DID Specification Registries"){.bibref
link-type="biblio"}\] *MUST* define the value type, including any
additional formats or restrictions to that value (for example, a string
formatted as a date or as a decimal integer). It is *RECOMMENDED* that
property definitions use strings for values. The entire metadata
structure *MUST* be serializable according to the [JSON serialization
rules](https://infra.spec.whatwg.org/#serialize-an-infra-value-to-json-bytes)
in the \[[INFRA](#bib-infra "Infra Standard"){.bibref
link-type="biblio"}\] specification. Implementations *MAY* serialize the
metadata structure to other data formats.

All implementations of functions that use metadata structures as either
input or output are able to fully represent all data types described
here in a deterministic fashion. As inputs and outputs using metadata
structures are defined in terms of data types and not their
serialization, the method for
[representation](#dfn-representations){#ref-for-dfn-representations-72
.internalDFN link-type="dfn"} is internal to the implementation of the
function and is out of scope of this specification.

The following example demonstrates a JSON-encoded metadata structure
that might be used as [DID resolution input
metadata](#did-resolution-options).

:::: {#example-json-encoded-did-resolution-input-metadata-example .example}
::: marker
[Example
24](#example-json-encoded-did-resolution-input-metadata-example){.self-link}[:
JSON-encoded DID resolution input metadata example]{.example-title}
:::

``` {aria-busy="false"}
{
  "accept": "application/did+ld+json"
}
```
::::

This example corresponds to a metadata structure of the following
format:

:::: {#example-did-resolution-input-metadata-example .example}
::: marker
[Example
25](#example-did-resolution-input-metadata-example){.self-link}[: DID
resolution input metadata example]{.example-title}
:::

``` {aria-busy="false"}
«[
  "accept" → "application/did+ld+json"
]»
```
::::

The next example demonstrates a JSON-encoded metadata structure that
might be used as [DID resolution metadata](#did-resolution-options) if a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-86
.internalDFN link-type="dfn"} was not found.

:::: {#example-json-encoded-did-resolution-metadata-example .example}
::: marker
[Example
26](#example-json-encoded-did-resolution-metadata-example){.self-link}[:
JSON-encoded DID resolution metadata example]{.example-title}
:::

``` {aria-busy="false"}
{
  "error": "notFound"
}
```
::::

This example corresponds to a metadata structure of the following
format:

:::: {#example-did-resolution-metadata-example .example}
::: marker
[Example 27](#example-did-resolution-metadata-example){.self-link}[: DID
resolution metadata example]{.example-title}
:::

``` {aria-busy="false"}
«[
  "error" → "notFound"
]»
```
::::

The next example demonstrates a JSON-encoded metadata structure that
might be used as [DID document metadata](#did-document-metadata) to
describe timestamps associated with the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-144
.internalDFN link-type="dfn"}.

:::: {#example-json-encoded-did-document-metadata-example .example}
::: marker
[Example
28](#example-json-encoded-did-document-metadata-example){.self-link}[:
JSON-encoded DID document metadata example]{.example-title}
:::

``` {aria-busy="false"}
{
  "created": "2019-03-23T06:35:22Z",
  "updated": "2023-08-10T13:40:06Z"
}
```
::::

This example corresponds to a metadata structure of the following
format:

:::: {#example-did-document-metadata-example .example}
::: marker
[Example 29](#example-did-document-metadata-example){.self-link}[: DID
document metadata example]{.example-title}
:::

``` {aria-busy="false"}
«[
  "created" → "2019-03-23T06:35:22Z",
  "updated" → "2023-08-10T13:40:06Z"
]»
```
::::
::::::::::::::::
::::::::::::::::::::::::::::::::::

:::::::::::::: {#methods .section}
::: header-wrapper
## 8. Methods {#x8-methods}

[](#methods){.self-link aria-label="Permalink for Section 8."}
:::

A [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-45
.internalDFN link-type="dfn"} defines how implementers can realize the
features described by this specification. [DID
methods](#dfn-did-methods){#ref-for-dfn-did-methods-46 .internalDFN
link-type="dfn"} are often associated with a particular [verifiable data
registry](#dfn-verifiable-data-registry){#ref-for-dfn-verifiable-data-registry-3
.internalDFN link-type="dfn"}. New [DID
methods](#dfn-did-methods){#ref-for-dfn-did-methods-47 .internalDFN
link-type="dfn"} are defined in their own specifications to enable
interoperability between different implementations of the same [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-48 .internalDFN
link-type="dfn"}.

Conceptually, the relationship between this specification and a [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-49 .internalDFN
link-type="dfn"} specification is similar to the relationship between
the IETF generic [URI](#dfn-uri){#ref-for-dfn-uri-20 .internalDFN
link-type="dfn"} specification
\[[RFC3986](#bib-rfc3986 "Uniform Resource Identifier (URI): Generic Syntax"){.bibref
link-type="biblio"}\] and a specific [URI](#dfn-uri){#ref-for-dfn-uri-21
.internalDFN link-type="dfn"} scheme
\[[IANA-URI-SCHEMES](#bib-iana-uri-schemes "Uniform Resource Identifier (URI) Schemes"){.bibref
link-type="biblio"}\], such as the `http` scheme
\[[RFC7230](#bib-rfc7230 "Hypertext Transfer Protocol (HTTP/1.1): Message Syntax and Routing"){.bibref
link-type="biblio"}\]. In addition to defining a specific [DID
scheme](#dfn-did-schemes){#ref-for-dfn-did-schemes-4 .internalDFN
link-type="dfn"}, a [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-50 .internalDFN
link-type="dfn"} specification also defines the mechanisms for creating,
resolving, updating, and deactivating
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-87
.internalDFN link-type="dfn"} and [DID
documents](#dfn-did-documents){#ref-for-dfn-did-documents-145
.internalDFN link-type="dfn"} using a specific type of [verifiable data
registry](#dfn-verifiable-data-registry){#ref-for-dfn-verifiable-data-registry-4
.internalDFN link-type="dfn"}. It also documents all implementation
considerations related to
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-88
.internalDFN link-type="dfn"} as well as Security and Privacy
Considerations.

This section specifies the requirements for authoring [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-51 .internalDFN
link-type="dfn"} specifications.

:::::: {#method-syntax .section .normative}
::: header-wrapper
### 8.1 Method Syntax {#x8-1-method-syntax}

[](#method-syntax){.self-link aria-label="Permalink for Section 8.1"}
:::

The requirements for all [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-52 .internalDFN
link-type="dfn"} specifications when defining the method-specific DID
Syntax are as follows:

1.  A [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-53
    .internalDFN link-type="dfn"} specification *MUST* define exactly
    one method-specific [DID
    scheme](#dfn-did-schemes){#ref-for-dfn-did-schemes-5 .internalDFN
    link-type="dfn"} that is identified by exactly one method name as
    specified by the `method-name` rule in [3.1 DID
    Syntax](#did-syntax){.sec-ref}.
2.  The [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-54
    .internalDFN link-type="dfn"} specification *MUST* specify how to
    generate the `method-specific-id` component of a
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-89
    .internalDFN link-type="dfn"}.
3.  The [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-55
    .internalDFN link-type="dfn"} specification *MUST* define
    sensitivity and normalization of the value of the
    `method-specific-id`.
4.  The `method-specific-id` value *MUST* be unique within a [DID
    method](#dfn-did-methods){#ref-for-dfn-did-methods-56 .internalDFN
    link-type="dfn"}. The `method-specific-id` value itself might be
    globally unique.
5.  Any
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-90
    .internalDFN link-type="dfn"} generated by a [DID
    method](#dfn-did-methods){#ref-for-dfn-did-methods-57 .internalDFN
    link-type="dfn"} *MUST* be globally unique.
6.  To reduce the chances of `method-name` conflicts, a [DID
    method](#dfn-did-methods){#ref-for-dfn-did-methods-58 .internalDFN
    link-type="dfn"} specification *SHOULD* be registered in the DID
    Specification Registries
    \[[DID-SPEC-REGISTRIES](#bib-did-spec-registries "DID Specification Registries"){.bibref
    link-type="biblio"}\].
7.  A [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-59
    .internalDFN link-type="dfn"} *MAY* define multiple
    `method-specific-id` formats.
8.  The `method-specific-id` format *MAY* include colons. The use of
    colons *MUST* comply syntactically with the `method-specific-id`
    ABNF rule.
9.  A [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-60
    .internalDFN link-type="dfn"} specification *MAY* specify ABNF rules
    for [DID paths](#dfn-did-paths){#ref-for-dfn-did-paths-3
    .internalDFN link-type="dfn"} that are more restrictive than the
    generic rules in [Path](#path){.sec-ref}.
10. A [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-61
    .internalDFN link-type="dfn"} specification *MAY* specify ABNF rules
    for [DID queries](#dfn-did-queries){#ref-for-dfn-did-queries-3
    .internalDFN link-type="dfn"} that are more restrictive than the
    generic rules in this section.
11. A [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-62
    .internalDFN link-type="dfn"} specification *MAY* specify ABNF rules
    for [DID fragments](#dfn-did-fragments){#ref-for-dfn-did-fragments-9
    .internalDFN link-type="dfn"} that are more restrictive than the
    generic rules in this section.

:::: {#issue-container-generatedID-13 .note role="note"}
::: {#h-note-13 .note-title .marker role="heading" aria-level="4"}
Note[: Colons in method-specific-id]{.issue-label}
:::

The meaning of colons in the `method-specific-id` is entirely
method-specific. Colons might be used by [DID
methods](#dfn-did-methods){#ref-for-dfn-did-methods-63 .internalDFN
link-type="dfn"} for establishing hierarchically partitioned namespaces,
for identifying specific instances or parts of the [verifiable data
registry](#dfn-verifiable-data-registry){#ref-for-dfn-verifiable-data-registry-5
.internalDFN link-type="dfn"}, or for other purposes. Implementers are
advised to avoid assuming any meanings or behaviors associated with a
colon that are generically applicable to all [DID
methods](#dfn-did-methods){#ref-for-dfn-did-methods-64 .internalDFN
link-type="dfn"}.
::::
::::::

:::: {#method-operations .section}
::: header-wrapper
### 8.2 Method Operations {#x8-2-method-operations}

[](#method-operations){.self-link
aria-label="Permalink for Section 8.2"}
:::

The requirements for all [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-65 .internalDFN
link-type="dfn"} specifications when defining the method operations are
as follows:

1.  A [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-66
    .internalDFN link-type="dfn"} specification *MUST* define how
    authorization is performed to execute all operations, including any
    necessary cryptographic processes.
2.  A [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-67
    .internalDFN link-type="dfn"} specification *MUST* specify how a
    [DID
    controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-17
    .internalDFN link-type="dfn"} creates a
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-91
    .internalDFN link-type="dfn"} and its associated [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-146
    .internalDFN link-type="dfn"}.
3.  A [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-68
    .internalDFN link-type="dfn"} specification *MUST* specify how a
    [DID resolver](#dfn-did-resolvers){#ref-for-dfn-did-resolvers-16
    .internalDFN link-type="dfn"} uses a
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-92
    .internalDFN link-type="dfn"} to resolve a [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-147
    .internalDFN link-type="dfn"}, including how the [DID
    resolver](#dfn-did-resolvers){#ref-for-dfn-did-resolvers-17
    .internalDFN link-type="dfn"} can verify the authenticity of the
    response.
4.  A [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-69
    .internalDFN link-type="dfn"} specification *MUST* specify what
    constitutes an update to a [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-148
    .internalDFN link-type="dfn"} and how a [DID
    controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-18
    .internalDFN link-type="dfn"} can update a [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-149
    .internalDFN link-type="dfn"} *or* state that updates are not
    possible.
5.  The [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-70
    .internalDFN link-type="dfn"} specification *MUST* specify how a
    [DID
    controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-19
    .internalDFN link-type="dfn"} can deactivate a
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-93
    .internalDFN link-type="dfn"} *or* state that deactivation is not
    possible.

The authority of a party that is performing authorization to carry out
the operations is specific to a [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-71 .internalDFN
link-type="dfn"}. For example, a [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-72 .internalDFN
link-type="dfn"} might ---

-   make use of the
    [`controller`](#dfn-controller){#ref-for-dfn-controller-6
    .internalDFN link-type="dfn"} property.
-   use the [verification
    methods](#dfn-verification-method){#ref-for-dfn-verification-method-64
    .internalDFN link-type="dfn"} listed under
    [`authentication`](#dfn-authentication){#ref-for-dfn-authentication-6
    .internalDFN link-type="dfn"}.
-   use other constructs in the [DID
    Document](#dfn-did-documents){#ref-for-dfn-did-documents-150
    .internalDFN link-type="dfn"} such as the [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-65
    .internalDFN link-type="dfn"} specified via the
    [`capabilityInvocation`](#dfn-capabilityinvocation){#ref-for-dfn-capabilityinvocation-3
    .internalDFN link-type="dfn"} [verification
    relationship](#dfn-verification-relationship){#ref-for-dfn-verification-relationship-20
    .internalDFN link-type="dfn"}.
-   not use the [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-151
    .internalDFN link-type="dfn"} for this decision at all, and depend
    on an out-of-band mechanism, instead.
::::

:::: {#security-requirements .section}
::: header-wrapper
### 8.3 Security Requirements {#x8-3-security-requirements}

[](#security-requirements){.self-link
aria-label="Permalink for Section 8.3"}
:::

The requirements for all [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-73 .internalDFN
link-type="dfn"} specifications when authoring the *Security
Considerations* section are as follows:

1.  A [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-74
    .internalDFN link-type="dfn"} specifications *MUST* follow all
    guidelines and normative language provided in [RFC3552: Writing
    Security Considerations
    Sections](https://www.rfc-editor.org/rfc/rfc3552#section-5) for the
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-94
    .internalDFN link-type="dfn"} operations defined in the [DID
    method](#dfn-did-methods){#ref-for-dfn-did-methods-75 .internalDFN
    link-type="dfn"} specification.
2.  The Security Considerations section *MUST* document the following
    forms of attack for the
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-95
    .internalDFN link-type="dfn"} operations defined in the [DID
    method](#dfn-did-methods){#ref-for-dfn-did-methods-76 .internalDFN
    link-type="dfn"} specification: eavesdropping, replay, message
    insertion, deletion, modification, denial of service,
    [amplification](#dfn-amplification){#ref-for-dfn-amplification-1
    .internalDFN link-type="dfn"}, and man-in-the-middle. Other known
    forms of attack *SHOULD* also be documented.
3.  The Security Considerations section *MUST* discuss residual risks,
    such as the risks from compromise in a related protocol, incorrect
    implementation, or cipher after threat mitigation was deployed.
4.  The Security Considerations section *MUST* provide integrity
    protection and update authentication for all operations required by
    Section [8.2 Method Operations](#method-operations){.sec-ref}.
5.  If authentication is involved, particularly user-host
    authentication, the security characteristics of the authentication
    method *MUST* be clearly documented.
6.  The Security Considerations section *MUST* discuss the policy
    mechanism by which
    [DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-96
    .internalDFN link-type="dfn"} are proven to be uniquely assigned.
7.  Method-specific endpoint authentication *MUST* be discussed. Where
    [DID methods](#dfn-did-methods){#ref-for-dfn-did-methods-77
    .internalDFN link-type="dfn"} make use of
    [DLTs](#dfn-distributed-ledger-technology){#ref-for-dfn-distributed-ledger-technology-3
    .internalDFN link-type="dfn"} with varying network topology,
    sometimes offered as *light node* or *[thin
    client](https://en.bitcoin.it/wiki/Thin_Client_Security)*
    implementations to reduce required computing resources, the security
    assumptions of the topology available to implementations of the [DID
    method](#dfn-did-methods){#ref-for-dfn-did-methods-78 .internalDFN
    link-type="dfn"} *MUST* be discussed.
8.  If a protocol incorporates cryptographic protection mechanisms, the
    [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-79
    .internalDFN link-type="dfn"} specification *MUST* clearly indicate
    which portions of the data are protected and by what protections,
    and it *SHOULD* give an indication of the sorts of attacks to which
    the cryptographic protection is susceptible. Some examples are
    integrity only, confidentiality, and endpoint authentication.
9.  Data which is to be held secret (keying material, random seeds, and
    so on) *SHOULD* be clearly labeled.
10. [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-80
    .internalDFN link-type="dfn"} specifications *SHOULD* explain and
    specify the implementation of signatures on [DID
    documents](#dfn-did-documents){#ref-for-dfn-did-documents-152
    .internalDFN link-type="dfn"}, if applicable.
11. Where [DID methods](#dfn-did-methods){#ref-for-dfn-did-methods-81
    .internalDFN link-type="dfn"} use peer-to-peer computing resources,
    such as with all known
    [DLTs](#dfn-distributed-ledger-technology){#ref-for-dfn-distributed-ledger-technology-4
    .internalDFN link-type="dfn"}, the expected burdens of those
    resources *SHOULD* be discussed in relation to denial of service.
12. [DID methods](#dfn-did-methods){#ref-for-dfn-did-methods-82
    .internalDFN link-type="dfn"} that introduce new authentication
    [service](#dfn-service){#ref-for-dfn-service-20 .internalDFN
    link-type="dfn"} types, as described in [5.4
    Services](#services){.sec-ref}, *SHOULD* consider the security
    requirements of the supported authentication protocol.
::::

:::: {#privacy-requirements .section .normative}
::: header-wrapper
### 8.4 Privacy Requirements {#x8-4-privacy-requirements}

[](#privacy-requirements){.self-link
aria-label="Permalink for Section 8.4"}
:::

The requirements for all [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-83 .internalDFN
link-type="dfn"} specifications when authoring the *Privacy
Considerations* section are:

1.  The [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-84
    .internalDFN link-type="dfn"} specification\'s Privacy
    Considerations section *MUST* discuss any subsection of Section 5 of
    \[[RFC6973](#bib-rfc6973 "Privacy Considerations for Internet Protocols"){.bibref
    link-type="biblio"}\] that could apply in a method-specific manner.
    The subsections to consider are: surveillance, stored data
    compromise, unsolicited traffic, misattribution, correlation,
    identification, secondary use, disclosure, and exclusion.
::::
::::::::::::::

:::::::::::::::::::::::::::::::::::::::::::::::: {#security-considerations .section .informative}
::: header-wrapper
## 9. Security Considerations {#x9-security-considerations}

[](#security-considerations){.self-link
aria-label="Permalink for Section 9."}
:::

*This section is non-normative.*

This section contains a variety of security considerations that people
using Decentralized Identifiers are advised to consider before deploying
this technology in a production setting.
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-97
.internalDFN link-type="dfn"} are designed to operate under the threat
model used by many IETF standards and documented in
\[[RFC3552](#bib-rfc3552 "Guidelines for Writing RFC Text on Security Considerations"){.bibref
link-type="biblio"}\]. This section elaborates upon a number of the
considerations in
\[[RFC3552](#bib-rfc3552 "Guidelines for Writing RFC Text on Security Considerations"){.bibref
link-type="biblio"}\], as well as other considerations that are unique
to
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-98
.internalDFN link-type="dfn"} architecture.

:::: {#choosing-did-resolvers .section}
::: header-wrapper
### 9.1 Choosing DID Resolvers {#x9-1-choosing-did-resolvers}

[](#choosing-did-resolvers){.self-link
aria-label="Permalink for Section 9.1"}
:::

The DID Specification Registries
\[[DID-SPEC-REGISTRIES](#bib-did-spec-registries "DID Specification Registries"){.bibref
link-type="biblio"}\] contains an informative list of [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-85 .internalDFN
link-type="dfn"} names and their corresponding [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-86 .internalDFN
link-type="dfn"} specifications. Implementers need to bear in mind that
there is no central authority to mandate which [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-87 .internalDFN
link-type="dfn"} specification is to be used with any specific [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-88 .internalDFN
link-type="dfn"} name. If there is doubt on whether or not a specific
[DID resolver](#dfn-did-resolvers){#ref-for-dfn-did-resolvers-18
.internalDFN link-type="dfn"} implements a [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-89 .internalDFN
link-type="dfn"} correctly, the DID Specification Registries can be used
to look up the registered specification and make an informed decision
regarding which [DID
resolver](#dfn-did-resolvers){#ref-for-dfn-did-resolvers-19 .internalDFN
link-type="dfn"} implementation to use.
::::

:::::::::: {#proving-control-and-binding .section}
::: header-wrapper
### 9.2 Proving Control and Binding {#x9-2-proving-control-and-binding}

[](#proving-control-and-binding){.self-link
aria-label="Permalink for Section 9.2"}
:::

Binding an entity in the digital world or the physical world to a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-99
.internalDFN link-type="dfn"}, to a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-153
.internalDFN link-type="dfn"}, or to cryptographic material requires,
the use of security protocols contemplated by this specification. The
following sections describe some possible scenarios and how an entity
therein might prove control over a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-100
.internalDFN link-type="dfn"} or a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-154
.internalDFN link-type="dfn"} for the purposes of authentication or
authorization.

:::::: {.section .notoc}
::: header-wrapper
#### Proving Control of a DID and/or DID Document {#proving-control-of-a-did-and-or-did-document}

[](#proving-control-of-a-did-and-or-did-document){.self-link
aria-label="Permalink for this Section"}
:::

Proving control over a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-101
.internalDFN link-type="dfn"} and/or a [DID
Document](#dfn-did-documents){#ref-for-dfn-did-documents-155
.internalDFN link-type="dfn"} is useful when updating either in a
[verifiable data
registry](#dfn-verifiable-data-registry){#ref-for-dfn-verifiable-data-registry-6
.internalDFN link-type="dfn"} or authenticating with remote systems.
Cryptographic digital signatures and [verifiable
timestamps](#dfn-verifiable-timestamp){#ref-for-dfn-verifiable-timestamp-1
.internalDFN link-type="dfn"} enable certain security protocols related
to [DID documents](#dfn-did-documents){#ref-for-dfn-did-documents-156
.internalDFN link-type="dfn"} to be cryptographically verifiable. For
these purposes, this specification defines useful [verification
relationships](#dfn-verification-relationship){#ref-for-dfn-verification-relationship-21
.internalDFN link-type="dfn"} in [5.3.1
Authentication](#authentication){.sec-ref} and [5.3.4 Capability
Invocation](#capability-invocation){.sec-ref}. The secret cryptographic
material associated with the [verification
methods](#dfn-verification-method){#ref-for-dfn-verification-method-66
.internalDFN link-type="dfn"} can be used to generate a cryptographic
digital signature as a part of an authentication or authorization
security protocol.

:::: {#issue-container-generatedID-14 .note role="note"}
::: {#h-note-14 .note-title .marker role="heading" aria-level="5"}
Note[: Signed DID documents]{.issue-label}
:::

Some [DID methods](#dfn-did-methods){#ref-for-dfn-did-methods-90
.internalDFN link-type="dfn"} allow digital signatures and other proofs
to be included in the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-157
.internalDFN link-type="dfn"} or a [7.3 Metadata
Structure](#metadata-structure){.sec-ref}. However, such proofs by
themselves do not necessarily prove control over a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-102
.internalDFN link-type="dfn"}, or guarantee that the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-158
.internalDFN link-type="dfn"} is the correct one for the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-103
.internalDFN link-type="dfn"}. In order to obtain the correct [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-159
.internalDFN link-type="dfn"} and verify control over a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-104
.internalDFN link-type="dfn"}, it is necessary to perform the [DID
resolution](#dfn-did-resolution){#ref-for-dfn-did-resolution-16
.internalDFN link-type="dfn"} process as defined by the [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-91 .internalDFN
link-type="dfn"}.
::::
::::::

:::: {.section .notoc}
::: header-wrapper
#### Binding to Physical Identity

[](#binding-to-physical-identity){.self-link
aria-label="Permalink for this Section"}
:::

A
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-105
.internalDFN link-type="dfn"} and [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-160
.internalDFN link-type="dfn"} do not inherently carry any [personal
data](https://en.wikipedia.org/wiki/Personal_data) and it is strongly
advised that non-public entities do not publish personal data in [DID
documents](#dfn-did-documents){#ref-for-dfn-did-documents-161
.internalDFN link-type="dfn"}.

It can be useful to express a binding of a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-106
.internalDFN link-type="dfn"} to a person\'s or organization\'s physical
identity in a way that is provably asserted by a trusted authority, such
as a government. This specification provides the [5.3.2
Assertion](#assertion){.sec-ref} [verification
relationship](#dfn-verification-relationship){#ref-for-dfn-verification-relationship-22
.internalDFN link-type="dfn"} for these purposes. This feature can
enable interactions that are private and can be considered legally
enforceable under one or more jurisdictions; establishing such bindings
has to be carefully balanced against privacy considerations (see [10.
Privacy Considerations](#privacy-considerations){.sec-ref}).

The process of binding a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-107
.internalDFN link-type="dfn"} to something in the physical world, such
as a person or an organization --- for example, by using [verifiable
credentials](#dfn-verifiable-credentials){#ref-for-dfn-verifiable-credentials-4
.internalDFN link-type="dfn"} with the same subject as that
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-108
.internalDFN link-type="dfn"} --- is contemplated by this specification
and further defined in the Verifiable Credentials Data Model
\[[VC-DATA-MODEL](#bib-vc-data-model "Verifiable Credentials Data Model v1.1"){.bibref
link-type="biblio"}\].
::::
::::::::::

:::: {#authentication-service-endpoints .section}
::: header-wrapper
### 9.3 Authentication Service Endpoints {#x9-3-authentication-service-endpoints}

[](#authentication-service-endpoints){.self-link
aria-label="Permalink for Section 9.3"}
:::

If a [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-162
.internalDFN link-type="dfn"} publishes a
[service](#dfn-service){#ref-for-dfn-service-21 .internalDFN
link-type="dfn"} intended for authentication or authorization of the
[DID subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-50
.internalDFN link-type="dfn"} (see Section [5.4
Services](#services){.sec-ref}), it is the responsibility of the
[service
endpoint](#dfn-service-endpoints){#ref-for-dfn-service-endpoints-4
.internalDFN link-type="dfn"} provider, subject, or requesting party to
comply with the requirements of the authentication protocols supported
at that [service
endpoint](#dfn-service-endpoints){#ref-for-dfn-service-endpoints-5
.internalDFN link-type="dfn"}.
::::

:::: {#non-repudiation .section}
::: header-wrapper
### 9.4 Non-Repudiation {#x9-4-non-repudiation}

[](#non-repudiation){.self-link aria-label="Permalink for Section 9.4"}
:::

Non-repudiation of
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-109
.internalDFN link-type="dfn"} and [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-163
.internalDFN link-type="dfn"} updates is supported if:

-   The [verifiable data
    registry](#dfn-verifiable-data-registry){#ref-for-dfn-verifiable-data-registry-7
    .internalDFN link-type="dfn"} supports [verifiable
    timestamps](#dfn-verifiable-timestamp){#ref-for-dfn-verifiable-timestamp-2
    .internalDFN link-type="dfn"}. See [7.1.3 DID Document
    Metadata](#did-document-metadata){.sec-ref} for further information
    on useful timestamps that can be used during the [DID
    resolution](#dfn-did-resolution){#ref-for-dfn-did-resolution-17
    .internalDFN link-type="dfn"} process.
-   The subject is monitoring for unauthorized updates as elaborated
    upon in [9.5 Notification of DID Document
    Changes](#notification-of-did-document-changes){.sec-ref}.
-   The subject has had adequate opportunity to revert malicious updates
    according to the authorization mechanism for the [DID
    method](#dfn-did-methods){#ref-for-dfn-did-methods-92 .internalDFN
    link-type="dfn"}.
::::

:::: {#notification-of-did-document-changes .section}
::: header-wrapper
### 9.5 Notification of DID Document Changes {#x9-5-notification-of-did-document-changes}

[](#notification-of-did-document-changes){.self-link
aria-label="Permalink for Section 9.5"}
:::

One mitigation against unauthorized changes to a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-164
.internalDFN link-type="dfn"} is monitoring and actively notifying the
[DID subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-51
.internalDFN link-type="dfn"} when there are changes. This is analogous
to helping prevent account takeover on conventional username/password
accounts by sending password reset notifications to the email addresses
on file.

In the case of a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-110
.internalDFN link-type="dfn"}, there is no intermediary registrar or
account provider to generate such notifications. However, if the
[verifiable data
registry](#dfn-verifiable-data-registry){#ref-for-dfn-verifiable-data-registry-8
.internalDFN link-type="dfn"} on which the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-111
.internalDFN link-type="dfn"} is registered directly supports change
notifications, a subscription service can be offered to [DID
controllers](#dfn-did-controllers){#ref-for-dfn-did-controllers-20
.internalDFN link-type="dfn"}. Notifications could be sent directly to
the relevant [service
endpoints](#dfn-service-endpoints){#ref-for-dfn-service-endpoints-6
.internalDFN link-type="dfn"} listed in an existing
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-112
.internalDFN link-type="dfn"}.

If a [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-21
.internalDFN link-type="dfn"} chooses to rely on a third-party
monitoring service (other than the [verifiable data
registry](#dfn-verifiable-data-registry){#ref-for-dfn-verifiable-data-registry-9
.internalDFN link-type="dfn"} itself), this introduces another vector of
attack.
::::

:::: {#key-and-signature-expiration .section}
::: header-wrapper
### 9.6 Key and Signature Expiration {#x9-6-key-and-signature-expiration}

[](#key-and-signature-expiration){.self-link
aria-label="Permalink for Section 9.6"}
:::

In a [decentralized
identifier](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-113
.internalDFN link-type="dfn"} architecture, there might not be
centralized authorities to enforce cryptographic material or
cryptographic digital signature expiration policies. Therefore, it is
with supporting software such as [DID
resolvers](#dfn-did-resolvers){#ref-for-dfn-did-resolvers-20
.internalDFN link-type="dfn"} and verification libraries that requesting
parties validate that cryptographic material were not expired at the
time they were used. Requesting parties might employ their own
expiration policies in addition to inputs into their verification
processes. For example, some requesting parties might accept
authentications from five minutes in the past, while others with access
to high precision time sources might require authentications to be time
stamped within the last 500 milliseconds.

There are some requesting parties that have legitimate needs to extend
the use of already-expired cryptographic material, such as verifying
legacy cryptographic digital signatures. In these scenarios, a
requesting party might instruct their verification software to ignore
cryptographic key material expiration or determine if the cryptographic
key material was expired at the time it was used.
::::

:::: {#verification-method-rotation .section}
::: header-wrapper
### 9.7 Verification Method Rotation {#x9-7-verification-method-rotation}

[](#verification-method-rotation){.self-link
aria-label="Permalink for Section 9.7"}
:::

Rotation is a management process that enables the secret cryptographic
material associated with an existing [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-67
.internalDFN link-type="dfn"} to be deactivated or destroyed once a new
[verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-68
.internalDFN link-type="dfn"} has been added to the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-165
.internalDFN link-type="dfn"}. Going forward, any new proofs that a
[controller](#dfn-controller){#ref-for-dfn-controller-7 .internalDFN
link-type="dfn"} would have generated using the old secret cryptographic
material can now instead be generated using the new cryptographic
material and can be verified using the new [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-69
.internalDFN link-type="dfn"}.

Rotation is a useful mechanism for protecting against verification
method compromise, since frequent rotation of a verification method by
the controller reduces the value of a single compromised verification
method to an attacker. Performing revocation immediately after rotation
is useful for verification methods that a controller designates for
short-lived verifications, such as those involved in encrypting messages
and authentication.

The following considerations might be of use when contemplating the use
of [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-70
.internalDFN link-type="dfn"} rotation:

-   [Verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-71
    .internalDFN link-type="dfn"} rotation is a proactive security
    measure.
-   It is generally considered a best practice to perform [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-72
    .internalDFN link-type="dfn"} rotation on a regular basis.
-   Higher security environments tend to employ more frequent
    verification method rotation.
-   [Verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-73
    .internalDFN link-type="dfn"} rotation manifests only as changes to
    the current or latest version of a [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-166
    .internalDFN link-type="dfn"}.
-   When a [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-74
    .internalDFN link-type="dfn"} has been active for a long time, or
    used for many operations, a controller might wish to perform a
    rotation.
-   Frequent rotation of a [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-75
    .internalDFN link-type="dfn"} might be frustrating for parties that
    are forced to continuously renew or refresh associated credentials.
-   Proofs or signatures that rely on [verification
    methods](#dfn-verification-method){#ref-for-dfn-verification-method-76
    .internalDFN link-type="dfn"} that are not present in the latest
    version of a [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-167
    .internalDFN link-type="dfn"} are not impacted by rotation. In these
    cases, verification software might require additional information,
    such as when a particular [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-77
    .internalDFN link-type="dfn"} was expected to be valid as well as
    access to a [verifiable data
    registry](#dfn-verifiable-data-registry){#ref-for-dfn-verifiable-data-registry-10
    .internalDFN link-type="dfn"} containing a historical record, to
    determine the validity of the proof or signature. This option might
    not be available in all [DID
    methods](#dfn-did-methods){#ref-for-dfn-did-methods-93 .internalDFN
    link-type="dfn"}.
-   The section on [DID method operations](#method-operations) specifies
    the
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-114
    .internalDFN link-type="dfn"} operations to be supported by a [DID
    method](#dfn-did-methods){#ref-for-dfn-did-methods-94 .internalDFN
    link-type="dfn"} specification, including
    [update](#method-operations) which is expected to be used to perform
    a [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-78
    .internalDFN link-type="dfn"} rotation.
-   A [controller](#dfn-controller){#ref-for-dfn-controller-8
    .internalDFN link-type="dfn"} performs a rotation when they add a
    new [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-79
    .internalDFN link-type="dfn"} that is meant to replace an existing
    [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-80
    .internalDFN link-type="dfn"} after some time.
-   Not all [DID methods](#dfn-did-methods){#ref-for-dfn-did-methods-95
    .internalDFN link-type="dfn"} support [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-81
    .internalDFN link-type="dfn"} rotation.
::::

:::::::: {#verification-method-revocation .section}
::: header-wrapper
### 9.8 Verification Method Revocation {#x9-8-verification-method-revocation}

[](#verification-method-revocation){.self-link
aria-label="Permalink for Section 9.8"}
:::

Revocation is a management process that enables the secret cryptographic
material associated with an existing [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-82
.internalDFN link-type="dfn"} to be deactivated such that it ceases to
be a valid form of creating new proofs of digital signatures.

Revocation is a useful mechanism for reacting to a verification method
compromise. Performing revocation immediately after rotation is useful
for verification methods that a controller designates for short-lived
verifications, such as those involved in encrypting messages and
authentication.

Compromise of the secrets associated with a [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-83
.internalDFN link-type="dfn"} allows the attacker to use them according
to the [verification
relationship](#dfn-verification-relationship){#ref-for-dfn-verification-relationship-23
.internalDFN link-type="dfn"} expressed by
[controller](#dfn-controller){#ref-for-dfn-controller-9 .internalDFN
link-type="dfn"} in the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-168
.internalDFN link-type="dfn"}, for example, for authentication. The
attacker\'s use of the secrets might be indistinguishable from the
legitimate [controller\'s](#did-controller) use starting from the time
the [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-84
.internalDFN link-type="dfn"} was registered, to the time it was
revoked.

The following considerations might be of use when contemplating the use
of [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-85
.internalDFN link-type="dfn"} revocation:

-   [Verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-86
    .internalDFN link-type="dfn"} revocation is a reactive security
    measure.
-   It is considered a best practice to support key revocation.
-   A [controller](#dfn-controller){#ref-for-dfn-controller-10
    .internalDFN link-type="dfn"} is expected to immediately revoke any
    [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-87
    .internalDFN link-type="dfn"} that is known to be compromised.
-   [Verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-88
    .internalDFN link-type="dfn"} revocation can only be embodied in
    changes to the latest version of a [DID
    Document](#dfn-did-documents){#ref-for-dfn-did-documents-169
    .internalDFN link-type="dfn"}; it cannot retroactively adjust
    previous versions.
-   As described in [5.2.1 Verification
    Material](#verification-material){.sec-ref}, absence of a
    verification method is the only form of revocation that applies to
    all [DID Methods](#dfn-did-methods){#ref-for-dfn-did-methods-96
    .internalDFN link-type="dfn"} that support revocation.
-   If a [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-89
    .internalDFN link-type="dfn"} is no longer exclusively accessible to
    the [controller](#dfn-controller){#ref-for-dfn-controller-11
    .internalDFN link-type="dfn"} or parties trusted to act on behalf of
    the [controller](#dfn-controller){#ref-for-dfn-controller-12
    .internalDFN link-type="dfn"}, it is expected to be revoked
    immediately to reduce the risk of compromises such as masquerading,
    theft, and fraud.
-   Revocation is expected to be understood as a
    [controller](#dfn-controller){#ref-for-dfn-controller-13
    .internalDFN link-type="dfn"} expressing that proofs or signatures
    associated with a revoked [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-90
    .internalDFN link-type="dfn"} created after its revocation should be
    treated as invalid. It could also imply a concern that existing
    proofs or signatures might have been created by an attacker, but
    this is not necessarily the case. Verifiers, however, might still
    choose to accept or reject any such proofs or signatures at their
    own discretion.
-   The section on [DID method operations](#method-operations) specifies
    the
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-115
    .internalDFN link-type="dfn"} operations to be supported by a [DID
    method](#dfn-did-methods){#ref-for-dfn-did-methods-97 .internalDFN
    link-type="dfn"} specification, including
    [update](#method-operations) and [deactivate](#method-operations),
    which might be used to remove a [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-91
    .internalDFN link-type="dfn"} from a [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-170
    .internalDFN link-type="dfn"}.
-   Not all [DID methods](#dfn-did-methods){#ref-for-dfn-did-methods-98
    .internalDFN link-type="dfn"} support [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-92
    .internalDFN link-type="dfn"} revocation.
-   Even if a [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-93
    .internalDFN link-type="dfn"} is present in a [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-171
    .internalDFN link-type="dfn"}, additional information, such as a
    public key revocation certificate, or an external allow or deny
    list, could be used to determine whether a [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-94
    .internalDFN link-type="dfn"} has been revoked.
-   The day-to-day operation of any software relying on a compromised
    [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-95
    .internalDFN link-type="dfn"}, such as an individual\'s operating
    system, antivirus, or endpoint protection software, could be
    impacted when the [verification
    method](#dfn-verification-method){#ref-for-dfn-verification-method-96
    .internalDFN link-type="dfn"} is publicly revoked.

:::: {.section .notoc}
::: header-wrapper
#### Revocation Semantics

[](#revocation-semantics){.self-link
aria-label="Permalink for this Section"}
:::

Although verifiers might choose not to accept proofs or signatures from
a revoked verification method, knowing whether a verification was made
with a revoked [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-97
.internalDFN link-type="dfn"} is trickier than it might seem. Some [DID
methods](#dfn-did-methods){#ref-for-dfn-did-methods-99 .internalDFN
link-type="dfn"} provide the ability to look back at the state of a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-116
.internalDFN link-type="dfn"} at a point in time, or at a particular
version of the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-172
.internalDFN link-type="dfn"}. When such a feature is combined with a
reliable way to determine the time or
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-117
.internalDFN link-type="dfn"} version that existed when a
cryptographically verifiable statement was made, then revocation does
not undo that statement. This can be the basis for using
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-118
.internalDFN link-type="dfn"} to make binding commitments; for example,
to sign a mortgage.

If these conditions are met, revocation is not retroactive; it only
nullifies future use of the method.

However, in order for such semantics to be safe, the second condition
--- an ability to know what the state of the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-173
.internalDFN link-type="dfn"} was at the time the assertion was made ---
is expected to apply. Without that guarantee, someone could discover a
revoked key and use it to make cryptographically verifiable statements
with a simulated date in the past.

Some [DID methods](#dfn-did-methods){#ref-for-dfn-did-methods-100
.internalDFN link-type="dfn"} only allow the retrieval of the current
state of a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-119
.internalDFN link-type="dfn"}. When this is true, or when the state of a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-120
.internalDFN link-type="dfn"} at the time of a cryptographically
verifiable statement cannot be reliably determined, then the only safe
course is to disallow any consideration of DID state with respect to
time, except the present moment.
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-121
.internalDFN link-type="dfn"} ecosystems that take this approach
essentially provide cryptographically verifiable statements as ephemeral
tokens that can be invalidated at any time by the [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-22
.internalDFN link-type="dfn"}.
::::

:::: {.section .notoc}
::: header-wrapper
#### Revocation in Trustless Systems

[](#revocation-in-trustless-systems){.self-link
aria-label="Permalink for this Section"}
:::

Trustless systems are those where all trust is derived from
cryptographically provable assertions, and more specifically, where no
metadata outside of the cryptographic system is factored into the
determination of trust in the system. To verify a signature of proof for
a [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-98
.internalDFN link-type="dfn"} which has been revoked in a trustless
system, a [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-101
.internalDFN link-type="dfn"} needs to support either or both of the
`versionId` or `versionTime`, as well as both the `updated` and
`nextUpdate`, [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-174
.internalDFN link-type="dfn"} metadata properties. A verifier can
validate a signature or proof of a revoked key if and only if all of the
following are true:

-   The proof or signature includes the `versionId` or `versionTime` of
    the [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-175
    .internalDFN link-type="dfn"} that was used at the point the
    signature or proof was created.
-   The verifier can determine the point in time at which the signature
    or proof was made; for example, it was anchored on a blockchain.
-   For the resolved [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-176
    .internalDFN link-type="dfn"} metadata, the `updated` timestamp is
    before, and the `nextUpdate` timestamp is after, the point in time
    at which the signature or proof was made.

In systems that are willing to admit metadata other than those
constituting cryptographic input, similar trust may be achieved \-- but
always on the same basis where a careful judgment is made about whether
a [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-177
.internalDFN link-type="dfn"}\'s content at the moment of a signing
event contained the expected content.
::::
::::::::

:::: {#did-recovery .section}
::: header-wrapper
### 9.9 DID Recovery {#x9-9-did-recovery}

[](#did-recovery){.self-link aria-label="Permalink for Section 9.9"}
:::

Recovery is a reactive security measure whereby a
[controller](#dfn-controller){#ref-for-dfn-controller-14 .internalDFN
link-type="dfn"} that has lost the ability to perform DID operations,
such as through the loss of a device, is able to regain the ability to
perform DID operations.

The following considerations might be of use when contemplating the use
of
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-122
.internalDFN link-type="dfn"} recovery:

-   Performing recovery proactively on an infrequent but regular basis,
    can help to ensure that control has not been lost.
-   It is considered a best practice to never reuse cryptographic
    material associated with recovery for any other purposes.
-   Recovery is commonly performed in conjunction with [verification
    method rotation](#verification-method-rotation) and [verification
    method revocation](#verification-method-revocation).
-   Recovery is advised when a
    [controller](#dfn-controller){#ref-for-dfn-controller-15
    .internalDFN link-type="dfn"} or services trusted to act on their
    behalf no longer have the exclusive ability to perform DID
    operations as described in [8.2 Method
    Operations](#method-operations){.sec-ref}.
-   [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-102
    .internalDFN link-type="dfn"} specifications might choose to enable
    support for a quorum of trusted parties to facilitate recovery. Some
    of the facilities to do so are suggested in [5.1.2 DID
    Controller](#did-controller){.sec-ref}.
-   Not all [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-103
    .internalDFN link-type="dfn"} specifications will recognize control
    from
    [DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-123
    .internalDFN link-type="dfn"} registered using other [DID
    methods](#dfn-did-methods){#ref-for-dfn-did-methods-104 .internalDFN
    link-type="dfn"} and they might restrict third-party control to
    [DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-124
    .internalDFN link-type="dfn"} that use the same method.
-   Access control and recovery in a [DID
    method](#dfn-did-methods){#ref-for-dfn-did-methods-105 .internalDFN
    link-type="dfn"} specification can also include a time lock feature
    to protect against key compromise by maintaining a second track of
    control for recovery.
-   There are currently no common recovery mechanisms that apply to all
    [DID methods](#dfn-did-methods){#ref-for-dfn-did-methods-106
    .internalDFN link-type="dfn"}.
::::

:::: {#the-role-of-human-friendly-identifiers .section}
::: header-wrapper
### 9.10 The Role of Human-Friendly Identifiers {#x9-10-the-role-of-human-friendly-identifiers}

[](#the-role-of-human-friendly-identifiers){.self-link
aria-label="Permalink for Section 9.10"}
:::

[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-125
.internalDFN link-type="dfn"} achieve global uniqueness without the need
for a central registration authority. This comes at the cost of human
memorability. Algorithms capable of generating globally unambiguous
identifiers produce random strings of characters that have no human
meaning. This trade-off is often referred to as [Zooko\'s
Triangle](https://en.wikipedia.org/wiki/Zooko%27s_triangle).

There are use cases where it is desirable to discover a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-126
.internalDFN link-type="dfn"} when starting from a human-friendly
identifier. For example, a natural language name, a domain name, or a
conventional address for a [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-23
.internalDFN link-type="dfn"}, such as a mobile telephone number, email
address, social media username, or blog URL. However, the problem of
mapping human-friendly identifiers to
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-127
.internalDFN link-type="dfn"}, and doing so in a way that can be
verified and trusted, is outside the scope of this specification.

Solutions to this problem are defined in separate specifications, such
as
\[[DNS-DID](#bib-dns-did "The Decentralized Identifier (DID) in the DNS"){.bibref
link-type="biblio"}\], that reference this specification. It is strongly
recommended that such specifications carefully consider the:

-   Numerous security attacks based on deceiving users about the true
    human-friendly identifier for a target entity.
-   Privacy consequences of using human-friendly identifiers that are
    inherently correlatable, especially if they are globally unique.
::::

:::: {#dids-as-enhanced-urns .section}
::: header-wrapper
### 9.11 DIDs as Enhanced URNs {#x9-11-dids-as-enhanced-urns}

[](#dids-as-enhanced-urns){.self-link
aria-label="Permalink for Section 9.11"}
:::

If desired by a [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-24
.internalDFN link-type="dfn"}, a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-128
.internalDFN link-type="dfn"} or a [DID
URL](#dfn-did-urls){#ref-for-dfn-did-urls-36 .internalDFN
link-type="dfn"} is capable of acting as persistent,
location-independent resource identifier. These sorts of identifiers are
classified as Uniform Resource Names (URNs) and are defined in
\[[RFC8141](#bib-rfc8141 "Uniform Resource Names (URNs)"){.bibref
link-type="biblio"}\].
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-129
.internalDFN link-type="dfn"} are an enhanced form of URN that provide a
cryptographically secure, location-independent identifier for a digital
resource, while also providing metadata that enables retrieval. Due to
the indirection between the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-178
.internalDFN link-type="dfn"} and the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-130
.internalDFN link-type="dfn"} itself, the [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-25
.internalDFN link-type="dfn"} can adjust the actual location of the
resource --- or even provide the resource directly --- without adjusting
the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-131
.internalDFN link-type="dfn"}.
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-132
.internalDFN link-type="dfn"} of this type can definitively verify that
the resource retrieved is, in fact, the resource identified.

A [DID controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-26
.internalDFN link-type="dfn"} who intends to use a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-133
.internalDFN link-type="dfn"} for this purpose is advised to follow the
security considerations in
\[[RFC8141](#bib-rfc8141 "Uniform Resource Names (URNs)"){.bibref
link-type="biblio"}\]. In particular:

-   The [DID
    controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-27
    .internalDFN link-type="dfn"} is expected to choose a [DID
    method](#dfn-did-methods){#ref-for-dfn-did-methods-107 .internalDFN
    link-type="dfn"} that supports the controller\'s requirements for
    persistence. The Decentralized Characteristics Rubric
    \[[DID-RUBRIC](#bib-did-rubric "Decentralized Characteristics Rubric v1.0"){.bibref
    link-type="biblio"}\] is one tool available to help implementers
    decide upon the most suitable [DID
    method](#dfn-did-methods){#ref-for-dfn-did-methods-108 .internalDFN
    link-type="dfn"}.
-   The [DID
    controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-28
    .internalDFN link-type="dfn"} is expected to publish its operational
    policies so requesting parties can determine the degree to which
    they can rely on the persistence of a
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-134
    .internalDFN link-type="dfn"} controlled by that [DID
    controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-29
    .internalDFN link-type="dfn"}. In the absence of such policies,
    requesting parties are not expected to make any assumption about
    whether a
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-135
    .internalDFN link-type="dfn"} is a persistent identifier for the
    same [DID subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-52
    .internalDFN link-type="dfn"}.
::::

:::: {#immutability .section}
::: header-wrapper
### 9.12 Immutability {#x9-12-immutability}

[](#immutability){.self-link aria-label="Permalink for Section 9.12"}
:::

Many cybersecurity abuses hinge on exploiting gaps between reality and
the assumptions of rational, good-faith actors. Immutability of [DID
documents](#dfn-did-documents){#ref-for-dfn-did-documents-179
.internalDFN link-type="dfn"} can provide some security benefits.
Individual [DID methods](#dfn-did-methods){#ref-for-dfn-did-methods-109
.internalDFN link-type="dfn"} ought to consider constraints that would
eliminate behaviors or semantics they do not need. The more *locked
down* a [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-110
.internalDFN link-type="dfn"} is, while providing the same set of
features, the less it can be manipulated by malicious actors.

As an example, consider that a single edit to a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-180
.internalDFN link-type="dfn"} can change anything except the root
[`id`](#dfn-id){#ref-for-dfn-id-8 .internalDFN link-type="dfn"} property
of the document. But is it actually desirable for a
[service](#dfn-service){#ref-for-dfn-service-22 .internalDFN
link-type="dfn"} to change its `type` after it is defined? Or for a key
to change its value? Or would it be better to require a new
[`id`](#dfn-id){#ref-for-dfn-id-9 .internalDFN link-type="dfn"} when
certain fundamental properties of an object change? Malicious takeovers
of a website often aim for an outcome where the site keeps its host name
identifier, but is subtly changed underneath. If certain properties of
the site, such as the
[ASN](https://en.wikipedia.org/wiki/Autonomous_system_(Internet)){target="_blank"}
associated with its IP address, were required by the specification to be
immutable, anomaly detection would be easier, and attacks would be much
harder and more expensive to carry out.

For [DID methods](#dfn-did-methods){#ref-for-dfn-did-methods-111
.internalDFN link-type="dfn"} tied to a global source of truth, a
direct, just-in-time lookup of the latest version of a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-181
.internalDFN link-type="dfn"} is always possible. However, it seems
likely that layers of cache might eventually sit between a [DID
resolver](#dfn-did-resolvers){#ref-for-dfn-did-resolvers-21 .internalDFN
link-type="dfn"} and that source of truth. If they do, believing the
attributes of an object in the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-182
.internalDFN link-type="dfn"} to have a given state when they are
actually subtly different might invite exploits. This is particularly
true if some lookups are of a full [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-183
.internalDFN link-type="dfn"}, and others are of partial data where the
larger context is assumed.
::::

:::: {#encrypted-data-in-did-documents .section}
::: header-wrapper
### 9.13 Encrypted Data in DID Documents {#x9-13-encrypted-data-in-did-documents}

[](#encrypted-data-in-did-documents){.self-link
aria-label="Permalink for Section 9.13"}
:::

Encryption algorithms have been known to fail due to advances in
cryptography and computing power. Implementers are advised to assume
that any encrypted data placed in a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-184
.internalDFN link-type="dfn"} might eventually be made available in
clear text to the same audience to which the encrypted data is
available. This is particularly pertinent if the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-185
.internalDFN link-type="dfn"} is public.

Encrypting all or parts of a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-186
.internalDFN link-type="dfn"} is *not* an appropriate means to protect
data in the long term. Similarly, placing encrypted data in a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-187
.internalDFN link-type="dfn"} is not an appropriate means to protect
personal data.

Given the caveats above, if encrypted data is included in a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-188
.internalDFN link-type="dfn"}, implementers are advised to not associate
any correlatable information that could be used to infer a relationship
between the encrypted data and an associated party. Examples of
correlatable information include public keys of a receiving party,
identifiers to digital assets known to be under the control of a
receiving party, or human readable descriptions of a receiving party.
::::

:::: {#equivalence-properties .section}
::: header-wrapper
### 9.14 Equivalence Properties {#x9-14-equivalence-properties}

[](#equivalence-properties){.self-link
aria-label="Permalink for Section 9.14"}
:::

Given the
[`equivalentId`](#dfn-equivalentid){#ref-for-dfn-equivalentid-13
.internalDFN link-type="dfn"} and
[`canonicalId`](#dfn-canonicalid){#ref-for-dfn-canonicalid-11
.internalDFN link-type="dfn"} properties are generated by [DID
methods](#dfn-did-methods){#ref-for-dfn-did-methods-112 .internalDFN
link-type="dfn"} themselves, the same security and accuracy guarantees
that apply to the resolved
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-136
.internalDFN link-type="dfn"} present in the `id` field of a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-189
.internalDFN link-type="dfn"} also apply to these properties. The
[`alsoKnownAs`](#dfn-alsoknownas){#ref-for-dfn-alsoknownas-7
.internalDFN link-type="dfn"} property is not guaranteed to be an
accurate statement of equivalence, and should not be relied upon without
performing validation steps beyond the resolution of the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-190
.internalDFN link-type="dfn"}.

The [`equivalentId`](#dfn-equivalentid){#ref-for-dfn-equivalentid-14
.internalDFN link-type="dfn"} and
[`canonicalId`](#dfn-canonicalid){#ref-for-dfn-canonicalid-12
.internalDFN link-type="dfn"} properties express equivalence assertions
to variants of a single
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-137
.internalDFN link-type="dfn"} produced by the same [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-113 .internalDFN
link-type="dfn"} and can be trusted to the extent the requesting party
trusts the [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-114
.internalDFN link-type="dfn"} and a conforming producer and resolver.

The [`alsoKnownAs`](#dfn-alsoknownas){#ref-for-dfn-alsoknownas-8
.internalDFN link-type="dfn"} property permits an equivalence assertion
to [URIs](#dfn-uri){#ref-for-dfn-uri-22 .internalDFN link-type="dfn"}
that are not governed by the same [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-115 .internalDFN
link-type="dfn"} and cannot be trusted without performing verification
steps outside of the governing [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-116 .internalDFN
link-type="dfn"}. See additional guidance in [5.1.3 Also Known
As](#also-known-as){.sec-ref}.

As with any other security-related properties in the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-191
.internalDFN link-type="dfn"}, parties relying on any equivalence
statement in a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-192
.internalDFN link-type="dfn"} should guard against the values of these
properties being substituted by an attacker after the proper
verification has been performed. Any write access to a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-193
.internalDFN link-type="dfn"} stored in memory or disk after
verification has been performed is an attack vector that might
circumvent verification unless the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-194
.internalDFN link-type="dfn"} is re-verified.
::::

:::: {#content-integrity-protection .section}
::: header-wrapper
### 9.15 Content Integrity Protection {#x9-15-content-integrity-protection}

[](#content-integrity-protection){.self-link
aria-label="Permalink for Section 9.15"}
:::

[DID documents](#dfn-did-documents){#ref-for-dfn-did-documents-195
.internalDFN link-type="dfn"} which include links to external
machine-readable content such as images, web pages, or schemas are
vulnerable to tampering. It is strongly advised that external links are
integrity protected using solutions such as a hashlink
\[[HASHLINK](#bib-hashlink "Cryptographic Hyperlinks"){.bibref
link-type="biblio"}\]. External links are to be avoided if they cannot
be integrity protected and the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-196
.internalDFN link-type="dfn"}\'s integrity is dependent on the external
link.

One example of an external link where the integrity of the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-197
.internalDFN link-type="dfn"} itself could be affected is the JSON-LD
Context \[[JSON-LD11](#bib-json-ld11 "JSON-LD 1.1"){.bibref
link-type="biblio"}\]. To protect against compromise, [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-198
.internalDFN link-type="dfn"} consumers are advised to cache local
static copies of JSON-LD contexts and/or verify the integrity of
external contexts against a cryptographic hash that is known to be
associated with a safe version of the external JSON-LD Context.
::::

:::: {#persistence .section}
::: header-wrapper
### 9.16 Persistence {#x9-16-persistence}

[](#persistence){.self-link aria-label="Permalink for Section 9.16"}
:::

[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-138
.internalDFN link-type="dfn"} are designed to be persistent such that a
[controller](#dfn-controller){#ref-for-dfn-controller-16 .internalDFN
link-type="dfn"} need not rely upon a single trusted third party or
administrator to maintain their identifiers. In an ideal case, no
administrator can take control away from the
[controller](#dfn-controller){#ref-for-dfn-controller-17 .internalDFN
link-type="dfn"}, nor can an administrator prevent their identifiers\'
use for any particular purpose such as authentication, authorization,
and attestation. No third party can act on behalf of a
[controller](#dfn-controller){#ref-for-dfn-controller-18 .internalDFN
link-type="dfn"} to remove or render inoperable an entity\'s identifier
without the [controller](#dfn-controller){#ref-for-dfn-controller-19
.internalDFN link-type="dfn"}\'s consent.

However, it is important to note that in all [DID
methods](#dfn-did-methods){#ref-for-dfn-did-methods-117 .internalDFN
link-type="dfn"} that enable cryptographic proof-of-control, the means
of proving control can always be transferred to another party by
transferring the secret cryptographic material. Therefore, it is vital
that systems relying on the persistence of an identifier over time
regularly check to ensure that the identifier is, in fact, still under
the control of the intended party.

Unfortunately, it is impossible to determine from the cryptography alone
whether or not the secret cryptographic material associated with a given
[verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-99
.internalDFN link-type="dfn"} has been compromised. It might well be
that the expected
[controller](#dfn-controller){#ref-for-dfn-controller-20 .internalDFN
link-type="dfn"} still has access to the secret cryptographic material
--- and as such can execute a proof-of-control as part of a verification
process --- while at the same time, a bad actor also has access to those
same keys, or to a copy thereof.

As such, cryptographic proof-of-control is expected to only be used as
one factor in evaluating the level of identity assurance required for
high-stakes scenarios.
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-139
.internalDFN link-type="dfn"}-based authentication provides much greater
assurance than a username and password, thanks to the ability to
determine control over a cryptographic secret without transmitting that
secret between systems. However, it is not infallible. Scenarios that
involve sensitive, high value, or life-critical operations are expected
to use additional factors as appropriate.

In addition to potential ambiguity from use by different
[controllers](#dfn-controller){#ref-for-dfn-controller-21 .internalDFN
link-type="dfn"}, it is impossible to guarantee, in general, that a
given
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-140
.internalDFN link-type="dfn"} is being used in reference to the same
subject at any given point in time. It is technically possible for the
controller to reuse a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-141
.internalDFN link-type="dfn"} for different subjects and, more subtly,
for the precise definition of the subject to either change over time or
be misunderstood.

For example, consider a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-142
.internalDFN link-type="dfn"} used for a sole proprietorship, receiving
various credentials used for financial transactions. To the
[controller](#dfn-controller){#ref-for-dfn-controller-22 .internalDFN
link-type="dfn"}, that identifier referred to the business. As the
business grows, it eventually gets incorporated as a Limited Liability
Company. The [controller](#dfn-controller){#ref-for-dfn-controller-23
.internalDFN link-type="dfn"} continues using that same
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-143
.internalDFN link-type="dfn"}, because to **them** the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-144
.internalDFN link-type="dfn"} refers to the business. However, to the
state, the tax authority, and the local municipality, the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-145
.internalDFN link-type="dfn"} no longer refers to the same entity.
Whether or not the subtle shift in meaning matters to a credit provider
or supplier is necessarily up to them to decide. In many cases, as long
as the bills get paid and collections can be enforced, the shift is
immaterial.

Due to these potential ambiguities,
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-146
.internalDFN link-type="dfn"} are to be considered valid *contextually*
rather than absolutely. Their persistence does not imply that they refer
to the exact same subject, nor that they are under the control of the
same [controller](#dfn-controller){#ref-for-dfn-controller-24
.internalDFN link-type="dfn"}. Instead, one needs to understand the
context in which the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-147
.internalDFN link-type="dfn"} was created, how it is used, and consider
the likely shifts in their meaning, and adopt procedures and policies to
address both potential and inevitable semantic drift.
::::

:::: {#level-of-assurance .section}
::: header-wrapper
### 9.17 Level of Assurance {#x9-17-level-of-assurance}

[](#level-of-assurance){.self-link
aria-label="Permalink for Section 9.17"}
:::

Additional information about the security context of authentication
events is often required for compliance reasons, especially in regulated
areas such as the financial and public sectors. This information is
often referred to as a Level of Assurance (LOA). Examples include the
protection of secret cryptographic material, the identity proofing
process, and the form-factor of the authenticator.

[Payment services (PSD
2)](https://ec.europa.eu/info/law/payment-services-psd-2-directive-eu-2015-2366_en){target="_blank"}
and
[eIDAS](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=uriserv:OJ.L_.2014.257.01.0073.01.ENG){target="_blank"}
introduce such requirements to the security context. Level of assurance
frameworks are classified and defined by regulations and standards such
as
[eIDAS](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=uriserv:OJ.L_.2014.257.01.0073.01.ENG){target="_blank"},
[NIST
800-63-3](https://pages.nist.gov/800-63-3/sp800-63-3.html){target="_blank"}
and [ISO/IEC
29115:2013](https://www.iso.org/standard/45138.html){target="_blank"},
including their requirements for the security context, and making
recommendations on how to achieve them. This might include strong user
authentication where
[FIDO2](https://fidoalliance.org/fido2/){target="_blank"}/[WebAuthn](https://www.w3.org/TR/webauthn-2/){target="_blank"}
can fulfill the requirement.

Some regulated scenarios require the implementation of a specific level
of assurance. Since [verification
relationships](#dfn-verification-relationship){#ref-for-dfn-verification-relationship-24
.internalDFN link-type="dfn"} such as
` `[`assertionMethod`](#dfn-assertionmethod){#ref-for-dfn-assertionmethod-3
.internalDFN link-type="dfn"} and
[`authentication`](#dfn-authentication){#ref-for-dfn-authentication-7
.internalDFN link-type="dfn"} might be used in some of these situations,
information about the applied security context might need to be
expressed and provided to a *verifier*. Whether and how to encode this
information in the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-199
.internalDFN link-type="dfn"} data model is out of scope for this
specification. Interested readers might note that 1) the information
could be transmitted using Verifiable Credentials
\[[VC-DATA-MODEL](#bib-vc-data-model "Verifiable Credentials Data Model v1.1"){.bibref
link-type="biblio"}\], and 2) the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-200
.internalDFN link-type="dfn"} data model can be extended to incorporate
this information as described in [4.1
Extensibility](#extensibility){.sec-ref}, and where [10. Privacy
Considerations](#privacy-considerations){.sec-ref} is applicable for
such extensions.
::::
::::::::::::::::::::::::::::::::::::::::::::::::

:::::::::::::::::::: {#privacy-considerations .section .informative}
::: header-wrapper
## 10. Privacy Considerations {#x10-privacy-considerations}

[](#privacy-considerations){.self-link
aria-label="Permalink for Section 10."}
:::

*This section is non-normative.*

Since
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-148
.internalDFN link-type="dfn"} and [DID
documents](#dfn-did-documents){#ref-for-dfn-did-documents-201
.internalDFN link-type="dfn"} are designed to be administered directly
by the [DID
controller(s)](#dfn-did-controllers){#ref-for-dfn-did-controllers-30
.internalDFN link-type="dfn"}, it is critically important to apply the
principles of Privacy by Design
\[[PRIVACY-BY-DESIGN](#bib-privacy-by-design "Privacy by Design"){.bibref
link-type="biblio"}\] to all aspects of the [decentralized
identifier](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-149
.internalDFN link-type="dfn"} architecture. All seven of these
principles have been applied throughout the development of this
specification. The design used in this specification does not assume
that there is a registrar, hosting company, nor other intermediate
service provider to recommend or apply additional privacy safeguards.
Privacy in this specification is preventive, not remedial, and is an
embedded default. The following sections cover privacy considerations
that implementers might find useful when building systems that utilize
[decentralized
identifiers](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-150
.internalDFN link-type="dfn"}.

:::: {#keep-personal-data-private .section}
::: header-wrapper
### 10.1 Keep Personal Data Private {#x10-1-keep-personal-data-private}

[](#keep-personal-data-private){.self-link
aria-label="Permalink for Section 10.1"}
:::

If a [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-118
.internalDFN link-type="dfn"} specification is written for a
public-facing [verifiable data
registry](#dfn-verifiable-data-registry){#ref-for-dfn-verifiable-data-registry-11
.internalDFN link-type="dfn"} where corresponding
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-151
.internalDFN link-type="dfn"} and [DID
documents](#dfn-did-documents){#ref-for-dfn-did-documents-202
.internalDFN link-type="dfn"} might be made publicly available, it is
*critical* that those [DID
documents](#dfn-did-documents){#ref-for-dfn-did-documents-203
.internalDFN link-type="dfn"} contain no personal data. Personal data
can instead be transmitted through other means such as 1) Verifiable
Credentials
\[[VC-DATA-MODEL](#bib-vc-data-model "Verifiable Credentials Data Model v1.1"){.bibref
link-type="biblio"}\], or 2) [service
endpoints](#dfn-service-endpoints){#ref-for-dfn-service-endpoints-7
.internalDFN link-type="dfn"} under control of the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-53 .internalDFN
link-type="dfn"} or [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-31
.internalDFN link-type="dfn"}.

Due diligence is expected to be taken around the use of URLs in [service
endpoints](#dfn-service-endpoints){#ref-for-dfn-service-endpoints-8
.internalDFN link-type="dfn"} to prevent leakage of personal data or
correlation within a URL of a [service
endpoint](#dfn-service-endpoints){#ref-for-dfn-service-endpoints-9
.internalDFN link-type="dfn"}. For example, a URL that contains a
username is dangerous to include in a [DID
Document](#dfn-did-documents){#ref-for-dfn-did-documents-204
.internalDFN link-type="dfn"} because the username is likely to be
human-meaningful in a way that can reveal information that the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-54 .internalDFN
link-type="dfn"} did not consent to sharing. With the privacy
architecture suggested by this specification, personal data can be
exchanged on a private, peer-to-peer basis using communication channels
identified and secured by [verification
methods](#dfn-verification-method){#ref-for-dfn-verification-method-100
.internalDFN link-type="dfn"} in [DID
documents](#dfn-did-documents){#ref-for-dfn-did-documents-205
.internalDFN link-type="dfn"}. This also enables [DID
subjects](#dfn-did-subjects){#ref-for-dfn-did-subjects-55 .internalDFN
link-type="dfn"} and requesting parties to implement the
[GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation)
[right to be
forgotten](https://en.wikipedia.org/wiki/Right_to_be_forgotten), because
no personal data is written to an immutable [distributed
ledger](#dfn-distributed-ledger-technology){#ref-for-dfn-distributed-ledger-technology-5
.internalDFN link-type="dfn"}.
::::

:::: {#did-correlation-risks .section}
::: header-wrapper
### 10.2 DID Correlation Risks {#x10-2-did-correlation-risks}

[](#did-correlation-risks){.self-link
aria-label="Permalink for Section 10.2"}
:::

Like any type of globally unambiguous identifier,
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-152
.internalDFN link-type="dfn"} might be used for correlation. [DID
controllers](#dfn-did-controllers){#ref-for-dfn-did-controllers-32
.internalDFN link-type="dfn"} can mitigate this privacy risk by using
pairwise
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-153
.internalDFN link-type="dfn"} that are unique to each relationship; in
effect, each
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-154
.internalDFN link-type="dfn"} acts as a pseudonym. A pairwise
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-155
.internalDFN link-type="dfn"} need only be shared with more than one
party when correlation is explicitly desired. If pairwise
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-156
.internalDFN link-type="dfn"} are the default, then the only need to
publish a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-157
.internalDFN link-type="dfn"} openly, or to share it with multiple
parties, is when the [DID
controller(s)](#dfn-did-controllers){#ref-for-dfn-did-controllers-33}
and/or [DID subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-56
.internalDFN link-type="dfn"} explicitly desires public identification
and correlation.
::::

:::: {#did-document-correlation-risks .section}
::: header-wrapper
### 10.3 DID Document Correlation Risks {#x10-3-did-document-correlation-risks}

[](#did-document-correlation-risks){.self-link
aria-label="Permalink for Section 10.3"}
:::

The anti-correlation protections of pairwise
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-158
.internalDFN link-type="dfn"} are easily defeated if the data in the
corresponding [DID
documents](#dfn-did-documents){#ref-for-dfn-did-documents-206
.internalDFN link-type="dfn"} can be correlated. For example, using
identical [verification
methods](#dfn-verification-method){#ref-for-dfn-verification-method-101
.internalDFN link-type="dfn"} or bespoke [service
endpoints](#dfn-service-endpoints){#ref-for-dfn-service-endpoints-10
.internalDFN link-type="dfn"} in multiple [DID
documents](#dfn-did-documents){#ref-for-dfn-did-documents-207
.internalDFN link-type="dfn"} can provide as much correlation
information as using the same
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-159
.internalDFN link-type="dfn"}. Therefore, the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-208
.internalDFN link-type="dfn"} for a pairwise
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-160
.internalDFN link-type="dfn"} also needs to use pairwise unique
information, such as ensuring that [verification
methods](#dfn-verification-method){#ref-for-dfn-verification-method-102
.internalDFN link-type="dfn"} are unique to the pairwise relationship.

It might seem natural to also use pairwise unique [service
endpoints](#dfn-service-endpoints){#ref-for-dfn-service-endpoints-11
.internalDFN link-type="dfn"} in the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-209
.internalDFN link-type="dfn"} for a pairwise
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-161
.internalDFN link-type="dfn"}. However, unique endpoints allow all
traffic between two
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-162
.internalDFN link-type="dfn"} to be isolated perfectly into unique
buckets, where timing correlation and similar analysis is easy.
Therefore, a better strategy for endpoint privacy might be to share an
endpoint among a large number of
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-163
.internalDFN link-type="dfn"} controlled by many different subjects (see
[10.5 Herd Privacy](#herd-privacy){.sec-ref}).
::::

:::: {#did-subject-classification .section}
::: header-wrapper
### 10.4 DID Subject Classification {#x10-4-did-subject-classification}

[](#did-subject-classification){.self-link
aria-label="Permalink for Section 10.4"}
:::

It is dangerous to add properties to the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-210
.internalDFN link-type="dfn"} that can be used to indicate, explicitly
or through inference, what *type* or nature of thing the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-57 .internalDFN
link-type="dfn"} is, particularly if the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-58 .internalDFN
link-type="dfn"} is a person.

Not only do such properties potentially result in personal data (see
[10.1 Keep Personal Data
Private](#keep-personal-data-private){.sec-ref}) or correlatable data
(see [10.2 DID Correlation Risks](#did-correlation-risks){.sec-ref} and
[10.3 DID Document Correlation
Risks](#did-document-correlation-risks){.sec-ref}) being present in the
[DID document](#dfn-did-documents){#ref-for-dfn-did-documents-211
.internalDFN link-type="dfn"}, but they can be used for grouping
particular
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-164
.internalDFN link-type="dfn"} in such a way that they are included in or
excluded from certain operations or functionalities.

Including *type* information in a [DID
Document](#dfn-did-documents){#ref-for-dfn-did-documents-212
.internalDFN link-type="dfn"} can result in personal privacy harms even
for [DID Subjects](#dfn-did-subjects){#ref-for-dfn-did-subjects-59
.internalDFN link-type="dfn"} that are non-person entities, such as IoT
devices. The aggregation of such information around a [DID
Controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-34
.internalDFN link-type="dfn"} could serve as a form of digital
fingerprint and this is best avoided.

To minimize these risks, all properties in a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-213
.internalDFN link-type="dfn"} ought to be for expressing cryptographic
material, endpoints, or [verification
methods](#dfn-verification-method){#ref-for-dfn-verification-method-103
.internalDFN link-type="dfn"} related to using the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-165
.internalDFN link-type="dfn"}.
::::

:::: {#herd-privacy .section}
::: header-wrapper
### 10.5 Herd Privacy {#x10-5-herd-privacy}

[](#herd-privacy){.self-link aria-label="Permalink for Section 10.5"}
:::

When a [DID subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-60
.internalDFN link-type="dfn"} is indistinguishable from others in the
herd, privacy is available. When the act of engaging privately with
another party is by itself a recognizable flag, privacy is greatly
diminished.

[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-166
.internalDFN link-type="dfn"} and [DID
methods](#dfn-did-methods){#ref-for-dfn-did-methods-119 .internalDFN
link-type="dfn"} need to work to improve herd privacy, particularly for
those who legitimately need it most. Choose technologies and human
interfaces that default to preserving anonymity and pseudonymity. To
reduce [digital
fingerprints](https://en.wikipedia.org/wiki/Device_fingerprint), share
common settings across requesting party implementations, keep negotiated
options to a minimum on wire protocols, use encrypted transport layers,
and pad messages to standard lengths.
::::

:::::::: {#service-privacy .section}
::: header-wrapper
### 10.6 Service Privacy {#x10-6-service-privacy}

[](#service-privacy){.self-link aria-label="Permalink for Section 10.6"}
:::

The ability for a
[controller](#dfn-controller){#ref-for-dfn-controller-25 .internalDFN
link-type="dfn"} to optionally express at least one [service
endpoint](#dfn-service-endpoints){#ref-for-dfn-service-endpoints-12
.internalDFN link-type="dfn"} in the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-214
.internalDFN link-type="dfn"} increases their control and agency. Each
additional endpoint in the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-215
.internalDFN link-type="dfn"} adds privacy risk either due to
correlation, such as across endpoint descriptions, or because the
[services](#dfn-service){#ref-for-dfn-service-23 .internalDFN
link-type="dfn"} are not protected by an authorization mechanism, or
both.

[DID documents](#dfn-did-documents){#ref-for-dfn-did-documents-216
.internalDFN link-type="dfn"} are often public and, since they are
standardized, will be stored and indexed efficiently by their very
standards-based nature. This risk is worse if [DID
documents](#dfn-did-documents){#ref-for-dfn-did-documents-217
.internalDFN link-type="dfn"} are published to immutable [verifiable
data
registries](#dfn-verifiable-data-registry){#ref-for-dfn-verifiable-data-registry-12
.internalDFN link-type="dfn"}. Access to a history of the [DID
documents](#dfn-did-documents){#ref-for-dfn-did-documents-218
.internalDFN link-type="dfn"} referenced by a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-167
.internalDFN link-type="dfn"} represents a form of traffic analysis made
more efficient through the use of standards.

The degree of additional privacy risk caused by using multiple [service
endpoints](#dfn-service-endpoints){#ref-for-dfn-service-endpoints-13
.internalDFN link-type="dfn"} in one [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-219
.internalDFN link-type="dfn"} can be difficult to estimate. Privacy
harms are typically unintended consequences.
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-168
.internalDFN link-type="dfn"} can refer to documents,
[services](#dfn-service){#ref-for-dfn-service-24 .internalDFN
link-type="dfn"}, schemas, and other things that might be associated
with individual people, households, clubs, and employers --- and
correlation of their [service
endpoints](#dfn-service-endpoints){#ref-for-dfn-service-endpoints-14
.internalDFN link-type="dfn"} could become a powerful surveillance and
inference tool. An example of this potential harm can be seen when
multiple common country-level top level domains such as
`https://example.co.uk` might be used to infer the approximate location
of the [DID subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-61
.internalDFN link-type="dfn"} with a greater degree of probability.

:::: {.section .notoc}
::: header-wrapper
#### Maintaining Herd Privacy

[](#maintaining-herd-privacy){.self-link
aria-label="Permalink for this Section"}
:::

The variety of possible endpoints makes it particularly challenging to
maintain herd privacy, in which no information about the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-62 .internalDFN
link-type="dfn"} is leaked (see [10.5 Herd
Privacy](#herd-privacy){.sec-ref}).

First, because service endpoints might be specified as
[URIs](#dfn-uri){#ref-for-dfn-uri-23 .internalDFN link-type="dfn"}, they
could unintentionally leak personal information because of the
architecture of the service. For example, a service endpoint of
`http://example.com/MyFirstName` is leaking the term `MyFirstName` to
everyone who can access the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-220
.internalDFN link-type="dfn"}. When linking to legacy systems, this is
an unavoidable risk, and care is expected to be taken in such cases.
This specification encourages new,
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-169
.internalDFN link-type="dfn"}-aware endpoints to use nothing more than
the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-170
.internalDFN link-type="dfn"} itself for any identification necessary.
For example, if a service description were to include
`http://example.com/did%3Aexample%3Aabc123`, no harm would be done
because `did:example:abc123` is already exposed in the DID Document; it
leaks no additional information.

Second, because a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-221
.internalDFN link-type="dfn"} can list multiple service endpoints, it is
possible to irreversibly associate services that are not associated in
any other context. This correlation on its own may lead to privacy harms
by revealing information about the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-63 .internalDFN
link-type="dfn"}, even if the [URIs](#dfn-uri){#ref-for-dfn-uri-24
.internalDFN link-type="dfn"} used did not contain any sensitive
information.

Third, because some types of [DID
subjects](#dfn-did-subjects){#ref-for-dfn-did-subjects-64 .internalDFN
link-type="dfn"} might be more or less likely to list specific
endpoints, the listing of a given service could, by itself, leak
information that can be used to infer something about the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-65 .internalDFN
link-type="dfn"}. For example, a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-171
.internalDFN link-type="dfn"} for an automobile might include a pointer
to a public title record at the Department of Motor Vehicles, while a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-172
.internalDFN link-type="dfn"} for an individual would not include that
information.

It is the goal of herd privacy to ensure that the nature of specific
[DID subjects](#dfn-did-subjects){#ref-for-dfn-did-subjects-66
.internalDFN link-type="dfn"} is obscured by the population of the
whole. To maximize herd privacy, implementers need to rely on one ---
and only one --- service endpoint, with that endpoint providing a proxy
or mediator service that the controller is willing to depend on, to
protect such associations and to blind requests to the ultimate service.
::::

:::: {.section .notoc}
::: header-wrapper
#### Service Endpoint Alternatives

[](#service-endpoint-alternatives){.self-link
aria-label="Permalink for this Section"}
:::

Given the concerns in the previous section, implementers are urged to
consider any of the following service endpoint approaches:

-   **Negotiator Endpoint** --- Service for negotiating mutually
    agreeable communications channels, preferably using private set
    intersection. The output of negotiation is a communication channel
    and whatever credentials might be needed to access it.
-   **Tor Endpoint** ([Tor Onion
    Router](https://www.torproject.org/about/history/)) --- Provide a
    privacy-respecting address for reaching service endpoints. Any
    service that can be provided online can be provided through TOR for
    additional privacy.
-   **Mediator Endpoint** ---
    [Mediators](https://github.com/hyperledger/aries-rfcs/blob/720bdab50e2d0437fda03028c1b17c69781bdd69/concepts/0046-mediators-and-relays/README.md)
    provide a generic endpoint, for multiple parties, receive encrypted
    messages on behalf of those parties, and forward them to the
    intended recipient. This avoids the need to have a specific endpoint
    per subject, which could create a correlation risk. This approach is
    also called a proxy.
-   **Confidential Storage** --- Proprietary or confidential personal
    information might need to be kept off of a [verifiable data
    registry](#dfn-verifiable-data-registry){#ref-for-dfn-verifiable-data-registry-13
    .internalDFN link-type="dfn"} to provide additional privacy and/or
    security guarantees, especially for those [DID
    methods](#dfn-did-methods){#ref-for-dfn-did-methods-120 .internalDFN
    link-type="dfn"} where [DID
    documents](#dfn-did-documents){#ref-for-dfn-did-documents-222
    .internalDFN link-type="dfn"} are published on a public ledger.
    Pointing to external resource services provides a means for
    authorization checks and deletion.
-   **Polymorphic Proxy** --- A proxy endpoint that can act as any
    number of services, depending on how it is called. For example, the
    same URL could be used for both negotiator and mediator functions,
    depending on a mechanism for re-routing.

These service endpoint types continue to be an area of innovation and
exploration.
::::
::::::::
::::::::::::::::::::

:::::::::::::::::::::::::::::::::: {#examples .section .appendix}
::: header-wrapper
## A. Examples {#a-examples}

[](#examples){.self-link aria-label="Permalink for Appendix A."}
:::

:::::::::::: {#did-documents .section .informative}
::: header-wrapper
### A.1 DID Documents {#a-1-did-documents}

[](#did-documents){.self-link aria-label="Permalink for Appendix A.1"}
:::

*This section is non-normative.*

See [Verification Method
Types](https://www.w3.org/TR/did-spec-registries/#verification-method-types)
\[[DID-SPEC-REGISTRIES](#bib-did-spec-registries "DID Specification Registries"){.bibref
link-type="biblio"}\] for optional extensions and other verification
method types.

:::: {#issue-container-generatedID-15 .note role="note"}
::: {#h-note-15 .note-title .marker role="heading" aria-level="4"}
Note
:::

These examples are for information purposes only, it is considered a
best practice to avoid using the same [verification
method](#dfn-verification-method){#ref-for-dfn-verification-method-104
.internalDFN link-type="dfn"} for multiple purposes.
::::

:::: {#example-did-document-with-1-verification-method-type .example}
::: marker
[Example
30](#example-did-document-with-1-verification-method-type){.self-link}[:
DID Document with 1 verification method type]{.example-title}
:::

``` {aria-busy="false"}
  {
    "@context": [
      "https://www.w3.org/ns/did/v1",
      "https://w3id.org/security/suites/ed25519-2020/v1"
    ],
    "id": "did:example:123",
    "authentication": [
      {
        "id": "did:example:123#z6MkecaLyHuYWkayBDLw5ihndj3T1m6zKTGqau3A51G7RBf3",
        "type": "Ed25519VerificationKey2020", // external (property value)
        "controller": "did:example:123",
        "publicKeyMultibase": "zAKJP3f7BD6W4iWEQ9jwndVTCBq8ua2Utt8EEjJ6Vxsf"
      }
    ],
    "capabilityInvocation": [
      {
        "id": "did:example:123#z6MkhdmzFu659ZJ4XKj31vtEDmjvsi5yDZG5L7Caz63oP39k",
        "type": "Ed25519VerificationKey2020", // external (property value)
        "controller": "did:example:123",
        "publicKeyMultibase": "z4BWwfeqdp1obQptLLMvPNgBw48p7og1ie6Hf9p5nTpNN"
      }
    ],
    "capabilityDelegation": [
      {
        "id": "did:example:123#z6Mkw94ByR26zMSkNdCUi6FNRsWnc2DFEeDXyBGJ5KTzSWyi",
        "type": "Ed25519VerificationKey2020", // external (property value)
        "controller": "did:example:123",
        "publicKeyMultibase": "zHgo9PAmfeoxHG8Mn2XHXamxnnSwPpkyBHAMNF3VyXJCL"
      }
    ],
    "assertionMethod": [
      {
        "id": "did:example:123#z6MkiukuAuQAE8ozxvmahnQGzApvtW7KT5XXKfojjwbdEomY",
        "type": "Ed25519VerificationKey2020", // external (property value)
        "controller": "did:example:123",
        "publicKeyMultibase": "z5TVraf9itbKXrRvt2DSS95Gw4vqU3CHAdetoufdcKazA"
      }
    ]
}
```
::::

:::: {#example-did-document-with-many-different-key-types .example}
::: marker
[Example
31](#example-did-document-with-many-different-key-types){.self-link}[:
DID Document with many different key types]{.example-title}
:::

``` {aria-busy="false"}
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/suites/jws-2020/v1"
  ],
  "verificationMethod": [
    {
      "id": "did:example:123#key-0",
      "type": "JsonWebKey2020",
      "controller": "did:example:123",
      "publicKeyJwk": {
        "kty": "OKP", // external (property name)
        "crv": "Ed25519", // external (property name)
        "x": "VCpo2LMLhn6iWku8MKvSLg2ZAoC-nlOyPVQaO3FxVeQ" // external (property name)
      }
    },
    {
      "id": "did:example:123#key-1",
      "type": "JsonWebKey2020",
      "controller": "did:example:123",
      "publicKeyJwk": {
        "kty": "OKP", // external (property name)
        "crv": "X25519", // external (property name)
        "x": "pE_mG098rdQjY3MKK2D5SUQ6ZOEW3a6Z6T7Z4SgnzCE" // external (property name)
      }
    },
    {
      "id": "did:example:123#key-2",
      "type": "JsonWebKey2020",
      "controller": "did:example:123",
      "publicKeyJwk": {
        "kty": "EC", // external (property name)
        "crv": "secp256k1", // external (property name)
        "x": "Z4Y3NNOxv0J6tCgqOBFnHnaZhJF6LdulT7z8A-2D5_8", // external (property name)
        "y": "i5a2NtJoUKXkLm6q8nOEu9WOkso1Ag6FTUT6k_LMnGk" // external (property name)
      }
    },
    {
      "id": "did:example:123#key-3",
      "type": "JsonWebKey2020",
      "controller": "did:example:123",
      "publicKeyJwk": {
        "kty": "EC", // external (property name)
        "crv": "secp256k1", // external (property name)
        "x": "U1V4TVZVMUpUa0ZVU1NBcU9CRm5IbmFaaEpGNkxkdWx", // external (property name)
        "y": "i5a2NtJoUKXkLm6q8nOEu9WOkso1Ag6FTUT6k_LMnGk" // external (property name)
      }
    },
    {
      "id": "did:example:123#key-4",
      "type": "JsonWebKey2020",
      "controller": "did:example:123",
      "publicKeyJwk": {
        "kty": "EC", // external (property name)
        "crv": "P-256", // external (property name)
        "x": "Ums5WVgwRkRTVVFnU3k5c2xvZllMbEcwM3NPRW91ZzN", // external (property name)
        "y": "nDQW6XZ7b_u2Sy9slofYLlG03sOEoug3I0aAPQ0exs4" // external (property name)
      }
    },
    {
      "id": "did:example:123#key-5",
      "type": "JsonWebKey2020",
      "controller": "did:example:123",
      "publicKeyJwk": {
        "kty": "EC", // external (property name)
        "crv": "P-384", // external (property name)
        "x": "VUZKSlUwMGdpSXplekRwODhzX2N4U1BYdHVYWUZsaXVDR25kZ1U0UXA4bDkxeHpE", // external (property name)
        "y": "jq4QoAHKiIzezDp88s_cxSPXtuXYFliuCGndgU4Qp8l91xzD1spCmFIzQgVjqvcP" // external (property name)
      }
    },
    {
      "id": "did:example:123#key-6",
      "type": "JsonWebKey2020",
      "controller": "did:example:123",
      "publicKeyJwk": {
        "kty": "EC", // external (property name)
        "crv": "P-521", // external (property name)
        "x": "VTI5c1lYSmZWMmx1WkhNZ0dQTXhaYkhtSnBEU3UtSXZwdUtpZ0VOMnB6Z1d0U28tLVJ3ZC1uNzhuclduWnplRGMx", // external (property name)
        "y": "UW5WNVgwSnBkR052YVc0Z1VqY1B6LVpoZWNaRnliT3FMSUpqVk9sTEVUSDd1UGx5RzBnRW9NV25JWlhoUVZ5cFB5" // external (property name)
      }
    },
    {
      "id": "did:example:123#key-7",
      "type": "JsonWebKey2020",
      "controller": "did:example:123",
      "publicKeyJwk": {
        "kty": "RSA", // external (property name)
        "e": "AQAB", // external (property name)
        "n": "UkhWaGJGOUZRMTlFVWtKSElBdENGV2hlU1F2djFNRXh1NVJMQ01UNGpWazlraEpLdjhKZU1YV2UzYldIYXRqUHNrZGYyZGxhR2tXNVFqdE9uVUtMNzQybXZyNHRDbGRLUzNVTElhVDFoSkluTUhIeGoyZ2N1Yk82ZUVlZ0FDUTRRU3U5TE8wSC1MTV9MM0RzUkFCQjdRamE4SGVjcHl1c3BXMVR1X0RicXhjU253ZW5kYW13TDUyVjE3ZUtobE80dVh3djJIRmx4dWZGSE0wS21DSnVqSUt5QXhqRF9tM3FfX0lpSFVWSEQxdERJRXZMUGhHOUF6c24zajk1ZC1zYU" // external (property name)
      }
    }
  ]
}
```
::::

:::: {#example-did-document-with-different-verification-method-types .example}
::: marker
[Example
32](#example-did-document-with-different-verification-method-types){.self-link}[:
DID Document with different verification method types]{.example-title}
:::

``` {aria-busy="false"}
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/suites/ed25519-2018/v1",
    "https://w3id.org/security/suites/x25519-2019/v1",
    "https://w3id.org/security/suites/secp256k1-2019/v1",
    "https://w3id.org/security/suites/jws-2020/v1"
  ],
  "verificationMethod": [
    {
      "id": "did:example:123#key-0",
      "type": "Ed25519VerificationKey2018",
      "controller": "did:example:123",
      "publicKeyBase58": "3M5RCDjPTWPkKSN3sxUmmMqHbmRPegYP1tjcKyrDbt9J" // external (property name)
    },
    {
      "id": "did:example:123#key-1",
      "type": "X25519KeyAgreementKey2019",
      "controller": "did:example:123",
      "publicKeyBase58": "FbQWLPRhTH95MCkQUeFYdiSoQt8zMwetqfWoxqPgaq7x" // external (property name)
    },
    {
      "id": "did:example:123#key-2",
      "type": "EcdsaSecp256k1VerificationKey2019",
      "controller": "did:example:123",
      "publicKeyBase58": "ns2aFDq25fEV1NUd3wZ65sgj5QjFW8JCAHdUJfLwfodt" // external (property name)
    },
    {
      "id": "did:example:123#key-3",
      "type": "JsonWebKey2020",
      "controller": "did:example:123",
      "publicKeyJwk": {
        "kty": "EC", // external (property name)
        "crv": "P-256", // external (property name)
        "x": "Er6KSSnAjI70ObRWhlaMgqyIOQYrDJTE94ej5hybQ2M", // external (property name)
        "y": "pPVzCOTJwgikPjuUE6UebfZySqEJ0ZtsWFpj7YSPGEk" // external (property name)
      }
    }
  ]
}
```
::::
::::::::::::

:::::::::::::::: {#proving .section .informative}
::: header-wrapper
### A.2 Proving {#a-2-proving}

[](#proving){.self-link aria-label="Permalink for Appendix A.2"}
:::

*This section is non-normative.*

:::: {#issue-container-generatedID-16 .note role="note"}
::: {#h-note-16 .note-title .marker role="heading" aria-level="4"}
Note
:::

These examples are for information purposes only. See [W3C Verifiable
Credentials Data Model](https://www.w3.org/TR/vc-data-model/) for
additional examples.
::::

:::: {#example-verifiable-credential-linked-to-a-verification-method-of-type-ed25519verificationkey2020 .example}
::: marker
[Example
33](#example-verifiable-credential-linked-to-a-verification-method-of-type-ed25519verificationkey2020){.self-link}[:
Verifiable Credential linked to a verification method of type
Ed25519VerificationKey2020]{.example-title}
:::

``` {aria-busy="false"}
{  // external (all terms in this example)
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/citizenship/v1"
  ],
  "type": [
    "VerifiableCredential",
    "PermanentResidentCard"
  ],
  "credentialSubject": {
    "id": "did:example:123",
    "type": [
      "PermanentResident",
      "Person"
    ],
    "givenName": "JOHN",
    "familyName": "SMITH",
    "gender": "Male",
    "image": "data:image/png;base64,iVBORw0KGgo...kJggg==",
    "residentSince": "2015-01-01",
    "lprCategory": "C09",
    "lprNumber": "000-000-204",
    "commuterClassification": "C1",
    "birthCountry": "Bahamas",
    "birthDate": "1958-08-17"
  },
  "issuer": "did:example:456",
  "issuanceDate": "2020-04-22T10:37:22Z",
  "identifier": "83627465",
  "name": "Permanent Resident Card",
  "description": "Government of Example Permanent Resident Card.",
  "proof": {
    "type": "Ed25519Signature2018",
    "created": "2020-04-22T10:37:22Z",
    "proofPurpose": "assertionMethod",
    "verificationMethod": "did:example:456#key-1",
    "jws": "eyJjcml0IjpbImI2NCJdLCJiNjQiOmZhbHNlLCJhbGciOiJFZERTQSJ9..BhWew0x-txcroGjgdtK-yBCqoetg9DD9SgV4245TmXJi-PmqFzux6Cwaph0r-mbqzlE17yLebjfqbRT275U1AA"
  }
}
```
::::

:::: {#example-verifiable-credential-linked-to-a-verification-method-of-type-jsonwebkey2020 .example}
::: marker
[Example
34](#example-verifiable-credential-linked-to-a-verification-method-of-type-jsonwebkey2020){.self-link}[:
Verifiable Credential linked to a verification method of type
JsonWebKey2020]{.example-title}
:::

``` {aria-busy="false"}
{  // external (all terms in this example)
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://www.w3.org/2018/credentials/examples/v1"
  ],
  "id": "http://example.gov/credentials/3732",
  "type": ["VerifiableCredential", "UniversityDegreeCredential"],
  "issuer": { "id": "did:example:123" },
  "issuanceDate": "2020-03-10T04:24:12.164Z",
  "credentialSubject": {
    "id": "did:example:456",
    "degree": {
      "type": "BachelorDegree",
      "name": "Bachelor of Science and Arts"
    }
  },
  "proof": {
    "type": "JsonWebSignature2020",
    "created": "2020-02-15T17:13:18Z",
    "verificationMethod": "did:example:123#_Qq0UL2Fq651Q0Fjd6TvnYE-faHiOpRlPVQcY_-tA4A",
    "proofPurpose": "assertionMethod",
    "jws": "eyJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdLCJhbGciOiJFZERTQSJ9..Y0KqovWCPAeeFhkJxfQ22pbVl43Z7UI-X-1JX32CA9MkFHkmNprcNj9Da4Q4QOl0cY3obF8cdDRdnKr0IwNrAw"
  }
}
```
::::

:::: {#example-verifiable-credential-linked-to-a-bls12381-verification-method .example}
::: marker
[Example
35](#example-verifiable-credential-linked-to-a-bls12381-verification-method){.self-link}[:
Verifiable Credential linked to a bls12381 verification
method]{.example-title}
:::

``` {aria-busy="false"}
{  // external (all terms in this example)
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/security/bbs/v1",
    {
      "name": "https://schema.org/name",
      "birthDate": "https://schema.org/birthDate"
    }
  ],
  "id": "urn:uuid:c499e122-3ba9-4e95-8d4d-c0ebfcf8c51a",
  "type": ["VerifiableCredential"],
  "issuanceDate": "2021-02-07T16:02:08.571Z",
  "issuer": {
    "id": "did:example:123"
  },
  "credentialSubject": {
    "id": "did:example:456",
    "name": "John Smith",
    "birthDate": "2021-02-07"
  },
  "proof": {
    "type": "BbsBlsSignature2020",
    "created": "2021-02-07T16:02:10Z",
    "proofPurpose": "assertionMethod",
    "proofValue": "o7zD2eNTp657YzkJLub+IO4Zqy/R3Lv/AWmtSA/kUlEAOa73BNyP1vOeoow35jkABolx4kYMKkp/ZsFDweuKwe/p9vxv9wrMJ9GpiOZjHcpjelDRRJLBiccg9Yv7608mHgH0N1Qrj14PZ2saUlfhpQ==",
    "verificationMethod": "did:example:123#bls12381-g2-key"
  }
}
```
::::

:::: {#example-verifiable-credential-selective-disclosure-zero-knowledge-proof-linked-to-a-bls12381-verification-method .example}
::: marker
[Example
36](#example-verifiable-credential-selective-disclosure-zero-knowledge-proof-linked-to-a-bls12381-verification-method){.self-link}[:
Verifiable Credential selective disclosure zero knowledge proof linked
to a bls12381 verification method]{.example-title}
:::

``` {aria-busy="false"}
{  // external (all terms in this example)
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/security/bbs/v1",
    {
      "name": "https://schema.org/name",
      "birthDate": "https://schema.org/birthDate"
    }
  ],
  "id": "urn:uuid:c499e122-3ba9-4e95-8d4d-c0ebfcf8c51a",
  "type": "VerifiableCredential",
  "issuanceDate": "2021-02-07T16:02:08.571Z",
  "issuer": {
    "id": "did:example:123"
  },
  "credentialSubject": {
    "id": "did:example:456",
    "birthDate": "2021-02-07"
  },
  "proof": {
    "type": "BbsBlsSignatureProof2020",
    "created": "2021-02-07T16:02:10Z",
    "nonce": "OqZHsV/aunS34BhLaSoxiHWK+SUaG4iozM3V+1jO06zRRNcDWID+I0uwtPJJ767Yo8Q=",
    "proofPurpose": "assertionMethod",
    "proofValue": "AAsH34lcKsqaqPaLQWcnLMe3mDM+K7fZM0t4Iesfj7BhD//HBtuWCmZE946BqW7OHYU106MP8mLntutqB8FyGwS7AOyK+5/7iW6JwLNVCvh4Nt3IaF3AN47fqVs2VikD9DiCsaFAUU6ISj5pbad8O+6jiT9Yw6ug8t8vJn3XHvMUhCPnDZJeBEdKD1qo4Z0LOq3L8QAAAHSEgtC9BoZL2MLjz4QuPxpwbhTTRC08MIUjdJnP4JUtz6163Lsl3rpadGu2d3Te7loAAAACZBD4YWOgV0xpPoYZ5vywNA5/NTeDHDbX36gvoV5RDJtY1SLU2LN/IDPZGrfhEiASbD1/QXqj8dod6FbjBs9m/LchBcy7z4yDBv/8DnBzDJ9dEaM4bDjpwmqtgJqha2kwtlyNog67xG9tNjnp5rrbIgAAAANMVanwWmlkg5I/f1M2QJ5GRvQiBL4lyL5sttxwIOalbTZP8VqWtFJI54xMNjTiK71aFWWN8SlNEwfVIX34HO5zBIb6fvc+Or21ubYllT9eXv1epl2o2CojuieCZyxE8/Q=",
    "verificationMethod": "did:example:123#bls12381-g2-key"
  }
}
```
::::

:::: {#example-verifiable-credential-as-decoded-jwt .example}
::: marker
[Example
37](#example-verifiable-credential-as-decoded-jwt){.self-link}[:
Verifiable Credential as Decoded JWT]{.example-title}
:::

``` {aria-busy="false"}
{ // external (all terms in this example)
  "protected": {
    "kid": "did:example:123#_Qq0UL2Fq651Q0Fjd6TvnYE-faHiOpRlPVQcY_-tA4A",
    "alg": "EdDSA"
  },
  "payload": {
    "iss": "did:example:123",
    "sub": "did:example:456",
    "vc": {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.w3.org/2018/credentials/examples/v1"
      ],
      "id": "http://example.gov/credentials/3732",
      "type": [
        "VerifiableCredential",
        "UniversityDegreeCredential"
      ],
      "issuer": {
        "id": "did:example:123"
      },
      "issuanceDate": "2020-03-10T04:24:12.164Z",
      "credentialSubject": {
        "id": "did:example:456",
        "degree": {
          "type": "BachelorDegree",
          "name": "Bachelor of Science and Arts"
        }
      }
    },
    "jti": "http://example.gov/credentials/3732",
    "nbf": 1583814252
  },
  "signature": "qSv6dpZJGFybtcifLwGf4ujzlEu-fam_M7HPxinCbVhz9iIJCg70UMeQbPa1ex6BmQ2tnSS7F11FHnMB2bJRAw"
}
```
::::
::::::::::::::::

:::::::: {#encrypting .section .informative}
::: header-wrapper
### A.3 Encrypting {#a-3-encrypting}

[](#encrypting){.self-link aria-label="Permalink for Appendix A.3"}
:::

*This section is non-normative.*

:::: {#issue-container-generatedID-17 .note role="note"}
::: {#h-note-17 .note-title .marker role="heading" aria-level="4"}
Note
:::

These examples are for information purposes only, it is considered a
best practice to avoid dislosing unnecessary information in JWE headers.
::::

:::: {#example-jwe-linked-to-a-verification-method-via-kid .example}
::: marker
[Example
38](#example-jwe-linked-to-a-verification-method-via-kid){.self-link}[:
JWE linked to a verification method via kid]{.example-title}
:::

``` {aria-busy="false"}
{ // external (all terms in this example)
  "ciphertext": "3SHQQJajNH6q0fyAHmw...",
  "iv": "QldSPLVnFf2-VXcNLza6mbylYwphW57Q",
  "protected": "eyJlbmMiOiJYQzIwUCJ9",
  "recipients": [
    {
      "encrypted_key": "BMJ19zK12YHftJ4sr6Pz1rX1HtYni_L9DZvO1cEZfRWDN2vXeOYlwA",
      "header": {
        "alg": "ECDH-ES+A256KW",
        "apu": "Tx9qG69ZfodhRos-8qfhTPc6ZFnNUcgNDVdHqX1UR3s",
        "apv": "ZGlkOmVsZW06cm9wc3RlbjpFa...",
        "epk": {
          "crv": "X25519",
          "kty": "OKP",
          "x": "Tx9qG69ZfodhRos-8qfhTPc6ZFnNUcgNDVdHqX1UR3s"
        },
        "kid": "did:example:123#zC1Rnuvw9rVa6E5TKF4uQVRuQuaCpVgB81Um2u17Fu7UK"
      }
    }
  ],
  "tag": "xbfwwDkzOAJfSVem0jr1bA"
}
```
::::
::::::::
::::::::::::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::: {#architectural-considerations .section .appendix}
::: header-wrapper
## B. Architectural Considerations {#b-architectural-considerations}

[](#architectural-considerations){.self-link
aria-label="Permalink for Appendix B."}
:::

:::: {#detailed-architecture-diagram .section}
::: header-wrapper
### B.1 Detailed Architecture Diagram {#b-1-detailed-architecture-diagram}

[](#detailed-architecture-diagram){.self-link
aria-label="Permalink for Appendix B.1"}
:::

Following is a diagram showing the relationships among [4. Data
Model](#data-model){.sec-ref}, [5. Core
Properties](#core-properties){.sec-ref}, and [8.
Methods](#methods){.sec-ref}, and [7.
Resolution](#resolution){.sec-ref}.

<figure id="detailed-architecture-overview">
<img src="diagrams/did_detailed_architecture_overview.svg"
style="margin: auto; display: block; width: 90%;" width="1121"
height="778"
alt=" DIDs and DID documents are recorded on a Verifiable Data Registry; DIDs resolve to DID documents; DIDs refer to DID subjects; a DID controller controls a DID document; DID URLs contains a DID; DID URLs dereferenced to DID document fragments or external resources; DID resolver implements resolve function; DID URL dereferencer implements dereferencing function; DID method operates a Verfiable Data Registry; DID resolver and DID URL dereferencer instruct a DID method. " />
<figcaption>Figure 7 <span class="fig-title"> Detailed overview of DID
architecture and the relationship of the basic components.
</span></figcaption>
</figure>
::::

:::: {#creation-of-a-did .section}
::: header-wrapper
### B.2 Creation of a DID {#b-2-creation-of-a-did}

[](#creation-of-a-did){.self-link
aria-label="Permalink for Appendix B.2"}
:::

The creation of a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-173
.internalDFN link-type="dfn"} is a process that is defined by each [DID
Method](#dfn-did-methods){#ref-for-dfn-did-methods-121 .internalDFN
link-type="dfn"}. Some [DID
Methods](#dfn-did-methods){#ref-for-dfn-did-methods-122 .internalDFN
link-type="dfn"}, such as `did:key`, are purely generative, such that a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-174
.internalDFN link-type="dfn"} and a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-223
.internalDFN link-type="dfn"} are generated by transforming a single
piece of cryptographic material into a conformant
[representation](#dfn-representations){#ref-for-dfn-representations-73
.internalDFN link-type="dfn"}. Other [DID
methods](#dfn-did-methods){#ref-for-dfn-did-methods-123 .internalDFN
link-type="dfn"} might require the use of a [verifiable data
registry](#dfn-verifiable-data-registry){#ref-for-dfn-verifiable-data-registry-14
.internalDFN link-type="dfn"}, where the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-175
.internalDFN link-type="dfn"} and [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-224
.internalDFN link-type="dfn"} are recognized to exist by third parties
only when the registration has been completed, as defined by the
respective [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-124
.internalDFN link-type="dfn"}. Other processes might be defined by the
respective [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-125
.internalDFN link-type="dfn"}.
::::

:::: {#determining-the-did-subject .section}
::: header-wrapper
### B.3 Determining the DID subject {#b-3-determining-the-did-subject}

[](#determining-the-did-subject){.self-link
aria-label="Permalink for Appendix B.3"}
:::

A
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-176
.internalDFN link-type="dfn"} is a specific type of URI (Uniform
Resource Identifier), so a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-177
.internalDFN link-type="dfn"} can refer to any resource. Per
\[[RFC3986](#bib-rfc3986 "Uniform Resource Identifier (URI): Generic Syntax"){.bibref
link-type="biblio"}\]:

> the term \"resource\" is used in a general sense for whatever might be
> identified by a URI. \[\...\] A resource is not necessarily accessible
> via the Internet.

Resources can be digital or physical, abstract or concrete. Any resource
that can be assigned a URI can be assigned a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-178
.internalDFN link-type="dfn"}. The resource referred to by the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-179
.internalDFN link-type="dfn"} is the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-67 .internalDFN
link-type="dfn"}.

The [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-35
.internalDFN link-type="dfn"} determines the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-68 .internalDFN
link-type="dfn"}. It is not expected to be possible to determine the
[DID subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-69
.internalDFN link-type="dfn"} from looking at the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-180
.internalDFN link-type="dfn"} itself, as
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-181
.internalDFN link-type="dfn"} are generally only meaningful to machines,
not human. A
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-182
.internalDFN link-type="dfn"} is unlikely to contain any information
about the [DID subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-70
.internalDFN link-type="dfn"}, so further information about the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-71 .internalDFN
link-type="dfn"} is only discoverable by resolving the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-183
.internalDFN link-type="dfn"} to the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-225
.internalDFN link-type="dfn"}, obtaining a verifiable credential about
the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-184
.internalDFN link-type="dfn"}, or via some other description of the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-185
.internalDFN link-type="dfn"}.

While the value of the [`id`](#dfn-id){#ref-for-dfn-id-10 .internalDFN
link-type="dfn"} property in the retrieved [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-226
.internalDFN link-type="dfn"} must always match the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-186
.internalDFN link-type="dfn"} being resolved, whether or not the actual
resource to which the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-187
.internalDFN link-type="dfn"} refers can change over time is dependent
upon the [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-126
.internalDFN link-type="dfn"}. For example, a [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-127 .internalDFN
link-type="dfn"} that permits the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-72 .internalDFN
link-type="dfn"} to change could be used to generate a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-188
.internalDFN link-type="dfn"} for the current occupant of a particular
role---such as the CEO of a company---where the actual person occupying
the role can be different depending on when the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-189
.internalDFN link-type="dfn"} is resolved.
::::

::::: {#referring-to-the-did-document .section}
::: header-wrapper
### B.4 Referring to the DID document {#b-4-referring-to-the-did-document}

[](#referring-to-the-did-document){.self-link
aria-label="Permalink for Appendix B.4"}
:::

The
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-190
.internalDFN link-type="dfn"} refers to the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-73 .internalDFN
link-type="dfn"} and *resolves to* the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-227
.internalDFN link-type="dfn"} (by following the protocol specified by
the [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-128
.internalDFN link-type="dfn"}). The [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-228
.internalDFN link-type="dfn"} is not a separate resource from the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-74 .internalDFN
link-type="dfn"} and does not have a [URI](#dfn-uri){#ref-for-dfn-uri-25
.internalDFN link-type="dfn"} separate from the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-191
.internalDFN link-type="dfn"}. Rather the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-229
.internalDFN link-type="dfn"} is an artifact of [DID
resolution](#dfn-did-resolution){#ref-for-dfn-did-resolution-18
.internalDFN link-type="dfn"} controlled by the [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-36
.internalDFN link-type="dfn"} for the purpose of describing the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-75 .internalDFN
link-type="dfn"}.

This distinction is illustrated by the graph model shown below.

<figure id="did-and-did-document-graph">
<img src="diagrams/figure-a.1-did-and-did-document-graph.svg"
style="margin: auto; display: block; width: 75%;" width="667"
height="495"
alt=" Diagram showing a graph model for how DID controllers assign DIDs to refer to DID subjects and resolve to DID documents that describe the DID subjects. " />
<figcaption>Figure 8 <span class="fig-title"> A <a
href="#dfn-decentralized-identifiers"
id="ref-for-dfn-decentralized-identifiers-192" class="internalDFN"
data-link-type="dfn">DID</a> is an identifier assigned by a <a
href="#dfn-did-controllers" id="ref-for-dfn-did-controllers-37"
class="internalDFN" data-link-type="dfn">DID controller</a> to refer to
a <a href="#dfn-did-subjects" id="ref-for-dfn-did-subjects-76"
class="internalDFN" data-link-type="dfn">DID subject</a> and resolve to
a <a href="#dfn-did-documents" id="ref-for-dfn-did-documents-230"
class="internalDFN" data-link-type="dfn">DID document</a> that describes
the <a href="#dfn-did-subjects" id="ref-for-dfn-did-subjects-77"
class="internalDFN" data-link-type="dfn">DID subject</a>. The <a
href="#dfn-did-documents" id="ref-for-dfn-did-documents-231"
class="internalDFN" data-link-type="dfn">DID document</a> is an artifact
of <a href="#dfn-did-resolution" id="ref-for-dfn-did-resolution-19"
class="internalDFN" data-link-type="dfn">DID resolution</a> and not a
separate resource distinct from the <a href="#dfn-did-subjects"
id="ref-for-dfn-did-subjects-78" class="internalDFN"
data-link-type="dfn">DID subject</a>. See also: <a
href="#did-and-did-document-graph-longdesc"
class="longdesc-link">narrative description</a>. </span></figcaption>
</figure>

::: {#did-and-did-document-graph-longdesc .longdesc}
Two filled black circles appear at the top of the diagram, one on the
left, labeled \"DID Controller\", and one on the right, labeled \"DID
Subject\". A rectangle, with lower right corner bent inwards to form a
small triangle, appears below, containing the label \"DID Document\".
Arrows extend between these three items, as follows. A solid red arrow
points directly from the DID Controller circle, rightwards to the DID
Subject circle, labeled \"DID\" above it in large font, and
\"Identifies\" below it in small italic font. The other arrow labels are
also in small italic font. A dotted red arrow, labeled \"Resolves to\",
extends from DID Controller, starting in the same line as the first
arrow, then curving downward to point to the DID Document rectangle. A
green arrow, labeled \"Controls\", points directly from DID Controller
to DID Document. A green arrow labeled \"Controller\" points in the
opposite direction, from DID Document to DID Controller, making an arc
outward to the left of the diagram. A blue arrow, labeled, \"Describes\"
points directly from DID Document to DID Subject.
:::
:::::

:::: {#statements-in-the-did-document .section}
::: header-wrapper
### B.5 Statements in the DID document {#b-5-statements-in-the-did-document}

[](#statements-in-the-did-document){.self-link
aria-label="Permalink for Appendix B.5"}
:::

Each property in a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-232
.internalDFN link-type="dfn"} is a statement by the [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-38
.internalDFN link-type="dfn"} that describes:

-   The string of characters defining identifiers for the [DID
    subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-79
    .internalDFN link-type="dfn"} (e.g., the
    [`id`](#dfn-id){#ref-for-dfn-id-11 .internalDFN link-type="dfn"} and
    [`alsoKnownAs`](#dfn-alsoknownas){#ref-for-dfn-alsoknownas-9
    .internalDFN link-type="dfn"} properties)
-   How to interact with the [DID
    subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-80
    .internalDFN link-type="dfn"} (e.g., the
    [`verificationMethod`](#dfn-verificationmethod){#ref-for-dfn-verificationmethod-2
    .internalDFN link-type="dfn"} and
    [`service`](#dfn-service){#ref-for-dfn-service-25 .internalDFN
    link-type="dfn"} properties).
-   How to interpret the specific representation of the [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-233
    .internalDFN link-type="dfn"} (e.g., the `@context` property for a
    JSON-LD representation).

The only required property in a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-234
.internalDFN link-type="dfn"} is [`id`](#dfn-id){#ref-for-dfn-id-12
.internalDFN link-type="dfn"}, so that is the only statement guaranteed
to be in a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-235
.internalDFN link-type="dfn"}. That statement is illustrated in [Figure
8](#did-and-did-document-graph "A DID is an identifier assigned by a DID controller to refer to a DID subject and resolve to a DID document that describes the DID subject. The DID document is an artifact of DID resolution and not a separate resource distinct from the DID subject. See also: narrative description."){.fig-ref}
with a direct link between the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-193
.internalDFN link-type="dfn"} and the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-81 .internalDFN
link-type="dfn"}.
::::

::::: {#discovering-more-information-about-the-did-subject .section}
::: header-wrapper
### B.6 Discovering more information about the DID subject {#b-6-discovering-more-information-about-the-did-subject}

[](#discovering-more-information-about-the-did-subject){.self-link
aria-label="Permalink for Appendix B.6"}
:::

Options for discovering more information about the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-82 .internalDFN
link-type="dfn"} depend on the properties present in the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-236
.internalDFN link-type="dfn"}. If the
[`service`](#dfn-service){#ref-for-dfn-service-26 .internalDFN
link-type="dfn"} property is present, more information can be requested
from a [service
endpoint](#dfn-service-endpoints){#ref-for-dfn-service-endpoints-15
.internalDFN link-type="dfn"}. For example, by querying a [service
endpoint](#dfn-service-endpoints){#ref-for-dfn-service-endpoints-16
.internalDFN link-type="dfn"} that supports verifiable credentials for
one or more claims (attributes) describing the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-83 .internalDFN
link-type="dfn"}.

Another option is to use the
[`alsoKnownAs`](#dfn-alsoknownas){#ref-for-dfn-alsoknownas-10
.internalDFN link-type="dfn"} property if it is present in the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-237
.internalDFN link-type="dfn"}. The [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-39
.internalDFN link-type="dfn"} can use it to provide a list of other URIs
(including other
[DIDs](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-194
.internalDFN link-type="dfn"}) that refer to the same [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-84 .internalDFN
link-type="dfn"}. Resolving or dereferencing these URIs might yield
other descriptions or representations of the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-85 .internalDFN
link-type="dfn"} as illustrated in the figure below.

<figure id="alsoKnownAs-graph">
<img src="diagrams/figure-a.2-also-known-as-graph.svg"
style="margin: auto; display: block; width: 75%;" width="722"
height="586"
alt=" Diagram showing a graph model, with an alsoKnownAs property with an arc to another node representing a different resource that dereferences to another description of the DID subject. " />
<figcaption>Figure 9 <span class="fig-title"> A <a
href="#dfn-did-documents" id="ref-for-dfn-did-documents-238"
class="internalDFN" data-link-type="dfn">DID document</a> can use the
alsoKnownAs property to assert that another <a href="#dfn-uri"
id="ref-for-dfn-uri-26" class="internalDFN" data-link-type="dfn">URI</a>
(including, but not necessarily, another <a
href="#dfn-decentralized-identifiers"
id="ref-for-dfn-decentralized-identifiers-195" class="internalDFN"
data-link-type="dfn">DID</a>) refers to the same <a
href="#dfn-did-subjects" id="ref-for-dfn-did-subjects-86"
class="internalDFN" data-link-type="dfn">DID subject</a>. See also: <a
href="#alsoKnownAs-graph-longdesc" class="longdesc-link">narrative
description</a>. </span></figcaption>
</figure>

::: {#alsoKnownAs-graph-longdesc .longdesc}
The diagram contains three small black filled circles, two rectangles
with bent corners, arrows between them, and labels, as follows. On the
upper left is a circle labeled \"DID Controller\". On the upper right is
a circle labeled \"DID Subject\". On the lower-middle right is a circle
without a label. On the lower right is a rectangle labeled
\"Description\". In the center of the diagram is a rectangle labeled
\"DID Document\". Inside the DID Document rectangle, beneath its label,
is two lines of code: \"alsoKnownAs: \[\", and \"URI\]\". A black arrow
extends from the second line, to the right, crossing the rectangle
border, pointing to the unlabeled circle at the right of the diagram.
This arrow is labeled above it in large font, \"URI\", and below it in
italic, \"Identifies\". A black arrow points from the unlabeled circle
downwards to the Description rectangle, labeled \"Dereferences to\". A
blue arrow, labeled \"Describes\", extends from Description, arcing on
the right, pointing up to DID Subject. A blue arrow, also labeled
\"Describes\", points directly from the rectangle, labeled \"DID
Document\", in the center of the diagram, up and to the right to the DID
Subject circle. A red arrow, labeled \"alsoKnownAs\", points from DID
Subject down to the unlabeled circle. A red arrow, labeled \"DID\" above
it in large font, and \"Identifies\" below it in italic font, lies at
the top of the image, pointing from DID Controller to DID Subject. A
dotted red line starts in the same place but branches off and curves
downward to point to the DID Document rectangle at the center of the
image. A green arrow, labeled \"Controls\", points directly from DID
Controller to DID Document. Another green arrow points in the opposite
direction, labeled \"Controller\", curving outwards on the left of the
image, from DID Document to DID Controller.
:::
:::::

:::: {#serving-a-representation-of-the-did-subject .section}
::: header-wrapper
### B.7 Serving a representation of the DID subject {#b-7-serving-a-representation-of-the-did-subject}

[](#serving-a-representation-of-the-did-subject){.self-link
aria-label="Permalink for Appendix B.7"}
:::

If the [DID subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-87
.internalDFN link-type="dfn"} is a digital resource that can be
retrieved from the internet, a [DID
method](#dfn-did-methods){#ref-for-dfn-did-methods-129 .internalDFN
link-type="dfn"} can choose to construct a [DID
URL](#dfn-did-urls){#ref-for-dfn-did-urls-37 .internalDFN
link-type="dfn"} which returns a representation of the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-88 .internalDFN
link-type="dfn"} itself. For example, a data schema that needs a
persistent, cryptographically verifiable identifier could be assigned a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-196
.internalDFN link-type="dfn"}, and passing a specified DID parameter
(see [3.2.1 DID Parameters](#did-parameters){.sec-ref}) could be used as
a standard way to retrieve a representation of that schema.

Similarly, a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-197
.internalDFN link-type="dfn"} can be used to refer to a digital resource
(such as an image) that can be returned directly from a [verifiable data
registry](#dfn-verifiable-data-registry){#ref-for-dfn-verifiable-data-registry-15
.internalDFN link-type="dfn"} if that functionality is supported by the
applicable [DID method](#dfn-did-methods){#ref-for-dfn-did-methods-130
.internalDFN link-type="dfn"}.
::::

:::: {#assigning-dids-to-existing-web-resources .section}
::: header-wrapper
### B.8 Assigning DIDs to existing web resources {#b-8-assigning-dids-to-existing-web-resources}

[](#assigning-dids-to-existing-web-resources){.self-link
aria-label="Permalink for Appendix B.8"}
:::

If the controller of a web page or any other web resource wants to
assign it a persistent, cryptographically verifiable identifier, the
controller can give it a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-198
.internalDFN link-type="dfn"}. For example, the author of a blog hosted
by a blog hosting company (under that hosting company\'s domain) could
create a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-199
.internalDFN link-type="dfn"} for the blog. In the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-239
.internalDFN link-type="dfn"}, the author can include the
[`alsoKnownAs`](#dfn-alsoknownas){#ref-for-dfn-alsoknownas-11
.internalDFN link-type="dfn"} property pointing to the current URL of
the blog, e.g.:

` "alsoKnownAs": ["https://myblog.blogging-host.example/home"] `

If the author subsequently moves the blog to a different hosting company
(or to the author\'s own domain), the author can update the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-240
.internalDFN link-type="dfn"} to point to the new URL for the blog,
e.g.:

` "alsoKnownAs": ["https://myblog.example/"] `

The
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-200
.internalDFN link-type="dfn"} effectively adds a layer of indirection
for the blog URL. This layer of indirection is under the control of the
author instead of under the control of an external administrative
authority such as the blog hosting company. This is how a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-201
.internalDFN link-type="dfn"} can effectively function as an enhanced
[URN (Uniform Resource Name)](https://tools.ietf.org/html/rfc8141)---a
persistent identifier for an information resource whose network location
might change over time.
::::

::::::::: {#the-relationship-between-did-controllers-and-did-subjects .section}
::: header-wrapper
### B.9 The relationship between DID controllers and DID subjects {#b-9-the-relationship-between-did-controllers-and-did-subjects}

[](#the-relationship-between-did-controllers-and-did-subjects){.self-link
aria-label="Permalink for Appendix B.9"}
:::

To avoid confusion, it is helpful to classify [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-89 .internalDFN
link-type="dfn"}s into two disjoint sets based on their relationship to
the [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-40
.internalDFN link-type="dfn"}.

::::: {#set-1-the-did-subject-is-the-did-controller .section}
::: header-wrapper
#### B.9.1 Set #1: The DID subject *is* the DID controller {#b-9-1-set-1-the-did-subject-is-the-did-controller}

[](#set-1-the-did-subject-is-the-did-controller){.self-link
aria-label="Permalink for Appendix B.9.1"}
:::

The first case, shown in [Figure
10](#controller-subject-equivalence "The DID subject is the same entity as the DID controller. See also: narrative description."){.fig-ref},
is the common scenario where the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-90 .internalDFN
link-type="dfn"} is also the [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-41
.internalDFN link-type="dfn"}. This is the case when an individual or
organization creates a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-202
.internalDFN link-type="dfn"} to self-identify.

<figure id="controller-subject-equivalence">
<img src="diagrams/figure-b.1-controller-and-subject-equivalence.svg"
style="margin: auto; display: block; width: 75%;" width="667"
height="516"
alt=" Diagram showing a graph model with an equivalence arc from the DID subject to the DID controller. " />
<figcaption>Figure 10 <span class="fig-title"> The <a
href="#dfn-did-subjects" id="ref-for-dfn-did-subjects-91"
class="internalDFN" data-link-type="dfn">DID subject</a> is the same
entity as the <a href="#dfn-did-controllers"
id="ref-for-dfn-did-controllers-42" class="internalDFN"
data-link-type="dfn">DID controller</a>. See also: <a
href="#controller-subject-equivalence-longdesc"
class="longdesc-link">narrative description</a>. </span></figcaption>
</figure>

::: {#controller-subject-equivalence-longdesc .longdesc}
Two small black circles appear in the diagram, one on the upper left,
labeled, \"DID Controller\", and one on the upper right, labeled \"DID
Subject\". A solid red arrow extends from the DID Controller circle to
the DID Subject circle, labeled \"DID\" in large bold text above the
arrow, and \"Identifies\" in small italic text beneath the arrow. A
dotted red double-ended arrow, labeled \"Equivalence\", extends between
the two circles, forming an arc in the space between and above them. In
the lower part of the diagram is a rectangle with bent corner, outlined
in black, containing the label \"DID Document\". Arrows point between
this DID Document rectangle and the small black circles for DID
Controller and DID Subject, with italic labels, as follows. A blue arrow
points from the DID Document to the DID Subject, labeled, \"Describes\".
A green arrow points from the DID Controller to the DID Document,
labeled \"Controls\". A green arrow points from the DID Document to the
DID Controller, in an outward arc, labeled, \"Controller\". A dotted red
arrow, labeled \"Resolves to\", extends from the DID controller starting
to the right, branching off from the arrow to the DID Subject, then
curving downward to point to the DID Document.
:::

From a graph model perspective, even though the nodes identified as the
[DID controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-43
.internalDFN link-type="dfn"} and [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-92 .internalDFN
link-type="dfn"} in [Figure
10](#controller-subject-equivalence "The DID subject is the same entity as the DID controller. See also: narrative description."){.fig-ref}
are distinct, there is a logical arc connecting them to express a
semantic equivalence relationship.
:::::

:::: {#set-2-the-did-subject-is-not-the-did-controller .section}
::: header-wrapper
#### B.9.2 Set #2: The DID subject is *not* the DID controller {#b-9-2-set-2-the-did-subject-is-not-the-did-controller}

[](#set-2-the-did-subject-is-not-the-did-controller){.self-link
aria-label="Permalink for Appendix B.9.2"}
:::

The second case is when the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-93 .internalDFN
link-type="dfn"} is a separate entity from the [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-44
.internalDFN link-type="dfn"}. This is the case when, for example, a
parent creates and maintains control of a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-203
.internalDFN link-type="dfn"} for a child; a corporation creates and
maintains control of a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-204
.internalDFN link-type="dfn"} for a subsidiary; or a manufacturer
creates and maintains control of a
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-205
.internalDFN link-type="dfn"} for a product, an IoT device, or a digital
file.

From a graph model perspective, the only difference from Set 1 that
there is no equivalence arc relationship between the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-94 .internalDFN
link-type="dfn"} and [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-45
.internalDFN link-type="dfn"} nodes.
::::
:::::::::

:::::::::: {#multiple-did-controllers .section}
::: header-wrapper
### B.10 Multiple DID controllers {#b-10-multiple-did-controllers}

[](#multiple-did-controllers){.self-link
aria-label="Permalink for Appendix B.10"}
:::

A [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-241
.internalDFN link-type="dfn"} might have more than one [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-46
.internalDFN link-type="dfn"}. This can happen in one of two ways.

::::: {#independent-control .section}
::: header-wrapper
#### B.10.1 Independent Control {#b-10-1-independent-control}

[](#independent-control){.self-link
aria-label="Permalink for Appendix B.10.1"}
:::

In this case, each of the [DID
controllers](#dfn-did-controllers){#ref-for-dfn-did-controllers-47
.internalDFN link-type="dfn"} might act on its own, i.e., each one has
full power to update the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-242
.internalDFN link-type="dfn"} independently. From a graph model
perspective, in this configuration:

-   Each additional [DID
    controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-48
    .internalDFN link-type="dfn"} is another distinct graph node (which
    might be identified by its own
    [DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-206
    .internalDFN link-type="dfn"}).
-   The same arcs (\"controls\" and \"controller\") exist between each
    [DID
    controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-49
    .internalDFN link-type="dfn"} and the [DID
    document](#dfn-did-documents){#ref-for-dfn-did-documents-243
    .internalDFN link-type="dfn"}.

<figure id="independent-did-controllers">
<img src="diagrams/figure-c.1-independent-did-controllers.svg"
style="margin: auto; display: block; width: 75%;" width="824"
height="504"
alt=" Diagram showing three DID controllers each with an independent control relationship with the DID document " />
<figcaption>Figure 11 <span class="fig-title"> Multiple independent <a
href="#dfn-did-controllers" id="ref-for-dfn-did-controllers-50"
class="internalDFN" data-link-type="dfn">DID controllers</a> that can
each act independently. See also: <a
href="#independent-did-controllers-longdesc" class="longdesc-link">Text
Description</a> </span></figcaption>
</figure>

::: {#independent-did-controllers-longdesc .longdesc}
Three black circles appear on the left, vertically, each labeled \"DID
Controller\". From each of these circles, a pair of green arrows extends
towards the center of the diagram, to a single rectangle, labeled \"DID
Document\". The rectangle has the lower right corner cut and bent inward
to form a small triangle, as if to represent a physical piece of paper
with curled corner. Each pair of green arrows consists of one arrow
pointing from the black circle to the rectangle, labeled \"Controls\",
and one pointing in the opposite direction, from the rectangle to the
black circle, labeled \"Controller\". From the right of the rectangle
extends a blue arrow, labeled, \"Describes\", pointing to a black circle
labeled, \"DID Subject\".
:::
:::::

::::: {#group-control .section}
::: header-wrapper
#### B.10.2 Group Control {#b-10-2-group-control}

[](#group-control){.self-link
aria-label="Permalink for Appendix B.10.2"}
:::

In the case of group control, the [DID
controllers](#dfn-did-controllers){#ref-for-dfn-did-controllers-51
.internalDFN link-type="dfn"} are expected to act together in some
fashion, such as when using a cryptographic algorithm that requires
multiple digital signatures (\"multi-sig\") or a threshold number of
digital signatures (\"m-of-n\"). From a functional standpoint, this
option is similar to a single [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-52
.internalDFN link-type="dfn"} because, although each of the [DID
controllers](#dfn-did-controllers){#ref-for-dfn-did-controllers-53
.internalDFN link-type="dfn"} in the [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-54
.internalDFN link-type="dfn"} group has its own graph node, the actual
control collapses into a single logical graph node representing the [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-55
.internalDFN link-type="dfn"} group as shown in [Figure
12](#group-did-controllers "Multiple DID controllers who are expected to act together as a DID controller group. See also: narrative description."){.fig-ref}.

<figure id="group-did-controllers">
<img src="diagrams/figure-c.2-group-did-controllers.svg"
style="margin: auto; display: block; width: 75%;" width="888"
height="297"
alt=" Diagram showing three DID controllers together as a single DID controller group to control a DID document " />
<figcaption>Figure 12 <span class="fig-title"> Multiple <a
href="#dfn-did-controllers" id="ref-for-dfn-did-controllers-56"
class="internalDFN" data-link-type="dfn">DID controllers</a> who are
expected to act together as a <a href="#dfn-did-controllers"
id="ref-for-dfn-did-controllers-57" class="internalDFN"
data-link-type="dfn">DID controller</a> group. See also: <a
href="#group-did-controllers-longdesc" class="longdesc-link">narrative
description</a>. </span></figcaption>
</figure>

::: {#group-did-controllers-longdesc .longdesc}
On the left are three black filled circles, labeled \"DID Controller
Group\" by a brace on the left. From each of these three circles, a
green arrow extends to the center right. These three arrows converge
towards a single filled white circle. A pair of horizontal green arrows
connects this white circle on its right to a rectangle shaped like a
page with a curled corner, labeled \"DID Document\". The upper arrow
points right, from the white circle to the rectangle, and is labeled
\"Controls\". The lower arrow points left, from the rectangle to the
white circle, and is labeled \"Controller\". From the right of the
rectangle extends a blue arrow, labeled \"Describes\", pointing to a
black circle, labeled \"DID Subject\".
:::

This configuration will often apply when the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-95 .internalDFN
link-type="dfn"} is an organization, corporation, government agency,
community, or other group that is not controlled by a single individual.
:::::
::::::::::

:::: {#changing-the-did-subject .section}
::: header-wrapper
### B.11 Changing the DID subject {#b-11-changing-the-did-subject}

[](#changing-the-did-subject){.self-link
aria-label="Permalink for Appendix B.11"}
:::

A [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-244
.internalDFN link-type="dfn"} has exactly one
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-207
.internalDFN link-type="dfn"} which refers to the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-96 .internalDFN
link-type="dfn"}. The
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-208
.internalDFN link-type="dfn"} is expressed as the value of the
[`id`](#dfn-id){#ref-for-dfn-id-13 .internalDFN link-type="dfn"}
property. This property value is immutable for the lifetime of the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-245
.internalDFN link-type="dfn"}.

However, it is possible that the resource *identified* by the
[DID](#dfn-decentralized-identifiers){#ref-for-dfn-decentralized-identifiers-209
.internalDFN link-type="dfn"}, the [DID
subject](#dfn-did-subjects){#ref-for-dfn-did-subjects-97 .internalDFN
link-type="dfn"}, may change over time. This is under the exclusive
authority of the [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-58
.internalDFN link-type="dfn"}. For more details, see section [9.16
Persistence](#persistence){.sec-ref}.
::::

:::: {#changing-the-did-controller .section}
::: header-wrapper
### B.12 Changing the DID controller {#b-12-changing-the-did-controller}

[](#changing-the-did-controller){.self-link
aria-label="Permalink for Appendix B.12"}
:::

The [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-59
.internalDFN link-type="dfn"} for a [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-246
.internalDFN link-type="dfn"} might change over time. However, depending
on how it is implemented, a change in the [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-60
.internalDFN link-type="dfn"} might not be made apparent by changes to
the [DID document](#dfn-did-documents){#ref-for-dfn-did-documents-247
.internalDFN link-type="dfn"} itself. For example, if the change is
implemented through a shift in ownership of the underlying cryptographic
keys or other controls used for one or more of the [verification
methods](#dfn-verification-method){#ref-for-dfn-verification-method-105
.internalDFN link-type="dfn"} in the [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-248
.internalDFN link-type="dfn"}, it might be indistinguishable from a
standard key rotation.

On the other hand, if the change is implemented by changing the value of
the [`controller`](#dfn-controller){#ref-for-dfn-controller-26
.internalDFN link-type="dfn"} property, it will be transparent.

If it is important to verify a change of [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-61
.internalDFN link-type="dfn"}, implementers are advised to
[authenticate](#dfn-authenticated){#ref-for-dfn-authenticated-12
.internalDFN link-type="dfn"} the new [DID
controller](#dfn-did-controllers){#ref-for-dfn-did-controllers-62
.internalDFN link-type="dfn"} against the [verification
methods](#dfn-verification-method){#ref-for-dfn-verification-method-106
.internalDFN link-type="dfn"} in the revised [DID
document](#dfn-did-documents){#ref-for-dfn-did-documents-249
.internalDFN link-type="dfn"}.
::::
:::::::::::::::::::::::::::::::::::::::::

:::: {#revision-history .section .appendix}
::: header-wrapper
## C. Revision History {#c-revision-history}

[](#revision-history){.self-link aria-label="Permalink for Appendix C."}
:::

This section contains the changes that have been made since the
publication of this specification as a W3C First Public Working Draft.

Changes since the [Second Candidate
Recommendation](https://www.w3.org/TR/2021/CR-did-core-20210615/)
include:

-   Non-normatively refer to the DID Resolution specification to guide
    implementers toward common DID URL implementation patterns.
-   Elaborate upon when DID Documents are understood to start existing.
-   Convert PNG diagrams to SVG diagrams.
-   Rearrange order of Appendices to improve readability.
-   Update the IANA guidance as a result of the IETF Media Type
    Maintenance Working Group efforts.
-   Add links to use cases document.
-   Add warning related to
    \[[MULTIBASE](#bib-multibase "The Multibase Encoding Scheme"){.bibref
    link-type="biblio"}\] and `publicKeyMultibase`.
-   Remove at risk issue markers for features that gained enough
    implementation experience.
-   Finalize the Editors, Authors, and Acknowledgements information.

Changes since the [First Candidate
Recommendation](https://www.w3.org/TR/2021/CR-did-core-20210318/)
include:

-   Addition of at risk markers to most of the DID Parameters, the data
    model datatypes that are expected to not be implemented, and the
    application/did+ld+json media type. This change resulted in the DID
    WG\'s decision to perform a second Candidate Recommendation phase.
    All other changes were either editorial or predicted in \"at risk\"
    issue markers.
-   Removal of the at risk issue marker for the `method-specific-id`
    ABNF rule and for `nextUpdate` and `nextVersionId`.
-   Clarification that `equivalentId` and `canonicalId` are optional.
-   Addition of a definitions for \"amplification attack\" and
    \"cryptographic suite\".
-   Replacement of `publicKeyBase58` with `publicKeyMultibase`.
-   Updates to the DID Document examples section.
-   A large number of editorial clean ups to the Security Considerations
    section.

Changes since the [First Public Working
Draft](https://www.w3.org/TR/2019/WD-did-core-20191107/) include:

-   The introduction of an abstract data model that can be serialized to
    multiple representations including JSON and JSON-LD.
-   The introduction of a DID Specifications Registry for the purposes
    of registering extension properties, representations, DID Resolution
    input metadata and output metadata, DID Document metadata, DID
    parameters, and DID Methods.
-   Separation of DID Document metadata, such as created and updated
    values, from DID Document properties.
-   The removal of embedded proofs in the DID Document.
-   The addition of verification relationships for the purposes of
    authentication, assertion, key agreement, capability invocation and
    capability delegation.
-   The ability to support relating multiple identifiers with the DID
    Document, such as the DID controller, also known as, equivalent IDs,
    and canonical IDs.
-   Enhancing privacy by reducing information that could contain
    personally identifiable information in the DID Document.
-   The addition of a large section on security considerations and
    privacy considerations.
-   A Representations section that details how the abstract data model
    can be produced and consumed in a variety of different formats along
    with general rules for all representations, producers, and
    consumers.
-   A section detailing the DID Resolution and DID URL Dereferencing
    interface definition that all DID resolvers are expected to expose
    as well as inputs and outputs to those processes.
-   DID Document examples in an appendix that provide more complex
    examples of DID Document serializations.
-   IANA Considerations for multiple representations specified in DID
    Core.
-   Removal of the Future Work section as much of the work has now been
    accomplished.
-   An acknowledgements section.
::::

:::: {#acknowledgements .section .appendix}
::: header-wrapper
## D. Acknowledgements {#d-acknowledgements}

[](#acknowledgements){.self-link aria-label="Permalink for Appendix D."}
:::

The Working Group extends deep appreciation and heartfelt thanks to our
Chairs Brent Zundel and Dan Burnett, as well as our W3C Staff Contact,
Ivan Herman, for their tireless work in keeping the Working Group headed
in a productive direction and navigating the deep and dangerous waters
of the standards process.

The Working Group gratefully acknowledges the work that led to the
creation of this specification, and extends sincere appreciation to
those individuals that worked on technologies and specifications that
deeply influenced our work. In particular, this includes the work of
Phil Zimmerman, Jon Callas, Lutz Donnerhacke, Hal Finney, David Shaw,
and Rodney Thayer on [Pretty Good Privacy
(PGP)](https://en.wikipedia.org/wiki/Pretty_Good_Privacy) in the 1990s
and 2000s.

In the mid-2010s, preliminary implementations of what would become
Decentralized Identifiers were
[built](https://web-payments.org/minutes/2014-05-07/#topic-1) in
collaboration with Jeremie Miller\'s Telehash project and the W3C Web
Payments Community Group\'s work led by Dave Longley and Manu Sporny.
Around a year later, the XDI.org Registry Working Group [began
exploring](https://docs.google.com/document/d/1EP-KhH60y-nl4xkEzoeSf3DjmjLomfboF4p2umF51FA/)
decentralized technologies for replacing its existing identifier
registry. Some of the first
[written](https://github.com/WebOfTrustInfo/rwot1-sf/blob/master/final-documents/dpki.pdf)
[papers](https://github.com/WebOfTrustInfo/rwot2-id2020/blob/master/final-documents/requirements-for-dids.pdf)
exploring the concept of Decentralized Identifiers can be traced back to
the first several Rebooting the Web of Trust workshops convened by
Christopher Allen. That work led to a key collaboration between
Christopher Allen, Drummond Reed, Les Chasen, Manu Sporny, and Anil
John. Anil saw promise in the technology and allocated the initial set
of government funding to explore the space. Without the support of Anil
John and his guidance through the years, it is unlikely that
Decentralized Identifiers would be where they are today. Further
refinement at the Rebooting the Web of Trust workshops led to the [first
implementers
documentation](https://github.com/WebOfTrustInfo/rwot3-sf/blob/master/final-documents/did-implementer-draft-10.pdf),
edited by Drummond Reed, Les Chasen, Christopher Allen, and Ryan Grant.
Contributors included Manu Sporny, Dave Longley, Jason Law, Daniel
Hardman, Markus Sabadello, Christian Lundkvist, and Jonathan Endersby.
This initial work was then merged into the W3C Credentials Community
Group, incubated further, and then transitioned to the W3C Decentralized
Identifiers Working Group for global standardization.

Portions of the work on this specification have been funded by the
United States Department of Homeland Security\'s (US DHS) Science and
Technology Directorate under contracts HSHQDC-16-R00012-H-SB2016-1-002,
and HSHQDC-17-C-00019, as well as the US DHS Silicon Valley Innovation
Program under contracts 70RSAT20T00000010, 70RSAT20T00000029,
70RSAT20T00000030, 70RSAT20T00000045, 70RSAT20T00000003, and
70RSAT20T00000033. The content of this specification does not
necessarily reflect the position or the policy of the U.S. Government
and no official endorsement should be inferred.

Portions of the work on this specification have also been funded by the
European Union\'s StandICT.eu program under sub-grantee contract number
CALL05/19. The content of this specification does not necessarily
reflect the position or the policy of the European Union and no official
endorsement should be inferred.

Work on this specification has also been supported by the [Rebooting the
Web of Trust](https://www.weboftrust.info/) community facilitated by
Christopher Allen, Shannon Appelcline, Kiara Robles, Brian Weller, Betty
Dhamers, Kaliya Young, Kim Hamilton Duffy, Manu Sporny, Drummond Reed,
Joe Andrieu, and Heather Vescent. Development of this specification has
also been supported by the [W3C Credentials Community
Group](https://w3c-ccg.github.io/), which has been Chaired by Kim
Hamilton Duffy, Joe Andrieu, Christopher Allen, Heather Vescent, and
Wayne Chang. The participants in the Internet Identity Workshop,
facilitated by Phil Windley, Kaliya Young, Doc Searls, and Heidi Nobantu
Saul, also supported this work through numerous working sessions
designed to debate, improve, and educate participants about this
specification.

The Working Group thanks the following individuals for their
contributions to this specification (in alphabetical order, Github
handles start with `@` and are sorted as last names): Denis Ah-Kang,
Nacho Alamillo, Christopher Allen, Joe Andrieu, Antonio, Phil Archer,
George Aristy, Baha, Juan Benet, BigBlueHat, Dan Bolser, Chris Boscolo,
Pelle Braendgaard, Daniel Buchner, Daniel Burnett, Juan Caballero,
\@cabo, Tim Cappalli, Melvin Carvalho, David Chadwick, Wayne Chang, Sam
Curren, Hai Dang, Tim Daubenschütz, Oskar van Deventer, Kim Hamilton
Duffy, Arnaud Durand, Ken Ebert, Veikko Eeva, \@ewagner70, Carson
Farmer, Nikos Fotiou, Gabe, Gayan, \@gimly-jack, \@gjgd, Ryan Grant,
Peter Grassberger, Adrian Gropper, Amy Guy, Daniel Hardman, Kyle Den
Hartog, Philippe Le Hegaret, Ivan Herman, Michael Herman, Alen Horvat,
Dave Huseby, Marcel Jackisch, Mike Jones, Andrew Jones, Tom Jones,
jonnycrunch, Gregg Kellogg, Michael Klein, \@kdenhartog-sybil1, Paul
Knowles, \@ktobich, David I. Lehn, Charles E. Lehner, Michael Lodder,
\@mooreT1881, Dave Longley, Tobias Looker, Wolf McNally, Robert
Mitwicki, Mircea Nistor, Grant Noble, Mark Nottingham, \@oare, Darrell
O\'Donnell, Vinod Panicker, Dirk Porsche, Praveen, Mike Prorock,
\@pukkamustard, Drummond Reed, Julian Reschke, Yancy Ribbens, Justin
Richer, Rieks, \@rknobloch, Mikeal Rogers, Evstifeev Roman, Troy Ronda,
Leonard Rosenthol, Michael Ruminer, Markus Sabadello, Cihan Saglam,
Samu, Rob Sanderson, Wendy Seltzer, Mehran Shakeri, Jaehoon (Ace) Shim,
Samuel Smith, James M Snell, SondreB, Manu Sporny, \@ssstolk, Orie
Steele, Shigeya Suzuki, Sammotic Switchyarn, \@tahpot, Oliver Terbu, Ted
Thibodeau Jr., Joel Thorstensson, Tralcan, Henry Tsai, Rod Vagg, Mike
Varley, Kaliya \"Identity Woman\" Young, Eric Welton, Fuqiao Xue, \@Yue,
Dmitri Zagidulin, \@zhanb, and Brent Zundel.
::::

:::::::::: {#iana-considerations .section .appendix}
::: header-wrapper
## E. IANA Considerations {#e-iana-considerations}

[](#iana-considerations){.self-link
aria-label="Permalink for Appendix E."}
:::

This section will be submitted to the Internet Engineering Steering
Group (IESG) for review, approval, and registration with IANA when this
specification becomes a W3C Proposed Recommendation.

:::: {#application-did-json .section}
::: header-wrapper
### E.1 application/did+json {#e-1-application-did-json}

[](#application-did-json){.self-link
aria-label="Permalink for Appendix E.1"}
:::

Type name:
:   application

Subtype name:
:   did+json

Required parameters:
:   None

Optional parameters:
:   None

Encoding considerations:
:   See [RFC 8259, section
    11](https://www.rfc-editor.org/rfc/rfc8259#section-11).

Security considerations:
:   See [RFC 8259, section
    12](https://www.rfc-editor.org/rfc/rfc8259#section-12)
    \[[RFC8259](#bib-rfc8259 "The JavaScript Object Notation (JSON) Data Interchange Format"){.bibref
    link-type="biblio"}\].

Interoperability considerations:
:   Not Applicable

Published specification:
:   https://www.w3.org/TR/did-core/

Applications that use this media type:
:   Any application that requires an identifier that is decentralized,
    persistent, cryptographically verifiable, and resolvable.
    Applications typically consist of cryptographic identity systems,
    decentralized networks of devices, and websites that issue or verify
    W3C Verifiable Credentials.

Additional information:

:   

    Magic number(s):
    :   Not Applicable

    File extension(s):
    :   .didjson

    Macintosh file type code(s):
    :   TEXT

Person & email address to contact for further information:
:   Ivan Herman \<ivan@w3.org\>

Intended usage:
:   Common

Restrictions on usage:
:   None

Author(s):
:   Drummond Reed, Manu Sporny, Markus Sabadello, Dave Longley,
    Christopher Allen

Change controller:
:   W3C

Fragment identifiers used with
[application/did+json](#application-did-json) are treated according to
the rules defined in [Fragment](#fragment){.sec-ref}.
::::

:::::: {#application-did-ld-json .section}
::: header-wrapper
### E.2 application/did+ld+json {#e-2-application-did-ld-json}

[](#application-did-ld-json){.self-link
aria-label="Permalink for Appendix E.2"}
:::

:::: {#issue-container-generatedID-18 .note role="note"}
::: {#h-note-18 .note-title .marker role="heading" aria-level="4"}
Note[: IETF Structured Media Types]{.issue-label}
:::

The Candidate Recommendation phase for this specification received a
significant number of implementations for the `application/did+ld+json`
media type. Registration of the media type `application/did+ld+json` at
IANA is pending resolution of the [Media Types with Multiple
Suffixes](https://datatracker.ietf.org/doc/html/draft-w3cdidwg-media-types-with-multiple-suffixes)
issue. Work is expected to continue in the [IETF Media Type Maintenance
Working Group](https://datatracker.ietf.org/wg/mediaman/about/) with a
registration of the `application/did+ld+json` media type by W3C
following shortly after the publication of the [Media Types with
Multiple
Suffixes](https://datatracker.ietf.org/doc/html/draft-w3cdidwg-media-types-with-multiple-suffixes)
RFC.
::::

Type name:
:   application

Subtype name:
:   did+ld+json

Required parameters:
:   None

Optional parameters:
:   None

Encoding considerations:
:   See [RFC 8259, section
    11](https://www.rfc-editor.org/rfc/rfc8259#section-11).

Security considerations:
:   See [JSON-LD 1.1, Security
    Considerations](https://www.w3.org/TR/json-ld11/#security)
    \[[JSON-LD11](#bib-json-ld11 "JSON-LD 1.1"){.bibref
    link-type="biblio"}\].

Interoperability considerations:
:   Not Applicable

Published specification:
:   https://www.w3.org/TR/did-core/

Applications that use this media type:
:   Any application that requires an identifier that is decentralized,
    persistent, cryptographically verifiable, and resolvable.
    Applications typically consist of cryptographic identity systems,
    decentralized networks of devices, and websites that issue or verify
    W3C Verifiable Credentials.

Additional information:

:   

    Magic number(s):
    :   Not Applicable

    File extension(s):
    :   .didjsonld

    Macintosh file type code(s):
    :   TEXT

Person & email address to contact for further information:
:   Ivan Herman \<ivan@w3.org\>

Intended usage:
:   Common

Restrictions on usage:
:   None

Author(s):
:   Drummond Reed, Manu Sporny, Markus Sabadello, Dave Longley,
    Christopher Allen

Change controller:
:   W3C

Fragment identifiers used with
[application/did+ld+json](#application-did-ld-json) are treated
according to the rules associated with the [JSON-LD 1.1:
application/ld+json media
type](https://www.w3.org/TR/json-ld11/#iana-considerations)
\[[JSON-LD11](#bib-json-ld11 "JSON-LD 1.1"){.bibref
link-type="biblio"}\].
::::::
::::::::::

:::::::: {#references .section .appendix}
::: header-wrapper
## F. References {#f-references}

[](#references){.self-link aria-label="Permalink for Appendix F."}
:::

:::: {#normative-references .section}
::: header-wrapper
### F.1 Normative references {#f-1-normative-references}

[](#normative-references){.self-link
aria-label="Permalink for Appendix F.1"}
:::

\[INFRA\]
:   [Infra Standard](https://infra.spec.whatwg.org/). Anne van Kesteren;
    Domenic Denicola. WHATWG. Living Standard. URL:
    <https://infra.spec.whatwg.org/>

\[JSON-LD11\]
:   [JSON-LD 1.1](https://www.w3.org/TR/json-ld11/). Gregg Kellogg;
    Pierre-Antoine Champin; Dave Longley. W3C. 16 July 2020. W3C
    Recommendation. URL: <https://www.w3.org/TR/json-ld11/>

\[RFC2119\]
:   [Key words for use in RFCs to Indicate Requirement
    Levels](https://www.rfc-editor.org/rfc/rfc2119). S. Bradner. IETF.
    March 1997. Best Current Practice. URL:
    <https://www.rfc-editor.org/rfc/rfc2119>

\[RFC3552\]
:   [Guidelines for Writing RFC Text on Security
    Considerations](https://www.rfc-editor.org/rfc/rfc3552). E.
    Rescorla; B. Korver. IETF. July 2003. Best Current Practice. URL:
    <https://www.rfc-editor.org/rfc/rfc3552>

\[RFC3986\]
:   [Uniform Resource Identifier (URI): Generic
    Syntax](https://www.rfc-editor.org/rfc/rfc3986). T. Berners-Lee; R.
    Fielding; L. Masinter. IETF. January 2005. Internet Standard. URL:
    <https://www.rfc-editor.org/rfc/rfc3986>

\[RFC5234\]
:   [Augmented BNF for Syntax Specifications:
    ABNF](https://www.rfc-editor.org/rfc/rfc5234). D. Crocker, Ed.; P.
    Overell. IETF. January 2008. Internet Standard. URL:
    <https://www.rfc-editor.org/rfc/rfc5234>

\[RFC7517\]
:   [JSON Web Key (JWK)](https://www.rfc-editor.org/rfc/rfc7517). M.
    Jones. IETF. May 2015. Proposed Standard. URL:
    <https://www.rfc-editor.org/rfc/rfc7517>

\[RFC7638\]
:   [JSON Web Key (JWK)
    Thumbprint](https://www.rfc-editor.org/rfc/rfc7638). M. Jones; N.
    Sakimura. IETF. September 2015. Proposed Standard. URL:
    <https://www.rfc-editor.org/rfc/rfc7638>

\[RFC8174\]
:   [Ambiguity of Uppercase vs Lowercase in RFC 2119 Key
    Words](https://www.rfc-editor.org/rfc/rfc8174). B. Leiba. IETF.
    May 2017. Best Current Practice. URL:
    <https://www.rfc-editor.org/rfc/rfc8174>

\[RFC8259\]
:   [The JavaScript Object Notation (JSON) Data Interchange
    Format](https://www.rfc-editor.org/rfc/rfc8259). T. Bray, Ed.. IETF.
    December 2017. Internet Standard. URL:
    <https://www.rfc-editor.org/rfc/rfc8259>

\[url\]
:   [URL Standard](https://url.spec.whatwg.org/). Anne van Kesteren.
    WHATWG. Living Standard. URL: <https://url.spec.whatwg.org/>

\[XMLSCHEMA11-2\]
:   [W3C XML Schema Definition Language (XSD) 1.1 Part 2:
    Datatypes](https://www.w3.org/TR/xmlschema11-2/). David Peterson;
    Sandy Gao; Ashok Malhotra; Michael Sperberg-McQueen; Henry Thompson;
    Paul V. Biron et al. W3C. 5 April 2012. W3C Recommendation. URL:
    <https://www.w3.org/TR/xmlschema11-2/>
::::

:::: {#informative-references .section}
::: header-wrapper
### F.2 Informative references {#f-2-informative-references}

[](#informative-references){.self-link
aria-label="Permalink for Appendix F.2"}
:::

\[DID-RESOLUTION\]
:   [Decentralized Identifier
    Resolution](https://w3c-ccg.github.io/did-resolution/). Markus
    Sabadello; Dmitri Zagidulin. Credentials Community Group. Draft
    Community Group Report. URL:
    <https://w3c-ccg.github.io/did-resolution/>

\[DID-RUBRIC\]
:   [Decentralized Characteristics Rubric
    v1.0](https://w3c.github.io/did-rubric/). Joe Andrieu. Credentials
    Community Group. Draft Community Group Report. URL:
    <https://w3c.github.io/did-rubric/>

\[DID-SPEC-REGISTRIES\]
:   [DID Specification
    Registries](https://www.w3.org/TR/did-spec-registries/). Orie
    Steele; Manu Sporny; Michael Prorock. W3C. 28 June 2022. W3C Working
    Group Note. URL: <https://www.w3.org/TR/did-spec-registries/>

\[DID-USE-CASES\]
:   [Use Cases and Requirements for Decentralized
    Identifiers](https://www.w3.org/TR/did-use-cases/). Joe Andrieu;
    Phil Archer; Kim Duffy; Ryan Grant; Adrian Gropper. W3C. 17
    March 2021. W3C Working Group Note. URL:
    <https://www.w3.org/TR/did-use-cases/>

\[DNS-DID\]
:   [The Decentralized Identifier (DID) in the
    DNS](https://datatracker.ietf.org/doc/draft-mayrhofer-did-dns/).
    Alexander Mayrhofer; Dimitrij Klesev; Markus Sabadello.
    February 2019. Internet-Draft. URL:
    <https://datatracker.ietf.org/doc/draft-mayrhofer-did-dns/>

\[HASHLINK\]
:   [Cryptographic
    Hyperlinks](https://tools.ietf.org/html/draft-sporny-hashlink-05).
    Manu Sporny. IETF. December 2018. Internet-Draft. URL:
    <https://tools.ietf.org/html/draft-sporny-hashlink-05>

\[IANA-URI-SCHEMES\]
:   [Uniform Resource Identifier (URI)
    Schemes](https://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml).
    IANA. URL:
    <https://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml>

\[MATRIX-URIS\]
:   [Matrix URIs - Ideas about Web
    Architecture](https://www.w3.org/DesignIssues/MatrixURIs.html). Tim
    Berners-Lee. December 1996. Personal View. URL:
    <https://www.w3.org/DesignIssues/MatrixURIs.html>

\[MULTIBASE\]
:   [The Multibase Encoding
    Scheme](https://datatracker.ietf.org/doc/html/draft-multiformats-multibase-03).
    Juan Benet; Manu Sporny. IETF. February 2021. Internet-Draft. URL:
    <https://datatracker.ietf.org/doc/html/draft-multiformats-multibase-03>

\[PRIVACY-BY-DESIGN\]
:   [Privacy by
    Design](https://iapp.org/media/pdf/resource_center/pbd_implement_7found_principles.pdf).
    Ann Cavoukian. Information and Privacy Commissioner. 2011. URL:
    <https://iapp.org/media/pdf/resource_center/pbd_implement_7found_principles.pdf>

\[RFC4122\]
:   [A Universally Unique IDentifier (UUID) URN
    Namespace](https://www.rfc-editor.org/rfc/rfc4122). P. Leach; M.
    Mealling; R. Salz. IETF. July 2005. Proposed Standard. URL:
    <https://www.rfc-editor.org/rfc/rfc4122>

\[RFC6901\]
:   [JavaScript Object Notation (JSON)
    Pointer](https://www.rfc-editor.org/rfc/rfc6901). P. Bryan, Ed.; K.
    Zyp; M. Nottingham, Ed.. IETF. April 2013. Proposed Standard. URL:
    <https://www.rfc-editor.org/rfc/rfc6901>

\[RFC6973\]
:   [Privacy Considerations for Internet
    Protocols](https://www.rfc-editor.org/rfc/rfc6973). A. Cooper; H.
    Tschofenig; B. Aboba; J. Peterson; J. Morris; M. Hansen; R. Smith.
    IETF. July 2013. Informational. URL:
    <https://www.rfc-editor.org/rfc/rfc6973>

\[RFC7230\]
:   [Hypertext Transfer Protocol (HTTP/1.1): Message Syntax and
    Routing](https://httpwg.org/specs/rfc7230.html). R. Fielding,
    Ed.; J. Reschke, Ed.. IETF. June 2014. Proposed Standard. URL:
    <https://httpwg.org/specs/rfc7230.html>

\[RFC7231\]
:   [Hypertext Transfer Protocol (HTTP/1.1): Semantics and
    Content](https://httpwg.org/specs/rfc7231.html). R. Fielding,
    Ed.; J. Reschke, Ed.. IETF. June 2014. Proposed Standard. URL:
    <https://httpwg.org/specs/rfc7231.html>

\[RFC8141\]
:   [Uniform Resource Names
    (URNs)](https://www.rfc-editor.org/rfc/rfc8141). P. Saint-Andre; J.
    Klensin. IETF. April 2017. Proposed Standard. URL:
    <https://www.rfc-editor.org/rfc/rfc8141>

\[VC-DATA-MODEL\]
:   [Verifiable Credentials Data Model
    v1.1](https://www.w3.org/TR/vc-data-model/). Manu Sporny; Grant
    Noble; Dave Longley; Daniel Burnett; Brent Zundel; Kyle Den Hartog.
    W3C. 3 March 2022. W3C Recommendation. URL:
    <https://www.w3.org/TR/vc-data-model/>
::::
::::::::

[↑](#title)

:::: {#dfn-panel-for-dfn-conforming-did .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: conforming DID"}
[]{.caret}

<div>

[Permalink](#dfn-conforming-did){.self-link
aria-label="Permalink for definition: conforming DID. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 1.4
    Conformance](#ref-for-dfn-conforming-did-1 "§ 1.4 Conformance")
    [(2)](#ref-for-dfn-conforming-did-2 "Reference 2")
::::

:::: {#dfn-panel-for-dfn-conforming-did-document .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: conforming DID document"}
[]{.caret}

<div>

[Permalink](#dfn-conforming-did-document){.self-link
aria-label="Permalink for definition: conforming DID document. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 1.4
    Conformance](#ref-for-dfn-conforming-did-document-1 "§ 1.4 Conformance")
    [(2)](#ref-for-dfn-conforming-did-document-2 "Reference 2")
-   [§ 7.1 DID
    Resolution](#ref-for-dfn-conforming-did-document-3 "§ 7.1 DID Resolution")
::::

:::: {#dfn-panel-for-dfn-conforming-producer .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: conforming producer"}
[]{.caret}

<div>

[Permalink](#dfn-conforming-producer){.self-link
aria-label="Permalink for definition: conforming producer. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 5.4
    Services](#ref-for-dfn-conforming-producer-1 "§ 5.4 Services")
-   [§ 6.1 Production and
    Consumption](#ref-for-dfn-conforming-producer-2 "§ 6.1 Production and Consumption")
    [(2)](#ref-for-dfn-conforming-producer-3 "Reference 2")
    [(3)](#ref-for-dfn-conforming-producer-4 "Reference 3")
    [(4)](#ref-for-dfn-conforming-producer-5 "Reference 4")
    [(5)](#ref-for-dfn-conforming-producer-6 "Reference 5")
-   [§ 6.2.1
    Production](#ref-for-dfn-conforming-producer-7 "§ 6.2.1 Production")
    [(2)](#ref-for-dfn-conforming-producer-8 "Reference 2")
-   [§ 6.3.1
    Production](#ref-for-dfn-conforming-producer-9 "§ 6.3.1 Production")
    [(2)](#ref-for-dfn-conforming-producer-10 "Reference 2")
    [(3)](#ref-for-dfn-conforming-producer-11 "Reference 3")
::::

:::: {#dfn-panel-for-dfn-conforming-consumer .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: conforming consumer"}
[]{.caret}

<div>

[Permalink](#dfn-conforming-consumer){.self-link
aria-label="Permalink for definition: conforming consumer. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 5.4
    Services](#ref-for-dfn-conforming-consumer-1 "§ 5.4 Services")
-   [§ 6.1 Production and
    Consumption](#ref-for-dfn-conforming-consumer-2 "§ 6.1 Production and Consumption")
    [(2)](#ref-for-dfn-conforming-consumer-3 "Reference 2")
    [(3)](#ref-for-dfn-conforming-consumer-4 "Reference 3")
    [(4)](#ref-for-dfn-conforming-consumer-5 "Reference 4")
    [(5)](#ref-for-dfn-conforming-consumer-6 "Reference 5")
    [(6)](#ref-for-dfn-conforming-consumer-7 "Reference 6")
-   [§ 6.2.2
    Consumption](#ref-for-dfn-conforming-consumer-8 "§ 6.2.2 Consumption")
    [(2)](#ref-for-dfn-conforming-consumer-9 "Reference 2")
    [(3)](#ref-for-dfn-conforming-consumer-10 "Reference 3")
-   [§ 6.3.1
    Production](#ref-for-dfn-conforming-consumer-11 "§ 6.3.1 Production")
-   [§ 6.3.2
    Consumption](#ref-for-dfn-conforming-consumer-12 "§ 6.3.2 Consumption")
    [(2)](#ref-for-dfn-conforming-consumer-13 "Reference 2")
::::

:::: {#dfn-panel-for-dfn-amplification .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: amplification attack"}
[]{.caret}

<div>

[Permalink](#dfn-amplification){.self-link
aria-label="Permalink for definition: amplification attack. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 8.3 Security
    Requirements](#ref-for-dfn-amplification-1 "§ 8.3 Security Requirements")
::::

:::: {#dfn-panel-for-dfn-authenticated .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: authenticate"}
[]{.caret}

<div>

[Permalink](#dfn-authenticated){.self-link
aria-label="Permalink for definition: authenticate. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 1.1 A Simple
    Example](#ref-for-dfn-authenticated-1 "§ 1.1 A Simple Example")
-   [§ 2. Terminology](#ref-for-dfn-authenticated-2 "§ 2. Terminology")
    [(2)](#ref-for-dfn-authenticated-3 "Reference 2")
    [(3)](#ref-for-dfn-authenticated-4 "Reference 3")
-   [§ 5.2 Verification
    Methods](#ref-for-dfn-authenticated-5 "§ 5.2 Verification Methods")
-   [§ 5.3.1
    Authentication](#ref-for-dfn-authenticated-6 "§ 5.3.1 Authentication")
    [(2)](#ref-for-dfn-authenticated-7 "Reference 2")
    [(3)](#ref-for-dfn-authenticated-8 "Reference 3")
    [(4)](#ref-for-dfn-authenticated-9 "Reference 4")
    [(5)](#ref-for-dfn-authenticated-10 "Reference 5")
    [(6)](#ref-for-dfn-authenticated-11 "Reference 6")
-   [§ B.12 Changing the DID
    controller](#ref-for-dfn-authenticated-12 "§ B.12 Changing the DID controller")
::::

:::: {#dfn-panel-for-dfn-cryptosuite .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: cryptographic suite"}
[]{.caret}

<div>

[Permalink](#dfn-cryptosuite){.self-link
aria-label="Permalink for definition: cryptographic suite. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 5.2.1 Verification
    Material](#ref-for-dfn-cryptosuite-1 "§ 5.2.1 Verification Material")
::::

:::: {#dfn-panel-for-dfn-decentralized-identifiers .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: decentralized identifier"}
[]{.caret}

<div>

[Permalink](#dfn-decentralized-identifiers){.self-link
aria-label="Permalink for definition: decentralized identifier. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ Abstract](#ref-for-dfn-decentralized-identifiers-1 "§ Abstract")
    [(2)](#ref-for-dfn-decentralized-identifiers-2 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-3 "Reference 3")
    [(4)](#ref-for-dfn-decentralized-identifiers-4 "Reference 4")
    [(5)](#ref-for-dfn-decentralized-identifiers-5 "Reference 5")
    [(6)](#ref-for-dfn-decentralized-identifiers-6 "Reference 6")
    [(7)](#ref-for-dfn-decentralized-identifiers-7 "Reference 7")
    [(8)](#ref-for-dfn-decentralized-identifiers-8 "Reference 8")
    [(9)](#ref-for-dfn-decentralized-identifiers-9 "Reference 9")
-   [§ 1.1 A Simple
    Example](#ref-for-dfn-decentralized-identifiers-10 "§ 1.1 A Simple Example")
    [(2)](#ref-for-dfn-decentralized-identifiers-11 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-12 "Reference 3")
-   [§ 1.2 Design
    Goals](#ref-for-dfn-decentralized-identifiers-13 "§ 1.2 Design Goals")
    [(2)](#ref-for-dfn-decentralized-identifiers-14 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-15 "Reference 3")
    [(4)](#ref-for-dfn-decentralized-identifiers-16 "Reference 4")
-   [§ 1.3 Architecture
    Overview](#ref-for-dfn-decentralized-identifiers-17 "§ 1.3 Architecture Overview")
    [(2)](#ref-for-dfn-decentralized-identifiers-18 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-19 "Reference 3")
    [(4)](#ref-for-dfn-decentralized-identifiers-20 "Reference 4")
    [(5)](#ref-for-dfn-decentralized-identifiers-21 "Reference 5")
    [(6)](#ref-for-dfn-decentralized-identifiers-22 "Reference 6")
    [(7)](#ref-for-dfn-decentralized-identifiers-23 "Reference 7")
    [(8)](#ref-for-dfn-decentralized-identifiers-24 "Reference 8")
    [(9)](#ref-for-dfn-decentralized-identifiers-25 "Reference 9")
    [(10)](#ref-for-dfn-decentralized-identifiers-26 "Reference 10")
    [(11)](#ref-for-dfn-decentralized-identifiers-27 "Reference 11")
    [(12)](#ref-for-dfn-decentralized-identifiers-28 "Reference 12")
    [(13)](#ref-for-dfn-decentralized-identifiers-29 "Reference 13")
    [(14)](#ref-for-dfn-decentralized-identifiers-30 "Reference 14")
-   [§ 1.4
    Conformance](#ref-for-dfn-decentralized-identifiers-31 "§ 1.4 Conformance")
    [(2)](#ref-for-dfn-decentralized-identifiers-32 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-33 "Reference 3")
    [(4)](#ref-for-dfn-decentralized-identifiers-34 "Reference 4")
    [(5)](#ref-for-dfn-decentralized-identifiers-35 "Reference 5")
-   [§ 2.
    Terminology](#ref-for-dfn-decentralized-identifiers-36 "§ 2. Terminology")
    [(2)](#ref-for-dfn-decentralized-identifiers-37 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-38 "Reference 3")
    [(5)](#ref-for-dfn-decentralized-identifiers-40 "Reference 5")
    [(6)](#ref-for-dfn-decentralized-identifiers-41 "Reference 6")
    [(7)](#ref-for-dfn-decentralized-identifiers-42 "Reference 7")
    [(8)](#ref-for-dfn-decentralized-identifiers-43 "Reference 8")
    [(9)](#ref-for-dfn-decentralized-identifiers-44 "Reference 9")
    [(10)](#ref-for-dfn-decentralized-identifiers-45 "Reference 10")
    [(11)](#ref-for-dfn-decentralized-identifiers-46 "Reference 11")
    [(12)](#ref-for-dfn-decentralized-identifiers-47 "Reference 12")
    [(13)](#ref-for-dfn-decentralized-identifiers-48 "Reference 13")
    [(14)](#ref-for-dfn-decentralized-identifiers-49 "Reference 14")
    [(15)](#ref-for-dfn-decentralized-identifiers-50 "Reference 15")
    [(16)](#ref-for-dfn-decentralized-identifiers-51 "Reference 16")
    [(17)](#ref-for-dfn-decentralized-identifiers-52 "Reference 17")
    [(18)](#ref-for-dfn-decentralized-identifiers-53 "Reference 18")
-   [§ 3.
    Identifier](#ref-for-dfn-decentralized-identifiers-54 "§ 3. Identifier")
    [(2)](#ref-for-dfn-decentralized-identifiers-55 "Reference 2")
-   [§ 3.1 DID
    Syntax](#ref-for-dfn-decentralized-identifiers-56 "§ 3.1 DID Syntax")
    [(2)](#ref-for-dfn-decentralized-identifiers-57 "Reference 2")
-   [§ 3.2.1 DID
    Parameters](#ref-for-dfn-decentralized-identifiers-58 "§ 3.2.1 DID Parameters")
    [(2)](#ref-for-dfn-decentralized-identifiers-59 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-60 "Reference 3")
-   [§ 3.2.2 Relative DID
    URLs](#ref-for-dfn-decentralized-identifiers-61 "§ 3.2.2 Relative DID URLs")
-   [§ 5. Core
    Properties](#ref-for-dfn-decentralized-identifiers-62 "§ 5. Core Properties")
-   [§ 5.1.1 DID
    Subject](#ref-for-dfn-decentralized-identifiers-63 "§ 5.1.1 DID Subject")
    [(2)](#ref-for-dfn-decentralized-identifiers-64 "Reference 2")
-   [§ 5.1.2 DID
    Controller](#ref-for-dfn-decentralized-identifiers-65 "§ 5.1.2 DID Controller")
    [(2)](#ref-for-dfn-decentralized-identifiers-66 "Reference 2")
-   [§ 5.1.3 Also Known
    As](#ref-for-dfn-decentralized-identifiers-67 "§ 5.1.3 Also Known As")
-   [§ 5.2.1 Verification
    Material](#ref-for-dfn-decentralized-identifiers-68 "§ 5.2.1 Verification Material")
-   [§ 5.3.1
    Authentication](#ref-for-dfn-decentralized-identifiers-69 "§ 5.3.1 Authentication")
-   [§ 6.1 Production and
    Consumption](#ref-for-dfn-decentralized-identifiers-70 "§ 6.1 Production and Consumption")
    [(2)](#ref-for-dfn-decentralized-identifiers-71 "Reference 2")
-   [§ 7.1 DID
    Resolution](#ref-for-dfn-decentralized-identifiers-72 "§ 7.1 DID Resolution")
    [(2)](#ref-for-dfn-decentralized-identifiers-73 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-74 "Reference 3")
    [(4)](#ref-for-dfn-decentralized-identifiers-75 "Reference 4")
-   [§ 7.1.2 DID Resolution
    Metadata](#ref-for-dfn-decentralized-identifiers-76 "§ 7.1.2 DID Resolution Metadata")
-   [§ 7.1.3 DID Document
    Metadata](#ref-for-dfn-decentralized-identifiers-77 "§ 7.1.3 DID Document Metadata")
    [(2)](#ref-for-dfn-decentralized-identifiers-78 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-79 "Reference 3")
    [(4)](#ref-for-dfn-decentralized-identifiers-80 "Reference 4")
    [(5)](#ref-for-dfn-decentralized-identifiers-81 "Reference 5")
    [(6)](#ref-for-dfn-decentralized-identifiers-82 "Reference 6")
    [(7)](#ref-for-dfn-decentralized-identifiers-83 "Reference 7")
    [(8)](#ref-for-dfn-decentralized-identifiers-84 "Reference 8")
-   [§ 7.2 DID URL
    Dereferencing](#ref-for-dfn-decentralized-identifiers-85 "§ 7.2 DID URL Dereferencing")
-   [§ 7.3 Metadata
    Structure](#ref-for-dfn-decentralized-identifiers-86 "§ 7.3 Metadata Structure")
-   [§ 8.
    Methods](#ref-for-dfn-decentralized-identifiers-87 "§ 8. Methods")
    [(2)](#ref-for-dfn-decentralized-identifiers-88 "Reference 2")
-   [§ 8.1 Method
    Syntax](#ref-for-dfn-decentralized-identifiers-89 "§ 8.1 Method Syntax")
    [(2)](#ref-for-dfn-decentralized-identifiers-90 "Reference 2")
-   [§ 8.2 Method
    Operations](#ref-for-dfn-decentralized-identifiers-91 "§ 8.2 Method Operations")
    [(2)](#ref-for-dfn-decentralized-identifiers-92 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-93 "Reference 3")
-   [§ 8.3 Security
    Requirements](#ref-for-dfn-decentralized-identifiers-94 "§ 8.3 Security Requirements")
    [(2)](#ref-for-dfn-decentralized-identifiers-95 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-96 "Reference 3")
-   [§ 9. Security
    Considerations](#ref-for-dfn-decentralized-identifiers-97 "§ 9. Security Considerations")
    [(2)](#ref-for-dfn-decentralized-identifiers-98 "Reference 2")
-   [§ 9.2 Proving Control and
    Binding](#ref-for-dfn-decentralized-identifiers-99 "§ 9.2 Proving Control and Binding")
    [(2)](#ref-for-dfn-decentralized-identifiers-100 "Reference 2")
-   [§ Proving Control of a DID and/or DID
    Document](#ref-for-dfn-decentralized-identifiers-101 "§ Proving Control of a DID and/or DID Document")
    [(2)](#ref-for-dfn-decentralized-identifiers-102 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-103 "Reference 3")
    [(4)](#ref-for-dfn-decentralized-identifiers-104 "Reference 4")
-   [§ Binding to Physical
    Identity](#ref-for-dfn-decentralized-identifiers-105 "§ Binding to Physical Identity")
    [(2)](#ref-for-dfn-decentralized-identifiers-106 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-107 "Reference 3")
    [(4)](#ref-for-dfn-decentralized-identifiers-108 "Reference 4")
-   [§ 9.4
    Non-Repudiation](#ref-for-dfn-decentralized-identifiers-109 "§ 9.4 Non-Repudiation")
-   [§ 9.5 Notification of DID Document
    Changes](#ref-for-dfn-decentralized-identifiers-110 "§ 9.5 Notification of DID Document Changes")
    [(2)](#ref-for-dfn-decentralized-identifiers-111 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-112 "Reference 3")
-   [§ 9.6 Key and Signature
    Expiration](#ref-for-dfn-decentralized-identifiers-113 "§ 9.6 Key and Signature Expiration")
-   [§ 9.7 Verification Method
    Rotation](#ref-for-dfn-decentralized-identifiers-114 "§ 9.7 Verification Method Rotation")
-   [§ 9.8 Verification Method
    Revocation](#ref-for-dfn-decentralized-identifiers-115 "§ 9.8 Verification Method Revocation")
-   [§ Revocation
    Semantics](#ref-for-dfn-decentralized-identifiers-116 "§ Revocation Semantics")
    [(2)](#ref-for-dfn-decentralized-identifiers-117 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-118 "Reference 3")
    [(4)](#ref-for-dfn-decentralized-identifiers-119 "Reference 4")
    [(5)](#ref-for-dfn-decentralized-identifiers-120 "Reference 5")
    [(6)](#ref-for-dfn-decentralized-identifiers-121 "Reference 6")
-   [§ 9.9 DID
    Recovery](#ref-for-dfn-decentralized-identifiers-122 "§ 9.9 DID Recovery")
    [(2)](#ref-for-dfn-decentralized-identifiers-123 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-124 "Reference 3")
-   [§ 9.10 The Role of Human-Friendly
    Identifiers](#ref-for-dfn-decentralized-identifiers-125 "§ 9.10 The Role of Human-Friendly Identifiers")
    [(2)](#ref-for-dfn-decentralized-identifiers-126 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-127 "Reference 3")
-   [§ 9.11 DIDs as Enhanced
    URNs](#ref-for-dfn-decentralized-identifiers-128 "§ 9.11 DIDs as Enhanced URNs")
    [(2)](#ref-for-dfn-decentralized-identifiers-129 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-130 "Reference 3")
    [(4)](#ref-for-dfn-decentralized-identifiers-131 "Reference 4")
    [(5)](#ref-for-dfn-decentralized-identifiers-132 "Reference 5")
    [(6)](#ref-for-dfn-decentralized-identifiers-133 "Reference 6")
    [(7)](#ref-for-dfn-decentralized-identifiers-134 "Reference 7")
    [(8)](#ref-for-dfn-decentralized-identifiers-135 "Reference 8")
-   [§ 9.14 Equivalence
    Properties](#ref-for-dfn-decentralized-identifiers-136 "§ 9.14 Equivalence Properties")
    [(2)](#ref-for-dfn-decentralized-identifiers-137 "Reference 2")
-   [§ 9.16
    Persistence](#ref-for-dfn-decentralized-identifiers-138 "§ 9.16 Persistence")
    [(2)](#ref-for-dfn-decentralized-identifiers-139 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-140 "Reference 3")
    [(4)](#ref-for-dfn-decentralized-identifiers-141 "Reference 4")
    [(5)](#ref-for-dfn-decentralized-identifiers-142 "Reference 5")
    [(6)](#ref-for-dfn-decentralized-identifiers-143 "Reference 6")
    [(7)](#ref-for-dfn-decentralized-identifiers-144 "Reference 7")
    [(8)](#ref-for-dfn-decentralized-identifiers-145 "Reference 8")
    [(9)](#ref-for-dfn-decentralized-identifiers-146 "Reference 9")
    [(10)](#ref-for-dfn-decentralized-identifiers-147 "Reference 10")
-   [§ 10. Privacy
    Considerations](#ref-for-dfn-decentralized-identifiers-148 "§ 10. Privacy Considerations")
    [(2)](#ref-for-dfn-decentralized-identifiers-149 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-150 "Reference 3")
-   [§ 10.1 Keep Personal Data
    Private](#ref-for-dfn-decentralized-identifiers-151 "§ 10.1 Keep Personal Data Private")
-   [§ 10.2 DID Correlation
    Risks](#ref-for-dfn-decentralized-identifiers-152 "§ 10.2 DID Correlation Risks")
    [(2)](#ref-for-dfn-decentralized-identifiers-153 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-154 "Reference 3")
    [(4)](#ref-for-dfn-decentralized-identifiers-155 "Reference 4")
    [(5)](#ref-for-dfn-decentralized-identifiers-156 "Reference 5")
    [(6)](#ref-for-dfn-decentralized-identifiers-157 "Reference 6")
-   [§ 10.3 DID Document Correlation
    Risks](#ref-for-dfn-decentralized-identifiers-158 "§ 10.3 DID Document Correlation Risks")
    [(2)](#ref-for-dfn-decentralized-identifiers-159 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-160 "Reference 3")
    [(4)](#ref-for-dfn-decentralized-identifiers-161 "Reference 4")
    [(5)](#ref-for-dfn-decentralized-identifiers-162 "Reference 5")
    [(6)](#ref-for-dfn-decentralized-identifiers-163 "Reference 6")
-   [§ 10.4 DID Subject
    Classification](#ref-for-dfn-decentralized-identifiers-164 "§ 10.4 DID Subject Classification")
    [(2)](#ref-for-dfn-decentralized-identifiers-165 "Reference 2")
-   [§ 10.5 Herd
    Privacy](#ref-for-dfn-decentralized-identifiers-166 "§ 10.5 Herd Privacy")
-   [§ 10.6 Service
    Privacy](#ref-for-dfn-decentralized-identifiers-167 "§ 10.6 Service Privacy")
    [(2)](#ref-for-dfn-decentralized-identifiers-168 "Reference 2")
-   [§ Maintaining Herd
    Privacy](#ref-for-dfn-decentralized-identifiers-169 "§ Maintaining Herd Privacy")
    [(2)](#ref-for-dfn-decentralized-identifiers-170 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-171 "Reference 3")
    [(4)](#ref-for-dfn-decentralized-identifiers-172 "Reference 4")
-   [§ B.2 Creation of a
    DID](#ref-for-dfn-decentralized-identifiers-173 "§ B.2 Creation of a DID")
    [(2)](#ref-for-dfn-decentralized-identifiers-174 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-175 "Reference 3")
-   [§ B.3 Determining the DID
    subject](#ref-for-dfn-decentralized-identifiers-176 "§ B.3 Determining the DID subject")
    [(2)](#ref-for-dfn-decentralized-identifiers-177 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-178 "Reference 3")
    [(4)](#ref-for-dfn-decentralized-identifiers-179 "Reference 4")
    [(5)](#ref-for-dfn-decentralized-identifiers-180 "Reference 5")
    [(6)](#ref-for-dfn-decentralized-identifiers-181 "Reference 6")
    [(7)](#ref-for-dfn-decentralized-identifiers-182 "Reference 7")
    [(8)](#ref-for-dfn-decentralized-identifiers-183 "Reference 8")
    [(9)](#ref-for-dfn-decentralized-identifiers-184 "Reference 9")
    [(10)](#ref-for-dfn-decentralized-identifiers-185 "Reference 10")
    [(11)](#ref-for-dfn-decentralized-identifiers-186 "Reference 11")
    [(12)](#ref-for-dfn-decentralized-identifiers-187 "Reference 12")
    [(13)](#ref-for-dfn-decentralized-identifiers-188 "Reference 13")
    [(14)](#ref-for-dfn-decentralized-identifiers-189 "Reference 14")
-   [§ B.4 Referring to the DID
    document](#ref-for-dfn-decentralized-identifiers-190 "§ B.4 Referring to the DID document")
    [(2)](#ref-for-dfn-decentralized-identifiers-191 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-192 "Reference 3")
-   [§ B.5 Statements in the DID
    document](#ref-for-dfn-decentralized-identifiers-193 "§ B.5 Statements in the DID document")
-   [§ B.6 Discovering more information about the DID
    subject](#ref-for-dfn-decentralized-identifiers-194 "§ B.6 Discovering more information about the DID subject")
    [(2)](#ref-for-dfn-decentralized-identifiers-195 "Reference 2")
-   [§ B.7 Serving a representation of the DID
    subject](#ref-for-dfn-decentralized-identifiers-196 "§ B.7 Serving a representation of the DID subject")
    [(2)](#ref-for-dfn-decentralized-identifiers-197 "Reference 2")
-   [§ B.8 Assigning DIDs to existing web
    resources](#ref-for-dfn-decentralized-identifiers-198 "§ B.8 Assigning DIDs to existing web resources")
    [(2)](#ref-for-dfn-decentralized-identifiers-199 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-200 "Reference 3")
    [(4)](#ref-for-dfn-decentralized-identifiers-201 "Reference 4")
-   [§ B.9.1 Set #1: The DID subject is the DID
    controller](#ref-for-dfn-decentralized-identifiers-202 "§ B.9.1 Set #1: The DID subject is the DID controller")
-   [§ B.9.2 Set #2: The DID subject is not the DID
    controller](#ref-for-dfn-decentralized-identifiers-203 "§ B.9.2 Set #2: The DID subject is not the DID controller")
    [(2)](#ref-for-dfn-decentralized-identifiers-204 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-205 "Reference 3")
-   [§ B.10.1 Independent
    Control](#ref-for-dfn-decentralized-identifiers-206 "§ B.10.1 Independent Control")
-   [§ B.11 Changing the DID
    subject](#ref-for-dfn-decentralized-identifiers-207 "§ B.11 Changing the DID subject")
    [(2)](#ref-for-dfn-decentralized-identifiers-208 "Reference 2")
    [(3)](#ref-for-dfn-decentralized-identifiers-209 "Reference 3")
::::

:::: {#dfn-panel-for-dfn-decentralized-identity-management .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: decentralized identity management"}
[]{.caret}

<div>

[Permalink](#dfn-decentralized-identity-management){.self-link
aria-label="Permalink for definition: decentralized identity management. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 5.4
    Services](#ref-for-dfn-decentralized-identity-management-1 "§ 5.4 Services")
::::

:::: {#dfn-panel-for-dfn-did-controllers .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: DID controller"}
[]{.caret}

<div>

[Permalink](#dfn-did-controllers){.self-link
aria-label="Permalink for definition: DID controller. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ Abstract](#ref-for-dfn-did-controllers-1 "§ Abstract")
-   [§ 1.1 A Simple
    Example](#ref-for-dfn-did-controllers-2 "§ 1.1 A Simple Example")
-   [§ 1.2 Design
    Goals](#ref-for-dfn-did-controllers-3 "§ 1.2 Design Goals")
-   [§ 1.3 Architecture
    Overview](#ref-for-dfn-did-controllers-4 "§ 1.3 Architecture Overview")
    [(2)](#ref-for-dfn-did-controllers-5 "Reference 2")
-   [§ 2.
    Terminology](#ref-for-dfn-did-controllers-6 "§ 2. Terminology")
-   [§ Path](#ref-for-dfn-did-controllers-7 "§ Path")
-   [§ 5.1
    Identifiers](#ref-for-dfn-did-controllers-8 "§ 5.1 Identifiers")
-   [§ 5.1.2 DID
    Controller](#ref-for-dfn-did-controllers-9 "§ 5.1.2 DID Controller")
    [(2)](#ref-for-dfn-did-controllers-10 "Reference 2")
    [(3)](#ref-for-dfn-did-controllers-11 "Reference 3")
-   [§ 5.2 Verification
    Methods](#ref-for-dfn-did-controllers-12 "§ 5.2 Verification Methods")
    [(2)](#ref-for-dfn-did-controllers-13 "Reference 2")
-   [§ 5.3.1
    Authentication](#ref-for-dfn-did-controllers-14 "§ 5.3.1 Authentication")
    [(2)](#ref-for-dfn-did-controllers-15 "Reference 2")
-   [§ 5.3.5 Capability
    Delegation](#ref-for-dfn-did-controllers-16 "§ 5.3.5 Capability Delegation")
-   [§ 8.2 Method
    Operations](#ref-for-dfn-did-controllers-17 "§ 8.2 Method Operations")
    [(2)](#ref-for-dfn-did-controllers-18 "Reference 2")
    [(3)](#ref-for-dfn-did-controllers-19 "Reference 3")
-   [§ 9.5 Notification of DID Document
    Changes](#ref-for-dfn-did-controllers-20 "§ 9.5 Notification of DID Document Changes")
    [(2)](#ref-for-dfn-did-controllers-21 "Reference 2")
-   [§ Revocation
    Semantics](#ref-for-dfn-did-controllers-22 "§ Revocation Semantics")
-   [§ 9.10 The Role of Human-Friendly
    Identifiers](#ref-for-dfn-did-controllers-23 "§ 9.10 The Role of Human-Friendly Identifiers")
-   [§ 9.11 DIDs as Enhanced
    URNs](#ref-for-dfn-did-controllers-24 "§ 9.11 DIDs as Enhanced URNs")
    [(2)](#ref-for-dfn-did-controllers-25 "Reference 2")
    [(3)](#ref-for-dfn-did-controllers-26 "Reference 3")
    [(4)](#ref-for-dfn-did-controllers-27 "Reference 4")
    [(5)](#ref-for-dfn-did-controllers-28 "Reference 5")
    [(6)](#ref-for-dfn-did-controllers-29 "Reference 6")
-   [§ 10. Privacy
    Considerations](#ref-for-dfn-did-controllers-30 "§ 10. Privacy Considerations")
-   [§ 10.1 Keep Personal Data
    Private](#ref-for-dfn-did-controllers-31 "§ 10.1 Keep Personal Data Private")
-   [§ 10.2 DID Correlation
    Risks](#ref-for-dfn-did-controllers-32 "§ 10.2 DID Correlation Risks")
    [(2)](#ref-for-dfn-did-controllers-33 "Reference 2")
-   [§ 10.4 DID Subject
    Classification](#ref-for-dfn-did-controllers-34 "§ 10.4 DID Subject Classification")
-   [§ B.3 Determining the DID
    subject](#ref-for-dfn-did-controllers-35 "§ B.3 Determining the DID subject")
-   [§ B.4 Referring to the DID
    document](#ref-for-dfn-did-controllers-36 "§ B.4 Referring to the DID document")
    [(2)](#ref-for-dfn-did-controllers-37 "Reference 2")
-   [§ B.5 Statements in the DID
    document](#ref-for-dfn-did-controllers-38 "§ B.5 Statements in the DID document")
-   [§ B.6 Discovering more information about the DID
    subject](#ref-for-dfn-did-controllers-39 "§ B.6 Discovering more information about the DID subject")
-   [§ B.9 The relationship between DID controllers and DID
    subjects](#ref-for-dfn-did-controllers-40 "§ B.9 The relationship between DID controllers and DID subjects")
-   [§ B.9.1 Set #1: The DID subject is the DID
    controller](#ref-for-dfn-did-controllers-41 "§ B.9.1 Set #1: The DID subject is the DID controller")
    [(2)](#ref-for-dfn-did-controllers-42 "Reference 2")
    [(3)](#ref-for-dfn-did-controllers-43 "Reference 3")
-   [§ B.9.2 Set #2: The DID subject is not the DID
    controller](#ref-for-dfn-did-controllers-44 "§ B.9.2 Set #2: The DID subject is not the DID controller")
    [(2)](#ref-for-dfn-did-controllers-45 "Reference 2")
-   [§ B.10 Multiple DID
    controllers](#ref-for-dfn-did-controllers-46 "§ B.10 Multiple DID controllers")
-   [§ B.10.1 Independent
    Control](#ref-for-dfn-did-controllers-47 "§ B.10.1 Independent Control")
    [(2)](#ref-for-dfn-did-controllers-48 "Reference 2")
    [(3)](#ref-for-dfn-did-controllers-49 "Reference 3")
    [(4)](#ref-for-dfn-did-controllers-50 "Reference 4")
-   [§ B.10.2 Group
    Control](#ref-for-dfn-did-controllers-51 "§ B.10.2 Group Control")
    [(2)](#ref-for-dfn-did-controllers-52 "Reference 2")
    [(3)](#ref-for-dfn-did-controllers-53 "Reference 3")
    [(4)](#ref-for-dfn-did-controllers-54 "Reference 4")
    [(5)](#ref-for-dfn-did-controllers-55 "Reference 5")
    [(6)](#ref-for-dfn-did-controllers-56 "Reference 6")
    [(7)](#ref-for-dfn-did-controllers-57 "Reference 7")
-   [§ B.11 Changing the DID
    subject](#ref-for-dfn-did-controllers-58 "§ B.11 Changing the DID subject")
-   [§ B.12 Changing the DID
    controller](#ref-for-dfn-did-controllers-59 "§ B.12 Changing the DID controller")
    [(2)](#ref-for-dfn-did-controllers-60 "Reference 2")
    [(3)](#ref-for-dfn-did-controllers-61 "Reference 3")
    [(4)](#ref-for-dfn-did-controllers-62 "Reference 4")
::::

:::: {#dfn-panel-for-dfn-did-delegate .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: DID delegate"}
[]{.caret}

<div>

[Permalink](#dfn-did-delegate){.self-link
aria-label="Permalink for definition: DID delegate. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 2. Terminology](#ref-for-dfn-did-delegate-1 "§ 2. Terminology")
    [(2)](#ref-for-dfn-did-delegate-2 "Reference 2")
::::

:::: {#dfn-panel-for-dfn-did-documents .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: DID document"}
[]{.caret}

<div>

[Permalink](#dfn-did-documents){.self-link
aria-label="Permalink for definition: DID document. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ Abstract](#ref-for-dfn-did-documents-1 "§ Abstract")
    [(2)](#ref-for-dfn-did-documents-2 "Reference 2")
-   [§ 1.1 A Simple
    Example](#ref-for-dfn-did-documents-3 "§ 1.1 A Simple Example")
    [(2)](#ref-for-dfn-did-documents-4 "Reference 2")
-   [§ 1.2 Design
    Goals](#ref-for-dfn-did-documents-5 "§ 1.2 Design Goals")
-   [§ 1.3 Architecture
    Overview](#ref-for-dfn-did-documents-6 "§ 1.3 Architecture Overview")
    [(2)](#ref-for-dfn-did-documents-7 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-8 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-9 "Reference 4")
    [(5)](#ref-for-dfn-did-documents-10 "Reference 5")
    [(6)](#ref-for-dfn-did-documents-11 "Reference 6")
    [(7)](#ref-for-dfn-did-documents-12 "Reference 7")
    [(8)](#ref-for-dfn-did-documents-13 "Reference 8")
    [(9)](#ref-for-dfn-did-documents-14 "Reference 9")
    [(10)](#ref-for-dfn-did-documents-15 "Reference 10")
    [(11)](#ref-for-dfn-did-documents-16 "Reference 11")
    [(12)](#ref-for-dfn-did-documents-17 "Reference 12")
-   [§ 1.4
    Conformance](#ref-for-dfn-did-documents-18 "§ 1.4 Conformance")
    [(2)](#ref-for-dfn-did-documents-19 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-20 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-21 "Reference 4")
    [(5)](#ref-for-dfn-did-documents-22 "Reference 5")
-   [§ 2. Terminology](#ref-for-dfn-did-documents-23 "§ 2. Terminology")
    [(3)](#ref-for-dfn-did-documents-25 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-26 "Reference 4")
    [(5)](#ref-for-dfn-did-documents-27 "Reference 5")
    [(6)](#ref-for-dfn-did-documents-28 "Reference 6")
    [(7)](#ref-for-dfn-did-documents-29 "Reference 7")
    [(8)](#ref-for-dfn-did-documents-30 "Reference 8")
    [(9)](#ref-for-dfn-did-documents-31 "Reference 9")
    [(10)](#ref-for-dfn-did-documents-32 "Reference 10")
    [(11)](#ref-for-dfn-did-documents-33 "Reference 11")
    [(12)](#ref-for-dfn-did-documents-34 "Reference 12")
    [(13)](#ref-for-dfn-did-documents-35 "Reference 13")
    [(14)](#ref-for-dfn-did-documents-36 "Reference 14")
    [(15)](#ref-for-dfn-did-documents-37 "Reference 15")
    [(16)](#ref-for-dfn-did-documents-38 "Reference 16")
    [(17)](#ref-for-dfn-did-documents-39 "Reference 17")
    [(18)](#ref-for-dfn-did-documents-40 "Reference 18")
    [(19)](#ref-for-dfn-did-documents-41 "Reference 19")
    [(20)](#ref-for-dfn-did-documents-42 "Reference 20")
-   [§ 3.2 DID URL
    Syntax](#ref-for-dfn-did-documents-43 "§ 3.2 DID URL Syntax")
-   [§ Fragment](#ref-for-dfn-did-documents-44 "§ Fragment")
-   [§ 3.2.1 DID
    Parameters](#ref-for-dfn-did-documents-45 "§ 3.2.1 DID Parameters")
    [(2)](#ref-for-dfn-did-documents-46 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-47 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-48 "Reference 4")
    [(5)](#ref-for-dfn-did-documents-49 "Reference 5")
    [(6)](#ref-for-dfn-did-documents-50 "Reference 6")
-   [§ 3.2.2 Relative DID
    URLs](#ref-for-dfn-did-documents-51 "§ 3.2.2 Relative DID URLs")
    [(2)](#ref-for-dfn-did-documents-52 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-53 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-54 "Reference 4")
-   [§ 4. Data Model](#ref-for-dfn-did-documents-55 "§ 4. Data Model")
    [(2)](#ref-for-dfn-did-documents-56 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-57 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-58 "Reference 4")
-   [§ 5. Core
    Properties](#ref-for-dfn-did-documents-59 "§ 5. Core Properties")
    [(2)](#ref-for-dfn-did-documents-60 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-61 "Reference 3")
-   [§ 5.1
    Identifiers](#ref-for-dfn-did-documents-62 "§ 5.1 Identifiers")
-   [§ 5.1.1 DID
    Subject](#ref-for-dfn-did-documents-63 "§ 5.1.1 DID Subject")
    [(2)](#ref-for-dfn-did-documents-64 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-65 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-66 "Reference 4")
    [(5)](#ref-for-dfn-did-documents-67 "Reference 5")
-   [§ 5.1.2 DID
    Controller](#ref-for-dfn-did-documents-68 "§ 5.1.2 DID Controller")
    [(2)](#ref-for-dfn-did-documents-69 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-70 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-71 "Reference 4")
-   [§ 5.1.3 Also Known
    As](#ref-for-dfn-did-documents-72 "§ 5.1.3 Also Known As")
-   [§ 5.2 Verification
    Methods](#ref-for-dfn-did-documents-73 "§ 5.2 Verification Methods")
    [(2)](#ref-for-dfn-did-documents-74 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-75 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-76 "Reference 4")
-   [§ 5.2.1 Verification
    Material](#ref-for-dfn-did-documents-77 "§ 5.2.1 Verification Material")
    [(2)](#ref-for-dfn-did-documents-78 "Reference 2")
-   [§ 5.2.2 Referring to Verification
    Methods](#ref-for-dfn-did-documents-79 "§ 5.2.2 Referring to Verification Methods")
    [(2)](#ref-for-dfn-did-documents-80 "Reference 2")
-   [§ 5.3 Verification
    Relationships](#ref-for-dfn-did-documents-81 "§ 5.3 Verification Relationships")
    [(2)](#ref-for-dfn-did-documents-82 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-83 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-84 "Reference 4")
    [(5)](#ref-for-dfn-did-documents-85 "Reference 5")
-   [§ 5.3.1
    Authentication](#ref-for-dfn-did-documents-86 "§ 5.3.1 Authentication")
    [(2)](#ref-for-dfn-did-documents-87 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-88 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-89 "Reference 4")
    [(5)](#ref-for-dfn-did-documents-90 "Reference 5")
-   [§ 5.3.2
    Assertion](#ref-for-dfn-did-documents-91 "§ 5.3.2 Assertion")
-   [§ 5.3.4 Capability
    Invocation](#ref-for-dfn-did-documents-92 "§ 5.3.4 Capability Invocation")
    [(2)](#ref-for-dfn-did-documents-93 "Reference 2")
-   [§ 5.4 Services](#ref-for-dfn-did-documents-94 "§ 5.4 Services")
-   [§ 6.
    Representations](#ref-for-dfn-did-documents-95 "§ 6. Representations")
-   [§ 6.1 Production and
    Consumption](#ref-for-dfn-did-documents-96 "§ 6.1 Production and Consumption")
    [(2)](#ref-for-dfn-did-documents-97 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-98 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-99 "Reference 4")
    [(5)](#ref-for-dfn-did-documents-100 "Reference 5")
    [(6)](#ref-for-dfn-did-documents-101 "Reference 6")
    [(7)](#ref-for-dfn-did-documents-102 "Reference 7")
-   [§ 6.2.1
    Production](#ref-for-dfn-did-documents-103 "§ 6.2.1 Production")
    [(2)](#ref-for-dfn-did-documents-104 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-105 "Reference 3")
-   [§ 6.2.2
    Consumption](#ref-for-dfn-did-documents-106 "§ 6.2.2 Consumption")
    [(2)](#ref-for-dfn-did-documents-107 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-108 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-109 "Reference 4")
-   [§ 6.3.1
    Production](#ref-for-dfn-did-documents-110 "§ 6.3.1 Production")
    [(2)](#ref-for-dfn-did-documents-111 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-112 "Reference 3")
-   [§ 6.3.2
    Consumption](#ref-for-dfn-did-documents-113 "§ 6.3.2 Consumption")
    [(2)](#ref-for-dfn-did-documents-114 "Reference 2")
-   [§ 7. Resolution](#ref-for-dfn-did-documents-115 "§ 7. Resolution")
-   [§ 7.1 DID
    Resolution](#ref-for-dfn-did-documents-116 "§ 7.1 DID Resolution")
    [(2)](#ref-for-dfn-did-documents-117 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-118 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-119 "Reference 4")
    [(5)](#ref-for-dfn-did-documents-120 "Reference 5")
    [(6)](#ref-for-dfn-did-documents-121 "Reference 6")
    [(7)](#ref-for-dfn-did-documents-122 "Reference 7")
    [(8)](#ref-for-dfn-did-documents-123 "Reference 8")
    [(9)](#ref-for-dfn-did-documents-124 "Reference 9")
-   [§ 7.1.1 DID Resolution
    Options](#ref-for-dfn-did-documents-125 "§ 7.1.1 DID Resolution Options")
-   [§ 7.1.2 DID Resolution
    Metadata](#ref-for-dfn-did-documents-126 "§ 7.1.2 DID Resolution Metadata")
-   [§ 7.1.3 DID Document
    Metadata](#ref-for-dfn-did-documents-127 "§ 7.1.3 DID Document Metadata")
    [(2)](#ref-for-dfn-did-documents-128 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-129 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-130 "Reference 4")
    [(5)](#ref-for-dfn-did-documents-131 "Reference 5")
    [(6)](#ref-for-dfn-did-documents-132 "Reference 6")
    [(7)](#ref-for-dfn-did-documents-133 "Reference 7")
    [(8)](#ref-for-dfn-did-documents-134 "Reference 8")
    [(9)](#ref-for-dfn-did-documents-135 "Reference 9")
    [(10)](#ref-for-dfn-did-documents-136 "Reference 10")
    [(11)](#ref-for-dfn-did-documents-137 "Reference 11")
    [(12)](#ref-for-dfn-did-documents-138 "Reference 12")
    [(13)](#ref-for-dfn-did-documents-139 "Reference 13")
    [(14)](#ref-for-dfn-did-documents-140 "Reference 14")
    [(15)](#ref-for-dfn-did-documents-141 "Reference 15")
-   [§ 7.2 DID URL
    Dereferencing](#ref-for-dfn-did-documents-142 "§ 7.2 DID URL Dereferencing")
    [(2)](#ref-for-dfn-did-documents-143 "Reference 2")
-   [§ 7.3 Metadata
    Structure](#ref-for-dfn-did-documents-144 "§ 7.3 Metadata Structure")
-   [§ 8. Methods](#ref-for-dfn-did-documents-145 "§ 8. Methods")
-   [§ 8.2 Method
    Operations](#ref-for-dfn-did-documents-146 "§ 8.2 Method Operations")
    [(2)](#ref-for-dfn-did-documents-147 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-148 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-149 "Reference 4")
    [(5)](#ref-for-dfn-did-documents-150 "Reference 5")
    [(6)](#ref-for-dfn-did-documents-151 "Reference 6")
-   [§ 8.3 Security
    Requirements](#ref-for-dfn-did-documents-152 "§ 8.3 Security Requirements")
-   [§ 9.2 Proving Control and
    Binding](#ref-for-dfn-did-documents-153 "§ 9.2 Proving Control and Binding")
    [(2)](#ref-for-dfn-did-documents-154 "Reference 2")
-   [§ Proving Control of a DID and/or DID
    Document](#ref-for-dfn-did-documents-155 "§ Proving Control of a DID and/or DID Document")
    [(2)](#ref-for-dfn-did-documents-156 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-157 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-158 "Reference 4")
    [(5)](#ref-for-dfn-did-documents-159 "Reference 5")
-   [§ Binding to Physical
    Identity](#ref-for-dfn-did-documents-160 "§ Binding to Physical Identity")
    [(2)](#ref-for-dfn-did-documents-161 "Reference 2")
-   [§ 9.3 Authentication Service
    Endpoints](#ref-for-dfn-did-documents-162 "§ 9.3 Authentication Service Endpoints")
-   [§ 9.4
    Non-Repudiation](#ref-for-dfn-did-documents-163 "§ 9.4 Non-Repudiation")
-   [§ 9.5 Notification of DID Document
    Changes](#ref-for-dfn-did-documents-164 "§ 9.5 Notification of DID Document Changes")
-   [§ 9.7 Verification Method
    Rotation](#ref-for-dfn-did-documents-165 "§ 9.7 Verification Method Rotation")
    [(2)](#ref-for-dfn-did-documents-166 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-167 "Reference 3")
-   [§ 9.8 Verification Method
    Revocation](#ref-for-dfn-did-documents-168 "§ 9.8 Verification Method Revocation")
    [(2)](#ref-for-dfn-did-documents-169 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-170 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-171 "Reference 4")
-   [§ Revocation
    Semantics](#ref-for-dfn-did-documents-172 "§ Revocation Semantics")
    [(2)](#ref-for-dfn-did-documents-173 "Reference 2")
-   [§ Revocation in Trustless
    Systems](#ref-for-dfn-did-documents-174 "§ Revocation in Trustless Systems")
    [(2)](#ref-for-dfn-did-documents-175 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-176 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-177 "Reference 4")
-   [§ 9.11 DIDs as Enhanced
    URNs](#ref-for-dfn-did-documents-178 "§ 9.11 DIDs as Enhanced URNs")
-   [§ 9.12
    Immutability](#ref-for-dfn-did-documents-179 "§ 9.12 Immutability")
    [(2)](#ref-for-dfn-did-documents-180 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-181 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-182 "Reference 4")
    [(5)](#ref-for-dfn-did-documents-183 "Reference 5")
-   [§ 9.13 Encrypted Data in DID
    Documents](#ref-for-dfn-did-documents-184 "§ 9.13 Encrypted Data in DID Documents")
    [(2)](#ref-for-dfn-did-documents-185 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-186 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-187 "Reference 4")
    [(5)](#ref-for-dfn-did-documents-188 "Reference 5")
-   [§ 9.14 Equivalence
    Properties](#ref-for-dfn-did-documents-189 "§ 9.14 Equivalence Properties")
    [(2)](#ref-for-dfn-did-documents-190 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-191 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-192 "Reference 4")
    [(5)](#ref-for-dfn-did-documents-193 "Reference 5")
    [(6)](#ref-for-dfn-did-documents-194 "Reference 6")
-   [§ 9.15 Content Integrity
    Protection](#ref-for-dfn-did-documents-195 "§ 9.15 Content Integrity Protection")
    [(2)](#ref-for-dfn-did-documents-196 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-197 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-198 "Reference 4")
-   [§ 9.17 Level of
    Assurance](#ref-for-dfn-did-documents-199 "§ 9.17 Level of Assurance")
    [(2)](#ref-for-dfn-did-documents-200 "Reference 2")
-   [§ 10. Privacy
    Considerations](#ref-for-dfn-did-documents-201 "§ 10. Privacy Considerations")
-   [§ 10.1 Keep Personal Data
    Private](#ref-for-dfn-did-documents-202 "§ 10.1 Keep Personal Data Private")
    [(2)](#ref-for-dfn-did-documents-203 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-204 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-205 "Reference 4")
-   [§ 10.3 DID Document Correlation
    Risks](#ref-for-dfn-did-documents-206 "§ 10.3 DID Document Correlation Risks")
    [(2)](#ref-for-dfn-did-documents-207 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-208 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-209 "Reference 4")
-   [§ 10.4 DID Subject
    Classification](#ref-for-dfn-did-documents-210 "§ 10.4 DID Subject Classification")
    [(2)](#ref-for-dfn-did-documents-211 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-212 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-213 "Reference 4")
-   [§ 10.6 Service
    Privacy](#ref-for-dfn-did-documents-214 "§ 10.6 Service Privacy")
    [(2)](#ref-for-dfn-did-documents-215 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-216 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-217 "Reference 4")
    [(5)](#ref-for-dfn-did-documents-218 "Reference 5")
    [(6)](#ref-for-dfn-did-documents-219 "Reference 6")
-   [§ Maintaining Herd
    Privacy](#ref-for-dfn-did-documents-220 "§ Maintaining Herd Privacy")
    [(2)](#ref-for-dfn-did-documents-221 "Reference 2")
-   [§ Service Endpoint
    Alternatives](#ref-for-dfn-did-documents-222 "§ Service Endpoint Alternatives")
-   [§ B.2 Creation of a
    DID](#ref-for-dfn-did-documents-223 "§ B.2 Creation of a DID")
    [(2)](#ref-for-dfn-did-documents-224 "Reference 2")
-   [§ B.3 Determining the DID
    subject](#ref-for-dfn-did-documents-225 "§ B.3 Determining the DID subject")
    [(2)](#ref-for-dfn-did-documents-226 "Reference 2")
-   [§ B.4 Referring to the DID
    document](#ref-for-dfn-did-documents-227 "§ B.4 Referring to the DID document")
    [(2)](#ref-for-dfn-did-documents-228 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-229 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-230 "Reference 4")
    [(5)](#ref-for-dfn-did-documents-231 "Reference 5")
-   [§ B.5 Statements in the DID
    document](#ref-for-dfn-did-documents-232 "§ B.5 Statements in the DID document")
    [(2)](#ref-for-dfn-did-documents-233 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-234 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-235 "Reference 4")
-   [§ B.6 Discovering more information about the DID
    subject](#ref-for-dfn-did-documents-236 "§ B.6 Discovering more information about the DID subject")
    [(2)](#ref-for-dfn-did-documents-237 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-238 "Reference 3")
-   [§ B.8 Assigning DIDs to existing web
    resources](#ref-for-dfn-did-documents-239 "§ B.8 Assigning DIDs to existing web resources")
    [(2)](#ref-for-dfn-did-documents-240 "Reference 2")
-   [§ B.10 Multiple DID
    controllers](#ref-for-dfn-did-documents-241 "§ B.10 Multiple DID controllers")
-   [§ B.10.1 Independent
    Control](#ref-for-dfn-did-documents-242 "§ B.10.1 Independent Control")
    [(2)](#ref-for-dfn-did-documents-243 "Reference 2")
-   [§ B.11 Changing the DID
    subject](#ref-for-dfn-did-documents-244 "§ B.11 Changing the DID subject")
    [(2)](#ref-for-dfn-did-documents-245 "Reference 2")
-   [§ B.12 Changing the DID
    controller](#ref-for-dfn-did-documents-246 "§ B.12 Changing the DID controller")
    [(2)](#ref-for-dfn-did-documents-247 "Reference 2")
    [(3)](#ref-for-dfn-did-documents-248 "Reference 3")
    [(4)](#ref-for-dfn-did-documents-249 "Reference 4")
::::

:::: {#dfn-panel-for-dfn-did-fragments .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: DID fragment"}
[]{.caret}

<div>

[Permalink](#dfn-did-fragments){.self-link
aria-label="Permalink for definition: DID fragment. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 2. Terminology](#ref-for-dfn-did-fragments-1 "§ 2. Terminology")
-   [§ Fragment](#ref-for-dfn-did-fragments-2 "§ Fragment")
    [(2)](#ref-for-dfn-did-fragments-3 "Reference 2")
    [(3)](#ref-for-dfn-did-fragments-4 "Reference 3")
    [(4)](#ref-for-dfn-did-fragments-5 "Reference 4")
    [(5)](#ref-for-dfn-did-fragments-6 "Reference 5")
-   [§ 7.2 DID URL
    Dereferencing](#ref-for-dfn-did-fragments-7 "§ 7.2 DID URL Dereferencing")
    [(2)](#ref-for-dfn-did-fragments-8 "Reference 2")
-   [§ 8.1 Method
    Syntax](#ref-for-dfn-did-fragments-9 "§ 8.1 Method Syntax")
::::

:::: {#dfn-panel-for-dfn-did-methods .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: DID method"}
[]{.caret}

<div>

[Permalink](#dfn-did-methods){.self-link
aria-label="Permalink for definition: DID method. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 1.1 A Simple
    Example](#ref-for-dfn-did-methods-1 "§ 1.1 A Simple Example")
-   [§ 1.2 Design
    Goals](#ref-for-dfn-did-methods-2 "§ 1.2 Design Goals")
-   [§ 1.3 Architecture
    Overview](#ref-for-dfn-did-methods-3 "§ 1.3 Architecture Overview")
    [(2)](#ref-for-dfn-did-methods-4 "Reference 2")
    [(3)](#ref-for-dfn-did-methods-5 "Reference 3")
    [(4)](#ref-for-dfn-did-methods-6 "Reference 4")
    [(5)](#ref-for-dfn-did-methods-7 "Reference 5")
-   [§ 1.4 Conformance](#ref-for-dfn-did-methods-8 "§ 1.4 Conformance")
    [(2)](#ref-for-dfn-did-methods-9 "Reference 2")
    [(3)](#ref-for-dfn-did-methods-10 "Reference 3")
    [(4)](#ref-for-dfn-did-methods-11 "Reference 4")
-   [§ 2. Terminology](#ref-for-dfn-did-methods-12 "§ 2. Terminology")
    [(2)](#ref-for-dfn-did-methods-13 "Reference 2")
    [(3)](#ref-for-dfn-did-methods-14 "Reference 3")
    [(4)](#ref-for-dfn-did-methods-15 "Reference 4")
-   [§ 3. Identifier](#ref-for-dfn-did-methods-16 "§ 3. Identifier")
-   [§ 3.1 DID Syntax](#ref-for-dfn-did-methods-17 "§ 3.1 DID Syntax")
-   [§ 3.2 DID URL
    Syntax](#ref-for-dfn-did-methods-18 "§ 3.2 DID URL Syntax")
-   [§ Path](#ref-for-dfn-did-methods-19 "§ Path")
-   [§ 3.2.1 DID
    Parameters](#ref-for-dfn-did-methods-20 "§ 3.2.1 DID Parameters")
    [(2)](#ref-for-dfn-did-methods-21 "Reference 2")
    [(3)](#ref-for-dfn-did-methods-22 "Reference 3")
    [(4)](#ref-for-dfn-did-methods-23 "Reference 4")
    [(5)](#ref-for-dfn-did-methods-24 "Reference 5")
-   [§ 3.2.2 Relative DID
    URLs](#ref-for-dfn-did-methods-25 "§ 3.2.2 Relative DID URLs")
-   [§ 5.1.1 DID
    Subject](#ref-for-dfn-did-methods-26 "§ 5.1.1 DID Subject")
-   [§ 5.1.2 DID
    Controller](#ref-for-dfn-did-methods-27 "§ 5.1.2 DID Controller")
-   [§ 5.3 Verification
    Relationships](#ref-for-dfn-did-methods-28 "§ 5.3 Verification Relationships")
-   [§ 5.3.1
    Authentication](#ref-for-dfn-did-methods-29 "§ 5.3.1 Authentication")
    [(2)](#ref-for-dfn-did-methods-30 "Reference 2")
    [(3)](#ref-for-dfn-did-methods-31 "Reference 3")
    [(4)](#ref-for-dfn-did-methods-32 "Reference 4")
-   [§ 7. Resolution](#ref-for-dfn-did-methods-33 "§ 7. Resolution")
-   [§ 7.1 DID
    Resolution](#ref-for-dfn-did-methods-34 "§ 7.1 DID Resolution")
-   [§ 7.1.2 DID Resolution
    Metadata](#ref-for-dfn-did-methods-35 "§ 7.1.2 DID Resolution Metadata")
-   [§ 7.1.3 DID Document
    Metadata](#ref-for-dfn-did-methods-36 "§ 7.1.3 DID Document Metadata")
    [(2)](#ref-for-dfn-did-methods-37 "Reference 2")
    [(3)](#ref-for-dfn-did-methods-38 "Reference 3")
    [(4)](#ref-for-dfn-did-methods-39 "Reference 4")
    [(5)](#ref-for-dfn-did-methods-40 "Reference 5")
    [(6)](#ref-for-dfn-did-methods-41 "Reference 6")
    [(7)](#ref-for-dfn-did-methods-42 "Reference 7")
    [(8)](#ref-for-dfn-did-methods-43 "Reference 8")
-   [§ 7.2 DID URL
    Dereferencing](#ref-for-dfn-did-methods-44 "§ 7.2 DID URL Dereferencing")
-   [§ 8. Methods](#ref-for-dfn-did-methods-45 "§ 8. Methods")
    [(2)](#ref-for-dfn-did-methods-46 "Reference 2")
    [(3)](#ref-for-dfn-did-methods-47 "Reference 3")
    [(4)](#ref-for-dfn-did-methods-48 "Reference 4")
    [(5)](#ref-for-dfn-did-methods-49 "Reference 5")
    [(6)](#ref-for-dfn-did-methods-50 "Reference 6")
    [(7)](#ref-for-dfn-did-methods-51 "Reference 7")
-   [§ 8.1 Method
    Syntax](#ref-for-dfn-did-methods-52 "§ 8.1 Method Syntax")
    [(2)](#ref-for-dfn-did-methods-53 "Reference 2")
    [(3)](#ref-for-dfn-did-methods-54 "Reference 3")
    [(4)](#ref-for-dfn-did-methods-55 "Reference 4")
    [(5)](#ref-for-dfn-did-methods-56 "Reference 5")
    [(6)](#ref-for-dfn-did-methods-57 "Reference 6")
    [(7)](#ref-for-dfn-did-methods-58 "Reference 7")
    [(8)](#ref-for-dfn-did-methods-59 "Reference 8")
    [(9)](#ref-for-dfn-did-methods-60 "Reference 9")
    [(10)](#ref-for-dfn-did-methods-61 "Reference 10")
    [(11)](#ref-for-dfn-did-methods-62 "Reference 11")
    [(12)](#ref-for-dfn-did-methods-63 "Reference 12")
    [(13)](#ref-for-dfn-did-methods-64 "Reference 13")
-   [§ 8.2 Method
    Operations](#ref-for-dfn-did-methods-65 "§ 8.2 Method Operations")
    [(2)](#ref-for-dfn-did-methods-66 "Reference 2")
    [(3)](#ref-for-dfn-did-methods-67 "Reference 3")
    [(4)](#ref-for-dfn-did-methods-68 "Reference 4")
    [(5)](#ref-for-dfn-did-methods-69 "Reference 5")
    [(6)](#ref-for-dfn-did-methods-70 "Reference 6")
    [(7)](#ref-for-dfn-did-methods-71 "Reference 7")
    [(8)](#ref-for-dfn-did-methods-72 "Reference 8")
-   [§ 8.3 Security
    Requirements](#ref-for-dfn-did-methods-73 "§ 8.3 Security Requirements")
    [(2)](#ref-for-dfn-did-methods-74 "Reference 2")
    [(3)](#ref-for-dfn-did-methods-75 "Reference 3")
    [(4)](#ref-for-dfn-did-methods-76 "Reference 4")
    [(5)](#ref-for-dfn-did-methods-77 "Reference 5")
    [(6)](#ref-for-dfn-did-methods-78 "Reference 6")
    [(7)](#ref-for-dfn-did-methods-79 "Reference 7")
    [(8)](#ref-for-dfn-did-methods-80 "Reference 8")
    [(9)](#ref-for-dfn-did-methods-81 "Reference 9")
    [(10)](#ref-for-dfn-did-methods-82 "Reference 10")
-   [§ 8.4 Privacy
    Requirements](#ref-for-dfn-did-methods-83 "§ 8.4 Privacy Requirements")
    [(2)](#ref-for-dfn-did-methods-84 "Reference 2")
-   [§ 9.1 Choosing DID
    Resolvers](#ref-for-dfn-did-methods-85 "§ 9.1 Choosing DID Resolvers")
    [(2)](#ref-for-dfn-did-methods-86 "Reference 2")
    [(3)](#ref-for-dfn-did-methods-87 "Reference 3")
    [(4)](#ref-for-dfn-did-methods-88 "Reference 4")
    [(5)](#ref-for-dfn-did-methods-89 "Reference 5")
-   [§ Proving Control of a DID and/or DID
    Document](#ref-for-dfn-did-methods-90 "§ Proving Control of a DID and/or DID Document")
    [(2)](#ref-for-dfn-did-methods-91 "Reference 2")
-   [§ 9.4
    Non-Repudiation](#ref-for-dfn-did-methods-92 "§ 9.4 Non-Repudiation")
-   [§ 9.7 Verification Method
    Rotation](#ref-for-dfn-did-methods-93 "§ 9.7 Verification Method Rotation")
    [(2)](#ref-for-dfn-did-methods-94 "Reference 2")
    [(3)](#ref-for-dfn-did-methods-95 "Reference 3")
-   [§ 9.8 Verification Method
    Revocation](#ref-for-dfn-did-methods-96 "§ 9.8 Verification Method Revocation")
    [(2)](#ref-for-dfn-did-methods-97 "Reference 2")
    [(3)](#ref-for-dfn-did-methods-98 "Reference 3")
-   [§ Revocation
    Semantics](#ref-for-dfn-did-methods-99 "§ Revocation Semantics")
    [(2)](#ref-for-dfn-did-methods-100 "Reference 2")
-   [§ Revocation in Trustless
    Systems](#ref-for-dfn-did-methods-101 "§ Revocation in Trustless Systems")
-   [§ 9.9 DID
    Recovery](#ref-for-dfn-did-methods-102 "§ 9.9 DID Recovery")
    [(2)](#ref-for-dfn-did-methods-103 "Reference 2")
    [(3)](#ref-for-dfn-did-methods-104 "Reference 3")
    [(4)](#ref-for-dfn-did-methods-105 "Reference 4")
    [(5)](#ref-for-dfn-did-methods-106 "Reference 5")
-   [§ 9.11 DIDs as Enhanced
    URNs](#ref-for-dfn-did-methods-107 "§ 9.11 DIDs as Enhanced URNs")
    [(2)](#ref-for-dfn-did-methods-108 "Reference 2")
-   [§ 9.12
    Immutability](#ref-for-dfn-did-methods-109 "§ 9.12 Immutability")
    [(2)](#ref-for-dfn-did-methods-110 "Reference 2")
    [(3)](#ref-for-dfn-did-methods-111 "Reference 3")
-   [§ 9.14 Equivalence
    Properties](#ref-for-dfn-did-methods-112 "§ 9.14 Equivalence Properties")
    [(2)](#ref-for-dfn-did-methods-113 "Reference 2")
    [(3)](#ref-for-dfn-did-methods-114 "Reference 3")
    [(4)](#ref-for-dfn-did-methods-115 "Reference 4")
    [(5)](#ref-for-dfn-did-methods-116 "Reference 5")
-   [§ 9.16
    Persistence](#ref-for-dfn-did-methods-117 "§ 9.16 Persistence")
-   [§ 10.1 Keep Personal Data
    Private](#ref-for-dfn-did-methods-118 "§ 10.1 Keep Personal Data Private")
-   [§ 10.5 Herd
    Privacy](#ref-for-dfn-did-methods-119 "§ 10.5 Herd Privacy")
-   [§ Service Endpoint
    Alternatives](#ref-for-dfn-did-methods-120 "§ Service Endpoint Alternatives")
-   [§ B.2 Creation of a
    DID](#ref-for-dfn-did-methods-121 "§ B.2 Creation of a DID")
    [(2)](#ref-for-dfn-did-methods-122 "Reference 2")
    [(3)](#ref-for-dfn-did-methods-123 "Reference 3")
    [(4)](#ref-for-dfn-did-methods-124 "Reference 4")
    [(5)](#ref-for-dfn-did-methods-125 "Reference 5")
-   [§ B.3 Determining the DID
    subject](#ref-for-dfn-did-methods-126 "§ B.3 Determining the DID subject")
    [(2)](#ref-for-dfn-did-methods-127 "Reference 2")
-   [§ B.4 Referring to the DID
    document](#ref-for-dfn-did-methods-128 "§ B.4 Referring to the DID document")
-   [§ B.7 Serving a representation of the DID
    subject](#ref-for-dfn-did-methods-129 "§ B.7 Serving a representation of the DID subject")
    [(2)](#ref-for-dfn-did-methods-130 "Reference 2")
::::

:::: {#dfn-panel-for-dfn-did-paths .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: DID path"}
[]{.caret}

<div>

[Permalink](#dfn-did-paths){.self-link
aria-label="Permalink for definition: DID path. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 2. Terminology](#ref-for-dfn-did-paths-1 "§ 2. Terminology")
-   [§ Path](#ref-for-dfn-did-paths-2 "§ Path")
-   [§ 8.1 Method
    Syntax](#ref-for-dfn-did-paths-3 "§ 8.1 Method Syntax")
::::

:::: {#dfn-panel-for-dfn-did-queries .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: DID query"}
[]{.caret}

<div>

[Permalink](#dfn-did-queries){.self-link
aria-label="Permalink for definition: DID query. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 2. Terminology](#ref-for-dfn-did-queries-1 "§ 2. Terminology")
-   [§ Query](#ref-for-dfn-did-queries-2 "§ Query")
-   [§ 8.1 Method
    Syntax](#ref-for-dfn-did-queries-3 "§ 8.1 Method Syntax")
::::

:::: {#dfn-panel-for-dfn-did-resolution .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: DID resolution"}
[]{.caret}

<div>

[Permalink](#dfn-did-resolution){.self-link
aria-label="Permalink for definition: DID resolution. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 1.3 Architecture
    Overview](#ref-for-dfn-did-resolution-1 "§ 1.3 Architecture Overview")
    [(2)](#ref-for-dfn-did-resolution-2 "Reference 2")
-   [§ 2. Terminology](#ref-for-dfn-did-resolution-3 "§ 2. Terminology")
    [(2)](#ref-for-dfn-did-resolution-4 "Reference 2")
-   [§ 3.2.1 DID
    Parameters](#ref-for-dfn-did-resolution-5 "§ 3.2.1 DID Parameters")
-   [§ 5.1.1 DID
    Subject](#ref-for-dfn-did-resolution-6 "§ 5.1.1 DID Subject")
-   [§ 7. Resolution](#ref-for-dfn-did-resolution-7 "§ 7. Resolution")
    [(2)](#ref-for-dfn-did-resolution-8 "Reference 2")
-   [§ 7.1 DID
    Resolution](#ref-for-dfn-did-resolution-9 "§ 7.1 DID Resolution")
    [(2)](#ref-for-dfn-did-resolution-10 "Reference 2")
    [(3)](#ref-for-dfn-did-resolution-11 "Reference 3")
-   [§ 7.1.2 DID Resolution
    Metadata](#ref-for-dfn-did-resolution-12 "§ 7.1.2 DID Resolution Metadata")
-   [§ 7.2 DID URL
    Dereferencing](#ref-for-dfn-did-resolution-13 "§ 7.2 DID URL Dereferencing")
    [(2)](#ref-for-dfn-did-resolution-14 "Reference 2")
-   [§ 7.3 Metadata
    Structure](#ref-for-dfn-did-resolution-15 "§ 7.3 Metadata Structure")
-   [§ Proving Control of a DID and/or DID
    Document](#ref-for-dfn-did-resolution-16 "§ Proving Control of a DID and/or DID Document")
-   [§ 9.4
    Non-Repudiation](#ref-for-dfn-did-resolution-17 "§ 9.4 Non-Repudiation")
-   [§ B.4 Referring to the DID
    document](#ref-for-dfn-did-resolution-18 "§ B.4 Referring to the DID document")
    [(2)](#ref-for-dfn-did-resolution-19 "Reference 2")
::::

:::: {#dfn-panel-for-dfn-did-resolvers .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: DID resolver"}
[]{.caret}

<div>

[Permalink](#dfn-did-resolvers){.self-link
aria-label="Permalink for definition: DID resolver. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 1.3 Architecture
    Overview](#ref-for-dfn-did-resolvers-1 "§ 1.3 Architecture Overview")
-   [(2)](#ref-for-dfn-did-resolvers-3 "Reference 2")
-   [§ 3.2.1 DID
    Parameters](#ref-for-dfn-did-resolvers-4 "§ 3.2.1 DID Parameters")
    [(2)](#ref-for-dfn-did-resolvers-5 "Reference 2")
-   [§ 5.1.1 DID
    Subject](#ref-for-dfn-did-resolvers-6 "§ 5.1.1 DID Subject")
-   [§ 7. Resolution](#ref-for-dfn-did-resolvers-7 "§ 7. Resolution")
-   [§ 7.1 DID
    Resolution](#ref-for-dfn-did-resolvers-8 "§ 7.1 DID Resolution")
    [(2)](#ref-for-dfn-did-resolvers-9 "Reference 2")
    [(3)](#ref-for-dfn-did-resolvers-10 "Reference 3")
    [(4)](#ref-for-dfn-did-resolvers-11 "Reference 4")
-   [§ 7.1.1 DID Resolution
    Options](#ref-for-dfn-did-resolvers-12 "§ 7.1.1 DID Resolution Options")
-   [§ 7.1.2 DID Resolution
    Metadata](#ref-for-dfn-did-resolvers-13 "§ 7.1.2 DID Resolution Metadata")
    [(2)](#ref-for-dfn-did-resolvers-14 "Reference 2")
-   [§ 7.2 DID URL
    Dereferencing](#ref-for-dfn-did-resolvers-15 "§ 7.2 DID URL Dereferencing")
-   [§ 8.2 Method
    Operations](#ref-for-dfn-did-resolvers-16 "§ 8.2 Method Operations")
    [(2)](#ref-for-dfn-did-resolvers-17 "Reference 2")
-   [§ 9.1 Choosing DID
    Resolvers](#ref-for-dfn-did-resolvers-18 "§ 9.1 Choosing DID Resolvers")
    [(2)](#ref-for-dfn-did-resolvers-19 "Reference 2")
-   [§ 9.6 Key and Signature
    Expiration](#ref-for-dfn-did-resolvers-20 "§ 9.6 Key and Signature Expiration")
-   [§ 9.12
    Immutability](#ref-for-dfn-did-resolvers-21 "§ 9.12 Immutability")
::::

:::: {#dfn-panel-for-dfn-did-schemes .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: DID scheme"}
[]{.caret}

<div>

[Permalink](#dfn-did-schemes){.self-link
aria-label="Permalink for definition: DID scheme. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 2. Terminology](#ref-for-dfn-did-schemes-1 "§ 2. Terminology")
    [(2)](#ref-for-dfn-did-schemes-2 "Reference 2")
-   [§ 3.1 DID Syntax](#ref-for-dfn-did-schemes-3 "§ 3.1 DID Syntax")
-   [§ 8. Methods](#ref-for-dfn-did-schemes-4 "§ 8. Methods")
-   [§ 8.1 Method
    Syntax](#ref-for-dfn-did-schemes-5 "§ 8.1 Method Syntax")
::::

:::: {#dfn-panel-for-dfn-did-subjects .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: DID subject"}
[]{.caret}

<div>

[Permalink](#dfn-did-subjects){.self-link
aria-label="Permalink for definition: DID subject. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ Abstract](#ref-for-dfn-did-subjects-1 "§ Abstract")
    [(2)](#ref-for-dfn-did-subjects-2 "Reference 2")
    [(3)](#ref-for-dfn-did-subjects-3 "Reference 3")
    [(4)](#ref-for-dfn-did-subjects-4 "Reference 4")
-   [§ 1.3 Architecture
    Overview](#ref-for-dfn-did-subjects-5 "§ 1.3 Architecture Overview")
    [(2)](#ref-for-dfn-did-subjects-6 "Reference 2")
    [(3)](#ref-for-dfn-did-subjects-7 "Reference 3")
-   [§ 2. Terminology](#ref-for-dfn-did-subjects-8 "§ 2. Terminology")
    [(2)](#ref-for-dfn-did-subjects-9 "Reference 2")
    [(3)](#ref-for-dfn-did-subjects-10 "Reference 3")
    [(4)](#ref-for-dfn-did-subjects-11 "Reference 4")
    [(5)](#ref-for-dfn-did-subjects-12 "Reference 5")
    [(6)](#ref-for-dfn-did-subjects-13 "Reference 6")
    [(7)](#ref-for-dfn-did-subjects-14 "Reference 7")
    [(8)](#ref-for-dfn-did-subjects-15 "Reference 8")
-   [§ 3.2 DID URL
    Syntax](#ref-for-dfn-did-subjects-16 "§ 3.2 DID URL Syntax")
-   [§ 3.2.2 Relative DID
    URLs](#ref-for-dfn-did-subjects-17 "§ 3.2.2 Relative DID URLs")
-   [§ 5. Core
    Properties](#ref-for-dfn-did-subjects-18 "§ 5. Core Properties")
-   [§ 5.1
    Identifiers](#ref-for-dfn-did-subjects-19 "§ 5.1 Identifiers")
-   [§ 5.1.1 DID
    Subject](#ref-for-dfn-did-subjects-20 "§ 5.1.1 DID Subject")
    [(2)](#ref-for-dfn-did-subjects-21 "Reference 2")
-   [§ 5.1.2 DID
    Controller](#ref-for-dfn-did-subjects-22 "§ 5.1.2 DID Controller")
    [(2)](#ref-for-dfn-did-subjects-23 "Reference 2")
-   [§ 5.1.3 Also Known
    As](#ref-for-dfn-did-subjects-24 "§ 5.1.3 Also Known As")
    [(2)](#ref-for-dfn-did-subjects-25 "Reference 2")
    [(3)](#ref-for-dfn-did-subjects-26 "Reference 3")
-   [§ 5.2 Verification
    Methods](#ref-for-dfn-did-subjects-27 "§ 5.2 Verification Methods")
-   [§ 5.3 Verification
    Relationships](#ref-for-dfn-did-subjects-28 "§ 5.3 Verification Relationships")
    [(2)](#ref-for-dfn-did-subjects-29 "Reference 2")
    [(3)](#ref-for-dfn-did-subjects-30 "Reference 3")
-   [§ 5.3.1
    Authentication](#ref-for-dfn-did-subjects-31 "§ 5.3.1 Authentication")
    [(2)](#ref-for-dfn-did-subjects-32 "Reference 2")
-   [§ 5.3.2
    Assertion](#ref-for-dfn-did-subjects-33 "§ 5.3.2 Assertion")
    [(2)](#ref-for-dfn-did-subjects-34 "Reference 2")
-   [§ 5.3.3 Key
    Agreement](#ref-for-dfn-did-subjects-35 "§ 5.3.3 Key Agreement")
    [(2)](#ref-for-dfn-did-subjects-36 "Reference 2")
-   [§ 5.3.4 Capability
    Invocation](#ref-for-dfn-did-subjects-37 "§ 5.3.4 Capability Invocation")
    [(2)](#ref-for-dfn-did-subjects-38 "Reference 2")
    [(3)](#ref-for-dfn-did-subjects-39 "Reference 3")
-   [§ 5.3.5 Capability
    Delegation](#ref-for-dfn-did-subjects-40 "§ 5.3.5 Capability Delegation")
    [(2)](#ref-for-dfn-did-subjects-41 "Reference 2")
    [(3)](#ref-for-dfn-did-subjects-42 "Reference 3")
-   [§ 5.4 Services](#ref-for-dfn-did-subjects-43 "§ 5.4 Services")
    [(2)](#ref-for-dfn-did-subjects-44 "Reference 2")
-   [§ 7.1.3 DID Document
    Metadata](#ref-for-dfn-did-subjects-45 "§ 7.1.3 DID Document Metadata")
    [(2)](#ref-for-dfn-did-subjects-46 "Reference 2")
    [(3)](#ref-for-dfn-did-subjects-47 "Reference 3")
    [(4)](#ref-for-dfn-did-subjects-48 "Reference 4")
    [(5)](#ref-for-dfn-did-subjects-49 "Reference 5")
-   [§ 9.3 Authentication Service
    Endpoints](#ref-for-dfn-did-subjects-50 "§ 9.3 Authentication Service Endpoints")
-   [§ 9.5 Notification of DID Document
    Changes](#ref-for-dfn-did-subjects-51 "§ 9.5 Notification of DID Document Changes")
-   [§ 9.11 DIDs as Enhanced
    URNs](#ref-for-dfn-did-subjects-52 "§ 9.11 DIDs as Enhanced URNs")
-   [§ 10.1 Keep Personal Data
    Private](#ref-for-dfn-did-subjects-53 "§ 10.1 Keep Personal Data Private")
    [(2)](#ref-for-dfn-did-subjects-54 "Reference 2")
    [(3)](#ref-for-dfn-did-subjects-55 "Reference 3")
-   [§ 10.2 DID Correlation
    Risks](#ref-for-dfn-did-subjects-56 "§ 10.2 DID Correlation Risks")
-   [§ 10.4 DID Subject
    Classification](#ref-for-dfn-did-subjects-57 "§ 10.4 DID Subject Classification")
    [(2)](#ref-for-dfn-did-subjects-58 "Reference 2")
    [(3)](#ref-for-dfn-did-subjects-59 "Reference 3")
-   [§ 10.5 Herd
    Privacy](#ref-for-dfn-did-subjects-60 "§ 10.5 Herd Privacy")
-   [§ 10.6 Service
    Privacy](#ref-for-dfn-did-subjects-61 "§ 10.6 Service Privacy")
-   [§ Maintaining Herd
    Privacy](#ref-for-dfn-did-subjects-62 "§ Maintaining Herd Privacy")
    [(2)](#ref-for-dfn-did-subjects-63 "Reference 2")
    [(3)](#ref-for-dfn-did-subjects-64 "Reference 3")
    [(4)](#ref-for-dfn-did-subjects-65 "Reference 4")
    [(5)](#ref-for-dfn-did-subjects-66 "Reference 5")
-   [§ B.3 Determining the DID
    subject](#ref-for-dfn-did-subjects-67 "§ B.3 Determining the DID subject")
    [(2)](#ref-for-dfn-did-subjects-68 "Reference 2")
    [(3)](#ref-for-dfn-did-subjects-69 "Reference 3")
    [(4)](#ref-for-dfn-did-subjects-70 "Reference 4")
    [(5)](#ref-for-dfn-did-subjects-71 "Reference 5")
    [(6)](#ref-for-dfn-did-subjects-72 "Reference 6")
-   [§ B.4 Referring to the DID
    document](#ref-for-dfn-did-subjects-73 "§ B.4 Referring to the DID document")
    [(2)](#ref-for-dfn-did-subjects-74 "Reference 2")
    [(3)](#ref-for-dfn-did-subjects-75 "Reference 3")
    [(4)](#ref-for-dfn-did-subjects-76 "Reference 4")
    [(5)](#ref-for-dfn-did-subjects-77 "Reference 5")
    [(6)](#ref-for-dfn-did-subjects-78 "Reference 6")
-   [§ B.5 Statements in the DID
    document](#ref-for-dfn-did-subjects-79 "§ B.5 Statements in the DID document")
    [(2)](#ref-for-dfn-did-subjects-80 "Reference 2")
    [(3)](#ref-for-dfn-did-subjects-81 "Reference 3")
-   [§ B.6 Discovering more information about the DID
    subject](#ref-for-dfn-did-subjects-82 "§ B.6 Discovering more information about the DID subject")
    [(2)](#ref-for-dfn-did-subjects-83 "Reference 2")
    [(3)](#ref-for-dfn-did-subjects-84 "Reference 3")
    [(4)](#ref-for-dfn-did-subjects-85 "Reference 4")
    [(5)](#ref-for-dfn-did-subjects-86 "Reference 5")
-   [§ B.7 Serving a representation of the DID
    subject](#ref-for-dfn-did-subjects-87 "§ B.7 Serving a representation of the DID subject")
    [(2)](#ref-for-dfn-did-subjects-88 "Reference 2")
-   [§ B.9 The relationship between DID controllers and DID
    subjects](#ref-for-dfn-did-subjects-89 "§ B.9 The relationship between DID controllers and DID subjects")
-   [§ B.9.1 Set #1: The DID subject is the DID
    controller](#ref-for-dfn-did-subjects-90 "§ B.9.1 Set #1: The DID subject is the DID controller")
    [(2)](#ref-for-dfn-did-subjects-91 "Reference 2")
    [(3)](#ref-for-dfn-did-subjects-92 "Reference 3")
-   [§ B.9.2 Set #2: The DID subject is not the DID
    controller](#ref-for-dfn-did-subjects-93 "§ B.9.2 Set #2: The DID subject is not the DID controller")
    [(2)](#ref-for-dfn-did-subjects-94 "Reference 2")
-   [§ B.10.2 Group
    Control](#ref-for-dfn-did-subjects-95 "§ B.10.2 Group Control")
-   [§ B.11 Changing the DID
    subject](#ref-for-dfn-did-subjects-96 "§ B.11 Changing the DID subject")
    [(2)](#ref-for-dfn-did-subjects-97 "Reference 2")
::::

:::: {#dfn-panel-for-dfn-did-urls .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: DID URL"}
[]{.caret}

<div>

[Permalink](#dfn-did-urls){.self-link
aria-label="Permalink for definition: DID URL. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 1.3 Architecture
    Overview](#ref-for-dfn-did-urls-1 "§ 1.3 Architecture Overview")
    [(2)](#ref-for-dfn-did-urls-2 "Reference 2")
-   [§ 2. Terminology](#ref-for-dfn-did-urls-3 "§ 2. Terminology")
    [(2)](#ref-for-dfn-did-urls-4 "Reference 2")
    [(3)](#ref-for-dfn-did-urls-5 "Reference 3")
    [(4)](#ref-for-dfn-did-urls-6 "Reference 4")
    [(5)](#ref-for-dfn-did-urls-7 "Reference 5")
    [(6)](#ref-for-dfn-did-urls-8 "Reference 6")
    [(7)](#ref-for-dfn-did-urls-9 "Reference 7")
    [(8)](#ref-for-dfn-did-urls-10 "Reference 8")
-   [§ 3. Identifier](#ref-for-dfn-did-urls-11 "§ 3. Identifier")
    [(2)](#ref-for-dfn-did-urls-12 "Reference 2")
-   [§ 3.2 DID URL
    Syntax](#ref-for-dfn-did-urls-13 "§ 3.2 DID URL Syntax")
    [(2)](#ref-for-dfn-did-urls-14 "Reference 2")
    [(3)](#ref-for-dfn-did-urls-15 "Reference 3")
-   [§ 3.2.1 DID
    Parameters](#ref-for-dfn-did-urls-16 "§ 3.2.1 DID Parameters")
    [(2)](#ref-for-dfn-did-urls-17 "Reference 2")
    [(3)](#ref-for-dfn-did-urls-18 "Reference 3")
    [(4)](#ref-for-dfn-did-urls-19 "Reference 4")
    [(5)](#ref-for-dfn-did-urls-20 "Reference 5")
-   [§ 3.2.2 Relative DID
    URLs](#ref-for-dfn-did-urls-21 "§ 3.2.2 Relative DID URLs")
    [(2)](#ref-for-dfn-did-urls-22 "Reference 2")
    [(3)](#ref-for-dfn-did-urls-23 "Reference 3")
    [(4)](#ref-for-dfn-did-urls-24 "Reference 4")
    [(5)](#ref-for-dfn-did-urls-25 "Reference 5")
    [(6)](#ref-for-dfn-did-urls-26 "Reference 6")
-   [§ 7.2 DID URL
    Dereferencing](#ref-for-dfn-did-urls-27 "§ 7.2 DID URL Dereferencing")
    [(2)](#ref-for-dfn-did-urls-28 "Reference 2")
    [(3)](#ref-for-dfn-did-urls-29 "Reference 3")
    [(4)](#ref-for-dfn-did-urls-30 "Reference 4")
    [(5)](#ref-for-dfn-did-urls-31 "Reference 5")
    [(6)](#ref-for-dfn-did-urls-32 "Reference 6")
    [(7)](#ref-for-dfn-did-urls-33 "Reference 7")
    [(8)](#ref-for-dfn-did-urls-34 "Reference 8")
-   [§ 7.2.2 DID URL Dereferencing
    Metadata](#ref-for-dfn-did-urls-35 "§ 7.2.2 DID URL Dereferencing Metadata")
-   [§ 9.11 DIDs as Enhanced
    URNs](#ref-for-dfn-did-urls-36 "§ 9.11 DIDs as Enhanced URNs")
-   [§ B.7 Serving a representation of the DID
    subject](#ref-for-dfn-did-urls-37 "§ B.7 Serving a representation of the DID subject")
::::

:::: {#dfn-panel-for-dfn-did-url-dereferencing .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: DID URL dereferencing"}
[]{.caret}

<div>

[Permalink](#dfn-did-url-dereferencing){.self-link
aria-label="Permalink for definition: DID URL dereferencing. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 1.3 Architecture
    Overview](#ref-for-dfn-did-url-dereferencing-1 "§ 1.3 Architecture Overview")
    [(2)](#ref-for-dfn-did-url-dereferencing-2 "Reference 2")
-   [§ 2.
    Terminology](#ref-for-dfn-did-url-dereferencing-3 "§ 2. Terminology")
-   [§ 3.2.1 DID
    Parameters](#ref-for-dfn-did-url-dereferencing-4 "§ 3.2.1 DID Parameters")
-   [§ 7.
    Resolution](#ref-for-dfn-did-url-dereferencing-5 "§ 7. Resolution")
-   [§ 7.2 DID URL
    Dereferencing](#ref-for-dfn-did-url-dereferencing-6 "§ 7.2 DID URL Dereferencing")
    [(2)](#ref-for-dfn-did-url-dereferencing-7 "Reference 2")
    [(3)](#ref-for-dfn-did-url-dereferencing-8 "Reference 3")
    [(4)](#ref-for-dfn-did-url-dereferencing-9 "Reference 4")
    [(5)](#ref-for-dfn-did-url-dereferencing-10 "Reference 5")
    [(6)](#ref-for-dfn-did-url-dereferencing-11 "Reference 6")
    [(7)](#ref-for-dfn-did-url-dereferencing-12 "Reference 7")
-   [§ 7.2.1 DID URL Dereferencing
    Options](#ref-for-dfn-did-url-dereferencing-13 "§ 7.2.1 DID URL Dereferencing Options")
-   [§ 7.2.2 DID URL Dereferencing
    Metadata](#ref-for-dfn-did-url-dereferencing-14 "§ 7.2.2 DID URL Dereferencing Metadata")
-   [§ 7.3 Metadata
    Structure](#ref-for-dfn-did-url-dereferencing-15 "§ 7.3 Metadata Structure")
::::

:::: {#dfn-panel-for-dfn-did-url-dereferencers .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: DID URL dereferencer"}
[]{.caret}

<div>

[Permalink](#dfn-did-url-dereferencers){.self-link
aria-label="Permalink for definition: DID URL dereferencer. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 1.3 Architecture
    Overview](#ref-for-dfn-did-url-dereferencers-1 "§ 1.3 Architecture Overview")
-   
-   [§ 7.2.2 DID URL Dereferencing
    Metadata](#ref-for-dfn-did-url-dereferencers-3 "§ 7.2.2 DID URL Dereferencing Metadata")
::::

:::: {#dfn-panel-for-dfn-distributed-ledger-technology .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: distributed ledger"}
[]{.caret}

<div>

[Permalink](#dfn-distributed-ledger-technology){.self-link
aria-label="Permalink for definition: distributed ledger. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 1.3 Architecture
    Overview](#ref-for-dfn-distributed-ledger-technology-1 "§ 1.3 Architecture Overview")
-   [§ 2.
    Terminology](#ref-for-dfn-distributed-ledger-technology-2 "§ 2. Terminology")
-   [§ 8.3 Security
    Requirements](#ref-for-dfn-distributed-ledger-technology-3 "§ 8.3 Security Requirements")
    [(2)](#ref-for-dfn-distributed-ledger-technology-4 "Reference 2")
-   [§ 10.1 Keep Personal Data
    Private](#ref-for-dfn-distributed-ledger-technology-5 "§ 10.1 Keep Personal Data Private")
::::

:::: {#dfn-panel-for-dfn-public-key-description .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: public key description"}
[]{.caret}

<div>

[Permalink](#dfn-public-key-description){.self-link
aria-label="Permalink for definition: public key description. Activate to close this dialog."}

</div>

**Referenced in:**

-   
::::

:::: {#dfn-panel-for-dfn-resources .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: resource"}
[]{.caret}

<div>

[Permalink](#dfn-resources){.self-link
aria-label="Permalink for definition: resource. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 1.3 Architecture
    Overview](#ref-for-dfn-resources-1 "§ 1.3 Architecture Overview")
    [(2)](#ref-for-dfn-resources-2 "Reference 2")
    [(3)](#ref-for-dfn-resources-3 "Reference 3")
-   [§ 2. Terminology](#ref-for-dfn-resources-4 "§ 2. Terminology")
-   [§ 3.2 DID URL
    Syntax](#ref-for-dfn-resources-5 "§ 3.2 DID URL Syntax")
-   [§ Fragment](#ref-for-dfn-resources-6 "§ Fragment")
-   [§ 3.2.1 DID
    Parameters](#ref-for-dfn-resources-7 "§ 3.2.1 DID Parameters")
    [(2)](#ref-for-dfn-resources-8 "Reference 2")
    [(3)](#ref-for-dfn-resources-9 "Reference 3")
    [(4)](#ref-for-dfn-resources-10 "Reference 4")
    [(5)](#ref-for-dfn-resources-11 "Reference 5")
-   [§ 3.2.2 Relative DID
    URLs](#ref-for-dfn-resources-12 "§ 3.2.2 Relative DID URLs")
-   [§ 5.2.2 Referring to Verification
    Methods](#ref-for-dfn-resources-13 "§ 5.2.2 Referring to Verification Methods")
-   [§ 7.2 DID URL
    Dereferencing](#ref-for-dfn-resources-14 "§ 7.2 DID URL Dereferencing")
    [(2)](#ref-for-dfn-resources-15 "Reference 2")
    [(3)](#ref-for-dfn-resources-16 "Reference 3")
::::

:::: {#dfn-panel-for-dfn-representations .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: representation"}
[]{.caret}

<div>

[Permalink](#dfn-representations){.self-link
aria-label="Permalink for definition: representation. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 2.
    Terminology](#ref-for-dfn-representations-1 "§ 2. Terminology")
    [(2)](#ref-for-dfn-representations-2 "Reference 2")
    [(3)](#ref-for-dfn-representations-3 "Reference 3")
-   [§ Fragment](#ref-for-dfn-representations-4 "§ Fragment")
    [(2)](#ref-for-dfn-representations-5 "Reference 2")
-   [§ 4. Data Model](#ref-for-dfn-representations-6 "§ 4. Data Model")
    [(2)](#ref-for-dfn-representations-7 "Reference 2")
-   [§ 4.1
    Extensibility](#ref-for-dfn-representations-8 "§ 4.1 Extensibility")
    [(2)](#ref-for-dfn-representations-9 "Reference 2")
    [(3)](#ref-for-dfn-representations-10 "Reference 3")
    [(4)](#ref-for-dfn-representations-11 "Reference 4")
    [(5)](#ref-for-dfn-representations-12 "Reference 5")
    [(6)](#ref-for-dfn-representations-13 "Reference 6")
-   [§ 6.
    Representations](#ref-for-dfn-representations-14 "§ 6. Representations")
    [(2)](#ref-for-dfn-representations-15 "Reference 2")
    [(3)](#ref-for-dfn-representations-16 "Reference 3")
    [(4)](#ref-for-dfn-representations-17 "Reference 4")
    [(5)](#ref-for-dfn-representations-18 "Reference 5")
    [(6)](#ref-for-dfn-representations-19 "Reference 6")
    [(7)](#ref-for-dfn-representations-20 "Reference 7")
-   [§ 6.1 Production and
    Consumption](#ref-for-dfn-representations-21 "§ 6.1 Production and Consumption")
    [(2)](#ref-for-dfn-representations-22 "Reference 2")
    [(3)](#ref-for-dfn-representations-23 "Reference 3")
    [(4)](#ref-for-dfn-representations-24 "Reference 4")
    [(5)](#ref-for-dfn-representations-25 "Reference 5")
    [(6)](#ref-for-dfn-representations-26 "Reference 6")
    [(7)](#ref-for-dfn-representations-27 "Reference 7")
    [(8)](#ref-for-dfn-representations-28 "Reference 8")
    [(9)](#ref-for-dfn-representations-29 "Reference 9")
    [(10)](#ref-for-dfn-representations-30 "Reference 10")
    [(11)](#ref-for-dfn-representations-31 "Reference 11")
    [(12)](#ref-for-dfn-representations-32 "Reference 12")
    [(13)](#ref-for-dfn-representations-33 "Reference 13")
    [(14)](#ref-for-dfn-representations-34 "Reference 14")
    [(15)](#ref-for-dfn-representations-35 "Reference 15")
    [(16)](#ref-for-dfn-representations-36 "Reference 16")
    [(17)](#ref-for-dfn-representations-37 "Reference 17")
    [(18)](#ref-for-dfn-representations-38 "Reference 18")
    [(19)](#ref-for-dfn-representations-39 "Reference 19")
    [(20)](#ref-for-dfn-representations-40 "Reference 20")
    [(21)](#ref-for-dfn-representations-41 "Reference 21")
    [(22)](#ref-for-dfn-representations-42 "Reference 22")
-   [§ 6.2 JSON](#ref-for-dfn-representations-43 "§ 6.2 JSON")
-   [§ 6.2.1
    Production](#ref-for-dfn-representations-44 "§ 6.2.1 Production")
    [(2)](#ref-for-dfn-representations-45 "Reference 2")
-   [§ 6.2.2
    Consumption](#ref-for-dfn-representations-46 "§ 6.2.2 Consumption")
    [(2)](#ref-for-dfn-representations-47 "Reference 2")
    [(3)](#ref-for-dfn-representations-48 "Reference 3")
-   [§ 6.3 JSON-LD](#ref-for-dfn-representations-49 "§ 6.3 JSON-LD")
    [(2)](#ref-for-dfn-representations-50 "Reference 2")
-   [§ 6.3.1
    Production](#ref-for-dfn-representations-51 "§ 6.3.1 Production")
    [(2)](#ref-for-dfn-representations-52 "Reference 2")
    [(3)](#ref-for-dfn-representations-53 "Reference 3")
    [(4)](#ref-for-dfn-representations-54 "Reference 4")
    [(5)](#ref-for-dfn-representations-55 "Reference 5")
    [(6)](#ref-for-dfn-representations-56 "Reference 6")
    [(7)](#ref-for-dfn-representations-57 "Reference 7")
    [(8)](#ref-for-dfn-representations-58 "Reference 8")
-   [§ 6.3.2
    Consumption](#ref-for-dfn-representations-59 "§ 6.3.2 Consumption")
    [(2)](#ref-for-dfn-representations-60 "Reference 2")
    [(3)](#ref-for-dfn-representations-61 "Reference 3")
    [(4)](#ref-for-dfn-representations-62 "Reference 4")
-   [§ 7. Resolution](#ref-for-dfn-representations-63 "§ 7. Resolution")
-   [§ 7.1.1 DID Resolution
    Options](#ref-for-dfn-representations-64 "§ 7.1.1 DID Resolution Options")
    [(2)](#ref-for-dfn-representations-65 "Reference 2")
    [(3)](#ref-for-dfn-representations-66 "Reference 3")
-   [§ 7.1.2 DID Resolution
    Metadata](#ref-for-dfn-representations-67 "§ 7.1.2 DID Resolution Metadata")
    [(2)](#ref-for-dfn-representations-68 "Reference 2")
-   [§ 7.2 DID URL
    Dereferencing](#ref-for-dfn-representations-69 "§ 7.2 DID URL Dereferencing")
-   [§ 7.2.1 DID URL Dereferencing
    Options](#ref-for-dfn-representations-70 "§ 7.2.1 DID URL Dereferencing Options")
    [(2)](#ref-for-dfn-representations-71 "Reference 2")
-   [§ 7.3 Metadata
    Structure](#ref-for-dfn-representations-72 "§ 7.3 Metadata Structure")
-   [§ B.2 Creation of a
    DID](#ref-for-dfn-representations-73 "§ B.2 Creation of a DID")
::::

:::: {#dfn-panel-for-dfn-representation-specific-entry .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: representation-specific entries"}
[]{.caret}

<div>

[Permalink](#dfn-representation-specific-entry){.self-link
aria-label="Permalink for definition: representation-specific entries. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 4. Data
    Model](#ref-for-dfn-representation-specific-entry-1 "§ 4. Data Model")
-   [§ 6.1 Production and
    Consumption](#ref-for-dfn-representation-specific-entry-2 "§ 6.1 Production and Consumption")
    [(2)](#ref-for-dfn-representation-specific-entry-3 "Reference 2")
    [(3)](#ref-for-dfn-representation-specific-entry-4 "Reference 3")
    [(4)](#ref-for-dfn-representation-specific-entry-5 "Reference 4")
    [(5)](#ref-for-dfn-representation-specific-entry-6 "Reference 5")
    [(6)](#ref-for-dfn-representation-specific-entry-7 "Reference 6")
    [(7)](#ref-for-dfn-representation-specific-entry-8 "Reference 7")
    [(8)](#ref-for-dfn-representation-specific-entry-9 "Reference 8")
-   [§ 6.2.1
    Production](#ref-for-dfn-representation-specific-entry-10 "§ 6.2.1 Production")
-   [§ 6.3
    JSON-LD](#ref-for-dfn-representation-specific-entry-11 "§ 6.3 JSON-LD")
-   [§ 6.3.1
    Production](#ref-for-dfn-representation-specific-entry-12 "§ 6.3.1 Production")
    [(2)](#ref-for-dfn-representation-specific-entry-13 "Reference 2")
::::

:::: {#dfn-panel-for-dfn-service .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: services"}
[]{.caret}

<div>

[Permalink](#dfn-service){.self-link
aria-label="Permalink for definition: services. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ Abstract](#ref-for-dfn-service-1 "§ Abstract")
    [(2)](#ref-for-dfn-service-2 "Reference 2")
-   [§ 1.2 Design Goals](#ref-for-dfn-service-3 "§ 1.2 Design Goals")
-   [§ 1.3 Architecture
    Overview](#ref-for-dfn-service-4 "§ 1.3 Architecture Overview")
-   [§ 2. Terminology](#ref-for-dfn-service-5 "§ 2. Terminology")
-   [§ 3.2 DID URL
    Syntax](#ref-for-dfn-service-6 "§ 3.2 DID URL Syntax")
-   [§ 3.2.1 DID
    Parameters](#ref-for-dfn-service-7 "§ 3.2.1 DID Parameters")
-   [§ 3.2.2 Relative DID
    URLs](#ref-for-dfn-service-8 "§ 3.2.2 Relative DID URLs")
-   [§ DID Document
    properties](#ref-for-dfn-service-9 "§ DID Document properties")
-   [§ 5.4 Services](#ref-for-dfn-service-10 "§ 5.4 Services")
    [(2)](#ref-for-dfn-service-11 "Reference 2")
    [(3)](#ref-for-dfn-service-12 "Reference 3")
    [(4)](#ref-for-dfn-service-13 "Reference 4")
    [(5)](#ref-for-dfn-service-14 "Reference 5")
    [(6)](#ref-for-dfn-service-15 "Reference 6")
    [(7)](#ref-for-dfn-service-16 "Reference 7")
    [(8)](#ref-for-dfn-service-17 "Reference 8")
    [(9)](#ref-for-dfn-service-18 "Reference 9")
    [(10)](#ref-for-dfn-service-19 "Reference 10")
-   [§ 8.3 Security
    Requirements](#ref-for-dfn-service-20 "§ 8.3 Security Requirements")
-   [§ 9.3 Authentication Service
    Endpoints](#ref-for-dfn-service-21 "§ 9.3 Authentication Service Endpoints")
-   [§ 9.12 Immutability](#ref-for-dfn-service-22 "§ 9.12 Immutability")
-   [§ 10.6 Service
    Privacy](#ref-for-dfn-service-23 "§ 10.6 Service Privacy")
    [(2)](#ref-for-dfn-service-24 "Reference 2")
-   [§ B.5 Statements in the DID
    document](#ref-for-dfn-service-25 "§ B.5 Statements in the DID document")
-   [§ B.6 Discovering more information about the DID
    subject](#ref-for-dfn-service-26 "§ B.6 Discovering more information about the DID subject")
::::

:::: {#dfn-panel-for-dfn-service-endpoints .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: service endpoint"}
[]{.caret}

<div>

[Permalink](#dfn-service-endpoints){.self-link
aria-label="Permalink for definition: service endpoint. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 2.
    Terminology](#ref-for-dfn-service-endpoints-1 "§ 2. Terminology")
-   [§ 3.2.1 DID
    Parameters](#ref-for-dfn-service-endpoints-2 "§ 3.2.1 DID Parameters")
-   [§ DID Document
    properties](#ref-for-dfn-service-endpoints-3 "§ DID Document properties")
-   [§ 9.3 Authentication Service
    Endpoints](#ref-for-dfn-service-endpoints-4 "§ 9.3 Authentication Service Endpoints")
    [(2)](#ref-for-dfn-service-endpoints-5 "Reference 2")
-   [§ 9.5 Notification of DID Document
    Changes](#ref-for-dfn-service-endpoints-6 "§ 9.5 Notification of DID Document Changes")
-   [§ 10.1 Keep Personal Data
    Private](#ref-for-dfn-service-endpoints-7 "§ 10.1 Keep Personal Data Private")
    [(2)](#ref-for-dfn-service-endpoints-8 "Reference 2")
    [(3)](#ref-for-dfn-service-endpoints-9 "Reference 3")
-   [§ 10.3 DID Document Correlation
    Risks](#ref-for-dfn-service-endpoints-10 "§ 10.3 DID Document Correlation Risks")
    [(2)](#ref-for-dfn-service-endpoints-11 "Reference 2")
-   [§ 10.6 Service
    Privacy](#ref-for-dfn-service-endpoints-12 "§ 10.6 Service Privacy")
    [(2)](#ref-for-dfn-service-endpoints-13 "Reference 2")
    [(3)](#ref-for-dfn-service-endpoints-14 "Reference 3")
-   [§ B.6 Discovering more information about the DID
    subject](#ref-for-dfn-service-endpoints-15 "§ B.6 Discovering more information about the DID subject")
    [(2)](#ref-for-dfn-service-endpoints-16 "Reference 2")
::::

:::: {#dfn-panel-for-dfn-uri .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: Uniform Resource Identifier"}
[]{.caret}

<div>

[Permalink](#dfn-uri){.self-link
aria-label="Permalink for definition: Uniform Resource Identifier. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ Abstract](#ref-for-dfn-uri-1 "§ Abstract")
-   [§ 1.3 Architecture
    Overview](#ref-for-dfn-uri-2 "§ 1.3 Architecture Overview")
    [(2)](#ref-for-dfn-uri-3 "Reference 2")
-   [§ 1.4 Conformance](#ref-for-dfn-uri-4 "§ 1.4 Conformance")
-   [§ 3.1 DID Syntax](#ref-for-dfn-uri-5 "§ 3.1 DID Syntax")
-   [§ Path](#ref-for-dfn-uri-6 "§ Path")
    [(2)](#ref-for-dfn-uri-7 "Reference 2")
-   [§ Query](#ref-for-dfn-uri-8 "§ Query")
-   [§ Fragment](#ref-for-dfn-uri-9 "§ Fragment")
-   [§ 3.2.1 DID
    Parameters](#ref-for-dfn-uri-10 "§ 3.2.1 DID Parameters")
-   [§ DID Document
    properties](#ref-for-dfn-uri-11 "§ DID Document properties")
-   [§ Service properties](#ref-for-dfn-uri-12 "§ Service properties")
    [(2)](#ref-for-dfn-uri-13 "Reference 2")
    [(3)](#ref-for-dfn-uri-14 "Reference 3")
-   [§ 5.1.3 Also Known As](#ref-for-dfn-uri-15 "§ 5.1.3 Also Known As")
    [(2)](#ref-for-dfn-uri-16 "Reference 2")
-   [§ 5.4 Services](#ref-for-dfn-uri-17 "§ 5.4 Services")
    [(2)](#ref-for-dfn-uri-18 "Reference 2")
    [(3)](#ref-for-dfn-uri-19 "Reference 3")
-   [§ 8. Methods](#ref-for-dfn-uri-20 "§ 8. Methods")
    [(2)](#ref-for-dfn-uri-21 "Reference 2")
-   [§ 9.14 Equivalence
    Properties](#ref-for-dfn-uri-22 "§ 9.14 Equivalence Properties")
-   [§ Maintaining Herd
    Privacy](#ref-for-dfn-uri-23 "§ Maintaining Herd Privacy")
    [(2)](#ref-for-dfn-uri-24 "Reference 2")
-   [§ B.4 Referring to the DID
    document](#ref-for-dfn-uri-25 "§ B.4 Referring to the DID document")
-   [§ B.6 Discovering more information about the DID
    subject](#ref-for-dfn-uri-26 "§ B.6 Discovering more information about the DID subject")
::::

:::: {#dfn-panel-for-dfn-verifiable-credentials .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: verifiable credential"}
[]{.caret}

<div>

[Permalink](#dfn-verifiable-credentials){.self-link
aria-label="Permalink for definition: verifiable credential. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 2.
    Terminology](#ref-for-dfn-verifiable-credentials-1 "§ 2. Terminology")
-   [§ 5.3.2
    Assertion](#ref-for-dfn-verifiable-credentials-2 "§ 5.3.2 Assertion")
    [(2)](#ref-for-dfn-verifiable-credentials-3 "Reference 2")
-   [§ Binding to Physical
    Identity](#ref-for-dfn-verifiable-credentials-4 "§ Binding to Physical Identity")
::::

:::: {#dfn-panel-for-dfn-verifiable-data-registry .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: verifiable data registry"}
[]{.caret}

<div>

[Permalink](#dfn-verifiable-data-registry){.self-link
aria-label="Permalink for definition: verifiable data registry. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 1.3 Architecture
    Overview](#ref-for-dfn-verifiable-data-registry-1 "§ 1.3 Architecture Overview")
-   [§ 7.1.3 DID Document
    Metadata](#ref-for-dfn-verifiable-data-registry-2 "§ 7.1.3 DID Document Metadata")
-   [§ 8.
    Methods](#ref-for-dfn-verifiable-data-registry-3 "§ 8. Methods")
    [(2)](#ref-for-dfn-verifiable-data-registry-4 "Reference 2")
-   [§ 8.1 Method
    Syntax](#ref-for-dfn-verifiable-data-registry-5 "§ 8.1 Method Syntax")
-   [§ Proving Control of a DID and/or DID
    Document](#ref-for-dfn-verifiable-data-registry-6 "§ Proving Control of a DID and/or DID Document")
-   [§ 9.4
    Non-Repudiation](#ref-for-dfn-verifiable-data-registry-7 "§ 9.4 Non-Repudiation")
-   [§ 9.5 Notification of DID Document
    Changes](#ref-for-dfn-verifiable-data-registry-8 "§ 9.5 Notification of DID Document Changes")
    [(2)](#ref-for-dfn-verifiable-data-registry-9 "Reference 2")
-   [§ 9.7 Verification Method
    Rotation](#ref-for-dfn-verifiable-data-registry-10 "§ 9.7 Verification Method Rotation")
-   [§ 10.1 Keep Personal Data
    Private](#ref-for-dfn-verifiable-data-registry-11 "§ 10.1 Keep Personal Data Private")
-   [§ 10.6 Service
    Privacy](#ref-for-dfn-verifiable-data-registry-12 "§ 10.6 Service Privacy")
-   [§ Service Endpoint
    Alternatives](#ref-for-dfn-verifiable-data-registry-13 "§ Service Endpoint Alternatives")
-   [§ B.2 Creation of a
    DID](#ref-for-dfn-verifiable-data-registry-14 "§ B.2 Creation of a DID")
-   [§ B.7 Serving a representation of the DID
    subject](#ref-for-dfn-verifiable-data-registry-15 "§ B.7 Serving a representation of the DID subject")
::::

:::: {#dfn-panel-for-dfn-verifiable-timestamp .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: verifiable timestamp"}
[]{.caret}

<div>

[Permalink](#dfn-verifiable-timestamp){.self-link
aria-label="Permalink for definition: verifiable timestamp. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ Proving Control of a DID and/or DID
    Document](#ref-for-dfn-verifiable-timestamp-1 "§ Proving Control of a DID and/or DID Document")
-   [§ 9.4
    Non-Repudiation](#ref-for-dfn-verifiable-timestamp-2 "§ 9.4 Non-Repudiation")
::::

:::: {#dfn-panel-for-dfn-verification-method .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: verification method"}
[]{.caret}

<div>

[Permalink](#dfn-verification-method){.self-link
aria-label="Permalink for definition: verification method. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ Abstract](#ref-for-dfn-verification-method-1 "§ Abstract")
-   [§ 1.3 Architecture
    Overview](#ref-for-dfn-verification-method-2 "§ 1.3 Architecture Overview")
-   [§ 2.
    Terminology](#ref-for-dfn-verification-method-3 "§ 2. Terminology")
    [(2)](#ref-for-dfn-verification-method-4 "Reference 2")
    [(3)](#ref-for-dfn-verification-method-5 "Reference 3")
    [(4)](#ref-for-dfn-verification-method-6 "Reference 4")
-   [§ 3.2 DID URL
    Syntax](#ref-for-dfn-verification-method-7 "§ 3.2 DID URL Syntax")
-   [§ 3.2.2 Relative DID
    URLs](#ref-for-dfn-verification-method-8 "§ 3.2.2 Relative DID URLs")
-   [§ DID Document
    properties](#ref-for-dfn-verification-method-9 "§ DID Document properties")
    [(2)](#ref-for-dfn-verification-method-10 "Reference 2")
-   [§ 5.1.2 DID
    Controller](#ref-for-dfn-verification-method-11 "§ 5.1.2 DID Controller")
    [(2)](#ref-for-dfn-verification-method-12 "Reference 2")
    [(3)](#ref-for-dfn-verification-method-13 "Reference 3")
-   [§ 5.2 Verification
    Methods](#ref-for-dfn-verification-method-14 "§ 5.2 Verification Methods")
    [(2)](#ref-for-dfn-verification-method-15 "Reference 2")
    [(3)](#ref-for-dfn-verification-method-16 "Reference 3")
    [(4)](#ref-for-dfn-verification-method-17 "Reference 4")
    [(5)](#ref-for-dfn-verification-method-18 "Reference 5")
    [(6)](#ref-for-dfn-verification-method-19 "Reference 6")
    [(7)](#ref-for-dfn-verification-method-20 "Reference 7")
    [(8)](#ref-for-dfn-verification-method-21 "Reference 8")
    [(9)](#ref-for-dfn-verification-method-22 "Reference 9")
    [(10)](#ref-for-dfn-verification-method-23 "Reference 10")
    [(11)](#ref-for-dfn-verification-method-24 "Reference 11")
    [(12)](#ref-for-dfn-verification-method-25 "Reference 12")
    [(13)](#ref-for-dfn-verification-method-26 "Reference 13")
-   [§ 5.2.1 Verification
    Material](#ref-for-dfn-verification-method-27 "§ 5.2.1 Verification Material")
    [(2)](#ref-for-dfn-verification-method-28 "Reference 2")
    [(3)](#ref-for-dfn-verification-method-29 "Reference 3")
    [(4)](#ref-for-dfn-verification-method-30 "Reference 4")
    [(5)](#ref-for-dfn-verification-method-31 "Reference 5")
    [(6)](#ref-for-dfn-verification-method-32 "Reference 6")
    [(7)](#ref-for-dfn-verification-method-33 "Reference 7")
-   [§ 5.2.2 Referring to Verification
    Methods](#ref-for-dfn-verification-method-34 "§ 5.2.2 Referring to Verification Methods")
    [(2)](#ref-for-dfn-verification-method-35 "Reference 2")
    [(3)](#ref-for-dfn-verification-method-36 "Reference 3")
    [(4)](#ref-for-dfn-verification-method-37 "Reference 4")
    [(5)](#ref-for-dfn-verification-method-38 "Reference 5")
    [(6)](#ref-for-dfn-verification-method-39 "Reference 6")
-   [§ 5.3 Verification
    Relationships](#ref-for-dfn-verification-method-40 "§ 5.3 Verification Relationships")
    [(2)](#ref-for-dfn-verification-method-41 "Reference 2")
    [(3)](#ref-for-dfn-verification-method-42 "Reference 3")
    [(4)](#ref-for-dfn-verification-method-43 "Reference 4")
    [(5)](#ref-for-dfn-verification-method-44 "Reference 5")
    [(6)](#ref-for-dfn-verification-method-45 "Reference 6")
-   [§ 5.3.1
    Authentication](#ref-for-dfn-verification-method-46 "§ 5.3.1 Authentication")
    [(2)](#ref-for-dfn-verification-method-47 "Reference 2")
    [(3)](#ref-for-dfn-verification-method-48 "Reference 3")
    [(4)](#ref-for-dfn-verification-method-49 "Reference 4")
    [(5)](#ref-for-dfn-verification-method-50 "Reference 5")
-   [§ 5.3.2
    Assertion](#ref-for-dfn-verification-method-51 "§ 5.3.2 Assertion")
    [(2)](#ref-for-dfn-verification-method-52 "Reference 2")
    [(3)](#ref-for-dfn-verification-method-53 "Reference 3")
-   [§ 5.3.3 Key
    Agreement](#ref-for-dfn-verification-method-54 "§ 5.3.3 Key Agreement")
    [(2)](#ref-for-dfn-verification-method-55 "Reference 2")
    [(3)](#ref-for-dfn-verification-method-56 "Reference 3")
-   [§ 5.3.4 Capability
    Invocation](#ref-for-dfn-verification-method-57 "§ 5.3.4 Capability Invocation")
    [(2)](#ref-for-dfn-verification-method-58 "Reference 2")
    [(3)](#ref-for-dfn-verification-method-59 "Reference 3")
    [(4)](#ref-for-dfn-verification-method-60 "Reference 4")
-   [§ 5.3.5 Capability
    Delegation](#ref-for-dfn-verification-method-61 "§ 5.3.5 Capability Delegation")
    [(2)](#ref-for-dfn-verification-method-62 "Reference 2")
    [(3)](#ref-for-dfn-verification-method-63 "Reference 3")
-   [§ 8.2 Method
    Operations](#ref-for-dfn-verification-method-64 "§ 8.2 Method Operations")
    [(2)](#ref-for-dfn-verification-method-65 "Reference 2")
-   [§ Proving Control of a DID and/or DID
    Document](#ref-for-dfn-verification-method-66 "§ Proving Control of a DID and/or DID Document")
-   [§ 9.7 Verification Method
    Rotation](#ref-for-dfn-verification-method-67 "§ 9.7 Verification Method Rotation")
    [(2)](#ref-for-dfn-verification-method-68 "Reference 2")
    [(3)](#ref-for-dfn-verification-method-69 "Reference 3")
    [(4)](#ref-for-dfn-verification-method-70 "Reference 4")
    [(5)](#ref-for-dfn-verification-method-71 "Reference 5")
    [(6)](#ref-for-dfn-verification-method-72 "Reference 6")
    [(7)](#ref-for-dfn-verification-method-73 "Reference 7")
    [(8)](#ref-for-dfn-verification-method-74 "Reference 8")
    [(9)](#ref-for-dfn-verification-method-75 "Reference 9")
    [(10)](#ref-for-dfn-verification-method-76 "Reference 10")
    [(11)](#ref-for-dfn-verification-method-77 "Reference 11")
    [(12)](#ref-for-dfn-verification-method-78 "Reference 12")
    [(13)](#ref-for-dfn-verification-method-79 "Reference 13")
    [(14)](#ref-for-dfn-verification-method-80 "Reference 14")
    [(15)](#ref-for-dfn-verification-method-81 "Reference 15")
-   [§ 9.8 Verification Method
    Revocation](#ref-for-dfn-verification-method-82 "§ 9.8 Verification Method Revocation")
    [(2)](#ref-for-dfn-verification-method-83 "Reference 2")
    [(3)](#ref-for-dfn-verification-method-84 "Reference 3")
    [(4)](#ref-for-dfn-verification-method-85 "Reference 4")
    [(5)](#ref-for-dfn-verification-method-86 "Reference 5")
    [(6)](#ref-for-dfn-verification-method-87 "Reference 6")
    [(7)](#ref-for-dfn-verification-method-88 "Reference 7")
    [(8)](#ref-for-dfn-verification-method-89 "Reference 8")
    [(9)](#ref-for-dfn-verification-method-90 "Reference 9")
    [(10)](#ref-for-dfn-verification-method-91 "Reference 10")
    [(11)](#ref-for-dfn-verification-method-92 "Reference 11")
    [(12)](#ref-for-dfn-verification-method-93 "Reference 12")
    [(13)](#ref-for-dfn-verification-method-94 "Reference 13")
    [(14)](#ref-for-dfn-verification-method-95 "Reference 14")
    [(15)](#ref-for-dfn-verification-method-96 "Reference 15")
-   [§ Revocation
    Semantics](#ref-for-dfn-verification-method-97 "§ Revocation Semantics")
-   [§ Revocation in Trustless
    Systems](#ref-for-dfn-verification-method-98 "§ Revocation in Trustless Systems")
-   [§ 9.16
    Persistence](#ref-for-dfn-verification-method-99 "§ 9.16 Persistence")
-   [§ 10.1 Keep Personal Data
    Private](#ref-for-dfn-verification-method-100 "§ 10.1 Keep Personal Data Private")
-   [§ 10.3 DID Document Correlation
    Risks](#ref-for-dfn-verification-method-101 "§ 10.3 DID Document Correlation Risks")
    [(2)](#ref-for-dfn-verification-method-102 "Reference 2")
-   [§ 10.4 DID Subject
    Classification](#ref-for-dfn-verification-method-103 "§ 10.4 DID Subject Classification")
-   [§ A.1 DID
    Documents](#ref-for-dfn-verification-method-104 "§ A.1 DID Documents")
-   [§ B.12 Changing the DID
    controller](#ref-for-dfn-verification-method-105 "§ B.12 Changing the DID controller")
    [(2)](#ref-for-dfn-verification-method-106 "Reference 2")
::::

:::: {#dfn-panel-for-dfn-verification-relationship .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: verification relationship"}
[]{.caret}

<div>

[Permalink](#dfn-verification-relationship){.self-link
aria-label="Permalink for definition: verification relationship. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 5.1.2 DID
    Controller](#ref-for-dfn-verification-relationship-1 "§ 5.1.2 DID Controller")
-   [§ 5.2.2 Referring to Verification
    Methods](#ref-for-dfn-verification-relationship-2 "§ 5.2.2 Referring to Verification Methods")
    [(2)](#ref-for-dfn-verification-relationship-3 "Reference 2")
-   [§ 5.3 Verification
    Relationships](#ref-for-dfn-verification-relationship-4 "§ 5.3 Verification Relationships")
    [(2)](#ref-for-dfn-verification-relationship-5 "Reference 2")
    [(3)](#ref-for-dfn-verification-relationship-6 "Reference 3")
    [(4)](#ref-for-dfn-verification-relationship-7 "Reference 4")
    [(5)](#ref-for-dfn-verification-relationship-8 "Reference 5")
    [(6)](#ref-for-dfn-verification-relationship-9 "Reference 6")
    [(7)](#ref-for-dfn-verification-relationship-10 "Reference 7")
    [(8)](#ref-for-dfn-verification-relationship-11 "Reference 8")
    [(9)](#ref-for-dfn-verification-relationship-12 "Reference 9")
-   [§ 5.3.1
    Authentication](#ref-for-dfn-verification-relationship-13 "§ 5.3.1 Authentication")
    [(2)](#ref-for-dfn-verification-relationship-14 "Reference 2")
-   [§ 5.3.2
    Assertion](#ref-for-dfn-verification-relationship-15 "§ 5.3.2 Assertion")
-   [§ 5.3.3 Key
    Agreement](#ref-for-dfn-verification-relationship-16 "§ 5.3.3 Key Agreement")
-   [§ 5.3.4 Capability
    Invocation](#ref-for-dfn-verification-relationship-17 "§ 5.3.4 Capability Invocation")
-   [§ 5.3.5 Capability
    Delegation](#ref-for-dfn-verification-relationship-18 "§ 5.3.5 Capability Delegation")
    [(2)](#ref-for-dfn-verification-relationship-19 "Reference 2")
-   [§ 8.2 Method
    Operations](#ref-for-dfn-verification-relationship-20 "§ 8.2 Method Operations")
-   [§ Proving Control of a DID and/or DID
    Document](#ref-for-dfn-verification-relationship-21 "§ Proving Control of a DID and/or DID Document")
-   [§ Binding to Physical
    Identity](#ref-for-dfn-verification-relationship-22 "§ Binding to Physical Identity")
-   [§ 9.8 Verification Method
    Revocation](#ref-for-dfn-verification-relationship-23 "§ 9.8 Verification Method Revocation")
-   [§ 9.17 Level of
    Assurance](#ref-for-dfn-verification-relationship-24 "§ 9.17 Level of Assurance")
::::

:::: {#dfn-panel-for-dfn-uuid .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: Universally Unique Identifier"}
[]{.caret}

<div>

[Permalink](#dfn-uuid){.self-link
aria-label="Permalink for definition: Universally Unique Identifier. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 3.2.1 DID
    Parameters](#ref-for-dfn-uuid-1 "§ 3.2.1 DID Parameters")
::::

:::: {#dfn-panel-for-dfn-datetime .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: datetime"}
[]{.caret}

<div>

[Permalink](#dfn-datetime){.self-link
aria-label="Permalink for definition: datetime. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 6.1 Production and
    Consumption](#ref-for-dfn-datetime-1 "§ 6.1 Production and Consumption")
    [(2)](#ref-for-dfn-datetime-2 "Reference 2")
-   [§ 6.2.1 Production](#ref-for-dfn-datetime-3 "§ 6.2.1 Production")
-   [§ 6.2.2 Consumption](#ref-for-dfn-datetime-4 "§ 6.2.2 Consumption")
    [(2)](#ref-for-dfn-datetime-5 "Reference 2")
::::

:::: {#dfn-panel-for-dfn-integer .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: integer"}
[]{.caret}

<div>

[Permalink](#dfn-integer){.self-link
aria-label="Permalink for definition: integer. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 6.2.1 Production](#ref-for-dfn-integer-1 "§ 6.2.1 Production")
-   [§ 6.2.2 Consumption](#ref-for-dfn-integer-2 "§ 6.2.2 Consumption")
::::

:::: {#dfn-panel-for-dfn-double .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: double"}
[]{.caret}

<div>

[Permalink](#dfn-double){.self-link
aria-label="Permalink for definition: double. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 6.2.1 Production](#ref-for-dfn-double-1 "§ 6.2.1 Production")
-   [§ 6.2.2 Consumption](#ref-for-dfn-double-2 "§ 6.2.2 Consumption")
    [(2)](#ref-for-dfn-double-3 "Reference 2")
::::

:::: {#dfn-panel-for-dfn-id .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: id"}
[]{.caret}

<div>

[Permalink](#dfn-id){.self-link
aria-label="Permalink for definition: id. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ DID Document
    properties](#ref-for-dfn-id-1 "§ DID Document properties")
-   [§ 5.1.1 DID Subject](#ref-for-dfn-id-2 "§ 5.1.1 DID Subject")
    [(2)](#ref-for-dfn-id-3 "Reference 2")
    [(3)](#ref-for-dfn-id-4 "Reference 3")
-   [§ 5.2 Verification
    Methods](#ref-for-dfn-id-5 "§ 5.2 Verification Methods")
-   [§ 5.4 Services](#ref-for-dfn-id-6 "§ 5.4 Services")
-   [§ 7.1 DID Resolution](#ref-for-dfn-id-7 "§ 7.1 DID Resolution")
-   [§ 9.12 Immutability](#ref-for-dfn-id-8 "§ 9.12 Immutability")
    [(2)](#ref-for-dfn-id-9 "Reference 2")
-   [§ B.3 Determining the DID
    subject](#ref-for-dfn-id-10 "§ B.3 Determining the DID subject")
-   [§ B.5 Statements in the DID
    document](#ref-for-dfn-id-11 "§ B.5 Statements in the DID document")
    [(2)](#ref-for-dfn-id-12 "Reference 2")
-   [§ B.11 Changing the DID
    subject](#ref-for-dfn-id-13 "§ B.11 Changing the DID subject")
::::

:::: {#dfn-panel-for-dfn-controller .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: controller"}
[]{.caret}

<div>

[Permalink](#dfn-controller){.self-link
aria-label="Permalink for definition: controller. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 1.3 Architecture
    Overview](#ref-for-dfn-controller-1 "§ 1.3 Architecture Overview")
-   [§ DID Document
    properties](#ref-for-dfn-controller-2 "§ DID Document properties")
-   [§ Verification Method
    properties](#ref-for-dfn-controller-3 "§ Verification Method properties")
-   [§ 5.1.2 DID
    Controller](#ref-for-dfn-controller-4 "§ 5.1.2 DID Controller")
-   [§ 5.2 Verification
    Methods](#ref-for-dfn-controller-5 "§ 5.2 Verification Methods")
-   [§ 8.2 Method
    Operations](#ref-for-dfn-controller-6 "§ 8.2 Method Operations")
-   [§ 9.7 Verification Method
    Rotation](#ref-for-dfn-controller-7 "§ 9.7 Verification Method Rotation")
    [(2)](#ref-for-dfn-controller-8 "Reference 2")
-   [§ 9.8 Verification Method
    Revocation](#ref-for-dfn-controller-9 "§ 9.8 Verification Method Revocation")
    [(2)](#ref-for-dfn-controller-10 "Reference 2")
    [(3)](#ref-for-dfn-controller-11 "Reference 3")
    [(4)](#ref-for-dfn-controller-12 "Reference 4")
    [(5)](#ref-for-dfn-controller-13 "Reference 5")
-   [§ 9.9 DID
    Recovery](#ref-for-dfn-controller-14 "§ 9.9 DID Recovery")
    [(2)](#ref-for-dfn-controller-15 "Reference 2")
-   [§ 9.16
    Persistence](#ref-for-dfn-controller-16 "§ 9.16 Persistence")
    [(2)](#ref-for-dfn-controller-17 "Reference 2")
    [(3)](#ref-for-dfn-controller-18 "Reference 3")
    [(4)](#ref-for-dfn-controller-19 "Reference 4")
    [(5)](#ref-for-dfn-controller-20 "Reference 5")
    [(6)](#ref-for-dfn-controller-21 "Reference 6")
    [(7)](#ref-for-dfn-controller-22 "Reference 7")
    [(8)](#ref-for-dfn-controller-23 "Reference 8")
    [(9)](#ref-for-dfn-controller-24 "Reference 9")
-   [§ 10.6 Service
    Privacy](#ref-for-dfn-controller-25 "§ 10.6 Service Privacy")
-   [§ B.12 Changing the DID
    controller](#ref-for-dfn-controller-26 "§ B.12 Changing the DID controller")
::::

:::: {#dfn-panel-for-dfn-alsoknownas .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: alsoKnownAs"}
[]{.caret}

<div>

[Permalink](#dfn-alsoknownas){.self-link
aria-label="Permalink for definition: alsoKnownAs. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ DID Document
    properties](#ref-for-dfn-alsoknownas-1 "§ DID Document properties")
-   [§ 5.1.3 Also Known
    As](#ref-for-dfn-alsoknownas-2 "§ 5.1.3 Also Known As")
    [(2)](#ref-for-dfn-alsoknownas-3 "Reference 2")
    [(3)](#ref-for-dfn-alsoknownas-4 "Reference 3")
    [(4)](#ref-for-dfn-alsoknownas-5 "Reference 4")
-   [§ 7.1.3 DID Document
    Metadata](#ref-for-dfn-alsoknownas-6 "§ 7.1.3 DID Document Metadata")
-   [§ 9.14 Equivalence
    Properties](#ref-for-dfn-alsoknownas-7 "§ 9.14 Equivalence Properties")
    [(2)](#ref-for-dfn-alsoknownas-8 "Reference 2")
-   [§ B.5 Statements in the DID
    document](#ref-for-dfn-alsoknownas-9 "§ B.5 Statements in the DID document")
-   [§ B.6 Discovering more information about the DID
    subject](#ref-for-dfn-alsoknownas-10 "§ B.6 Discovering more information about the DID subject")
-   [§ B.8 Assigning DIDs to existing web
    resources](#ref-for-dfn-alsoknownas-11 "§ B.8 Assigning DIDs to existing web resources")
::::

:::: {#dfn-panel-for-dfn-verificationmethod .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: verificationMethod"}
[]{.caret}

<div>

[Permalink](#dfn-verificationmethod){.self-link
aria-label="Permalink for definition: verificationMethod. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ DID Document
    properties](#ref-for-dfn-verificationmethod-1 "§ DID Document properties")
-   [§ B.5 Statements in the DID
    document](#ref-for-dfn-verificationmethod-2 "§ B.5 Statements in the DID document")
::::

:::: {#dfn-panel-for-dfn-publickeyjwk .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: publicKeyJwk"}
[]{.caret}

<div>

[Permalink](#dfn-publickeyjwk){.self-link
aria-label="Permalink for definition: publicKeyJwk. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ Verification Method
    properties](#ref-for-dfn-publickeyjwk-1 "§ Verification Method properties")
    [(2)](#ref-for-dfn-publickeyjwk-2 "Reference 2")
-   [§ 5.2.1 Verification
    Material](#ref-for-dfn-publickeyjwk-3 "§ 5.2.1 Verification Material")
::::

:::: {#dfn-panel-for-dfn-publickeymultibase .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: publicKeyMultibase"}
[]{.caret}

<div>

[Permalink](#dfn-publickeymultibase){.self-link
aria-label="Permalink for definition: publicKeyMultibase. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ Verification Method
    properties](#ref-for-dfn-publickeymultibase-1 "§ Verification Method properties")
-   [§ 5.2.1 Verification
    Material](#ref-for-dfn-publickeymultibase-2 "§ 5.2.1 Verification Material")
::::

:::: {#dfn-panel-for-dfn-authentication .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: authentication"}
[]{.caret}

<div>

[Permalink](#dfn-authentication){.self-link
aria-label="Permalink for definition: authentication. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ DID Document
    properties](#ref-for-dfn-authentication-1 "§ DID Document properties")
-   [§ 5.3 Verification
    Relationships](#ref-for-dfn-authentication-2 "§ 5.3 Verification Relationships")
-   [§ 5.3.1
    Authentication](#ref-for-dfn-authentication-3 "§ 5.3.1 Authentication")
    [(2)](#ref-for-dfn-authentication-4 "Reference 2")
    [(3)](#ref-for-dfn-authentication-5 "Reference 3")
-   [§ 8.2 Method
    Operations](#ref-for-dfn-authentication-6 "§ 8.2 Method Operations")
-   [§ 9.17 Level of
    Assurance](#ref-for-dfn-authentication-7 "§ 9.17 Level of Assurance")
::::

:::: {#dfn-panel-for-dfn-assertionmethod .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: assertionMethod"}
[]{.caret}

<div>

[Permalink](#dfn-assertionmethod){.self-link
aria-label="Permalink for definition: assertionMethod. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ DID Document
    properties](#ref-for-dfn-assertionmethod-1 "§ DID Document properties")
-   [§ 5.3.2
    Assertion](#ref-for-dfn-assertionmethod-2 "§ 5.3.2 Assertion")
-   [§ 9.17 Level of
    Assurance](#ref-for-dfn-assertionmethod-3 "§ 9.17 Level of Assurance")
::::

:::: {#dfn-panel-for-dfn-keyagreement .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: keyAgreement"}
[]{.caret}

<div>

[Permalink](#dfn-keyagreement){.self-link
aria-label="Permalink for definition: keyAgreement. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ DID Document
    properties](#ref-for-dfn-keyagreement-1 "§ DID Document properties")
-   [§ 5.3 Verification
    Relationships](#ref-for-dfn-keyagreement-2 "§ 5.3 Verification Relationships")
::::

:::: {#dfn-panel-for-dfn-capabilityinvocation .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: capabilityInvocation"}
[]{.caret}

<div>

[Permalink](#dfn-capabilityinvocation){.self-link
aria-label="Permalink for definition: capabilityInvocation. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ DID Document
    properties](#ref-for-dfn-capabilityinvocation-1 "§ DID Document properties")
-   [§ 5.3.4 Capability
    Invocation](#ref-for-dfn-capabilityinvocation-2 "§ 5.3.4 Capability Invocation")
-   [§ 8.2 Method
    Operations](#ref-for-dfn-capabilityinvocation-3 "§ 8.2 Method Operations")
::::

:::: {#dfn-panel-for-dfn-capabilitydelegation .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: capabilityDelegation"}
[]{.caret}

<div>

[Permalink](#dfn-capabilitydelegation){.self-link
aria-label="Permalink for definition: capabilityDelegation. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ DID Document
    properties](#ref-for-dfn-capabilitydelegation-1 "§ DID Document properties")
::::

:::: {#dfn-panel-for-dfn-serviceendpoint .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: serviceEndpoint"}
[]{.caret}

<div>

[Permalink](#dfn-serviceendpoint){.self-link
aria-label="Permalink for definition: serviceEndpoint. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ Service
    properties](#ref-for-dfn-serviceendpoint-1 "§ Service properties")
-   [§ 5.4 Services](#ref-for-dfn-serviceendpoint-2 "§ 5.4 Services")
::::

:::: {#dfn-panel-for-dfn-production .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: production"}
[]{.caret}

<div>

[Permalink](#dfn-production){.self-link
aria-label="Permalink for definition: production. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 6.
    Representations](#ref-for-dfn-production-1 "§ 6. Representations")
-   [§ 6.1 Production and
    Consumption](#ref-for-dfn-production-2 "§ 6.1 Production and Consumption")
    [(2)](#ref-for-dfn-production-3 "Reference 2")
    [(3)](#ref-for-dfn-production-4 "Reference 3")
    [(4)](#ref-for-dfn-production-5 "Reference 4")
    [(5)](#ref-for-dfn-production-6 "Reference 5")
-   [§ 6.2 JSON](#ref-for-dfn-production-7 "§ 6.2 JSON")
-   [§ 6.2.1 Production](#ref-for-dfn-production-8 "§ 6.2.1 Production")
-   [§ 6.3 JSON-LD](#ref-for-dfn-production-9 "§ 6.3 JSON-LD")
-   [§ 6.3.1
    Production](#ref-for-dfn-production-10 "§ 6.3.1 Production")
    [(2)](#ref-for-dfn-production-11 "Reference 2")
    [(3)](#ref-for-dfn-production-12 "Reference 3")
::::

:::: {#dfn-panel-for-dfn-consumption .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: consumption"}
[]{.caret}

<div>

[Permalink](#dfn-consumption){.self-link
aria-label="Permalink for definition: consumption. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 6.
    Representations](#ref-for-dfn-consumption-1 "§ 6. Representations")
-   [§ 6.1 Production and
    Consumption](#ref-for-dfn-consumption-2 "§ 6.1 Production and Consumption")
    [(2)](#ref-for-dfn-consumption-3 "Reference 2")
    [(3)](#ref-for-dfn-consumption-4 "Reference 3")
    [(4)](#ref-for-dfn-consumption-5 "Reference 4")
    [(5)](#ref-for-dfn-consumption-6 "Reference 5")
    [(6)](#ref-for-dfn-consumption-7 "Reference 6")
-   [§ 6.2 JSON](#ref-for-dfn-consumption-8 "§ 6.2 JSON")
-   [§ 6.2.2
    Consumption](#ref-for-dfn-consumption-9 "§ 6.2.2 Consumption")
-   [§ 6.3 JSON-LD](#ref-for-dfn-consumption-10 "§ 6.3 JSON-LD")
-   [§ 6.3.2
    Consumption](#ref-for-dfn-consumption-11 "§ 6.3.2 Consumption")
::::

:::: {#dfn-panel-for-dfn-context .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: @context"}
[]{.caret}

<div>

[Permalink](#dfn-context){.self-link
aria-label="Permalink for definition: @context. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 2. Terminology](#ref-for-dfn-context-1 "§ 2. Terminology")
-   [§ 6.3.1 Production](#ref-for-dfn-context-2 "§ 6.3.1 Production")
::::

:::: {#dfn-panel-for-dfn-didresolutionmetadata .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: didResolutionMetadata"}
[]{.caret}

<div>

[Permalink](#dfn-didresolutionmetadata){.self-link
aria-label="Permalink for definition: didResolutionMetadata. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 7.1 DID
    Resolution](#ref-for-dfn-didresolutionmetadata-1 "§ 7.1 DID Resolution")
    [(2)](#ref-for-dfn-didresolutionmetadata-2 "Reference 2")
::::

:::: {#dfn-panel-for-dfn-diddocument .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: didDocument"}
[]{.caret}

<div>

[Permalink](#dfn-diddocument){.self-link
aria-label="Permalink for definition: didDocument. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 7.1 DID
    Resolution](#ref-for-dfn-diddocument-1 "§ 7.1 DID Resolution")
::::

:::: {#dfn-panel-for-dfn-diddocumentstream .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: didDocumentStream"}
[]{.caret}

<div>

[Permalink](#dfn-diddocumentstream){.self-link
aria-label="Permalink for definition: didDocumentStream. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 7.1 DID
    Resolution](#ref-for-dfn-diddocumentstream-1 "§ 7.1 DID Resolution")
::::

:::: {#dfn-panel-for-dfn-diddocumentmetadata .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: didDocumentMetadata"}
[]{.caret}

<div>

[Permalink](#dfn-diddocumentmetadata){.self-link
aria-label="Permalink for definition: didDocumentMetadata. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 7.1 DID
    Resolution](#ref-for-dfn-diddocumentmetadata-1 "§ 7.1 DID Resolution")
    [(2)](#ref-for-dfn-diddocumentmetadata-2 "Reference 2")
-   [§ 7.2 DID URL
    Dereferencing](#ref-for-dfn-diddocumentmetadata-3 "§ 7.2 DID URL Dereferencing")
::::

:::: {#dfn-panel-for-dfn-equivalentid .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: equivalentId"}
[]{.caret}

<div>

[Permalink](#dfn-equivalentid){.self-link
aria-label="Permalink for definition: equivalentId. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 7.1.3 DID Document
    Metadata](#ref-for-dfn-equivalentid-1 "§ 7.1.3 DID Document Metadata")
    [(2)](#ref-for-dfn-equivalentid-2 "Reference 2")
    [(3)](#ref-for-dfn-equivalentid-3 "Reference 3")
    [(4)](#ref-for-dfn-equivalentid-4 "Reference 4")
    [(5)](#ref-for-dfn-equivalentid-5 "Reference 5")
    [(6)](#ref-for-dfn-equivalentid-6 "Reference 6")
    [(7)](#ref-for-dfn-equivalentid-7 "Reference 7")
    [(8)](#ref-for-dfn-equivalentid-8 "Reference 8")
    [(9)](#ref-for-dfn-equivalentid-9 "Reference 9")
    [(10)](#ref-for-dfn-equivalentid-10 "Reference 10")
    [(11)](#ref-for-dfn-equivalentid-11 "Reference 11")
    [(12)](#ref-for-dfn-equivalentid-12 "Reference 12")
-   [§ 9.14 Equivalence
    Properties](#ref-for-dfn-equivalentid-13 "§ 9.14 Equivalence Properties")
    [(2)](#ref-for-dfn-equivalentid-14 "Reference 2")
::::

:::: {#dfn-panel-for-dfn-canonicalid .dfn-panel hidden="" role="dialog" aria-modal="true" aria-label="Links in this document to definition: canonicalId"}
[]{.caret}

<div>

[Permalink](#dfn-canonicalid){.self-link
aria-label="Permalink for definition: canonicalId. Activate to close this dialog."}

</div>

**Referenced in:**

-   [§ 7.1.3 DID Document
    Metadata](#ref-for-dfn-canonicalid-1 "§ 7.1.3 DID Document Metadata")
    [(2)](#ref-for-dfn-canonicalid-2 "Reference 2")
    [(3)](#ref-for-dfn-canonicalid-3 "Reference 3")
    [(4)](#ref-for-dfn-canonicalid-4 "Reference 4")
    [(5)](#ref-for-dfn-canonicalid-5 "Reference 5")
    [(6)](#ref-for-dfn-canonicalid-6 "Reference 6")
    [(7)](#ref-for-dfn-canonicalid-7 "Reference 7")
    [(8)](#ref-for-dfn-canonicalid-8 "Reference 8")
    [(9)](#ref-for-dfn-canonicalid-9 "Reference 9")
    [(10)](#ref-for-dfn-canonicalid-10 "Reference 10")
-   [§ 9.14 Equivalence
    Properties](#ref-for-dfn-canonicalid-11 "§ 9.14 Equivalence Properties")
    [(2)](#ref-for-dfn-canonicalid-12 "Reference 2")
::::
