### Why I am Exploring Development Strategies and Design Patterns
Since developing `SnapJournal` alone, I've realized that my development process is taking longer than expected. To improve efficiency and deliver quality code, I decided to research development strategies and design patterns to better structure my projects. This document will serve as a reference for understanding and applying these concepts in my current and future projects.

## Development Strategies

### 1. Minimum Viable Product (MVP)
**Definition**: Focuses on building only the core functionalities required to test product viability with users.  

**Pros**:  
- Release a product to the market quickly.  
- Collects user feedback early.  
- Reduces initial development risks.    

**Cons**:  
- May leave users unsatisfied with limited functionality.  
- Can appear incomplete or unpolished.  

### 2. Incremental Development
**Definition**: Develops a few basic features in functional increments that can be delivered to the customer.  

**Pros**:  
- Gradual delivery of features.  
- Changes are easy to implement.  
- Easier to identify and resolve issues early.  

**Cons**:  
- Every iteration step is distinct and does not flow into next.  
- Requires a strong overall architectural vision.  

**When to Use**:  
- Projects with new Technology.  
- Clear modular features that can be built step by step.  

### 3. Agile Development
**Definition**: Agile is a project management and software development approach that aims to be more effective. They prioritize flexibility, collaboration, and customer satisfaction.  

>Agile is not just a methodology; it's a mindset. Agile isn't about following specific rituals or techniques. Instead, it is a bunch of methods that show a dedication to quick feedback and getting better.  

**Pros**:  
- Highly flexible to changing requirements.  
- Continuous user feedback ensures alignment with needs.  

**Cons**:  
- Can be challenging to manage without proper planning.  
- Sometimes lead to uncertainty, especially in projects with unclear or rapidly changing requirements.  

## Design Patterns
### Architectural Patterns Vs Design Patterns  
**Architectural Patterns**  
- Define the overall structure and high-level organization of a system.  
- Focus on the relationships between components and the flow of data.  

Examples: MVC, Layered Architecture, Microservices, etc.  

**Design Patterns**  
- Solve specific recurring problems in software design.  
- Provide reusable templates for specific scenarios in code implementation.  

Examples: Singleton, Observer, Repository, Factory, etc.  

### 1. Model-View-Controller (MVC)
**Definition**: Separates the application into three interconnected layers.  
- Model: Manages data and business logic.  
- View: Handles the user interface and presentation.  
- Controller: Manages the flow between the Model and View.  

**Benefits**: 
- Clear separation of concerns.  
- Easier to maintain.  

### 2. Singleton Pattern
**Definition**: Ensures a class has only one instance and provides a global point of access to it.  
**Benefits**: Useful for managing shared resources like database connections or configuration settings.  

### 3. Repository Pattern
**Definition**: Provides an abstraction layer between the data source and the business logic.  
**Benefits**: Easier to swap or change the data source.  

## Application in SnapJournal

### Chosen Development Strategy
**MVP**: Focused on building core functionalities like map rendering, marker creation, and data storage.  
**Incremental Development**: Map rendering, Marker creation and data input, etc.  

### Applied Design Patterns  
**MVC(Already applied)**  
- Model: MongoDB handles user data and marker.  
- View: Renders the map and user interface.  
- Controller: Express.js processes API requests.  

## Reference
[Development Strategy](https://www.blackduck.com/blog/top-4-software-development-methodologies.html)  
[Minimum Viable Product](https://www.productplan.com/glossary/minimum-viable-product/)  
[Incremental Development](https://www.geeksforgeeks.org/software-engineering-incremental-process-model/)  
[Agile](https://www.geeksforgeeks.org/what-is-agile-methodology/?ref=shm)  
[MVC Pattern](https://www.geeksforgeeks.org/mvc-design-pattern/)