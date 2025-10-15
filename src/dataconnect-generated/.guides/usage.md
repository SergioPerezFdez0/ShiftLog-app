# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.


### Angular

The generated SDK creates injectable wrapper functions.

Here's an example:
```
import { injectCreatePunch, injectGetWorkSessionsForUser, injectCreateUser, injectGetUserByUsername } from '@dataconnect/generated/angular';

@Component({
  selector: 'my-component',
  ...
})
class MyComponent {
  // The types of these injectors are available in angular/index.d.ts
  private readonly CreatePunchOperation = injectCreatePunch(createPunchVars);
  private readonly GetWorkSessionsForUserOperation = injectGetWorkSessionsForUser(getWorkSessionsForUserVars);
  private readonly CreateUserOperation = injectCreateUser(createUserVars);
  private readonly GetUserByUsernameOperation = injectGetUserByUsername(getUserByUsernameVars);
  }
```

Each operation is a wrapper function around Tanstack Query Angular.

Here's an example:
```ts
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'simple-example',
  template: `
    @if (movies.isPending()) {
      Loading...
    }
    @if (movies.error()) {
      An error has occurred: {{ movies.error().message }}
    }
    @if (movies.data(); as data) {
      @for (movie of data.movies ; track
        movie.id) {
      <h1>{{ movie.title }}</h1>
      <p>{{ movie.synopsis }}</p>
      }
    }
  `
})
export class SimpleExampleComponent {
  http = inject(HttpClient)

  movies = injectListMovies();
}
```




## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createPunch, getWorkSessionsForUser, createUser, getUserByUsername } from '@dataconnect/generated';


// Operation CreatePunch:  For variables, look at type CreatePunchVars in ../index.d.ts
const { data } = await CreatePunch(dataConnect, createPunchVars);

// Operation GetWorkSessionsForUser:  For variables, look at type GetWorkSessionsForUserVars in ../index.d.ts
const { data } = await GetWorkSessionsForUser(dataConnect, getWorkSessionsForUserVars);

// Operation CreateUser:  For variables, look at type CreateUserVars in ../index.d.ts
const { data } = await CreateUser(dataConnect, createUserVars);

// Operation GetUserByUsername:  For variables, look at type GetUserByUsernameVars in ../index.d.ts
const { data } = await GetUserByUsername(dataConnect, getUserByUsernameVars);


```