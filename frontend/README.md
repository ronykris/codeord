## Inspiration

The driving force behind building Ordverse is rooted in the practical challenges and untapped potential of recursive ordinals within the digital realm of Bitcoin.  Navigating through this vast network of recursive ordinals can be bewildering, as they reference, build upon, and influence each other. The search for specific content within these ordinals is often akin to searching for a needle in a haystack, making it a time-consuming and inefficient process. Furthermore, the dynamic evolution of recursive ordinals over time, mirroring shifts in the digital landscape, remains largely undocumented. This scattered and complex environment hinders the seamless exploration and appreciation of recursive ordinals.

The inspiration behind Ordverse is rooted in the practical challenges and unexplored potential of recursive ordinals. It emerged from the necessity to bring order and clarity to this intricate digital landscape. We built a centralized framework to simplify the interconnections between all the recursive ordinals, optimize content retrieval, and methodically chronicle their historical trajectories.  Our aim is to unlock the creative and informational potential within recursive ordinals, bridging the gap between their technical intricacies and those seeking to engage with them, making recursive ordinals more accessible, usable, and comprehensible.

## What it does
Ordverse, at its core, serves as a comprehensive and centralized datahub dedicated to the world of recursive ordinals, addressing a range of critical needs within this dynamic digital landscape. 

1. Graphical Representation:  Ordverse meticulously catalogs and organizes the extensive array of recursive ordinals, which currently number at 289,000, forming an intricate network of interconnected ordinals. Through the establishment of this organized structure, Ordverse allows users to explore and understand the interrelations between these ordinals in a systematic manner, unveiling the stories that emerge as they reference, build upon, and influence one another. Ordverse's provides you this information with an interactive graph which gives you a visual representation of these intricate connections, enabling users to navigate this digital universe with ease and clarity. Each node on the graph, represents a recursive ordinals. Clicking on it leads you to another page with detailed information about that ordinal.

2. Search Engine / Content Indexing: Ordverse brings a powerful search capability into play, enabling users to efficiently locate specific content within this intricate digital network. This practical feature addresses the challenge of content discovery in recursive ordinals, streamlining the process and enhancing user experience. Whether users are seeking specific data, artistic creations, or technical resources. We have stored the content of over 30k recursive ordinals yet and wrote a fast & efficient algorithm to index all the data for relevant results when you search for something. 

3. History of Recursive Ordinlas - Ordverse acts as a chronicle of time, systematically recording the historical progression of recursive ordinals. This historical documentation offers invaluable insights into the evolution of these digital constructs over time, providing a comprehensive view of how they have adapted and transformed in response to changes in the digital landscape.

In summary, Ordverse is a multifaceted platform that not only provides order and structure to the intricate world of recursive ordinals but also offers powerful search capabilities, historical context, and an interactive graph for visualizing the relationships between these ordinals. It serves as a gateway for users, whether they are enthusiasts, researchers, or creators, to navigate, discover, and appreciate the richness and complexity of recursive ordinals in a more accessible and systematic manner.

## How we built it
This was just amazing!!!
Figuring out how to retrieve recursive inscriptions was a challenge. we ran into a [bug](https://github.com/hirosystems/ordinals-api/issues/236) in hiro which was fixed right in time for us to retrieve recursive ordinals.

### Retrieval of recursive inscriptions
1. We attempted to retrieve all recursive ordinals and stored a subset of the properties in Mongo DB. We fetched all the recursive ordinals through the Hiro API
2. Wrote lot of data manipulation code to understand the data.
3. Executed queries to ascertain what mime_types were present in the inscribed ordinals.
4. Our goal was to fetch content from the inscription and present a visual relationship of the recursions
5. Hiro again came in handy, we used the content api to retrieve the content of each inscription and stored it against the corresponding record in the db.

### Manipulation of data
1. With the recursive ordinals retrieved we wrote a tiny algorithm to build a node graph
- it picks an inscription, 
- looks up the recursions
- creates a relationship map
2. Converted this into an API to be able to run this also on the fly for any search query

### Frontend
1. We chose NextJs as the preferred frontend. The first task was to present a visual representation of the relationships. The first looks of it [here](https://twitter.com/lowcodekrish/status/1707737996823593380) blew our mind. It was fantastic!
2. We had to experiment with the count of ordinals to be retrieved to overcome the latency issues.
3. Every time the site loads it makes a call to the DB to fetch the ordinals. 
4. Next we built a search engine that does the following
a. does a free form text search in the inscriptions
b. runs the node graph also to build the relationship model
c. returns the entire chunk to the front end

### Indexer
1. Indexing was an important task. We built an indexer using Typesense. it's blazing speed and in memory indexing made the search super fast
2. However, ran out of time to integrate it with the final demo.



## Challenges we ran into

1. Storing 290k Recursive Inscriptions: One of the initial hurdles we faced was dealing with the sheer volume of inscriptions—290,000 of them—and efficiently storing their associated data in MongoDB. This task proved to be a substantial undertaking, demanding a significant amount of time and memory resources. MongoDB, while a powerful NoSQL database, presented challenges in handling such a large dataset. We fetched all the data about recursive ordinals from the  **Hiro API** then we had to optimize our data storage strategies, fine-tune our queries, and allocate substantial memory resources to ensure smooth data ingestion and retrieval processes. This was a crucial foundational step in building Ordverse, and overcoming it required meticulous planning and execution.

2. Graph Representation of Inscriptions: To provide users with an interactive graph that cataloged and organized the relationships between recursive ordinals, we faced the challenge of selecting an appropriate graph package that could handle a dataset of this scale without performance issues. It took us considerable time and research to identify a stable graph package capable of managing the complexity of the interconnected inscriptions. Even with the selected package, we encountered initial loading issues, where the graph would hang during the initialization process. Addressing these performance bottlenecks required careful optimization and fine-tuning of the graph data structure and query operations to ensure a smooth user experience.

3. Building the Efficient Indexing Algorithm: Building an efficient indexing algorithm posed another significant challenge. Ordverse's indexing algorithm needed to read and process content from all the stored inscriptions—an intricate task that demanded precision and efficiency. Crafting an algorithm capable of handling this magnitude of data while delivering fast and responsive search results was no small feat. We had to carefully design and implement the algorithm, optimizing its data retrieval and processing methods to strike a balance between accuracy and speed. This challenge required a deep understanding of the intricacies of recursive ordinals and content indexing to ensure that users could efficiently search and discover relevant inscriptions within Ordverse.

4. We lost few days due a bug in hiro's api. 

## Accomplishments that we're proud of
1. Building the entire application just as we planned it despite facing so many challenges was an accomplishment that made us very proud. 
2. **Successfully integrating Hiro the second time.** - Hiro you're our true hero. Lots of love from the ordverse team!!
3. Built a tiny algorithm to create a relationship graph of all the nodes

## What we learned
1. I improved on my typescript skills
2. Team work improved results and quality
3. Learnt about ordinals and inscriptions and how it could be turned into a monetizing scheme. I also did few interviews around building an income stream for devs using this.

## What's next for Ordverse
1. Improve search speed via indexing and add inscription level analytics 
2. Improve scalability of the infrastruture
3. The relationship graphs are in itself ordinals that could be traded 
4. Create an alternate income stream for developers to trade code
5. Build an AI model to predict the next inscription and recommend inscriptions that are recursive-able to build new dapps