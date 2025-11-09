**LINKED LISTS**
------------------------------------------------------------
- is a linear data structure composed of a sequence of nodes. 
    * allows efficient insertion and deletion operations compared to arrays.
    * also used to implement other data structures like stack, queue and deque.
- Parts of a Linked List:
    1. `Node` 
        - container for some data.
        -  a -> b -> c -> d -> null
    2. `Head`
        - First Node of a linked list.
    3. `Tail`
        - Last Node of a linked list.

- Each node in a linked list typically consists of two main parts: 
    1. `Data` 
        - The actual value or information stored in that node.
    2. `Pointer`
        - A link to the next node in the sequence. 
            * > In the case of a singly linked list, this points only to the subsequent node. 
            * > In a doubly linked list, each node also contains a pointer to the previous node. 
            * > The last node in a linked list typically points to null to signify the end of the list.  

- Key Characteristics:
    1. `Dynamic Size` 
        - Linked lists can grow or shrink dynamically as needed
        - allocating or deallocating memory for nodes during runtime.
    2. `Efficient Insertion and Deletion` 
        - Adding or removing elements, especially at the beginning or end
        - can be very efficient (O(1) time complexity) 
            * > because it primarily involves updating pointers rather than shifting elements like in an array.
    3. `Sequential Access` 
        - Elements in a linked list cannot be accessed randomly by index. 
        - To find a specific element
            * > must traverse list sequentially from beginning ("head" node) until desired node is found.
    4. `Memory Usage` 
        - Linked lists generally use more memory than arrays to store the same amount of data 
            * > because each node requires extra space for its pointer(s).

- Types of Linked Lists:
    1. `Singly Linked List`
        - Each node points to the next node in the sequence. 
    2. `Doubly Linked List`
        - Each node points to both the next and the previous node. 
    3. `Circular Linked List`
        - The last node's pointer points back to the first node, creating a continuous loop. 

- Comparison of Linked List vs Arrays

    |                    | `Linked-List `                | `Array`                      |
    | :----------------- | :---------------------------: | ----------------------------:|
    | Data Structure     | Non-contiguous                | Contiguous                   |
    | Memory Allocation  | 1 by 1 to individual elements | allocated to the whole array |
    | Insertion/Deletion | Efficient                     | Inefficient                  |
    | Access             | Sequential                    | Random                       |

    - Array difference
        >* elements not nodes. 
        >* array data is stored contiguously in memory.
        >* all elements in an array are stored right next to eachother in computers memory.
        >* affects performance.

**COMPLILING CODE**
------------------------------------------------------------
- Steps
    1. `cd <directory_with_file>`
    2.  run code
        * > JavaScript `node <fileName>.js`
        * > Python     `python <fileName>.py`
        * > java       `javac <fileName>.java            && java <fileName>`
        * > cpp        `g++ <fileName>.cpp -o <fileName> && ./<fileName>` 


**REFERENCE**
------------------------------------------------------------
[https://www.youtube.com/watch?v=Hj_rA0dhr2I]